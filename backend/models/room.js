import { mongoose } from "mongoose";

const roomSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    hotelId: {
        type: String,
        required: true, // Must match a hotelId in the Hotel schema
      },
    maxcount: {
        type: Number,
        required: true,
    },
    phonenumber: {
        type: Number,
        required: true,
    },
    rentperday: {
        type: Number,
        required: true,
    },
    imageurls: {
        type: [], 
    },
    currentbookings: {
        type: [], 
    },
    type: {
        type: String,
        required: true,
    },
    location:{
        type:String
    },
    branch:{type:String}
    ,description:{
        type:String,
        required:true,
    },
    services:{
    type:[],
    required:true,
    }
},
 { timestamps: true }); 

export const Room = mongoose.model('Room', roomSchema);
