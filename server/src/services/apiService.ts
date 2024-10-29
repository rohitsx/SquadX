import express from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET, SALT_ROUNDS } from "../config/environment";
import bcrypt from "bcrypt";
import { psqlClient } from "../config/database";

class ApiService {
  static async login(req: express.Request, res: express.Response) {
    const { username, password } = req.body;

    try {
      // Use Prisma to find the user by email
      const user = await psqlClient.user.findUnique({
        where: { username },
      });

      if (user) {
        const storedHashedPassword = user.password;

        const passwordMatch = await bcrypt.compare(
          password,
          storedHashedPassword,
        );

        if (passwordMatch) {
          const token = jwt.sign({ username }, JWT_SECRET, {
            expiresIn: "15d",
          });

          res.json({ message: "Login successful", token, username });
          console.log(username, "login successful");
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
    console.log("Signup");

    const { dob, gender, email, username, password } = req.body;

    try {
      const hashedPassword = await bcrypt.hash(password, Number(SALT_ROUNDS));
      // Check if the user already exists using Prisma
      const existingUser = await psqlClient.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        res.send("User already exists, please login");
        return;
      } else {
        console.log("Creating new user");

        // Create the new user using Prisma
        await psqlClient.user.create({
          data: {
            dob: new Date(dob),
            gender,
            email,
            username,
            password: hashedPassword,
            pfp: "default",
            location: "null",
          },
        });

        res.send("Signup successful, please login");
      }
    } catch (error) {
      console.log("Signup error:", error);
      res.status(500).send("Server error");
    }
  }

  static async validateToken(req: express.Request, res: express.Response) {
    const { token } = req.body;

    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      if (decoded) res.json({ valid: true });
    } catch (error) {
      res.json({ valid: false });
      console.log("Error in validate token:", error);
    }
  }

  static async getPfp(req: express.Request, res: express.Response) {
    try {
      const { username } = req.body;
      const user = await psqlClient.user.findUnique({
        where: { username },
      });
      if (user) {
        user.pfp === "default" ? res.json("default") : res.json(user.pfp);
      }
    } catch (err) {
      res.json("error, pfp not found");
      console.log("pfp not found", err);
    }
  }

  static async getUserInfo(req: express.Request, res: express.Response) {
    try {
      const { username, token } = req.body;
      const decoded = jwt.verify(token, JWT_SECRET);
      if (decoded) {
        const user = await psqlClient.user.findUnique({
          where: { username },
        });
        if (user) {
          res.json({
            name: user.username,
            birthday: user.dob.toISOString().split("T")[0],
            gender: user.gender,
            location:
              user.location === "default" || "null" ? "_" : user.location,
            email: user.email,
            about: user.about === "default" ? "_" : user.about,
            avatarUrl: user.pfp,
          });
        }
      }
    } catch (err) {
      res.json("error, user not found");
      console.log("user not found", err);
    }
  }

  static async updateUser(req: express.Request, res: express.Response) {
    try {
      const { currentUsername, updatedUsername, token, about, pfp } = req.body;
      const decoded = jwt.verify(token, JWT_SECRET);
      if (decoded) {
        const user = await psqlClient.user.update({
          where: { username: currentUsername },
          data: {
            username: updatedUsername,
            about: about,
            pfp: pfp,
          },
        });
        if (user) {
          res.json("success");
        }
      }
    } catch (err) {
      res.json("error, user not found");
      console.log("user not found", err);
    }
  }
}

export default ApiService;
