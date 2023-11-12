const express = require('express');
const mongoose = require('mongoose');

// Initializing express app
const app = express();

// Middleware for parsing JSON bodies
app.use(express.json());

// MongoDB connection string
const dbURI = 'mongodb://localhost:27017/socialNetwork';
mongoose.connect(dbURI, {
    useNewUrlParser: true, // Use the new parser as the old one is deprecated
    useUnifiedTopology: true, // Use the new Server Discover and Monitoring engine
})
.then(() => console.log('Connected to MongoDB...')) // Log success connection
.catch(err => console.error('Could not connect to MongoDB:', err)); // Log any connection errors

// Import routes
const userRoutes = require('./routes/userRoutes'); // Replace with the path to your userRoutes file
const thoughtRoutes = require('./routes/thoughtRoutes'); // Replace with the path to your thoughtRoutes file

// Register routes
app.use('/api/users', userRoutes);
app.use('/api/thoughts', thoughtRoutes);

// Handling unsupported routes
app.use((req, res) => {
    res.status(404).send('Route does not exist.');
});

// Error handling middleware for catching all errors
app.use((error, req, res, next) => {
    console.error(error); // Log the error
    res.status(500).send('An internal error occurred');
});

// Server listening to port 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
