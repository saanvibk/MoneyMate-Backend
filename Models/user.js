import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  expenses: [
    {
      category: {
        type: String,
        required: true,
      },
      amount: {
        type: Number,
        required: true,
        default: 0,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  income: {
    type: Number,
  },
});

export default mongoose.model("User", userSchema);
