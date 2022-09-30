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
      const { input, country_id } = args;
      const image = await Image.create(input);
      console.log(image);
      const country = await Country.findByIdAndUpdate(
        country_id,
        { $push: { images: image._id } },
        { new: true, useFindAndModify: false }
      );
      console.log(country);
      return image;
    },

    async updateImage(parent: any, args: any, context: any) {
      const { userId } = context;
      if (!userId) {
        throw new Error(
          "You are not logged in!, Please login to update photo to this country"
        );
      }
      const { input, imageId } = args;
      const updatedData = await Image.findByIdAndUpdate(imageId, input, {
        new: true,
      });
      return updatedData;
    },

    async deleteImage(parent: any, args: any, context: any) {
      const { userId } = context;
      if (!userId) {
        throw new Error(
          "You are not logged in!, Please login to delete a photo to this country"
        );
      }
      const { imageId } = args;
      const deleteData = await Image.findByIdAndUpdate(imageId);
      if (deleteData) {
        return true
      }
      return false;
    },
  },
};
