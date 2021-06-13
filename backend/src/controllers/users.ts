import { NextFunction, Request, Response } from "express";
import argon2 from "argon2";
import { User } from "../models/user.model";
import { signToken } from "../utils/signToken";
import { CustomReqBody } from "src/interfaces/common";

export const validateToken = async (
  _: Request,
  res: Response,
  __: NextFunction
) => {
  res.status(200).json({ message: "User authorized" });
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
        message: "Email/Username and/or email cannot be empty",
      });
    }

    const user = await User.findOne({
      $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
    });

    if (!user) {
      return res.status(401).json({ message: "unauthorized" });
    }

    const verified = await argon2.verify(user.password, password);

    if (!verified) {
      res.status(401).json({ message: "unauthorized" });
    }

    const token = signToken(user);
    if (!token) {
      res.status(401).json({ message: "unauthorized" });
    }

    const { password: a, ...userWithoutPassword } = user._doc;

    console.log(userWithoutPassword);

    res.status(200).header("Authorization", `Bearer ${token}`).json({
      user: userWithoutPassword,
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "server error", error });
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

    const user = await User.findById(_id).select("-password");

    if (!user) return;

    const token = signToken(user);
    if (!token) {
      return res.status(401).json({ message: "unauthorized" });
    }
    res
      .status(201)
      .header("Authorization", `Bearer ${token}`)
      .json({ user, token });
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
