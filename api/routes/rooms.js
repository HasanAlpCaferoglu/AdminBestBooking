import express from "express";
import {
  createRoom,
  deleteRoom,
  getRoom,
  getRooms,
  updateRoom,
  updateRoomAvailability,
} from "../controllers/roomController.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

// CREATE
router.post("/:hotelid/", verifyAdmin, createRoom); // only admin can create room

// UPDATE
router.put("/:id", verifyAdmin, updateRoom); // only admin can update room
router.put("/availability/:id", updateRoomAvailability); // only admin can update room

// DELETE
router.delete("/:id/", verifyAdmin, deleteRoom); // only admin can delete room
 // note that every room specific to hotel. But it might be such that there are fixed rooms and these rooms can be used for the hotels. If this is the case;
 // then delete route must be "/:id/:hotelid". In this project, since all rooms must be created even if a room is common in other hotels, route "/:id/" is enough for deleting room

//GET
router.get("/:id", getRoom);

//GET ALL
router.get("/", getRooms);

export default router;
