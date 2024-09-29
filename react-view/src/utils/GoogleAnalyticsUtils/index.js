export const gaUtils = (event) => {
  if (window && window.dataLayer && Array.isArray(window.dataLayer)) {
    window.dataLayer.push(event);
  } else {
    console.error("gtm script did not get injected dataLayer is empty");
  }
};
