import mongoose from "mongoose";

const mailSchema = new mongoose.Schema({
  trackerId: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  email: {
    type: String,
    required: true,
  },
  opens: {
    type: Number,
    default: 0,
  },
  userIps: {
    type: [String],
    default: [],
  },
});

const mailModel = mongoose.model("Mail", mailSchema);
export default mailModel;
