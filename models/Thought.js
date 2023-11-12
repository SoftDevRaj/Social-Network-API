// models/Thought.js
const mongoose = require('mongoose');

const reactionSchema = new mongoose.Schema({
  reactionBody: { type: String, required: true, maxlength: 280 },
  username: { type: String, required: true },
}, { timestamps: true });

const thoughtSchema = new mongoose.Schema({
  thoughtText: { type: String, required: true, minlength: 1, maxlength: 280 },
  username: { type: String, required: true },
  reactions: [reactionSchema],
}, { timestamps: true });

module.exports = mongoose.model('Thought', thoughtSchema);
