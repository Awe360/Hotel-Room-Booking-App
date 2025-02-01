import express from 'express';
import { Hotel } from '../models/hotels.js';  

const router = express.Router();
router.post("/hotel/add", async (req, res) => {
  try {
    const {
      hotelId,
      name,
      location,
      description,
      contact,
      rating,
      numberOfReviews,
      images,
      amenities,
    } = req.body;

    const newHotel = new Hotel({
      hotelId,
      name,
      location,
      description,
      contact,
      rating,
      numberOfReviews,
      images,
      amenities,
    });

    const savedHotel = await newHotel.save();
    res.status(201).json({ message: "Hotel added successfully!", hotel: savedHotel });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to add hotel", error });
  }
});
router.delete('/deleteHotel', async (req, res) => {
    const { id } = req.body;

    try {
        const hotel = await Hotel.findByIdAndDelete(id);
        if (!hotel) {
            return res.status(404).json({ message: 'Hotel not found' });
        }
        return res.status(200).json({ message: 'Hotel deleted successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
});
router.get("/hotels", async (req, res) => {
    try {
      const hotels = await Hotel.find({});
      res.status(200).json(hotels);
    } catch (error) {
      res.status(500).json({ message: "Error fetching hotels", error });
    }
  });
  
  router.put('/updateHotel', async (req, res) => {
      const { _id, name, location, description, contact } = req.body;
  
      try {
          const updatedHotel = await Hotel.findByIdAndUpdate(
              _id,
              { name, location, description, contact },
              { new: true }
          );
          
          if (!updatedHotel) {
              return res.status(404).json({ message: 'Hotel not found' });
          }
          
          res.status(200).json(updatedHotel);
      } catch (error) {
          console.error(error);
          res.status(500).json({ message: 'Server error' });
      }
  });
  
router.get("/hotels/:hotelId", async (req, res) => {
    const {hotelId} =req.params;
    try {
      const hotels = await Hotel.find({hotelId});
      res.status(200).json(hotels);
    } catch (error) {
      res.status(500).json({ message: "Error fetching hotels", error });
    }
  });
  

export default router;
