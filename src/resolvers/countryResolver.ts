import { Country } from "../models/Country";

export const countryResolver: any = {
  Query: {
    async getAllCountries(parent: any, args: any, context: any) {
      // const { input } = args;
      const { page, itemsPerPage, All, selection, filterData } = args;
      let pages;
      let items;

      if (page) {
        pages = page;
      } else {
        pages = 1;
      }
      if (All) {
        const totalItems = await Country.countDocuments({});
        items = totalItems;
      } else {
        if (itemsPerPage) {
          items = itemsPerPage;
        } else {
          items = 3;
        }
      }
      const itemsToSkip = (pages - 1) * items;
        console.log(selection, typeof selection)
      if (selection !== null && selection !== undefined) {
        const countries = await Country.find({
          "name": { $regex: filterData, $options: "i" }
        })
          .populate({
            path: "comments images",
            populate: {
              path: "author",
            },
          })
          .skip(itemsToSkip)
          .limit(items);
           return countries;
      } 

        const countries = await Country.find({})
          .populate({
            path: "comments images",
            populate: {
              path: "author",
            },
          })
          .skip(itemsToSkip)
          .limit(items);

      return countries

     
    },
    async getOneCountry(parent: any, args: any, context: any) {
      const { id } = args;
      const country = await Country.findById(id).populate({
        path: "comments images",
        populate: {
          path: "author",
        },
      });
      return country;
    },
  },

  Mutation: {
    async createCountry(parent: any, args: any, context: any) {
      const { input } = args;
      const country = await Country.create(input);
      return country;
    },
  },
};
