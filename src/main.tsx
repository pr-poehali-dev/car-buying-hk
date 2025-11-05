import * as React from 'react';
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'

const loadGoogleAds = () => {
  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://www.googletagmanager.com/gtag/js?id=AW-940602723';
  document.head.appendChild(script);

  script.onload = () => {
    (window as any).dataLayer = (window as any).dataLayer || [];
    function gtag(...args: any[]) {
      (window as any).dataLayer.push(arguments);
    }
    (window as any).gtag = gtag;
    gtag('js', new Date());
    gtag('config', 'AW-940602723');
  };
};

loadGoogleAds();

createRoot(document.getElementById("root")!).render(<App />);