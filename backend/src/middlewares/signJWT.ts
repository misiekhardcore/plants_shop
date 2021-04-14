import jwt from "jsonwebtoken";
import config from "../config";
import { IUser } from "../interfaces/user";
import loggings from "../utils/loggers";

const NAMESPACE = "auth";

export const signJWT = (
  user: IUser,
  callback: (error: Error | null, token: string | null) => void
): void => {
  const { username } = user;
  const timeSinceEpoch = new Date().getTime();
  const expirationTime =
    (timeSinceEpoch + +config.server.token.expTime) * 100000;
  const expirationTimeInSeconds = Math.floor(expirationTime / 1000);

  loggings.info(NAMESPACE, `Attempting to sign token for ${username}`);

  try {
    jwt.sign(
      {
        username,
      },
      config.server.token.secret,
      {
        algorithm: "HS256",
        issuer: config.server.token.issuer,
        expiresIn: expirationTimeInSeconds,
      },
      (error, token) => {
        if (error) {
          callback(error, null);
        } else if (token) {
          callback(null, token);
        }
      }
    );
  } catch (error) {
    loggings.error(NAMESPACE, error.message);
    callback(error, null);
  }
};
