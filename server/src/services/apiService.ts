import express from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET, SALT_ROUNDS } from "../config/environment";
import bcrypt from "bcrypt";
import prisma from "../config/database";

class ApiService {
  static async login(req: express.Request, res: express.Response) {
    const { username, password } = req.body;

    try {
      // Use Prisma to find the user by email
      const user = await prisma.user.findUnique({
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
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        res.send("User already exists, please login");
        return;
      } else {
        console.log("Creating new user");

        // Create the new user using Prisma
        const newUser = await prisma.user.create({
          data: {
            dob: new Date(dob),
            gender,
            email,
            username,
            password: hashedPassword,
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
}

export default ApiService;
