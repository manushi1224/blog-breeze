import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide username"],
  },
  email: {
    type: String,
    required: [true, "Please provide email"],
    unique: true,
  },
  password: {
    type: String,
  },
});

const User = mongoose.models.Users || mongoose.model("Users", userSchema);

export default User;
