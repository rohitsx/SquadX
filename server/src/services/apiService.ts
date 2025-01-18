import express from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/environment";
import { psqlClient } from "../config/database";

class ApiService {
  static async auth(req: express.Request, res: express.Response) {
    const { credential, access_token } = req.body;

    try {
      if (credential) {
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
            location: user.location === "default" || "null"
              ? "_"
              : user.location,
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

  static async addToActiveDuoCall(req: express.Request, res: express.Response) {
    const { username, token, socketId } = req.body;
    const decoded = jwt.verify(token, JWT_SECRET);
    let user;
    if (decoded) {
      const checkUser = await psqlClient.activeDuoCall.findUnique({
        where: {
          username,
        },
      });
      if (checkUser) {
        user = await psqlClient.activeDuoCall.update({
          where: {
            username,
          },
          data: {
            socketId,
          },
        });
      } else {
        user = await psqlClient.activeDuoCall.create({
          data: {
            username,
            socketId,
          },
        });
      }
      if (user) res.json("success");
    }
  }
  static async deleteFromActiveDuoCall(
    req: express.Request,
    res: express.Response,
  ) {
    const { username, token } = req.body;
    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded) {
      const user = await psqlClient.activeDuoCall.deleteMany({
        where: {
          username,
        },
      });
      if (user) res.json("success");
    }
  }

  static async getActiveDuoCall(req: express.Request, res: express.Response) {
    const { friendName, socketId, token } = req.body;
    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded) {
      const user = await psqlClient.activeDuoCall.findUnique({
        where: {
          username: friendName,
          socketId: socketId,
        },
      });
      await psqlClient.activeDuoCall.deleteMany({
        where: {
          username: friendName,
        },
      });
      user ? res.json("success") : res.json("error");
    }
  }
}

export default ApiService;
