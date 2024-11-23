import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom'; // Uncomment if using navigation
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './IncomeAndPayment.css';

// Type definitions
interface PaymentDetails {
  bankName: string;
  accountNumber: string;
  cardNumber: string;
  paypalEmail: string;
}

interface RevenueDataPoint {
  date: string;
  revenue: number;
}

interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
}

const IncomeAndPayment: React.FC = () => {
  const [revenueData, setRevenueData] = useState<RevenueDataPoint[]>([
    { date: '2024-01-01', revenue: 1000 },
    { date: '2024-01-02', revenue: 1500 },
    { date: '2024-01-03', revenue: 1300 },
    // Add more data points...
  ]);

  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: '1', date: '2024-11-01', description: 'Subscription Payment', amount: 300 },
    { id: '2', date: '2024-11-02', description: 'Product Purchase', amount: 150 },
    { id: '3', date: '2024-11-03', description: 'Service Fee', amount: -50 },
    { id: '4', date: '2024-11-04', description: 'Refund Processed', amount: -30 },
    { id: '5', date: '2024-11-05', description: 'Bonus Added', amount: 100 },
  ]);

  const [timeframe, setTimeframe] = useState('daily'); // 'daily', 'weekly', 'monthly', 'yearly'
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingPayout, setIsEditingPayout] = useState(false);

  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails>({
    bankName: 'Example Bank',
    accountNumber: '123456789',
    cardNumber: '**** **** **** 1234',
    paypalEmail: 'user@paypal.com',
  });

  const [nextPayout, setNextPayout] = useState<string>('2024-12-01'); // Example payout date

  const totalRevenue = revenueData.reduce((total, point) => total + point.revenue, 0);
  const platformCommission = totalRevenue * 0.1; // assuming a 10% commission

  // Handle form input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPaymentDetails(prevDetails => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  // Handle payout date change
  const handlePayoutChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNextPayout(e.target.value);
  };

  // Generate graph data based on timeframe
  const filterDataByTimeframe = (data: RevenueDataPoint[]) => {
    // In real cases, implement filtering logic here based on the timeframe
    return data; // For simplicity, returning full data as-is
  };

  const filteredData = filterDataByTimeframe(revenueData);

  return (
    <div className="income-payment-container">
      <div className="summary">
        <div className="summary-card">
          <h3>Total Revenue</h3>
          <p>${totalRevenue.toFixed(2)}</p>
        </div>
        <div className="summary-card">
          <h3>Platform Commission</h3>
          <p>${platformCommission.toFixed(2)}</p>
        </div>
      </div>

      <div className="graph-section">
        <h3>Revenue Graph</h3>
        <select value={timeframe} onChange={(e) => setTimeframe(e.target.value)}>
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={filteredData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="revenue" stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/*Table for transaction history */}
      <div className="transaction-history-section">
        <h3>Latest Transactions</h3>
        <table className="transaction-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Surpirce Boxes</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {transactions.slice(0, 5).map((tx) => (
              <tr key={tx.id}>
                <td>{tx.date}</td>
                <td>{tx.description}</td>
                <td>${tx.amount.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Uncomment the line below if you want navigation functionality */}
        <button className="primary-button">See All</button>
        {/* <button className="primary-button" onClick={() => navigate('/transaction-history')}>See All Transactions</button> */}
      </div>

      <div className="payment-details-section">
        <h3>Payment Details</h3>
        {!isEditing ? (
          <div className="payment-info">
            <p><strong>Bank Name:</strong> {paymentDetails.bankName}</p>
            <p><strong>Account Number:</strong> {paymentDetails.accountNumber}</p>
            <p><strong>Card Number:</strong> {paymentDetails.cardNumber}</p>
            <p><strong>PayPal Email:</strong> {paymentDetails.paypalEmail}</p>
            <button className="primary-button" onClick={() => setIsEditing(true)}>Edit Payment Method</button>
          </div>
        ) : (
          <form className="edit-payment-form">
            <label>Bank Name</label>
            <input
              type="text"
              name="bankName"
              value={paymentDetails.bankName}
              onChange={handleInputChange}
            />
            <label>Account Number</label>
            <input
              type="text"
              name="accountNumber"
              value={paymentDetails.accountNumber}
              onChange={handleInputChange}
            />
            <label>Card Number</label>
            <input
              type="text"
              name="cardNumber"
              value={paymentDetails.cardNumber}
              onChange={handleInputChange}
            />
            <label>PayPal Email</label>
            <input
              type="email"
              name="paypalEmail"
              value={paymentDetails.paypalEmail}
              onChange={handleInputChange}
            />
            <button className="primary-button" type="button" onClick={() => setIsEditing(false)}>Save Payment Details</button>
          </form>
        )}
      </div>

      <div className="payout-reminder-section">
        <h3>Next Payout Reminder</h3>
          <div className="payout-info">
            <p><strong>Next Payout Date:</strong> {nextPayout}</p>
          </div>
      </div>
    </div>
  );
};

export default IncomeAndPayment;
