import express from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/environment";
import { psqlClient } from "../config/database";
import axios from "axios";
import { throws } from "assert";

class ApiService {
  static async auth(req: express.Request, res: express.Response) {
    const { credential, access_token, username } = req.body;
    let user: { name: "string"; email: string; pfp: string };
    let userData: any;

    try {
      if (credential) userData = await ApiService.decodeJWT(credential);
      else if (access_token) {
        userData = await ApiService.useAccess_Token(access_token);
      } else {return res.status(401).send({
          message: "User not found, please check your email",
        });}

      user = {
        name: userData.name,
        email: userData.email,
        pfp: userData.picture,
      };

      const checkUserExtis = await psqlClient.user.findUnique({
        where: {
          email: user.email,
        },
      });

      if (!checkUserExtis && !username) throw new Error("User not found");
      if (!checkUserExtis && username && user.name && user.email) {
        const check = await psqlClient.user.create({
          data: {
            name: user.name,
            email: user.email,
            username,
            pfp: user.pfp,
          },
        });

        if (!check) throw new Error("User not created");
      }

      const token = jwt.sign({ email: user.email }, JWT_SECRET, {
        expiresIn: "1d",
      });

      const response = checkUserExtis
        ? { token, username: checkUserExtis.username }
        : { token };

      res.json(response);
    } catch (error) {
      console.log("Login error:", error);
      res.status(500).send({
        message: "Server error during login",
      });
    }
  }
  static async useAccess_Token(token: string) {
    try {
      const response = await axios.get(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching user data:");
    }
  }

  static async decodeJWT(jwt: string) {
    const [header, payload, signature] = jwt.split(".");
    const decodedPayload = atob(
      payload.replace(/_/g, "/").replace(/-/g, "+"),
    );
    return JSON.parse(decodedPayload);
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
      console.log("pfp not found");
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
