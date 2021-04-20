import { Document } from "mongoose";

export interface IComment {
  username: string;
  text: string;
}

export interface ICommentDocument extends IComment, Document {}
