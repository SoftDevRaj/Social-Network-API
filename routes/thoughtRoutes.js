// routes/thoughtRoutes.js
const express = require('express');
const router = express.Router();
const { getThoughts, createThought, updateThought, deleteThought } = require('../controllers/thoughtController');

// Get all thoughts
router.get('/', getThoughts);

// Create a thought
router.post('/', createThought);

// Update a thought
router.put('/:id', updateThought);

// Delete a thought
router.delete('/:id', deleteThought);

module.exports = router;
