import { Team as TeamModel } from "../models/TeamModel.js";
import { User as UserModel } from "../models/UserModel.js";

const TeamController = {
  getAll: async (req, res) => {
    try {
      const userId = req.params.id;

      const teams = await TeamModel.find({ user_OT: userId });

      if (!teams.length) {
        return res
          .status(404)
          .json({ msg: "Nenhum time encontrado para este usuário." });
      }

      res.status(200).json(teams);
    } catch (error) {
      if (error instanceof Error) console.error(error.message);
      res.status(500).send("Server Error: " + error);
    }
  },
  getOne: async (req, res) => {
    try {
      const userId = req.params.id;
      const teamId = req.params.teamId;

      const team = await TeamModel.findOne({ _id: teamId, user_OT: userId });
      if (!team) {
        return res.status(404).json({ msg: "Time não encontrado..." });
      }

      res.json({ team, msg: "Time encontrado com sucesso!" });
    } catch (error) {
      if (error instanceof Error) console.error(error.message);
      res.status(500).send("Server Error: " + error);
    }
  },
  create: async (req, res) => {
    try {
      const userId = req.params.id;

      const team = {
        name: req.body.name,
        members: req.body.members,
        user_OT: userId,
      };

      if (!req.body.name || !Array.isArray(req.body.members)) {
        return res
          .status(400)
          .json({ msg: "Nome e membros são obrigatórios." });
      }
      if (team.members.length > 6) {
        return res
          .status(400)
          .json({ msg: "A equipe deve ter no máximo 6 membros." });
      }

      const response = await TeamModel.create(team);
      await UserModel.findByIdAndUpdate(
        userId,
        { $push: { teams: response } }, //adiciona novo time mantendo os antigos
        { new: true, runValidators: true }
      );

      res.status(201).json({ response, msg: "Time adicionado com sucesso!" });
    } catch (error) {
      if (error instanceof Error) console.error(error.message);
      res.status(500).send("Server Error: " + error);
    }
  },
  delete: async (req, res) => {
    try {
      const userId = req.params.id;
      const teamId = req.params.teamId;
      const team = await TeamModel.findOne({ _id: teamId, user_OT: userId });

      if (!team) {
        return res.status(404).json({ msg: "Time não encontrado..." });
      }

      const deletedTeam = await TeamModel.findByIdAndDelete(teamId);
      await UserModel.findByIdAndUpdate(
        userId,
        { $pull: { teams: { _id: teamId } } },
        { new: true }
      );

      res.status(200).json({ deletedTeam, msg: "Time removido com sucesso!" });
    } catch (error) {
      if (error instanceof Error) console.error(error.message);
      res.status(500).send("Server Error: " + error);
    }
  },
  update: async (req, res) => {
    try {
      const userId = req.params.id;
      const teamId = req.params.teamId;

      const updatedData = {
        name: req.body.name,
        members: req.body.members,
      };

      if (!req.body.name || !Array.isArray(req.body.members)) {
        return res
          .status(400)
          .json({ msg: "Nome e membros são obrigatórios." });
      }
      if (updatedData.members.length > 6) {
        return res
          .status(400)
          .json({ msg: "A equipe deve ter no máximo 6 membros." });
      }

      const updatedTeam = await TeamModel.findByIdAndUpdate(
        teamId,
        updatedData,
        { new: true, runValidators: true }
      );

      if (!updatedTeam) {
        return res.status(404).json({ msg: "Time não encontrado..." });
      }

      await UserModel.findOneAndUpdate(
        { _id: userId, "teams._id": teamId },
        {
          $set: {
            "teams.$.name": updatedData.name,
            "teams.$.members": updatedData.members,
          },
        },
        { new: true, runValidators: true }
      );

      res
        .status(200)
        .json({ updatedTeam, msg: "Time atualizado com sucesso!" });
    } catch (error) {
      if (error instanceof Error) console.error(error.message);
      res.status(500).send("Server Error: " + error);
    }
  },
};

export default TeamController;
