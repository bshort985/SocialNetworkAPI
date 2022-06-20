const { User } = require("../models/User");


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
        getUserById({ params }, res) {
            User.findOne({ _id: params.userid })
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
            createUser({ body }, res) {
                User.create(body)
                  .then(dbUserData => res.json(dbUserData))
                  .catch( err => res.status(400).json(err));
              },
            // UPDATE user
            updateUser({ params, body }, res) {
                User.findOneAndUpdate({ _id: params.userid }, body, { new: true, runValidators: true })
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
            // DELETE user
                deleteUser({ params }, res) {
                    User.findOneAndDelete({ _id: params.userid })
                    .then(dbUserData => res.json(dbUserData))
                    .catch(err => res.json(err));
              }
              // add friends
              // delete friends
};

module.exports = userController;