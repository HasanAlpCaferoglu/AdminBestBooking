import Hotel from "../models/Hotel.js"; //import hotel model
import Room from "../models/Room.js";

export const createHotel = async (req, res, next) => {
  /* the reason of doing this async is that connection to db,
    trying to create new collection and new document inside will take some time.*/

  const newHotel = new Hotel(req.body); // this is our model, takes body of the request

  try {
    const savedHotel = await newHotel.save(); //try to save the document
    res.status(200).json(savedHotel);
  } catch (err) {
    next(err);
  }
};

export const updateHotel = async (req, res, next) => {
  try {
    //we find document and we update it with using set method in mongodb.
    //third argument which is option {new: true} set the updatedHotel variable with the new one. without it updatedHotel variable will be the old document but you would see the new one in mongodb
    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedHotel);
  } catch (err) {
    next(err);
  }
};

export const deleteHotel = async (req, res, next) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json("Hotel has been deleted!");
  } catch (err) {
    next(err);
  }
};

export const getHotel = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    res.status(200).json(hotel);
  } catch (err) {
    next(err);
  }
};

export const getHotels = async (req, res, next) => {
  const { min, max, ...others } = req.query;
  try {
    const hotels = await Hotel.find({
      ...others,
      cheapestPrice: { $gt: min || 0, $lt: max || 9999 },
    }).limit(req.query.limit);
    res.status(200).json(hotels);
  } catch (err) {
    next(err);
  }
};

export const countByCity = async (req, res, next) => {
  // we need query
  // the endpoint will be like domain/api/hotels/countByCity?cities=berlin,madrid,london
  const cities = req.query.cities.split(","); // cities will be an array
  try {
    const list = await Promise.all(
      cities.map((city) => {
        // return Hotel.find({city:city}).length // this is an expensive solution because it is going to fetch all those data their properties and after that it will find its length
        return Hotel.countDocuments({ city: city }); // instead we use mongoose countDocument method. It just shows its count and it makes it much faster
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};

export const countByType = async (req, res, next) => {
  // here we can create a types array like in countByCity (taking types inside our query),
  // But we do not have lots of types although we have lots of cities. We have only 5 items
  // Basically all these types can be fetch one by one

  try {
    const hotelCount = await Hotel.countDocuments({ type: "hotel" });
    const apartmentCount = await Hotel.countDocuments({ type: "apartment" });
    const resortCount = await Hotel.countDocuments({ type: "resort" });
    const villaCount = await Hotel.countDocuments({ type: "villa" });
    const cabinCount = await Hotel.countDocuments({ type: "cabin" });

    res.status(200).json([
      { type: "hotels", count: hotelCount },
      { type: "apartments", count: apartmentCount },
      { type: "resorts", count: resortCount },
      { type: "villas", count: villaCount },
      { type: "cabins", count: cabinCount },
    ]);
  } catch (err) {
    next(err);
  }
};

export const getHotelRooms = async (req, res, nexy) => {
  try {
    const hotel = await Hotel.findById(req.params.id)
    const list = await Promise.all(hotel.rooms.map(room => {
      return Room.findById(room)
    }));
    res.status(200).json(list)
  } catch (err) {
    next(err);
  }
}
