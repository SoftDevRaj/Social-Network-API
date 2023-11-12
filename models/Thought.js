// models/Thought.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Reaction schema to be a subdocument in Thought
const ReactionSchema = new Schema({
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280 // Max length for the reaction
    },
    username: {
        type: String,
        required: true
    }
}, {
    timestamps: true // Include createdAt and updatedAt fields
});

// Thought schema
const ThoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minlength: 1, // Minimum length for the thought text
        maxlength: 280 // Maximum length for the thought text
    },
    username: { // The user that created this thought
        type: String,
        required: true
    },
    reactions: [ReactionSchema] // Array of nested documents created with the reactionSchema
}, {
    timestamps: true // Include createdAt and updatedAt fields
});

// Virtual for reactionCount that retrieves the length of the thought's reactions array field on query.
ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

const Thought = mongoose.model('Thought', ThoughtSchema);

module.exports = Thought;
