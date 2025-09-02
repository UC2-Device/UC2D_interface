import { loadRazorpay } from "../Utility/Razorpay.js";
import axios from "axios";
import { URL } from "../Constants/API_URL.js";
import PropTypes from 'prop-types';

// A mapping of payment types to their corresponding details.
const paymentDetails = {
    planUpgrade: {
        title: "Upgrade to Premium Plan",
        description: "You are about to upgrade your current plan to the Premium version. This will unlock exclusive features and benefits.",
        buttonText: "Proceed to Upgrade",
        apiEndpoint: "/upgrade/prenium",
    },
    planPurchase: {
        title: "Purchase New Plan",
        description: "You are about to purchase a new plan. Please review the details of the plan before proceeding with the payment.",
        buttonText: "Proceed to Purchase",
        apiEndpoint: "/upgrade/plan",
    },
    sessionUpgrade: {
        title: "Upgrade Your Session",
        description: "You are about to upgrade your current session. This will provide you with extended access and additional features for this session.",
        buttonText: "Proceed to Upgrade Session",
        apiEndpoint: "/upgrade/sessions",
    },
};

export default function PaymentButton({ type , amount , isprenium}) {
    const details = paymentDetails[type];

    const handlePayment = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) throw new Error("Not authenticated");

            // Dynamically set the backend endpoint based on the payment type
            const res = await axios.post(
                `${URL}${details.apiEndpoint}`,
                { amount }, // Sending amount in the request body
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            const data = await res.data;

            if (!data.orderId || !data.key) {
                throw new Error("Invalid response from the server");
            }

            const options = {
                key: data.key,
                amount: data.amount, // Amount is in paise, as sent from the backend
                currency: "INR",
                name: "Crop Management",
                description: details.title,
                order_id: data.orderId,
                handler: async function (response) {
                    await axios.post(
                        `${URL}/upgrade/verify`,
                        { ...response, type , amount , isprenium},
                        { headers: { Authorization: `Bearer ${token}` } }
                    );
                    alert("Payment Successful 🎉");
                    window.location.reload();
                },
                prefill: {
                    email: "test@example.com",
                    contact: "9999999999",
                },
                theme: { color: "#16a34a" },
            };

            await loadRazorpay(options);
        } catch (err) {
            console.error("Payment error:", err);
            alert("Payment failed, please try again.");
        }
    };

    if (!details) {
        return <div>Invalid payment type selected.</div>;
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
            <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6">
                <h1 className="text-2xl font-bold text-gray-800 text-center mb-4">
                    {details.title}
                </h1>
                <p className="text-gray-600 text-center mb-6">
                    {details.description}
                </p>
                <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 mb-6" role="alert">
                    <p className="font-bold">Important Information</p>
                    <p>In case of any payment failure, the amount debited will be automatically refunded to your account within 2-3 working days.</p>
                </div>
                <button
                    onClick={handlePayment}
                    className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-300"
                >
                    {details.buttonText}
                </button>
            </div>
        </div>
    );
}

PaymentButton.propTypes = {
    type: PropTypes.oneOf(['planUpgrade', 'planPurchase', 'sessionUpgrade']).isRequired,
    amount: PropTypes.number.isRequired,
    isprenium : PropTypes.string.isRequired,
};