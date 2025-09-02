import { useState } from 'react';
import PaymentRedirect from './Payment.js'; // Assuming PaymentRedirect is in the same directory

const sessionPricing = {
    normal: 50, // Price per normal session
    prenium: 100, // Price per premium session
};

export default function PlanPurchase() {
    const [selectedPlan, setSelectedPlan] = useState('normal');
    const [sessions, setSessions] = useState(1);
    const [amount, setAmount] = useState(sessionPricing.normal);
    const [proceedToPayment, setProceedToPayment] = useState(false);

    const handleSessionChange = (e) => {
        const sessionCount = parseInt(e.target.value, 10);
        setSessions(sessionCount);
        setAmount(sessionCount * sessionPricing[selectedPlan]);
    };

    const handlePlanSelect = (plan) => {
        setSelectedPlan(plan);
        setAmount(sessions * sessionPricing[plan]);
    };

    const handleProceedToPayment = () => {
        if (sessions > 0) {
            setProceedToPayment(true);
        } else {
            alert('Please select at least one session.');
        }
    };

    // If the user has clicked "Proceed", show the PaymentRedirect component
    if (proceedToPayment) {
        return <PaymentRedirect type="planUpgrade" amount={amount} isprenium={selectedPlan} />;
    }

    // Otherwise, show the session selection UI
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="w-full max-w-4xl">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Purchase Extra Sessions</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Normal Plan Card */}
                    <div
                        className={`p-6 rounded-lg shadow-lg cursor-pointer border-4 ${selectedPlan === 'normal' ? 'border-green-500 bg-white' : 'bg-gray-200 border-transparent'}`}
                        onClick={() => handlePlanSelect('normal')}
                    >
                        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Normal Session</h2>
                        <p className="text-gray-600 mb-4">Standard features for your session.</p>
                        <p className="text-3xl font-bold text-gray-800 mb-6">₹{sessionPricing.normal}<span className="text-lg font-normal">/session</span></p>
                        {selectedPlan === 'normal' && (
                            <div>
                                <label htmlFor="normal-sessions" className="block text-sm font-medium text-gray-700 mb-2">Number of Sessions:</label>
                                <input
                                    type="number"
                                    id="normal-sessions"
                                    name="sessions"
                                    min="1"
                                    value={sessions}
                                    onChange={handleSessionChange}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                />
                            </div>
                        )}
                    </div>

                    {/* Premium Plan Card */}
                    <div
                        className={`p-6 rounded-lg shadow-lg cursor-pointer border-4 ${selectedPlan === 'prenium' ? 'border-green-500 bg-white' : 'bg-gray-200 border-transparent'}`}
                        onClick={() => handlePlanSelect('prenium')}
                    >
                        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Premium Session</h2>
                        <p className="text-gray-600 mb-4">Unlock advanced features and priority support.</p>
                        <p className="text-3xl font-bold text-gray-800 mb-6">₹{sessionPricing.prenium}<span className="text-lg font-normal">/session</span></p>
                        {selectedPlan === 'prenium' && (
                            <div>
                                <label htmlFor="premium-sessions" className="block text-sm font-medium text-gray-700 mb-2">Number of Sessions:</label>
                                <input
                                    type="number"
                                    id="premium-sessions"
                                    name="sessions"
                                    min="1"
                                    value={sessions}
                                    onChange={handleSessionChange}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                />
                            </div>
                        )}
                    </div>
                </div>

                <div className="mt-8 text-center">
                    <p className="text-xl font-semibold text-gray-800 mb-4">Total Amount: ₹{amount}</p>
                    <button
                        onClick={handleProceedToPayment}
                        className="bg-green-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-green-700 transition-colors duration-300"
                    >
                        Proceed to Pay
                    </button>
                </div>
            </div>
        </div>
    );
}