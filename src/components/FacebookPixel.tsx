import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

interface FacebookPixelProps {
  pixelId: string;
}

type FacebookPixelFn = (
  action: string,
  eventName: string,
  parameters?: Record<string, unknown>
) => void;

export const FacebookPixel = ({ pixelId }: FacebookPixelProps) => {
  const location = useLocation();
  const hasTrackedInitialPageView = useRef(false);

  useEffect(() => {
    if (!pixelId || !window.fbq) return;

    if (!hasTrackedInitialPageView.current) {
      hasTrackedInitialPageView.current = true;
      return;
    }

    window.fbq('track', 'PageView');
    console.log('Facebook Pixel - SPA PageView tracked:', `${location.pathname}${location.search}${location.hash}`);
  }, [location.hash, location.pathname, location.search, pixelId]);

  return null;
};

declare global {
  interface Window {
    fbq?: FacebookPixelFn;
  }
}
