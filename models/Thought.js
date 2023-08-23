import { Schema, model } from "mongoose";
import reactionSchema from "./Reaction.js";

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
  }
);

const Thought = model("thought", thoughtSchema);

export default Thought;
