import mongoose, { model, Schema } from "mongoose";

const countrySchema = new Schema({
    code: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    native: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    currency: {
        type: String,
        // required: false,
        default:null
    },
    emoji: {
        type: String,
        required: true,
    },
    emojiU: {
        type: String,
        required: true,
    },
    continent: {
        name: String,
        code: String,
    },
    languages: [{
        code: String,
        native: String,
        name: String,
        rtl: Boolean
    }],
    states: [{
        code: String,
        name: String,
    }],
    
    images: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Image",
    }],

    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
    }],
});

const Country = model("Country", countrySchema);

export { Country };
