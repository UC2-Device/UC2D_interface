export const loadRazorpay = (options) => {
  return new Promise((resolve, reject) => {
    if (typeof window.Razorpay === "undefined") {
      reject("Razorpay SDK not loaded");
    }

    const rzp = new window.Razorpay(options);
    rzp.open();
    resolve(rzp);
  });
};
