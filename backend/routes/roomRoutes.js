import express from 'express';
import { Room } from '../models/room.js';  

const router = express.Router();

router.post('/all', async (req, res) => {
    try {
        const room = await Room.create(req.body);
        res.send(room);
        console.log('Success');
    } catch (err) {
        res.json(err);
        console.log(err);
    }
});

router.get('/all', async (req, res) => {
    try {
        const room = await Room.find({});
        res.send(room);
        console.log('Success');
    } catch (err) {
        res.json(err);
        console.log(err);
    }
});

router.post('/newRoom', async (req, res) => {
    try {
        const createdRoom = await Room.create(req.body);
        await createdRoom.save();
        res.send(req.body);
    } catch (error) {
        res.status(404).send(error);
    }
});

router.delete('/deleteRoom', async (req, res) => {
    const { id } = req.body;

    try {
        const room = await Room.findByIdAndDelete(id);
        if (!room) {
            return res.status(404).json({ message: 'Room not found' });
        }
        return res.status(200).json({ message: 'Room deleted successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
});
router.get('/matchingRoom/:hotelId', async (req, res) => {
    const{hotelId}=req.params;
    console.log(hotelId);
    try {
        const room = await Room.find({hotelId});
        res.send(room);
        console.log('Success');
    } catch (err) {
        res.json(err);
        console.log(err);
    }
});

router.get('/getroombyid/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const val = await Room.findById(id);
        res.status(200).json(val);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

router.get('/allRooms', async (req, res) => {
    try {
        const total = await Room.find({});
        res.send(total);
    } catch (error) {
        console.log(error);
    }
});

// Route to update room details
router.put('/updateRoom', async (req, res) => {
    const { _id, name, type, rentperday, maxcount, phonenumber } = req.body;

    try {
        const updatedRoom = await Room.findByIdAndUpdate(
            _id,
            { name, type, rentperday, maxcount, phonenumber },
            { new: true }
        );
        
        if (!updatedRoom) {
            return res.status(404).json({ message: 'Room not found' });
        }
        
        res.status(200).json(updatedRoom);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;
