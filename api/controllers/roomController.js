import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";
import { createError } from "../utils/error.js";

// Note that Room model represents what type room this room is. A document also includes room numbers which include this Room qualities
// Need to know the hotel id because after room document is created/deleted, then the hotel that includes this room must be updated.
// Note that no need to update Hotel model because it includes different type of room's ids not the room door numbers

export const createRoom = async (req, res, next) => {
  // recall in our Room model, we have rooms and it includes a room id like a parent and child
  // after creating new room, we should add this created room's id into the rooms array in the Room model

  const hotelId = req.params.hotelid; 
  const newRoom = new Room(req.body);

  try {
    // try to save the room
    const savedRoom = await newRoom.save();

    // use new try catch for updating Hotel
    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $push: { rooms: savedRoom._id },
      });
      // mongodb push method allow us to push any item in any arary
    } catch (err) {
      next(err);
    }
    res.status(200).json(savedRoom);
  } catch (err) {
    next(err);
  }
};

export const updateRoom = async (req, res, next) => {
  try {
    //we find document and we update it with using set method in mongodb.
    //third argument which is option {new: true} set the updatedRoom variable with the new one. without it updatedRoom variable will be the old document but you would see the new one in mongodb
    const updatedRoom = await Room.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true } //  updatedRoom is set modified document
    );
    res.status(200).json(updatedRoom);
  } catch (err) {
    next(err);
  }
  // Note that no need to update Hotel model because it includes different type of room's ids not the room door numbers
};

export const updateRoomAvailability = async (req, res, next) => {
  try {
    await Room.updateOne({"roomNumbers._id": req.params.id}, {
      $push: {
        "roomNumbers.$.unavailableDates": req.body.dates
      },
    });
    res.status(200).json("Room status has been updated.");
  } catch (err) {
    next(err);
  }
};

export const deleteRoom = async (req, res, next) => {
  const hotelId = req.params.hotelid;
  try {
    await Room.findByIdAndDelete(req.params.id);
    // use new try catch for updating Hotel
    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $pull: { rooms: req.params.id }, // deleting the spesific room from the rooms in the Hotel model
      });
      // mongodb push method allow us to push any item in any arary
    } catch (err) {
      next(err);
    }
    res.status(200).json("Room has been deleted!");
  } catch (err) {
    next(err);
  }
};

export const getRoom = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id);
    res.status(200).json(room);
  } catch (err) {
    next(err);
  }
};

export const getRooms = async (req, res, next) => {
  try {
    const rooms = await Room.find();
    res.status(200).json(rooms);
  } catch (err) {
    next(err);
  }
};
