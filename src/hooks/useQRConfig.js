import { useState, useRef, useEffect, useCallback } from 'react';
import QRCodeStyling from 'qr-code-styling';

const DEFAULT = {
  data: 'https://maps.google.com/?q=TecnoFix+Puebla',
  size: 400,
  margin: 2,
  errorCorrection: 'H',
  borderRadius: 0,
  dotStyle: 'square',
  cornerSquareStyle: 'square',
  cornerDotStyle: 'square',
  useGradient: false,
  dotColor: '#000000',
  bgColor: '#ffffff',
  bgColorGrad: '#ffffff',
  gradColor1: '#3b82f6',
  gradColor2: '#6366f1',
  gradType: 'linear',
  eyeColor: '#000000',
  logoUrl: null,
  logoFileName: null,
  logoSize: 22,
  logoMargin: 5,
  hideLogoBg: true,
  fileName: 'qr-tecnofix',
};

export function useQRConfig() {
  const [config, setConfig] = useState(DEFAULT);
  const qrRef = useRef(null);
  const qrInstance = useRef(null);

  const update = useCallback((key, value) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  }, []);

  const getRadiusPx = useCallback((size) => {
    return Math.round((size ?? config.size) * (config.borderRadius / 100));
  }, [config.size, config.borderRadius]);

  const buildOptions = useCallback((overrideSize) => {
    const size = overrideSize ?? config.size;

    const dotsOptions = config.useGradient
      ? {
          type: config.dotStyle,
          gradient: {
            type: config.gradType,
            rotation: 45,
            colorStops: [
              { offset: 0, color: config.gradColor1 },
              { offset: 1, color: config.gradColor2 },
            ],
          },
        }
      : { type: config.dotStyle, color: config.dotColor };

    const opts = {
      width: size,
      height: size,
      data: config.data || 'https://example.com',
      margin: config.margin,
      qrOptions: { errorCorrectionLevel: config.errorCorrection },
      dotsOptions,
      backgroundOptions: { color: config.useGradient ? config.bgColorGrad : config.bgColor },
      cornersSquareOptions: { type: config.cornerSquareStyle, color: config.eyeColor },
      cornersDotOptions: { type: config.cornerDotStyle, color: config.eyeColor },
    };

    if (config.logoUrl) {
      opts.image = config.logoUrl;
      opts.imageOptions = {
        width: size * (config.logoSize / 100),
        height: size * (config.logoSize / 100),
        margin: config.logoMargin,
        hideBackgroundDots: config.hideLogoBg,
        crossOrigin: 'anonymous',
      };
    }

    return opts;
  }, [config]);

  useEffect(() => {
    if (!qrRef.current) return;
    const opts = buildOptions();
    if (!qrInstance.current) {
      qrInstance.current = new QRCodeStyling(opts);
      qrInstance.current.append(qrRef.current);
    } else {
      qrInstance.current.update(opts);
    }
  }, [buildOptions]);

  return { config, update, qrRef, qrInstance, buildOptions, getRadiusPx };
}
