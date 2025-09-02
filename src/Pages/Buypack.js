import PaymentRedirect from "../Component/Payment.js"; // Assuming you have renamed PaymentButton to PaymentRedirect
import PlanPurchase from "../Component/Planupgrade.js";
import SessionPurchase from "../Component/Sessionpurchase.js";

export default function Buypack({ paymentfor }) {
    switch (paymentfor) {
        case "planupgrade":
            return (
                <div>
                    <PaymentRedirect type="planUpgrade" amount={999} />
                </div>
            );

        case "sessionupgrade":
            // Render the new session purchase component
            return (
                <div>
                    <SessionPurchase />
                </div>
            );

        case "purchaseplan":
            return (
                <div>
                    <PlanPurchase />
                </div>
            );

        default:
            // Optional: Render a default view or a message
            return (
                <div className="flex items-center justify-center min-h-screen">
                    <h1 className="text-2xl font-bold text-gray-700">Please select a payment option.</h1>
                </div>
            );
    }
}

// Example of how you might pass the prop in your application's routing
// <Test paymentfor="sessionupgrade" />