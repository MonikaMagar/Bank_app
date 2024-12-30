import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import './PasswordChange.css'; // Import custom CSS for styling

const PasswordChange = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [variant, setVariant] = useState('info');

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const response = await axios.post(
        'http://localhost:5001/api/user/change-password',
        { currentPassword, newPassword, confirmPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage(response.data.message);
      setVariant('success');
    } catch (error) {
      setMessage(error.response?.data.message || 'Error changing password');
      setVariant('danger');
    }
  };

  return (
    <Container className="password-change-container d-flex justify-content-center align-items-center">
      <div className="password-change-form bg-transparent p-4 shadow-lg rounded">
        <h2 className="text-center mb-4 text-white">Change Password</h2>
        <Form onSubmit={handlePasswordChange}>
          <Form.Group controlId="formCurrentPassword">
            <Form.Label className="text-white">Current Password</Form.Label>
            <Form.Control
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
              placeholder="Enter your current password"
              className="input-field"
            />
          </Form.Group>

          <Form.Group controlId="formNewPassword">
            <Form.Label className="text-white">New Password</Form.Label>
            <Form.Control
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              placeholder="Enter a new password"
              className="input-field"
            />
          </Form.Group>

          <Form.Group controlId="formConfirmPassword">
            <Form.Label className="text-white">Confirm New Password</Form.Label>
            <Form.Control
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder="Confirm your new password"
              className="input-field"
            />
          </Form.Group>

          <Button type="submit" className="submit-button w-100 mt-3">Change Password</Button>
        </Form>

        {message && <Alert variant={variant} className="mt-3 text-center">{message}</Alert>}
      </div>
    </Container>
  );
};

export default PasswordChange;
