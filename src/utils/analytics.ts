/**
 * Analytics tracking utilities for Yandex.Metrika and Google Ads
 */

const YM_COUNTER_ID = 98765432;
const GA_CONVERSION_ID = 'AW-940602723';

declare global {
  interface Window {
    ym?: (counterId: number, method: string, ...args: any[]) => void;
    gtag?: (...args: any[]) => void;
  }
}

export const trackYandexGoal = (goalName: string) => {
  if (typeof window !== 'undefined' && window.ym) {
    window.ym(YM_COUNTER_ID, 'reachGoal', goalName);
  }
};

export const trackGoogleConversion = (conversionLabel: string, value: number = 1.0) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'conversion', {
      'send_to': `${GA_CONVERSION_ID}/${conversionLabel}`,
      'value': value,
      'currency': 'RUB'
    });
  }
};

export const trackPhoneClick = () => {
  trackYandexGoal('PHONE_CLICK');
  trackGoogleConversion('phone_call');
};

export const trackFormSubmit = () => {
  trackYandexGoal('LEAD_FORM');
  trackGoogleConversion('lead_conversion');
};

export const trackExitIntent = () => {
  trackYandexGoal('LEAD_EXIT_INTENT');
  trackGoogleConversion('lead_conversion');
};

export const trackCalculatorUse = () => {
  trackYandexGoal('CALCULATOR_USE');
};

export const trackWhatsAppClick = () => {
  trackYandexGoal('WHATSAPP_CLICK');
};
