import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface FacebookPixelProps {
  pixelId: string;
}

export const FacebookPixel = ({ pixelId }: FacebookPixelProps) => {
  const location = useLocation();

  useEffect(() => {
    // Carregar script do Facebook Pixel
    if (!pixelId) return;

    // Verificar se já existe
    if (document.querySelector(`script[data-facebook-pixel="${pixelId}"]`)) {
      return;
    }

    // Criar script
    const script = document.createElement('script');
    script.setAttribute('data-facebook-pixel', pixelId);
    script.innerHTML = `
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', '${pixelId}');
      fbq('track', 'PageView');
    `;

    document.head.appendChild(script);

    console.log('Facebook Pixel initialized:', pixelId);
  }, [pixelId]);

  // Track page views on route change
  useEffect(() => {
    if (pixelId && window.fbq) {
      window.fbq('track', 'PageView');
      console.log('Facebook Pixel - PageView tracked');
    }
  }, [location, pixelId]);

  return null;
};

// Types
declare global {
  interface Window {
    fbq: any;
  }
}
