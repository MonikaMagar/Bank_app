// DepositMoney.js

import React, { useState } from 'react';
import axios from 'axios';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import './DepositeMoney.css'; // Import the custom CSS file

const DepositMoney = () => {
  const [amount, setAmount] = useState('');
  const [transactionPin, setTransactionPin] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleDeposit = async (e) => {
    e.preventDefault();
    try {
      // Reset error and success messages
      setError('');
      setSuccess('');

      const token = localStorage.getItem('token');
      // Make a deposit request
      const response = await axios.post(
        'http://localhost:5001/api/transactions',
        {
          type: 'deposit',
          amount,
          transactionPin,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in the request headers
          },
        }
      );

      console.log(response);

      setSuccess('Deposit successful');
      setAmount('');
      setTransactionPin('');
    } catch (err) {
      setError('Failed to deposit, please check your pin and try again.');
    }
  };

  return (
    <Container className="deposit-money-container mt-5">
      <h2 className="text-center mb-4">Deposit Money</h2>
      <Form onSubmit={handleDeposit} className="deposit-form">
        <Form.Group controlId="formAmount">
          <Form.Label>Amount</Form.Label>
          <Form.Control
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            required
            className="form-control"
          />
        </Form.Group>
        <Form.Group controlId="formTransactionPin">
          <Form.Label>Transaction PIN</Form.Label>
          <Form.Control
            type="password"
            value={transactionPin}
            onChange={(e) => setTransactionPin(e.target.value)}
            placeholder="Enter transaction PIN"
            required
            className="form-control"
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-3 w-100 submit-button">
          Deposit
        </Button>
        {error && <Alert variant="danger" className="mt-3 alert-fade-in">{error}</Alert>}
        {success && <Alert variant="success" className="mt-3 alert-fade-in">{success}</Alert>}
      </Form>
    </Container>
  );
};

export default DepositMoney;
