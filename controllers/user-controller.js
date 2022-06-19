const { User } = require("../models");

const userController = {
    // GET all users 
    getUsers(req, res) {
        User.find()
            .then((dbUserData) => {
                res.json(dbUserData);
            })
            .catch((err) => {
                console.log(err);
                res.status(400).json(err);
            });
        },
        // GET single user by id
        getUserById(req, res) {
            User.findOne({ _id: req.params.userId })
                .then((dbUserData) => {
                    if (!dbUserData) {
                        return res.status(404).json({ message: "User ID not found!" })
                    }
                    res.json(dbUserData);
                })
                .catch((err) => {
                    console.log(err);
                    res.status(400).json(err);
                });
            },
            // CREATE new user
            createUser(req, res) {
                User.create(req.body)
                  .then((dbUserData) => {
                    res.json(dbUserData);
                  })
                  .catch((err) => {
                    console.log(err);
                    res.status(500).json(err);
                  });
              },
            // UPDATE user
            updateUser(req, res) {
                User.findOneAndUpdate({ _id: req.params.userId }, body, { new: true, runValidators: true })
                  .then((dbUserData) => {
                    if (!dbUserData) {
                      return res.status(404).json({ message: "User ID not found!" });
                    }
                    res.json(dbUserData);
                  })
                  .catch((err) => {
                    console.log(err);
                    res.status(500).json(err);
                  });
              },
            // DELETE user
                deleteUser({ params }, res) {
                    User.findOneAndDelete({ _id: params.id })
                    .then(dbUserData => res.json(dbUserData))
                    .catch(err => res.json(err));
  }
};

module.exports = userController;