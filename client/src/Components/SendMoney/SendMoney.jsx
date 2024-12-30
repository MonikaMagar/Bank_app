// SendMoney.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import './SendMoney.css'; // Import the custom CSS file

const SendMoney = () => {
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [transactionPin, setTransactionPin] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [users, setUsers] = useState([]); // List of other users

  // Fetch other users when the component mounts
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token'); // Token for authentication
        const response = await axios.get('http://localhost:5001/api/user/users', {
          headers: { Authorization: `Bearer ${token}` },
        });
        
        // Check if the response contains valid user data
        if (response.data && Array.isArray(response.data)) {
          setUsers(response.data); // Set users excluding the current user
        } else {
          setError('No users found.');
        }
      } catch (error) {
        console.error('Error fetching users:', error);
        setError('Failed to fetch users.');
      }
    };
    fetchUsers();
  }, []);

  const handleSendMoney = async (e) => {
    e.preventDefault();
    try {
      setError(''); // Clear previous errors
      setSuccess(''); // Clear previous success messages
      
      const token = localStorage.getItem('token'); // Get token for authentication
      
      await axios.post( // Send the transaction request
        'http://localhost:5001/api/transactions',
        {
          type: 'send',
          recipient, // Recipient ID
          amount,
          transactionPin,
        },
        {
          headers: { Authorization: `Bearer ${token}` }, // Pass the token in headers
        }
      );
      
      // If request is successful, set success message
      setSuccess('Money sent successfully');
      setRecipient(''); // Clear recipient
      setAmount(''); // Clear amount
      setTransactionPin(''); // Clear transaction pin
  
    } catch (err) {
      // If there's an error, set error message
      setError('Failed to send money. Please check your balance and pin.');
    }
  };
  

  return (
    <Container className="send-money-container mt-5">
      <h2 className="text-center mb-4">Send Money</h2>
      <Form onSubmit={handleSendMoney} className="send-money-form">
        <Form.Group controlId="formRecipient">
          <Form.Label>Recipient</Form.Label>
          <Form.Select
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            required
          >
            <option value="">Select a recipient</option>
            {users.length > 0 ? (
              users.map((user) => (
                <option key={user._id} value={user._id}>
                  {user.name}
                </option>
              ))
            ) : (
              <option disabled>No users available</option>
            )}
          </Form.Select>
        </Form.Group>
        <Form.Group controlId="formAmount">
          <Form.Label>Amount</Form.Label>
          <Form.Control
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            required
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
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-3 w-100 submit-button">
          Send Money
        </Button>
        {error && <Alert variant="danger" className="mt-3 alert-fade-in">{error}</Alert>}
        {success && <Alert variant="success" className="mt-3 alert-fade-in">{success}</Alert>}
      </Form>
    </Container>
  );
};

export default SendMoney;
