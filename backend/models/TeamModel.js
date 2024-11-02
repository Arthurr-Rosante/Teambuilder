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
          item: {
            type: String,
            default: "",
          },
        },
      ],
      validate: {
        validator: (v) => v.length <= 6,
        message: "A equipe deve ter no máximo 6 membros.",
      },
    },
    user_OT: {
      // user_OT ---> Id do usuário que criou o time
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Team = mongoose.model("Team", teamSchema);

export { Team, teamSchema };
