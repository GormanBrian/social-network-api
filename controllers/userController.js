import { User } from "../models/index.js";

export const getUsers = async (_, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.userId }).select("-__v");
    if (!user)
      return res.status(404).json({ message: "No user exists with that ID" });
    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};
