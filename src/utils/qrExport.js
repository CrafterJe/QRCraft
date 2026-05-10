import QRCodeStyling from 'qr-code-styling';

function roundedCanvas(srcCanvas, radius) {
  const { width: w, height: h } = srcCanvas;
  const dst = document.createElement('canvas');
  dst.width = w;
  dst.height = h;
  const ctx = dst.getContext('2d');
  ctx.beginPath();
  ctx.moveTo(radius, 0);
  ctx.lineTo(w - radius, 0);
  ctx.quadraticCurveTo(w, 0, w, radius);
  ctx.lineTo(w, h - radius);
  ctx.quadraticCurveTo(w, h, w - radius, h);
  ctx.lineTo(radius, h);
  ctx.quadraticCurveTo(0, h, 0, h - radius);
  ctx.lineTo(0, radius);
  ctx.quadraticCurveTo(0, 0, radius, 0);
  ctx.closePath();
  ctx.clip();
  ctx.drawImage(srcCanvas, 0, 0);
  return dst;
}

function appendLabel(qrCanvas, { label, labelSize, labelBold, labelItalic, labelColor, bgColor, useGradient, bgColorGrad, borderRadius, size }) {
  const r = Math.round(qrCanvas.width * ((borderRadius || 0) / 100));
  const padding = Math.round(labelSize * 0.8);
  const textH = labelSize + padding * 2;
  const w = qrCanvas.width;
  const h = qrCanvas.height;

  const dst = document.createElement('canvas');
  dst.width = w;
  dst.height = h + textH;
  const ctx = dst.getContext('2d');

  // Clip all 4 corners of the combined canvas
  if (r > 0) {
    ctx.beginPath();
    ctx.moveTo(r, 0);
    ctx.lineTo(w - r, 0);
    ctx.quadraticCurveTo(w, 0, w, r);
    ctx.lineTo(w, h + textH - r);
    ctx.quadraticCurveTo(w, h + textH, w - r, h + textH);
    ctx.lineTo(r, h + textH);
    ctx.quadraticCurveTo(0, h + textH, 0, h + textH - r);
    ctx.lineTo(0, r);
    ctx.quadraticCurveTo(0, 0, r, 0);
    ctx.closePath();
    ctx.clip();
  }

  ctx.fillStyle = useGradient ? (bgColorGrad || '#ffffff') : (bgColor || '#ffffff');
  ctx.fillRect(0, 0, w, h + textH);
  ctx.drawImage(qrCanvas, 0, 0);

  const weight = labelBold ? 'bold' : 'normal';
  const style = labelItalic ? 'italic' : 'normal';
  ctx.font = `${style} ${weight} ${labelSize}px sans-serif`;
  ctx.fillStyle = labelColor || '#000000';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(label, w / 2, h + textH / 2);

  return dst;
}

function triggerDownload(dataUrl, filename) {
  const link = document.createElement('a');
  link.download = filename;
  link.href = dataUrl;
  link.click();
}

function renderOffscreen(opts, delay, callback) {
  const div = document.createElement('div');
  div.style.cssText = 'position:fixed;left:-9999px;top:-9999px;';
  document.body.appendChild(div);
  const qr = new QRCodeStyling(opts);
  qr.append(div);
  setTimeout(() => {
    callback(div, qr);
    document.body.removeChild(div);
  }, delay);
}

export function downloadPNG(qrInstance, name, radiusPx, buildOptions, config) {
  const hasLabel = !!config?.label;

  if (radiusPx > 0 || hasLabel) {
    renderOffscreen(buildOptions(), 300, (div) => {
      let canvas = div.querySelector('canvas');
      if (!canvas) return;
      if (radiusPx > 0) canvas = roundedCanvas(canvas, radiusPx);
      if (hasLabel) canvas = appendLabel(canvas, config);
      triggerDownload(canvas.toDataURL('image/png'), `${name}.png`);
    });
  } else {
    qrInstance.download({ name, extension: 'png' });
  }
}

export function downloadSVG(qrInstance, name) {
  qrInstance.download({ name, extension: 'svg' });
}

export function downloadForCanva(name, borderRadiusPct, buildOptions, config) {
  const exportSize = 1200;
  const radius = Math.round(exportSize * (borderRadiusPct / 100));
  const scale = exportSize / (config?.size || 400);
  const opts = buildOptions(exportSize);

  renderOffscreen(opts, 400, (div) => {
    let canvas = div.querySelector('canvas');
    if (!canvas) return;
    if (radius > 0) canvas = roundedCanvas(canvas, radius);
    if (config?.label) {
      canvas = appendLabel(canvas, {
        ...config,
        labelSize: Math.round(config.labelSize * scale),
      });
    }
    triggerDownload(canvas.toDataURL('image/png'), `${name}-canva.png`);
  });
}
