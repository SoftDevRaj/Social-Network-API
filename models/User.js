// models/User.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+\@.+\..+/, 'Please enter a valid e-mail address'] // Regex to validate email
    },
    thoughts: [{
        type: Schema.Types.ObjectId,
        ref: 'Thought'
    }],
    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
}, {
    timestamps: true
});

// Virtual for friendCount that retrieves the length of the user's friends array field on query.
UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
