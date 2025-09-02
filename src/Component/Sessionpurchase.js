import { useState } from "react";
import PaymentRedirect from "./Payment.js";

const sessionPrice = 50; // Price per session in INR

export default function SessionPurchase() {
  const [sessions, setSessions] = useState(1);
  const [proceedToPayment, setProceedToPayment] = useState(false);

  const amount = sessions * sessionPrice;

  const handleSessionChange = (e) => {
    setSessions(parseInt(e.target.value, 10));
  };

  const handleProceedToPayment = () => {
    if (sessions > 0) {
      setProceedToPayment(true);
    } else {
      alert("Please select at least one session.");
    }
  };

  if (proceedToPayment) {
    return <PaymentRedirect type="sessionUpgrade" amount={sessions} isprenium="normal"/>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-100 font-sans">
      <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow-lg p-8 space-y-6">
        
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800">Purchase Sessions</h1>
          <p className="text-gray-500 mt-2">Unlock more features by purchasing additional sessions.</p>
        </div>

        <div className="p-6 bg-slate-50 rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-medium text-gray-700">Number of Sessions</span>
            <span className="text-2xl font-bold text-indigo-600">{sessions}</span>
          </div>
          <input
            type="range"
            min="1"
            max="50"
            value={sessions}
            onChange={handleSessionChange}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-2">
            <span>1</span>
            <span>50</span>
          </div>
        </div>

        <div className="space-y-4">
            <div className="flex justify-between items-center border-t pt-4">
                <p className="text-gray-600 font-medium">Price per Session</p>
                <p className="font-semibold text-gray-800">₹{sessionPrice}</p>
            </div>
            <div className="flex justify-between items-center text-xl font-bold border-t pt-4">
                <p className="text-gray-800">Total Amount</p>
                <p className="text-indigo-600">₹{amount}</p>
            </div>
        </div>
        
        <ul className="space-y-2 text-sm text-gray-600">
          <li className="flex items-center">
            <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
            Access to all basic features
          </li>
          <li className="flex items-center">
            <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
            Standard reporting and analytics
          </li>
          <li className="flex items-center">
            <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
            Basic chat and email support
          </li>
        </ul>

        <button
          onClick={handleProceedToPayment}
          className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg font-semibold text-lg hover:bg-indigo-700 transition-colors duration-300"
        >
          Proceed to Pay
        </button>

      </div>
    </div>
  );
}