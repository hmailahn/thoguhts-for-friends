const router = require('express').Router();

const { get } = require('express/lib/response');
const{
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend
} = require('../../controllers/user-controller');

//api/users
router
.route('/')
.get(getAllUsers)
.post(createUser);

//get one user, update user, delete user
router
.route('/:id')
.get(getUserById)
.put(updateUser)
.delete(deleteUser)

// router
// .route('/:id/friends')

router //userid then friendid
.route('/:id/friends/:friendId')
.post(addFriend)
.delete(removeFriend)
// /api/users/:userId/friends/:friendId

        // POST to add a new friend to a user's friend list

        // DELETE to remove a friend from a user's friend list

module.exports = router;