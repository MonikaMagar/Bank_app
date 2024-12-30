import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import './TransationPinChange.css'; // Import CSS for custom styles

const TransactionPinChange = () => {
  const [currentPin, setCurrentPin] = useState('');
  const [newPin, setNewPin] = useState('');
  const [confirmNewPin, setConfirmNewPin] = useState('');
  const [message, setMessage] = useState('');
  const [variant, setVariant] = useState('info');

  const handlePinChange = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const response = await axios.post(
        'http://localhost:5001/api/user/change-pin',
        { currentPin, newPin, confirmNewPin },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage(response.data.message);
      setVariant('success');
    } catch (error) {
      setMessage(error.response?.data.message || 'Error changing pin');
      setVariant('danger');
    }
  };

  return (
    <Container className="pin-change-container d-flex justify-content-center align-items-center">
      <div className="pin-change-form bg-transparent p-4 shadow-lg rounded">
        <h2 className="text-center mb-4 text-white">Change Transaction Pin</h2>
        <Form onSubmit={handlePinChange}>
          <Form.Group controlId="formCurrentPin">
            <Form.Label className="text-white">Current Pin</Form.Label>
            <Form.Control
              type="password"
              value={currentPin}
              onChange={(e) => setCurrentPin(e.target.value)}
              required
              placeholder="Enter your current pin"
              className="input-field"
            />
          </Form.Group>

          <Form.Group controlId="formNewPin">
            <Form.Label className="text-white">New Pin</Form.Label>
            <Form.Control
              type="password"
              value={newPin}
              onChange={(e) => setNewPin(e.target.value)}
              required
              placeholder="Enter a new pin"
              className="input-field"
            />
          </Form.Group>

          <Form.Group controlId="formConfirmNewPin">
            <Form.Label className="text-white">Confirm New Pin</Form.Label>
            <Form.Control
              type="password"
              value={confirmNewPin}
              onChange={(e) => setConfirmNewPin(e.target.value)}
              required
              placeholder="Confirm your new pin"
              className="input-field"
            />
          </Form.Group>

          <Button type="submit" className="submit-button w-100 mt-3">Change Pin</Button>
        </Form>

        {message && <Alert variant={variant} className="mt-3 text-center">{message}</Alert>}
      </div>
    </Container>
  );
};

export default TransactionPinChange;
