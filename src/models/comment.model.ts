import { model } from "mongoose";
import { ICommentDocument } from "src/interfaces/comment";
import { CommentSchema } from "./comment.schema";

export const Comment = model<ICommentDocument>("Comment", CommentSchema);
