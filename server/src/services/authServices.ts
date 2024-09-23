import express from "express";
import client from "../config/database";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/envirnoment";

class AuthServices {
  static async login(req: express.Request, res: express.Response) {
    const { email, password } = req.body;
    const query = "SELECT * FROM users WHERE email = $1 AND password = $2";
    const result = await client.query(query, [email, password]);

    if (result.rows.length > 0) {
      try {
        const token = jwt.sign({ email, password }, JWT_SECRET, {
          expiresIn: "15d",
        });
        const query =
          "INSERT INTO refresh_tokens (username, refresh_token) VALUES ($1, $2)";
        await client.query(query, [result.rows[0].username, token]);
        res.json({ message: "Login successful", token, email });
      } catch (error) {
        console.log(error);
      }
    } else {
      res.status(401).send({
        message: "Invalid user, please check your username and password",
      });
    }
  }

  static async signup(req: express.Request, res: express.Response) {
    const { username, email, password, dob } = req.body;
    try {
      const query =
        "INSERT INTO users (username, email, password, dob) VALUES ($1, $2, $3, $4)";
      await client.query(query, [username, email, password, dob]);
      res.send("Signup successful");
    } catch (error) {
      console.log(error);
    }
  }

  static async validateToken(req: express.Request, res: express.Response) {
    const { token } = req.body;

    if (!token) {
      return res.status(401).json({ valid: false });
    }

    try {
      const decoded = jwt.verify(token, JWT_SECRET);
    } catch (error) {
      res.json({ valid: false });
    }
  }
}

export default AuthServices;
