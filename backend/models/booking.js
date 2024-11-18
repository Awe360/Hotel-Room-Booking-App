import { mongoose } from "mongoose";
const bookingSchema=mongoose.Schema({
    room:{
        type:String,
        required:true
    },userName:{
      type:String,
      required:true
    },
    roomId:{
        type:String,
        required:true
    },
    userId:{
        type:String,
        required:true
    },
    location:{type:String},
    branch:{type:String},
    fromDate:{
      type:String,
      required:true
    },
    toDate:{
        type:String,
        required:true
      },
      totalDays:{
        type:Number,
        required:true
      },
      amount:{
        type:Number,
        required:true
      },
      transactionId:{
        type:String,
        required:true
      },
      status:{
        type:String,
        required:true,
        default:'Booked'
      }
      
},{timestamps:true})
export const Booking = mongoose.model('Booking', bookingSchema);