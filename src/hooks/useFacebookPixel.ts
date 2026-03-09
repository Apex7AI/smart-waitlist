import { useEffect } from 'react';

// Types
declare global {
  interface Window {
    fbq: any;
  }
}

export const useFacebookPixel = () => {
  /**
   * Rastreia evento personalizado
   * @param eventName - Nome do evento (ex: 'Lead', 'CompleteRegistration', 'Contact')
   * @param eventData - Dados adicionais do evento
   */
  const trackEvent = (eventName: string, eventData?: Record<string, any>) => {
    if (window.fbq) {
      window.fbq('track', eventName, eventData);
      console.log(`Facebook Pixel - Event tracked: ${eventName}`, eventData);
    } else {
      console.warn('Facebook Pixel not initialized');
    }
  };

  /**
   * Rastreia visualização de página
   */
  const trackPageView = () => {
    if (window.fbq) {
      window.fbq('track', 'PageView');
    }
  };

  /**
   * Rastreia lead (inscrição na waitlist)
   */
  const trackLead = (value?: number, currency: string = 'BRL') => {
    trackEvent('Lead', {
      value,
      currency,
      content_name: 'Waitlist Signup',
    });
  };

  /**
   * Rastreia clique no botão do WhatsApp
   */
  const trackWhatsAppClick = () => {
    trackEvent('Contact', {
      content_name: 'WhatsApp Group Click',
      content_category: 'Engagement',
    });
  };

  /**
   * Rastreia início de checkout (se tiver pagamento futuro)
   */
  const trackInitiateCheckout = (value?: number, currency: string = 'BRL') => {
    trackEvent('InitiateCheckout', {
      value,
      currency,
      content_name: 'Product/Service',
    });
  };

  /**
   * Rastreia busca (se tiver search no site)
   */
  const trackSearch = (searchString: string) => {
    trackEvent('Search', {
      search_string: searchString,
    });
  };

  return {
    trackEvent,
    trackPageView,
    trackLead,
    trackWhatsAppClick,
    trackInitiateCheckout,
    trackSearch,
  };
};
