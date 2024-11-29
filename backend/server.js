const express = require('express');
const cors = require('cors');
const app = express();

// CORS configuration should come first
app.use(cors({
    origin: [
        'http://localhost:3000',
        'https://7ff01bac-aa92-4cdf-83aa-598b2ab463ce.e1-us-east-azure.choreoapps.dev'
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

// Then other middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Then your routes
app.use('/api', routes);

// Handle preflight requests
app.options('*', cors());