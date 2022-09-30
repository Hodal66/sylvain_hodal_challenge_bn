import { Comment } from "../models/Comment";
import { Country } from "../models/Country";



export const commentResolver: any = {

  Mutation: {
    async addComment(parent: any, args: any, context: any) {
      const {   author,
      date_posted,
      content,
      country_id } = args;
      const input = {
        author,
        date_posted,
        content
      }
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


      return comment;
    },
  },
};
