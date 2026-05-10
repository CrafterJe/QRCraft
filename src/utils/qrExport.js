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

export function downloadPNG(qrInstance, name, radiusPx, buildOptions) {
  if (radiusPx > 0) {
    renderOffscreen(buildOptions(), 300, (div) => {
      const canvas = div.querySelector('canvas');
      if (canvas) triggerDownload(roundedCanvas(canvas, radiusPx).toDataURL('image/png'), `${name}.png`);
    });
  } else {
    qrInstance.download({ name, extension: 'png' });
  }
}

export function downloadSVG(qrInstance, name) {
  qrInstance.download({ name, extension: 'svg' });
}

export function downloadForCanva(name, borderRadiusPct, buildOptions) {
  const size = 1200;
  const radius = Math.round(size * (borderRadiusPct / 100));
  const opts = buildOptions(size);

  if (radius > 0) {
    renderOffscreen(opts, 400, (div) => {
      const canvas = div.querySelector('canvas');
      if (canvas) triggerDownload(roundedCanvas(canvas, radius).toDataURL('image/png'), `${name}-canva.png`);
    });
  } else {
    const qr = new QRCodeStyling(opts);
    qr.download({ name: `${name}-canva`, extension: 'png' });
  }
}
