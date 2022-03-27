const { Schema, model } = require('mongoose');


// User

// username

    // String
    // Unique
    // Required
    // Trimmed

// email
    // String
    // Required
    // Unique
    // Must match a valid email address (look into Mongoose's matching validation)

// thoughts
    // Array of _id values referencing the Thought model

// friends
    // Array of _id values referencing the User model (self-reference)

// Schema Settings
    // Create a virtual called friendCount that retrieves the length of the user's friends array field on query.

const UsersSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/.+@.+\..+/]
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thoughts'
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Users'
            }
        ]
    },
    {
        toJSON: {
          virtuals: true,
        },
        id: false
      }

)


UsersSchema.virtual('friendCount').get(function() {
    return this.friends.length;
})

// // get total count of thoughts and reactions on retrieval
// UsersSchema.virtual('thoughtsCount').get(function() {
//     return this.thoughts.reduce(
//         (total, thoughts) => total + thoughts.reactions.length + 1,
//         0
//     );
//   });

const Users = model('Users', UsersSchema);

module.exports = Users;