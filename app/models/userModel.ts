import mongoose, { Model } from "mongoose";

// export interface UserDocument extends mongoose.Document {
//   username: string;
//   email: string;
//   password: string;
// }

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide username"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Please provide email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
  },
});

// export const User: Model<UserDocument> =
  const User = mongoose.models.Users || mongoose.model("Users", userSchema);

  export default User
