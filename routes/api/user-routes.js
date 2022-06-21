const router = require("express").Router();
const {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
} = require("../../controllers/user-controller");

// set up GET all and POST as /api/users 
router
    .route("/")
    .get(getUsers)
    .post(createUser);

// set up GET one, PUT, and DELETE at /api/users/:userid GET, UPDATE, and DELETE users 
router
    .route("/:userid")
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);

    // /api/users/:userId/friends/:friendId POST and DELETE friends 
router
.route('/:userId/friends/:friendId')
.post(addFriend)
.delete(deleteFriend);

module.exports = router;