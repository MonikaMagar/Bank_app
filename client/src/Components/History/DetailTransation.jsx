import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import jsPDF from 'jspdf';

import "../History/DetailsTransation.css"

import { Container, Card, Button, Spinner, Alert } from 'react-bootstrap';  // Keep the import

const DetailTransaction = () => {
    const [transaction, setTransaction] = useState(null);
    const [error, setError] = useState(null);  // Add state for error
    const { transactionId } = useParams();
    const token = localStorage.getItem('token');

    useEffect(() => {
        axios.get(`http://localhost:5001/api/transactions/transactions/${transactionId}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(res => setTransaction(res.data))
        .catch(err => {
            console.error(err);
            setError("Failed to load transaction details.");
        });
    }, [transactionId, token]);

    const generatePDF = () => {
        const doc = new jsPDF();
        doc.text(`Transaction: ${transaction.type}`, 10, 10);
        doc.text(`Amount: ${transaction.amount}`, 10, 20);
        doc.text(`Sender: ${transaction.sender.username}`, 10, 30);
        doc.text(`Receiver: ${transaction.recipient.username}`, 10, 40);
        return doc;
    };

    const saveAsPDF = () => generatePDF().save('transaction-details.pdf');

    if (error) {
        return (
            <Container className="error-container">
                <Alert variant="danger">{error}</Alert> {/* Show error alert */}
            </Container>
        );
    }

    if (!transaction) {
        return (
            <Container className="loading-container">
                <Spinner animation="border" />
                <span className="loading-text">Loading...</span>
            </Container>
        );
    }

    return (
        <Container className="transaction-detail-container">
            <Card className="transaction-card">
                <Card.Body>
                    <Card.Title as="h4">{transaction.type}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Amount: {transaction.amount}</Card.Subtitle>
                    <Card.Text>
                        <strong>Sender:</strong> {transaction.sender.username} <br />
                        <strong>Receiver:</strong> {transaction.recipient.username}
                    </Card.Text>
                    <Button variant="primary" onClick={saveAsPDF}>Save as PDF</Button>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default DetailTransaction;
