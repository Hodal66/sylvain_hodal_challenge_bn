import { Comment } from "../models/Comment";
import { Country } from "../models/Country";

export const commentResolver: any = {
  Mutation: {
    async addComment(parent: any, args: any, context: any) {
      const { author, content, country_id } = args;
      const input = {
        author,
        content,
      };
      const { userId } = context;
      if (!userId) {
        throw new Error(
          "You are not logged in!, Please login to add your funfact to this country"
        );
      }
      const comment = await Comment.create(input);
      const country = await Country.findByIdAndUpdate(
        country_id,
        { $push: { comments: comment._id } },
        { new: true, useFindAndModify: false }
      );
      // const date_readable = comment.date_posted.toString();
      // const date_arr = date_readable.split("GMT");
      // const date = date_arr[0];
      // console.log(comment.createdAt)
      return {
        author: comment.author,
        date_posted: comment.date_posted,
        content: comment.content,
        _id: comment._id,
      };
    },
    async updateComment(parent: any, args: any, context: any) {
      const { content, comment_id } = args;
      const input = {
        content,
      };

      const { userId } = context;
      if (!userId) {
        throw new Error(
          "You are not logged in!, Please login to update photo to this country"
        );
      }
      const updatedData = await Comment.findByIdAndUpdate(comment_id, input, {
        new: true,
      });
      return updatedData;
    },
    async deleteComment(parent: any, args: any, context: any) {
      // console.log(context);
      const { userId } = context;
      if (!userId) {
        throw new Error(
          "You are not logged in!, Please login to delete a photo to this country"
        );
      }
      const { comment_id } = args;
      const deleteData = await Comment.deleteOne({ _id: comment_id });
      if (deleteData) {
        return true;
      }
      return false;
    },
  },
};
