import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required."],
  },
  category: {
    type: String,
    required: [true, "Category is required."],
  },
  createdDate: {
    type: Date,
    required: [true, "Created Date is required."],
  },
  slug: {
    type: String,
    required: [true, "Slug is required."],
  },
  image: {
    type: String,
    required: [true, "Image is required."],
  },
  description: {
    type: String,
    required: [true, "Description is required"],
  },
  creator: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

const Blogs = mongoose.models.Blogs || mongoose.model("Blogs", blogSchema);

export default Blogs;
