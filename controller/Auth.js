import User from "../models/UserModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({
      where: {
        username: username,
      },
    });

    // Check if user exists and password matches
    if (!user || !(await matchPassword(password, user.password))) {
      return res.status(401).json({ message: "Username atau Password Salah." });
    }

    const accessToken = jwt.sign(
      { id: user.id, role: user.role },
      process.env.SECRET_KEY,
      {
        expiresIn: "15m",
      }
    );

    res.json({ token: accessToken, role: user.role });
  } catch (error) {
    console.error(error);
    console.log(accessToken);
    res.status(500).json({ message: "Internal server error." });
  }
};

export const matchPassword = async (password, hashedPassword) => {
  return await bcrypt.compareSync(password, hashedPassword);
};

export const logoutUser = (req, res) => {
  try {
    res.json({ message: "Successfully logged out." });
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
};