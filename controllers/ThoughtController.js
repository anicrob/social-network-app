const { User, Thought, Reaction } = require("../models");

module.exports = {
  // Get all thoughts
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Get a thought
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId }).select("-__v");

      if (!thought) {
        return res.status(404).json({ message: "No thought with that ID" });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Create a thought
  async createThought(req, res) {
    try {
      const createdThought = await Thought.create(req.body);

      const updateUser = await User.findOneAndUpdate(
        { _id: req.body.userId },
        //add the created thought's id to the User thought array
        { $addToSet: { thoughts: createdThought._id } }
      );
      if (!updateUser) {
        return res.status(404).json({ message: "No user found with that ID" });
      }
      res.json(createdThought);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // Update a thought
  async updateThought(req, res) {
    try {
      const updatedThought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!updatedThought) {
        res.status(404).json({ message: "No thought with this id!" });
      }

      res.json(updatedThought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Delete a thought
  async deleteThought(req, res) {
    try {
      const deletedThought = await Thought.findOneAndDelete({
        _id: req.params.thoughtId,
      });

      if (!deletedThought) {
        return res.status(404).json({ message: "No thought with that ID" });
      }

      await User.findOneAndUpdate(
        { thoughts: req.params.thoughtId },
        //$pull: remove the thought mentioned in the params from the User thoughts array
        { $pull: { thoughts: req.params.thoughtId } },
        { new: true }
      );
      res.json({ message: "Thought and reactions deleted!" });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //add reaction
  async addReaction (req,res) {
    try{
      const updateThought = await Thought.findOneAndUpdate(
        {_id: req.params.thoughtId},
        //$push: add the reaction mentioned in params, from the reactions array in the thought
        //since using push instead of addToSet, this (push) will allow duplicate values
        {$push: {reactions: req.body}},
        { runValidators: true, new: true }
        );

        if (!updateThought) {
          return res.status(404).json({ message: 'No thought with this reaction found!' });
        }
  
        res.json(updateThought);
      } catch (err) {
        res.status(500).json(err);
      }
  },
  //remove reaction
  async removeReaction(req, res) {
    try {
      const updatedThought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        //$pull: remove the reaction mentioned in params, from the reactions array in the thought
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { runValidators: true, new: true }
      );

      if (!updatedThought) {
        return res.status(404).json({ message: 'No thought with this id!' });
      }

      res.json(updatedThought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
