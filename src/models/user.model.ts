import { model } from "mongoose";
import { IUserDocument } from "src/interfaces/user";
import { UserSchema } from "./user.schema";

export const User = model<IUserDocument>("User", UserSchema);
