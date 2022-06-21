const { Thought } = require("../models/Thought");
const { User } = require("../models/User");

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
        Thought.findOne({ _id: params.thoughtId })
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
        .then((dbThoughtData) => {
          return User.findOneAndUpdate(
            { _id: body.userId},
            {$push: { thoughts: dbThoughtData._id } },
            { new: true }
          )
        })
        .then((dbUserData) => {
          if(!dbUserData) {
            return res.json({ message: "User ID not found! Thought created but it has no home :("})
          }
          res.json({ message: "Thought Posted!"})
        })
        .catch( err => res.status(400).json(err));
    },
    // UPDATE Thought
    updateThought({ params, body }, res){
        Thought.findOneAndUpdate({ _id: params.thoughtId }, body, { new: true, runValidators: true })
        .then((dbThoughtData) => {
          if (!dbThoughtData) {
            return res.status(404).json({ message: "Thought ID not found!" });
          }
          res.json(dbThoughtData);
        })
        .catch((err) => {
          console.log(err);
          res.status(400).json(err);
        });
    },
    // DELETE Thought
    deleteThought({ params }, res){
        Thought.findOneAndDelete({ _id: params.thoughtId })
        .then((dbThoughtData) => {
            if (!dbThoughtData) {
              return res.status(404).json({ message: "Thought ID not found!" });
            }
    // remove thought from user
            return User.findOneAndUpdate(
                { thoughts: params.thoughtId },
                { $pull: { thoughts: params.thoughtId } },
                { new: true }
            );
          })
          .then((dbUserData) => {
            if (!dbUserData) {
              return res.status(404).json({ message: "User ID not found!" });
            }
            res.json({ message: "Thought deleted!" });
        })
          .catch((err) => {
            console.log(err);
            res.status(400).json(err);
          });
    },
        //  add reaction to thoought

        addReaction({ params, body }, res) {
            Thought.findOneAndUpdate(
                { _id: params.thoughtId },
                { $push: { reactions: body } },
                { new: true, runValidators: true }
            )
            .then((dbThoughtData) => {
                if (!dbThoughtData) {
                  return res.status(404).json({ message: "Thought ID not found!" });
                }
                res.json(dbThoughtData);
              })
              .catch((err) => {
                console.log(err);
                res.status(400).json(err);
              });

        },
        // delete a reaction from a thought
        deleteReaction({ params }, res) {
            Thought.findOneAndUpdate(
                { _id: params.thoughtId },
                { $pull: { reactions: { reactionId: params.reactionId } } },
                { new: true, runValidators: true }
            )
            .then((dbThoughtData) => {
                if (!dbThoughtData) {
                  return res.status(404).json({ message: "Thought ID not found!" });
                }
                res.json(dbThoughtData);
              })
              .catch((err) => {
                console.log(err);
                res.status(400).json(err);
              });


        }
};

module.exports = thoughtController;