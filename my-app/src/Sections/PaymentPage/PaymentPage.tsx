import React, { useState } from "react";
import "./PaymentPage.css";
import Button from "../../Components/Button/Button";
type PaymentMethod = {
  id: string;
  name: string;
  description: string;
};

const PaymentPage: React.FC = () => {
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: "",
    expiry: "",
    cvv: "",
    paypalEmail: "",
  });

  const paymentMethods: PaymentMethod[] = [
    { id: "creditCard", name: "Credit Card", description: "Pay using your credit card." },
    { id: "paypal", name: "PayPal", description: "Pay using your PayPal account." },
  ];

  const handleMethodSelect = (id: string) => setSelectedMethod(id);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentDetails({ ...paymentDetails, [e.target.name]: e.target.value });
  };

  const handlePayment = () => {
    console.log("Payment Submitted:", { selectedMethod, paymentDetails });
    alert("Payment Successful!");
  };

  return (
    <div className="payment-page">
      <h1>Payment Page</h1>

      
      <div>
        <h2>Select a Payment Method</h2>
        {paymentMethods.map((method) => (
          <div
            key={method.id}
            className={`payment-method ${selectedMethod === method.id ? "selected" : ""}`}
            onClick={() => handleMethodSelect(method.id)}
          >
            <h3>{method.name}</h3>
            <p>{method.description}</p>
          </div>
        ))}
      </div>

      {/* Payment Details */}
      {selectedMethod && (
        <div>
          <h2>Enter Payment Details</h2>
          {selectedMethod === "creditCard" && (
            <div>
              <input
                type="text"
                name="cardNumber"
                placeholder="Card Number"
                value={paymentDetails.cardNumber}
                onChange={handleInputChange}
                className="payment-input"
              />
              <input
                type="text"
                name="expiry"
                placeholder="Expiry Date (MM/YY)"
                value={paymentDetails.expiry}
                onChange={handleInputChange}
                className="payment-input"
              />
              <input
                type="text"
                name="cvv"
                placeholder="CVV"
                value={paymentDetails.cvv}
                onChange={handleInputChange}
                className="payment-input"
              />
            </div>
          )}
          {selectedMethod === "paypal" && (
            <input
              type="email"
              name="paypalEmail"
              placeholder="PayPal Email"
              value={paymentDetails.paypalEmail}
              onChange={handleInputChange}
              className="payment-input"
            />
          )}
        </div>
      )}

      {/* Order Summary */}
      <div>
        <h2>Order Summary</h2>
        <p>Total Amount: <strong>$100.00</strong></p>
      </div>

      {/* Submit Payment */}
      {selectedMethod && (
        <button onClick={handlePayment} className="submit-button">
          Submit Payment
        </button>
      )}
    </div>
  );
};

export default PaymentPage;
