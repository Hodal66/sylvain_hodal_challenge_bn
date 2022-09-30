import { Country } from "../models/Country";
import { Image } from "../models/Image";

export const imageResolver: any = {
  Mutation: {
    async addImage(parent: any, args: any, context: any) {
      const { userId } = context;
      if (!userId) {
        throw new Error(
          "You are not logged in!, Please login to add your photo to this country"
        );
      }
      const {
        author,
        // date_posted,
        image_url,
        image_cloudinary_id,
        country_id,
      } = args;
      const image = await Image.create({
        author,
        // date_posted,
        image_url,
        image_cloudinary_id,
      });
      const country = await Country.findByIdAndUpdate(
        country_id,
        { $push: { images: image._id } },
        { new: true, useFindAndModify: false }
      );
      // console.log(country);
      return image;
    },

    async deleteImage(parent: any, args: any, context: any) {
      // console.log(context);
      const { userId } = context;
      if (!userId) {
        throw new Error(
          "You are not logged in!, Please login to delete a photo to this country"
        );
      }
      const { imageId } = args;
      const deleteData = await Image.deleteOne({_id:imageId});
      if (deleteData) {
        return true;
      }
      return false;
    },
  },
};
