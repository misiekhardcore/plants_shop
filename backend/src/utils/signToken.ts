import jwt from "jsonwebtoken";
import config from "../config";
import { IUserDocument } from "../interfaces/user";

export const signToken = (user: IUserDocument): string => {
  const { _id } = user;

  return jwt.sign({ _id }, config.server.token.secret, {
    issuer: config.server.token.issuer,
    expiresIn: config.server.token.expTime,
  });
};
