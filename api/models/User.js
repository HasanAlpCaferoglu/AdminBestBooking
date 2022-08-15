import mongoose from "mongoose"; 

// user schema

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    country: {
      type: String,
      //required: true,
    },
    img: {
      type: String,
    },
    city: {
      type: String,
      //required: true,
    },
    phone: {
      type: String,
      //required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false, // by default featured will be false
    },
  },
  { timestamps: true } // it's gonna give created add and updated at times
);

export default mongoose.model("User", UserSchema);
// model name will be User --> firt argument
// to create this model UserScheme is used --> second argument 
