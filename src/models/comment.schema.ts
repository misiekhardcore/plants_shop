import { Schema } from "mongoose";
import { ICommentDocument } from "src/interfaces/comment";

export const CommentSchema = new Schema<ICommentDocument>(
  {
    username: { type: String, required: true },
    text: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);
