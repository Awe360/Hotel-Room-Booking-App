import mongoose from "mongoose";

const hotelSchema = new mongoose.Schema(
  {
    hotelId: {
        type: String,
        required: true,
        unique: true,
      },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    contact: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    numberOfReviews: {
      type: Number,
      default: 0,
      min: 0,
    },
    images: [
      {
        type: String, // Array of image URLs
      },
    ],
    amenities: [
      {
        type: String, // Array of hotel amenities
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);


export const Hotel = mongoose.model('Hotel', hotelSchema);
