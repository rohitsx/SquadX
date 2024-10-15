import express from "express";
import client from "../config/database";
import jwt from "jsonwebtoken";
import { JWT_SECRET, SALT_ROUNDS } from "../config/environment";
import bcrypt from "bcrypt";

class AuthServices {
  static async login(req: express.Request, res: express.Response) {
    const { email, password } = req.body;

    try {
      const query = "SELECT * FROM users WHERE email = $1";
      const result = await client.query(query, [email]);

      if (result.rows.length > 0) {
        const storedHashedPassword = result.rows[0].password;

        const passwordMatch = await bcrypt.compare(
          password,
          storedHashedPassword,
        );

        if (passwordMatch) {
          console.log("Logging in");
          const username = result.rows[0].username;

          const token = jwt.sign({ email, username }, JWT_SECRET, {
            expiresIn: "15d",
          });

          //const refreshTokenQuery =
          //"INSERT INTO refresh_tokens (username, refresh_token) VALUES ($1, $2)";
          //await client.query(refreshTokenQuery, [username, token]);

          res.json({ message: "Login successful", token, username, email });
        } else {
          res.status(401).send({
            message: "Invalid password, please check your login details",
          });
        }
      } else {
        res.status(401).send({
          message: "User not found, please check your email",
        });
      }
    } catch (error) {
      console.log("Login error:", error);
      res.status(500).send({
        message: "Server error during login",
      });
    }
  }

  static async signup(req: express.Request, res: express.Response) {
    console.log("singup");

    const { username, email, password, dob } = req.body;
    try {
      const hashedPassword = await bcrypt.hash(password, Number(SALT_ROUNDS));
      const result = await client.query(
        "SELECT * FROM users WHERE email = $1",
        [email],
      );
      if (result.rows.length > 0) {
        res.send("User already exists, please login");
        return;
      } else {
        console.log("this in is running");

        const query =
          "INSERT INTO users (username, email, password, dob) VALUES ($1, $2, $3, $4)";
        await client.query(query, [username, email, hashedPassword, dob]);
        res.send("Signup successful, please login");
      }
    } catch (error) {
      console.log("singup error");
      res.send("server error");
    }
  }

  static async validateToken(req: express.Request, res: express.Response) {
    const { token } = req.body;

    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      if (decoded) res.json({ valid: true });
    } catch (error) {
      res.json({ valid: false });
      console.log("error in validate token", error);
    }
  }
}

export default AuthServices;
