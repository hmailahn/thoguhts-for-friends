const router = require('express').Router();

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

// /api/users

        // GET all users

        // GET a single user by its _id and populated thought and friend data

        // POST a new user:

        // // example data
        // {
        //   "username": "lernantino",
        //   "email": "lernantino@gmail.com"
        // }


        // PUT to update a user by its _id

        // DELETE to remove user by its _id

        // BONUS: Remove a user's associated thoughts when deleted.




// /api/users/:userId/friends/:friendId

        // POST to add a new friend to a user's friend list

        // DELETE to remove a friend from a user's friend list

module.exports = router;