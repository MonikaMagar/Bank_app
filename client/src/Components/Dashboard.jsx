import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './context/authContext';  // You need this import for `useContext`
import "./Dashboard.css";

const Dashboard = () => {
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState('');
  const { user } = useContext(AuthContext);  // Using user from AuthContext
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    const getData = async () => {
      try {
        const res = await axios.get('http://localhost:5001/api/user/balance', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBalance(res.data.balance);
      } catch (error) {
        setError('Error fetching balance. Please try again later.');
      }
    };

    getData();
  }, [navigate]);

  useEffect(() => {
    const fetchTransactions = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('http://localhost:5001/api/transactions/', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTransactions(response.data.slice(0, 5));
      } catch (error) {
        setError('Error fetching transactions. Please try again later.');
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div className="dashboard-container">
      {error && <div className="alert alert-error">{error}</div>}

      {/* Balance Card */}
      <div className="balance-card">
        <div className="balance-card-body">
          <h4 className="welcome-message">Welcome, {user?.name || 'User'}</h4>  {/* Using user from context */}
          <div className="balance-details">
            <h6 className="balance-label">Available Balance</h6>
            <h1 className="balance-amount">₹{balance.toLocaleString()}</h1>
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="recent-transactions">
        <div className="recent-transactions-header">
          <h5 className="recent-transactions-title">Recent Transactions</h5>
          <button className="link-button" onClick={() => navigate('/user/history')}>
            See All
          </button>
        </div>

        {transactions.map((transaction, index) => (
          <TransactionItem
            key={index}
            type={transaction.type}
            amount={transaction.amount}
            date={transaction.date}
            userName={transaction.userName}
            status={transaction.status}
          />
        ))}
      </div>
    </div>
  );
};

const TransactionItem = ({ type, amount, date, userName, status }) => {
  const statusColors = {
    Success: 'status-success',
    Failed: 'status-failed',
    Waiting: 'status-waiting',
  };

  return (
    <div className="transaction-card">
      <div className="transaction-header">
        <div className="transaction-type">{type}</div>
        <div className={`transaction-status ${statusColors[status]}`}>{status}</div>
      </div>
      <div className="transaction-body">
        <div className="transaction-details">
          <span>{userName} - {date}</span>
        </div>
        <div className="transaction-amount">₹{amount}</div>
      </div>
    </div>
  );
};

export default Dashboard;
