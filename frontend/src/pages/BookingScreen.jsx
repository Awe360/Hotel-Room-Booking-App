import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { FaWifi, FaSnowflake, FaBellConcierge } from "react-icons/fa6";
import { LuParkingSquare } from "react-icons/lu";
import { FaSwimmingPool } from "react-icons/fa";
import Loader from '../components/Loader';
import moment from 'moment';
import { DatePicker, Space } from 'antd';
import StripeCheckout from 'react-stripe-checkout';
import Swal from 'sweetalert2';
import { motion } from 'framer-motion';
const { RangePicker } = DatePicker;
function BookingScreen() {
  const { roomid, fromDate, toDate } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [room, setRoom] = useState(null);
  const [amount, setAmount] = useState(0);
  const [totalDays, setTotalDays] = useState(0);
const onToken=(token)=>{console.log(token);
  const info={
    room,
    userName:JSON.parse(localStorage.getItem('user')).name,
    userId:JSON.parse(localStorage.getItem('user')).id,
    fromDate,
    toDate,
    totalDays,
    amount,
    token

  }
  setLoading(true)
  axios.post('http://localhost:5000/api/routes/bookroom',info)
  .then(res=>{console.log(res.data);
    setLoading(false)
    Swal.fire({
      title: "Congratulations!",
      text: "Your room booked successfully",
      icon: "success"
    }).then(res=>{window.location.reload;
      window.location.href='/profile'});
  })
  .catch(err=>{console.log(err);
    Swal.fire({
      title: "Sorry!",
      text: "Please try again",
      icon: "error"
    });
  })
}
  useEffect(() => {
    const fetchRoomData = async () => {
      try {
        const val = await axios.get(`http://localhost:5000/api/routes/getroombyid/${roomid}`);
        const result = val.data;
        setRoom(result);
        setLoading(false);

        const from = moment(fromDate, 'DD-MM-YYYY');
        const to = moment(toDate, 'DD-MM-YYYY');

        const days = to.diff(from, 'days')+1;
        setTotalDays(days);

        setAmount(days * result.rentperday);

      } catch (error) {
        console.error(error);
        setError(true);
        setLoading(false);
      }
    };
    fetchRoomData();
  }, [roomid, fromDate, toDate]);

  if (loading) {
    return <h1><Loader /></h1>;
  }

  if (error) {
    return <h1 className='bg-red-400 h-16 m-10 text-2xl content-center text-center'>Something went wrong, please try again</h1>;
  }

  return (
    <motion.section
    initial={{ opacity: 0, y: 20, rotate: 0 }}
    whileInView={{ opacity: 1, y: 0, rotate: 360 }}
    transition={{ duration: 1 }}>
    <div className="min-w-[400px]  min-h-[400px] md:h-[550px] flex items-center gap-[100px]">
      <div className="ml-8 bg-blue-400  w-[75%] h-[75%] flex rounded-xl overflow-hidden shadow-lg shadow-black hover:cursor-pointer duration-300">
        <div className="">
          <h2 className='text-center my-3 font-bold text-xl'>{room.name}</h2>
          <h2>{<img src={room.imageurls[1]} alt="" className='w-80 h-[300px] ml-1' />}</h2>
        </div>
        <div className="ml-[30%] text-center">
          <h1 className='font-bold text-xl mt-3'>Booking Details</h1>
          <hr style={{ border: '1px solid black', margin: '10px 0' }} />
          <p>Name : {room.name}</p>
          <p>Start Date : {fromDate}</p>
          <p>End Date : {toDate}</p>
          <p>Maximum Capacity : {room.maxcount}</p>
          <p>Location : {room.location}</p>
          <p>Branch Name : {room.branch}</p>
          <h1 className='font-bold text-xl'>Amount</h1>
          <hr style={{ border: '1px solid black', margin: '10px 0' }} />
          <p>Total Day/s : {totalDays}</p>
          <p>Rent per day : {room.rentperday}</p>
          <h2>Total Amount : {amount}</h2>

          
          <StripeCheckout
          amount={amount*100}
        token={onToken}
        stripeKey="pk_test_51Ps4pzC0ikSiOrIzEf2rkAZvWlQNEan1dCKSJCeUUfnRdV78HUsEWaiGFgRTj1IcDrj9yXMHn1BdSw3XqICf5j6P00JyQFw3KB">
          <button className='btn mt-5 px-5 py-3'>Pay Now</button>
        </StripeCheckout>
     
        </div>
      </div>
    </div>
    </motion.section>
  );
}

export default BookingScreen;
