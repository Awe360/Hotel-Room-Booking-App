import express from 'express';
import {Booking} from '../models/booking.js';
import {Room}from '../models/room.js';
import Stripe from 'stripe';
import { v4 as uuidv4 } from 'uuid';
import dotenv from 'dotenv';
const router = express.Router();
dotenv.config();
const stripe = new Stripe(process.env.STRIPE_API_KEY);
router.post('/getBookById', async (req, res) => {
    try { const { userId } = req.body;
        const ans = await Booking.find({ userId });
        // const final=ans.filter((item)=>(item.status==='Booked'))
     
       res.send(ans)
       
       
       
    } catch (error) {
        res.send(error);
    }
});
router.post('/cancelBooking', async (req, res) => {
    try {
        const { bookId, roomId } = req.body;
        const canceledBooking = await Booking.findOne({ _id: bookId });
        canceledBooking.status = 'Cancelled';
        await canceledBooking.save();
        res.send(canceledBooking);
        const roomItems = await Room.findOne({ _id: roomId });
        const availableRoom = roomItems.currentbookings.filter(item => item.bookingId.toString() !== bookId);
        roomItems.currentbookings = availableRoom;
        await roomItems.save();
    } catch (err) {
        console.log(err);
    }
});
router.get('/allBookings', async (req, res) => {
    try {
        const total = await Booking.find({});
        res.send(total);
    } catch (error) {
        console.log(error);
    }
});
// In your Express app routes
router.post('/updateBookingStatus', async (req, res) => {
    const { bookingId, newStatus } = req.body;
    
    try {
      const booking = await Booking.findByIdAndUpdate(bookingId, { status: newStatus });
      if (booking) {
        res.status(200).json({ message: 'Booking status updated successfully' });
      } else {
        res.status(404).json({ message: 'Booking not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Failed to update booking status', error });
    }
  });
  
router.post('/bookroom', async (req, res) => {
    try {
        const {
            room, 
            userId, 
            userName,
            fromDate, 
            toDate, 
            totalDays, 
            amount,
            token
        } = req.body;

        const customer = await stripe.customers.create({
            email: token.email,
            source: token.id,
        });

        const payment = await stripe.charges.create({
            amount: amount * 100,
            customer: customer.id,
            currency: 'usd',
            receipt_email: token.email,
            description: `Booking charge for ${room.name}`
        }, {
            idempotencyKey: uuidv4()
        });

        if (payment) {
            const booked = await Booking.create({
                room: room.name,
                roomId: room._id,
                location:room.location,
                branch:room.branch,
                userId,
                userName,
                fromDate,
                toDate,
                totalDays,
                amount,
                transactionId: payment.id
            });

            const roomTarget = await Room.findOne({ _id: room._id });
            roomTarget.currentbookings.push({
                userName,
                userId,
                bookingId: booked._id,
                startDate: fromDate,
                endDate: toDate,
                location:room.location,
                branch:room.branch,
                status: booked.status
            });

            await roomTarget.save();

            res.send(`Room ${room.name} booked successfully!`);
        } else {
            res.status(400).send('Payment failed. Please try again.');
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Error booking room');
    }
});

export default router;
