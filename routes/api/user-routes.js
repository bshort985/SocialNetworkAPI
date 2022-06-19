const router = require("express").Router();
const {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} = require("../../controllers/user-controller");

// set up GET all and POST as /api/users
router
    .route("/")
    .get(getUsers)
    .post(createUser);

// set up GET one, PUT, and DELETE at /api/users/:userid
router
    .route("/:userid")
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);

module.exports = router;