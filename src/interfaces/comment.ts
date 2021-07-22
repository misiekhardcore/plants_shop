import { Document, Model } from "mongoose";

export interface IComment {
  username: string;
  text: string;
}

export interface ICommentDocument extends IComment, Document {}

export interface ICommentModel extends Model<ICommentDocument> {}
