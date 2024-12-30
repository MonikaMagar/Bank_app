import React, { useState } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './VerifyOTP.css'; // Import custom CSS for styling

const VerifyOTP = () => {
  const [formData, setFormData] = useState({
    email: '',
    otp: '',
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        'http://localhost:5001/api/auth/verify-otp',
        formData
      );

      setMessage(response.data.message);

      if (response.data.message === 'Registration successful') {
        navigate('/login');
      }
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="verify-otp-background">
      <Container className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="verify-otp-form">
          {/* Additional Heading and Instruction */}
          <h2 className="text-center mb-4">Verify email address</h2>
          <p className="text-center mb-4">
            We've sent a One Time Password (OTP) to your email address. Please enter it below.
          </p>
          
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="otp">
              <Form.Label>OTP</Form.Label>
              <Form.Control
                type="text"
                name="otp"
                value={formData.otp}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Button type="submit" variant="primary" className="mt-3" disabled={loading}>
              {loading ? 'Verifying...' : 'Verify OTP'}
            </Button>
          </Form>
          {message && (
            <Alert variant={message.includes('success') ? 'success' : 'danger'} className="mt-3">
              {message}
            </Alert>
          )}
        </div>
      </Container>
      
      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2024 M.A.M BANK. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default VerifyOTP;
