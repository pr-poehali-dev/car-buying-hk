export const getUTMParams = (): Record<string, string> => {
  const params = new URLSearchParams(window.location.search);
  const utmParams: Record<string, string> = {};
  
  const utmKeys = [
    'utm_source',
    'utm_medium', 
    'utm_campaign',
    'utm_content',
    'utm_term'
  ];
  
  utmKeys.forEach(key => {
    const value = params.get(key);
    if (value) {
      utmParams[key] = value;
      sessionStorage.setItem(key, value);
    } else {
      const stored = sessionStorage.getItem(key);
      if (stored) {
        utmParams[key] = stored;
      }
    }
  });
  
  return utmParams;
};

export const trackUTMInMetrika = () => {
  const utmParams = getUTMParams();
  
  if (typeof window !== 'undefined' && (window as any).ym && Object.keys(utmParams).length > 0) {
    (window as any).ym(104279599, 'params', utmParams);
  }
};
