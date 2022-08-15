import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({
      ...req.body, // take all user info and additionally it will take hashed password below
      password: hash, // the reason we did not just past req.body is that we encode the password above
    });

    await newUser.save();
    res.status(201).send("User has been created");
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username }); // trying to find user with username
    if (!user) return next(createError(404, "User not found!")); // if there is no such user, create error object and go to error middleware

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect)
      return next(createError(400, "Wrong password or username!")); // 400 -> bad request

    // create token if passord is correct
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET_KEY
    ); // has this info. And each request we use jwt to verify our identity

    // user hashed password and the information whether user is admin or not should not be send as a response, so spread other details
    const { password, isAdmin, ...otherDetails } = user._doc; // user object is inside of _doc
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ details: {...otherDetails}, isAdmin }); // store {...otherDetails} object
  } catch (err) {
    next(err);
  }
};
