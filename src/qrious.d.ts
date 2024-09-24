declare module 'qrious' {
    interface QRiousOptions {
      value?: string;
      size?: number;
      background?: string;
      backgroundAlpha?: number;
      foreground?: string;
      foregroundAlpha?: number;
      level?: 'L' | 'M' | 'Q' | 'H';
      mime?: string;
    }
  
    export default class QRious {
      constructor(options?: QRiousOptions);
      toDataURL(): string;
    }
  }
  