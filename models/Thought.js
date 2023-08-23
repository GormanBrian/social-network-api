import { Schema, model } from "mongoose";
import reactionSchema from "./Reaction.js";
import { formatDate } from "../utils/date.js";

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: formatDate,
    },
    username: {
      type: String,
      required: true,
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

thoughtSchema.virtual("reactionCount").get(() => this.reactions.length);

const Thought = model("thought", thoughtSchema);

export default Thought;
