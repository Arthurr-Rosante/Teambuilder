import mongoose from "mongoose";
import { Schema } from "mongoose";

const teamSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    members: {
      type: [
        {
          name: {
            type: String,
            required: true,
          },
          is_shiny: {
            type: Boolean,
            default: false,
          },
        },
      ],
      validate: {
        validator: (v) => v.length <= 6,
        message: "A equipe deve ter no máximo 6 membros.",
      },
    },
  },
  { timestamps: true }
);

const Team = mongoose.model("Team", teamSchema);

export { Team, teamSchema };
