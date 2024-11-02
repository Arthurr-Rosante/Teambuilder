import mongoose from "mongoose";
import { Schema } from "mongoose";
import { teamSchema } from "./TeamModel.js";

const userSchema = new Schema(
  {
    name: {
      type: String,
      default: null,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      default: null,
    },
    password: {
      type: String,
      required: true,
    },
    teams: {
      type: [teamSchema],
      default: [],
    },
    pfp: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export { User };
