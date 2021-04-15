import { NextFunction, Request, Response } from "express";
import loggings from "../utils/loggers";
import argon2 from "argon2";
import { User } from "../models/user.model";
import { signJWT } from "../middlewares/signJWT";
import { CustomReqBody } from "src/interfaces/common";

const NAMESPACE = "user";

export const validateToken = async (
  _: Request,
  res: Response,
  __: NextFunction
): Promise<void> => {
  loggings.info(NAMESPACE, "token validated");

  res.status(200).json({ message: "User authorized" });
};

export const login = async (
  req: CustomReqBody<{ username: string; password: string }>,
  res: Response,
  _: NextFunction
): Promise<void> => {
  loggings.info(NAMESPACE, "user login");

  const { password, username } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      loggings.error(NAMESPACE, "no such user");
      res.status(401).json({ message: "unauthorised" });
      return;
    }

    const verified = await argon2.verify(user.password, password);

    if (!verified) {
      res.status(401).json({ message: "unauthorised" });
      return;
    }

    signJWT(user, (error, token) => {
      if (error) {
        loggings.error(NAMESPACE, error.message);
        res.status(401).json({ message: "unauthorised" });
        return;
      } else if (token) {
        res.status(200).json({
          ...user,
          password: "",
          token,
        });
      } else {
        res.status(500).json({ message: "server error" });
      }
    });
  } catch (error) {
    loggings.error(NAMESPACE, error.message);
    res.status(500).json({ message: "server error", error });
  }
};

export const register = async (
  req: CustomReqBody<{ username: string; password: string }>,
  res: Response,
  _: NextFunction
): Promise<void> => {
  loggings.info(NAMESPACE, "user register");
  try {
    const { username, password } = req.body;

    const _user = await User.findOne({ username });
    if (_user) {
      loggings.error(NAMESPACE, "username already taken");
      res.status(400).json({ message: "username already taken" });
      return;
    }

    const hashed = await argon2.hash(password);

    const user = await User.create({
      username,
      password: hashed,
    });

    res.status(201).json({ ...user, password: "" });
  } catch (error) {
    loggings.error(NAMESPACE, error.message);
    res.status(500).json({
      message: "server error",
      error,
    });
  }
};

export const getUsers = async (
  _: Request,
  res: Response,
  __: NextFunction
): Promise<void> => {
  loggings.info(NAMESPACE, "user login");
  try {
    const users = await User.find().select("-password");
    res.status(200).json({ users });
  } catch (error) {
    loggings.error(NAMESPACE, error.message);
    res.status(500).json({ message: "server error", error });
  }
};
