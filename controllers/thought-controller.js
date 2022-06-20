const { Thought } = require("../models/Thought");

const thoughtController = {
    // GET all thoughts
    getThoughts(req, res) {
        Thought.find({})
        .then((dbThoughtData) => {
            res.json(dbThoughtData);
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json(err);
        });
    },
    // GET thought by id
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.thoughtid })
        .then((dbThoughtData) => {
            if (!dbThoughtData) {
                return res.status(404).json({ message: "User ID not found!" })
            }
            res.json(dbThoughtData);
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json(err);
        });
    }, 
    // create new thought
    createThought({ body }, res) {
        Thought.create(body)
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch( err => res.status(400).json(err));
    },
    // UPDATE Thought
    updateThought({ params, body }, res){
        Thought.findOneAndUpdate({ _id: params.thoughtid }, body, { new: true, runValidators: true })
        .then((dbUserData) => {
          if (!dbUserData) {
            return res.status(404).json({ message: "User ID not found!" });
          }
          res.json(dbUserData);
        })
        .catch((err) => {
          console.log(err);
          res.status(400).json(err);
        });
    },
    // DELETE Thought
    deleteThought({ params }, res){
        Thought.findOneAndDelete({ _id: params.thoughtid })
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => res.json(err));
    }
    // remove thought from user
    // add reaction to a thought
    // remove reaction from thought
};

module.exports = thoughtController;