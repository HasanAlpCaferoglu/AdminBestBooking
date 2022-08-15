import mongoose from "mongoose";

// hotel schema

const HotelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    distance: { // distance to city center
        type: String,
        required: true
    },
    photos: {
        type: [String], // we will have array for the images, and each item in the array will be string
    },
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        min:0,
        max:5
    },
    rooms: {
        type: [String], // this gonna includes room ids
    },
    cheapestPrice: {
        type: Number,
        required: true
    },
    featured: {
        type: Boolean,
        default: false, // by default featured will be false
    },
});

export default mongoose.model("Hotel", HotelSchema);
// model name will be Hotel --> firt argument
// to create this model HotelScheme is used --> second argument