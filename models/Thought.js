import { Schema, model } from "mongoose";

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
  reactions: [],
  reactionCount: 0,
});

const Thought = model("thought", thoughtSchema);

export default Thought;
