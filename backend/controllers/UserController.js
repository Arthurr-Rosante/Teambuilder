import { User as UserModel } from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import getUserPfp from "../utils/getUserPfp.js";

const UserController = {
  register: async (req, res) => {
    const { name, email, password } = req.body;
    try {
      // Authentication --------------------------------------------------------
      let user = await UserModel.findOne({ email });
      if (user)
        return res.status(400).json({ msg: "Este email já foi cadastrado." });

      const pfp = getUserPfp(name);

      user = new UserModel({ name, email, password, pfp });
      user.password = await bcrypt.hash(password, 10);

      await user.save();

      // Session Token ---------------------------------------------------------
      const payload = { user: { id: user.id } };
      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: 28800 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (error) {
      if (error instanceof Error) console.error(error.message);
      res.status(500).send("Server Error: " + error);
    }
  },
  login: async (req, res) => {
    const { email, password } = req.body;
    try {
      let user = await UserModel.findOne({ email });
      if (!user) return res.status(400).json({ msg: "Credenciais inválidas." });

      const isPswrdMatch = await bcrypt.compare(password, user.password);

      if (!isPswrdMatch)
        return res.status(400).json({ msg: "Credenciais inválidas." });

      // Session Token ---------------------------------------------------------
      const payload = { user: { id: user.id } };
      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: 28800 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (error) {
      if (error instanceof Error) console.error(error.message);
      res.status(500).send("Server Error: " + error);
    }
  },
  getUser: async (req, res) => {
    try {
      const user = await UserModel.findById(req.user.id).select("-password");
      res.json(user);
    } catch (error) {
      if (error instanceof Error) console.error(error.message);
      res.status(500).send("Server Error: " + error);
    }
  },
};

export default UserController;
