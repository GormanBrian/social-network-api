import db from "../config/connection.js";
import { User, Thought } from "../models/index.js";

import cleanDB from "./cleanDB.js";

import userSeeds from "./userSeeds.json" assert { type: "json" };
import thoughtSeeds from "./thoughtSeeds.json" assert { type: "json" };

db.once("open", async () => {
  try {
    // Clean database
    await cleanDB("Thought", "thoughts");
    await cleanDB("User", "users");

    // Create users
    await User.create(userSeeds);

    for (let i = 0; i < thoughtSeeds.length; i++) {
      // Create thought
      const { _id, username } = await Thought.create(thoughtSeeds[i]);
      // Add thought to user
      const user = await User.findOneAndUpdate(
        { username },
        {
          $addToSet: {
            thoughts: _id,
          },
        }
      );

      // Delete thought if user could not be found
      if (!user) {
        await Thought.findByIdAndDelete(_id);
        console.log("Deleting thought ", _id, " with author ", username, ".");
      }
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log("Seeded database");
  process.exit(0);
});
