// controllers/thoughtController.js
const Thought = require('../models/Thought');

exports.getAllThoughts = async (req, res) => {
  try {
    const thoughts = await Thought.find({}).populate('reactions');
    res.json(thoughts);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.createThought = async (req, res) => {
  try {
    const newThought = await Thought.create(req.body);
    res.status(201).json(newThought);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.getThoughtById = async (req, res) => {
  try {
    const thought = await Thought.findById(req.params.thoughtId).populate('reactions');
    if (!thought) {
      return res.status(404).send('Thought not found');
    }
    res.json(thought);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.updateThought = async (req, res) => {
  try {
    const thought = await Thought.findByIdAndUpdate(req.params.thoughtId, req.body, { new: true });
    if (!thought) {
      return res.status(404).send('Thought not found');
    }
    res.json(thought);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.deleteThought = async (req, res) => {
  try {
    const thought = await Thought.findByIdAndDelete(req.params.thoughtId);
    if (!thought) {
      return res.status(404).send('Thought not found');
    }
    res.status(200).send(`Thought ${req.params.thoughtId} deleted`);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.addReaction = async (req, res) => {
  try {
    const thought = await Thought.findByIdAndUpdate(
      req.params.thoughtId,
      { $push: { reactions: req.body } },
      { new: true, runValidators: true }
    );
    if (!thought) {
      return res.status(404).send('Thought not found');
    }
    res.json(thought);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.removeReaction = async (req, res) => {
  try {
    const thought = await Thought.findByIdAndUpdate(
      req.params.thoughtId,
      { $pull: { reactions: { _id: req.params.reactionId } } },
      { new: true }
    );
    if (!thought) {
      return res.status(404).send('Thought not found');
    }
    res.json(thought);
  } catch (error) {
    res.status(400).send(error.message);
  }
};
