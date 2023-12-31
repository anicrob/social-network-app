const { ObjectId } = require("mongoose").Types;
const { User, Thought, Reaction } = require("../models");

module.exports = {
  // Get all users
  async getUsers(req, res) {
    try {
      const users = await User.find({});

      res.json(users);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // Get a single user
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({
        _id: req.params.userId,
      })
        .select("-__v")
        .populate({
          path: "thoughts",
        });

      if (!user) {
        return res.status(404).json({ message: "No user with that ID" });
      }

      res.json(user);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // create a new user
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //update user
  async updateUser(req, res) {
    try {
      const updatedUser = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { new: true }
      );

      if (!updatedUser) {
        return res.status(404).json({ message: "No such user exists" });
      }

      res.json({ message: "User successfully updated" });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // Delete a user and their associated thoughts
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndRemove({
        _id: req.params.userId,
      });

      if (!user) {
        return res.status(404).json({ message: "No such user exists" });
      }
      //delete the thoughts associated with the deleted user
      const deletedThoughts = await Thought.deleteMany({
        //delete the thoughts where the thought _id is found in the user.thoughts 
        //property/array (where user is the user just deleted)
        _id: { $in: user.thoughts },
      });

      if (!deletedThoughts) {
        return res.status(404).json({
          message: "User deleted, but no thoughts were found",
        });
      }

      res.json({ message: "User successfully deleted" });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // Add a friend to a user
  async addFriend(req, res) {
    try {
      const addFriend = await User.findOneAndUpdate(
        { _id: req.params.userId },
        //$addToSet: add the friendId in params to the friends array on User model w/o duplicates
        { $addToSet: { friends: req.params.friendId } },
        { runValidators: true, new: true }
      );

      if (!addFriend) {
        return res
          .status(404)
          .json({ message: "No user found with that ID :(" });
      }

      res.json(addFriend);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Remove friend from a user
  async removeFriend(req, res) {
    try {
      const removeFriend = await User.findOneAndUpdate(
        { _id: req.params.userId },
        //$pull: remove the friendId in params from the friends array on User model
        { $pull: { friends: req.params.friendId } },
        { runValidators: true, new: true }
      );

      if (!removeFriend) {
        return res
          .status(404)
          .json({ message: "No user found with that ID :(" });
      }

      res.json(removeFriend);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
