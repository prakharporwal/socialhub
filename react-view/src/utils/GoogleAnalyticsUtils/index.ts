export const gaUtils = (event: any) => {
  if (window && window.dataLayer) {
    window.dataLayer.push(event);
  } else {
    console.error("gtm script did not get injected dataLayer is empty");
  }
};
