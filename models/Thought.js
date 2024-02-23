import { Schema, model } from "mongoose";
import reactionSchema from "./reactionSchema.js";
import { formatDate } from "../utils/date.js";

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      maxlength: [280, "Thought text cannot exceed 280 characters"],
      minlength: [1, "Thought text must be at least 1 character"],
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: formatDate,
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
