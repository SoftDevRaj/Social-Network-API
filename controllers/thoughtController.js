// controllers/thoughtController.js
const Thought = require('../models/Thought');

exports.getThoughts = async (req, res) => {
  try {
    const thoughts = await Thought.find();
    res.json(thoughts);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.createThought = async (req, res) => {
  try {
    const newThought = new Thought(req.body);
    const savedThought = await newThought.save();
    res.status(201).json(savedThought);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.updateThought = async (req, res) => {
  try {
    const updatedThought = await Thought.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedThought);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.deleteThought = async (req, res) => {
  try {
    await Thought.findByIdAndDelete(req.params.id);
    res.status(200).send('Thought deleted');
  } catch (error) {
    res.status(500).send(error.message);
  }
};
