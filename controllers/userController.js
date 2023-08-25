import { User } from "../models/index.js";

/**
 * Find all users.
 *
 * ### Response
 * - 200 - [{@linkcode User}] - Users found
 * - 500 - {@linkcode Error} - Server error
 */
export const getUsers = async (_, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json(err);
  }
};

/**
 * Find a single user by id.
 *
 * ### Response
 * - 200 - {@linkcode User} - User found
 * - 404 - {@linkcode Object} - No user exists with provided id
 * - 500 - {@linkcode Error} - Server error
 */
export const getUserById = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.userId }).select("-__v");
    if (!user) res.status(404).json({ message: "No user exists with that ID" });
    else res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

/**
 * Create a single user.
 *
 * ### Response
 * - 200 - {@linkcode User} - User created
 * - 500 - {@linkcode Error} - Server error
 */
export const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

/**
 * Update a single user by id.
 *
 * ### Response
 * - 200 - {@linkcode User} - User updated
 * - 404 - {@linkcode Object} - No user exists with provided id
 * - 500 - {@linkcode Error} - Server error
 */
export const updateUserById = async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    );
    if (!user) res.status(404).json({ message: "No user exists with that ID" });
    else res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

/**
 * Delete a single user by id.
 *
 * ### Response
 * - 200 - {@linkcode User} - User deleted
 * - 404 - {@linkcode Object} - No user exists with provided id
 * - 500 - {@linkcode Error} - Server error
 */
export const deleteUserById = async (req, res) => {
  try {
    const user = await User.findOneAndDelete({ _id: req.params.userId });
    if (!user) res.status(404).json({ message: "No user exists with that ID" });
    else {
      /** @TODO - delete user's thoughts */
      User.updateMany({ friends: user._id }, { $pull: { friends: user._id } });
      res.json(user);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

export const addNewFriend = async (req, res) => {
  try {
    const user = User.findOneAndUpdate(
      { _id: req.params.userId },
      {
        $push: {
          friends: req.params.friendId,
        },
      },
      { new: true }
    ).populate({ path: "friends", select: "-__v" });

    if (!user) {
      return res.status(404).json({ message: "No user with this id!" });
    }

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};

export const deleteFriend = async (req, res) => {
  const user = User.findOneAndUpdate(
    { _id: req.params.userId },
    { $pull: { friends: req.params.friendId } },
    { new: true }
  )
    .populate({ path: "friends", select: "-__v" })
    .select("-__v");

  if (!user) {
    return res.status(404).json({ message: "No user with this id!" });
  }

  res.json(user);
};
