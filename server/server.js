const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connect = require('./config/db'); // Ensure this file exists and is set up correctly
const authRoutes=require('./routes/authRoutes')

const transactionRoutes = require('./routes/transactionRoutes');
const userRoutes = require('./routes/userRoutes');

// Load environment variables
dotenv.config();

// Connect to the database
connect();

const app = express();

// Middleware
app.use(express.json()); // Parses incoming JSON requests
app.use(cors());         // Enables Cross-Origin Resource Sharing

// Routes
app.use('/api/auth',authRoutes)
app.use('/api/transactions', transactionRoutes);
app.use('/api/user', userRoutes);

// Root route
app.get('/', (req, res) => {
    res.send('<h1>Welcome to the Bank API</h1>');
});

// Error handling middleware (optional)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ error: 'Something went wrong!' });
});

// Define the port
const PORT = process.env.PORT || 4000;

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
