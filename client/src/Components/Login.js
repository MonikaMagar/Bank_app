import React, { useState } from 'react';
import { Form, Button, Alert, Container } from 'react-bootstrap';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Link, Navigate } from 'react-router-dom';
import './Login.css'; // Import custom CSS for styling

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [redirect, setRedirect] = useState(false); // State for redirection

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
        'http://localhost:5001/api/auth/login',
        { email: formData.email, password: formData.password }
      );
      localStorage.setItem('token', response.data.token);
      setRedirect(true); // Trigger redirection after successful login
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error occurred');
    } finally {
      setLoading(false);
    }
  };

  // Redirect to dashboard after successful login
  if (redirect) {
    return <Navigate to="/user/dashboard" />;
  }

  return (
    <div className="login-background">
      <Container className="d-flex justify-content-center align-items-center min-vh-100">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="login-form"
        >
          <h2 className="text-center mb-4">Login</h2>

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

            <Button type="submit" variant="primary" className="mt-3" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </Form>

          {message && (
            <Alert variant={message.includes('success') ? 'success' : 'danger'} className="mt-3">
              {message}
            </Alert>
          )}

          {/* Link to the signup page */}
          <div className="text-center mt-3">
            <p>
              Don't have an account?{' '}
              <Link to="/register" className="text-primary">
                Create an account
              </Link>
            </p>
          </div>
        </motion.div>
      </Container>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2024 M.A.M BANK. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Login;
