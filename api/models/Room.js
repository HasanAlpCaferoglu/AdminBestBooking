import mongoose from 'mongoose';

// room schema

const RoomSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    maxPeople: {
        type: Number,
        required: true,
    },
    desc: {
        type: String,
        required: true
    },
    roomNumbers: [{number:Number, unavailableDates:{type: [Date]} }], // we would have more than one room like that 
}, {timestamps: true});

export default mongoose.model("Room", RoomSchema);
// model name will be Room --> firt argument
// to create this model RoomScheme is used --> second argument