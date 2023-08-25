const { User, Thought } = require("../models");

module.exports = {
  async getAllThoughts(req, res) {
    try {
      const thoughts = await Thought.find()
        .populate({ path: "reactions", select: "-__v" })
        .select("-__v");
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async createNewThought(req, res) {
    try {
      const thought = await Thought.create(req.body)
        .populate({ path: "reactions", select: "-__v" })
        .select("-__v");

      if (!thought) {
        return res.status(409).json({ message: "Could not create thought" });
      }

      await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $push: { thoughts: thought._id } },
        { new: true }
      );

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async getThoughtById(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId })
        .populate({
          path: "reactions",
          select: "-__v",
        })
        .select("-__v");

      if (!thought) {
        return res.status(404).json({ message: "No thought with that ID" });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        req.body,
        {
          new: true,
          runValidators: true,
        }
      )
        .populate({ path: "reactions", select: "-__v" })
        .select("-__v");

      if (!thought) {
        return res.status(404).json({ message: "No thought with this id!" });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndDelete({
        _id: req.params.thoughtId,
      })
        .populate({ path: "reactions", select: "-__v" })
        .select("-__v");

      if (!thought) {
        return res.status(404).json({ message: "No thought with this id!" });
      }

      await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { thoughts: req.params.thoughtId } }
      );

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async createNewReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $push: { reactions: req.body } },
        { new: true, runValidators: true }
      )
        .populate({ path: "reactions", select: "-__v" })
        .select("-__v");

      if (!thought) {
        return res.status(404).json({ message: "No thought with this id!" });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async deleteReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        {
          $pull: {
            reactions: {
              reactionId: req.params.reactionId,
            },
          },
        },
        { new: true }
      )
        .populate({ path: "reactions", select: "-__v" })
        .select("-__v");

      if (!thought) {
        return res.status(404).json({ message: "No thought with this id!" });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
