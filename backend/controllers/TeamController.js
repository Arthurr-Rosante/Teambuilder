import { Team as TeamModel } from "../models/TeamModel";

const TeamController = {
  getAll: async (req, res) => {
    try {
      const teams = await TeamModel.find();
      res.json(teams);
    } catch (error) {
      if (error instanceof Error) console.error(error.message);
      res.status(500).send("Server Error: " + error);
    }
  },
  getOne: async (req, res) => {
    try {
      const id = req.params.id;
      const team = await TeamModel.findById(id);

      if (!team) {
        res.status(404).json({ msg: "Time não encontrado..." });
        return;
      }

      res.json({ team, msg: "Time encontrado com sucesso!" });
    } catch (error) {
      if (error instanceof Error) console.error(error.message);
      res.status(500).send("Server Error: " + error);
    }
  },
  create: async (req, res) => {
    try {
      const team = {
        name: req.body.name,
        members: req.body.members,
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
      res.status(201).json({ response, msg: "Time adicionado com sucesso!" });
    } catch (error) {
      if (error instanceof Error) console.error(error.message);
      res.status(500).send("Server Error: " + error);
    }
  },
  delete: async (req, res) => {
    try {
      const id = req.body.id;
      const team = await TeamModel.find(id);

      if (!team) {
        res.status(404).json({ msg: "Time não encontrado..." });
        return;
      }

      const deletedTeam = await TeamModel.findByIdAndDelete(id);
      res.status(200).json({ deletedTeam, msg: "Time removido com sucesso!" });
    } catch (error) {
      if (error instanceof Error) console.error(error.message);
      res.status(500).send("Server Error: " + error);
    }
  },
  update: async (req, res) => {
    try {
      const id = req.body.id;

      const team = {
        name: req.body.name,
        members: req.body.members,
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

      const updatedTeam = await TeamModel.findByIdAndUpdate(id, team);

      if (!updatedTeam) {
        res.status(404).json({ msg: "Time não encontrado..." });
        return;
      }

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
