import { Schema, model } from "mongoose";
import reactionSchema from "./Reaction.js";

const thoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: Date,
  reactions: [reactionSchema],
  reactionCount: 0,
});

const Thought = model("thought", thoughtSchema);

export default Thought;
