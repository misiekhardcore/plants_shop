import { NextFunction, Request, Response } from "express";
import argon2 from "argon2";
import { User } from "../models/user.model";
import { signToken } from "../utils/signToken";
import { CustomReqBody } from "src/interfaces/common";

export const validateToken = async (req: Request, res: Response) => {
  const user = await User.findById(req.userId);
  if (!user) return res.status(403).json({ token: null });
  const token = signToken(user);
  return res
    .header("Authorization", `Bearer ${token}`)
    .status(200)
    .json();
};

export const login = async (
  req: CustomReqBody<{ usernameOrEmail: string; password: string }>,
  res: Response,
  _: NextFunction
): Promise<any> => {
  const { password, usernameOrEmail } = req.body;
  try {
    if (!usernameOrEmail || !password) {
      return res.status(400).json({
        message: "Email/Username and/or password cannot be empty",
      });
    }

    const user = await User.findOne({
      $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
    });

    if (!user) {
      return res
        .status(401)
        .json({ message: "Wrong login/email or password" });
    }

    const verified = await argon2.verify(user.password, password);

    if (!verified) {
      return res
        .status(401)
        .json({ message: "Wrong login/email or password" });
    }

    const token = signToken(user);
    if (!token) {
      return res
        .status(401)
        .json({ message: "Wrong login/email or password" });
    }

    return res
      .status(200)
      .header("Authorization", `Bearer ${token}`)
      .json();
  } catch (error) {
    return res.status(500).json({ message: "server error", error });
  }
};

export const register = async (
  req: CustomReqBody<{
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
  }>,
  res: Response,
  _: NextFunction
): Promise<any> => {
  try {
    const { username, email, password, confirmPassword } = req.body;

    if (!username || !password || !email || !confirmPassword) {
      return res.status(400).json({
        message: "Username, password and/or email cannot be empty",
      });
    }

    if (password !== confirmPassword) {
      return res.status(401).json({ message: "passwords not match" });
    }

    const _user = await User.findOne({
      $or: [{ username }, { email }],
    });
    if (_user) {
      return res
        .status(400)
        .json({ message: "username or email already taken" });
    }

    const hashed = await argon2.hash(password);

    const { _id } = await User.create({
      username,
      email,
      password: hashed,
    });

    const user = await User.findById(_id);

    if (!user) return res.status(500).json({ message: "server error" });

    const token = signToken(user);
    if (!token) {
      return res.status(401).json({ message: "unauthorized" });
    }
    return res
      .status(201)
      .header("Authorization", `Bearer ${token}`)
      .json();
  } catch (error) {
    return res.status(500).json({
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
  try {
    const users = await User.find().select("-password");
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: "server error", error });
  }
};
