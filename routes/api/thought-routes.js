const router = require("express").Router();
const {
    getThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought
} = require("../../controllers/thought-controller");

// /api/thoughts GET all thoughts and POST thought
router.route("/").get(getThoughts).post(createThought);

// /api/thoughts/:thoughtid GET thought by id, UPDATE, and DELETE thoughts 
router.route("/:thoughtid").get(getThoughtById).put(updateThought).delete(deleteThought);

module.exports = router;