const router = require("express").Router();
const {
    getThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction
} = require("../../controllers/thought-controller");

// /api/thoughts GET all thoughts and POST thought
router
.route("/")
.get(getThoughts)
.post(createThought);

// /api/thoughts/:thoughtid GET thought by id, UPDATE, and DELETE thoughts 
router
.route("/:thoughtid")
.get(getThoughtById)
.put(updateThought)
.delete(deleteThought);

// /api/thoughts/:thoughtId/reactions POST Reactions
router
.route('/:thoughtId/reactions')
.post(addReaction);

// /api/thoughts/:thoughtId/reactions/:reactionId DELETE Reaction
router
.route('/:thoughtId/reactions/:reactionId')
.delete(deleteReaction);

module.exports = router;