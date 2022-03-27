const { Schema, model } = require('mongoose');

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