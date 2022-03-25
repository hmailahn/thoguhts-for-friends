const { Schema, model } = require('mongoose');

const UsersSchema = new Schema(
    {

    }
)

const Users = model('Users', UsersSchema);

module.exports = Users;