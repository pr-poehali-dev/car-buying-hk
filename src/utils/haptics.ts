export const vibrate = (pattern: number | number[] = 50) => {
  if ('vibrate' in navigator) {
    navigator.vibrate(pattern);
  }
};

export const vibrateLight = () => {
  vibrate(10);
};

export const vibrateMedium = () => {
  vibrate(25);
};

export const vibrateHeavy = () => {
  vibrate(50);
};

export const vibrateSuccess = () => {
  vibrate([50, 50, 100]);
};

export const vibrateError = () => {
  vibrate([100, 50, 100, 50, 100]);
};

export const vibrateButton = () => {
  vibrate(15);
};
