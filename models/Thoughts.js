const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

// Reaction (SCHEMA ONLY)

// reactionId
    // Use Mongoose's ObjectId data type
    // Default value is set to a new ObjectId

// reactionBody
    // String
    // Required
    // 280 character maximum
    
// username
    // String
    // Required

// createdAt
    // Date
    // Set default value to the current timestamp
    // Use a getter method to format the timestamp on query

// Schema Settings
// This will not be a model, but rather will be used as the reaction field's subdocument schema in the Thought model.

const ReactionsSchema = new Schema (
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: true, 
            maxLength: 280
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        }
    }
)

const ThoughtsSchema = new Schema(
    {
      thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxLength: 280 
      },
      createdAt: {
          type: Date,
          default: Date.now,
          get: createdAtVal => dateFormat(createdAtVal)
      },
      username: {
          type: String,
          required: true
      },
      reactions: [ReactionsSchema]
    }
);


ThoughtsSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
})

const Thoughts = model('Thoughts', ThoughtsSchema);

module.exports = Thoughts;