import React, { useState } from 'react';
import { Form, Button, Container, Alert, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Register.css'

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    transactionPin: '',
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

    if (formData.password !== formData.confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        'http://localhost:5001/api/auth/register',
        formData
      );
      setMessage(response.data.message);

      if (response.data.message === 'OTP sent to your email. Please verify to complete registration.') {
        navigate('/verify-otp');
      }
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      <Container>
        <Row className="w-100">
          {/* Right Side Form */}
          <Col md={6}>
            <div className="register-card">
              <h2>Register</h2>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
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
                <Form.Group controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="confirmPassword">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="transactionPin">
                  <Form.Label>Transaction Pin</Form.Label>
                  <Form.Control
                    type="text"
                    name="transactionPin"
                    value={formData.transactionPin}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Button type="submit" variant="primary" className="mt-3" disabled={loading}>
                  {loading ? 'Registering...' : 'Register'}
                </Button>
              </Form>
              {message && (
                <Alert variant={message.includes('success') ? 'success' : 'danger'} className="mt-3">
                  {message}
                </Alert>
              )}
            </div>
          </Col>
        </Row>
      </Container>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2024 M.A.M BANK. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Register;
