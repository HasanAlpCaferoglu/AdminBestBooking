import User from "../models/User.js"; //import User model

export const createUser = async (req, res, next) => {
  /* the reason of doing this async is that connection to db,
    trying to create new collection and new document inside will take some time.*/

  const newUser = new User(req.body); // this is our model, takes body of the request

  try {
    const savedUser = await newUser.save(); //try to save the document
    res.status(200).json(savedUser);
  } catch (err) {
    next(err);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    //we find document and we update it with using set method in mongodb.
    //third argument which is option {new: true} set the updatedUser variable with the new one. without it updatedUser variable will be the old document but you would see the new one in mongodb
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true } // allow us to return modified document
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted!");
  } catch (err) {
    next(err);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

 