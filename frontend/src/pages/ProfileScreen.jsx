import React, { useState, useEffect } from "react";
import { Tabs } from "antd";
import axios from 'axios';
import Loader from '../components/Loader';
import Swal from 'sweetalert2';
import image from '../assets/image.png'
import {motion} from 'framer-motion'
const { TabPane } = Tabs;
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

function ProfileScreen() {
  const [user, setUser] = useState(null); // State for user data
  const [loading, setLoading] = useState(true); // State to track loading
  const navigate=useNavigate()
  const goToAdminPage=()=>{
    navigate('/admin')
  }
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser && storedUser !== 'undefined') {
      setUser(JSON.parse(storedUser));
    } else {
      window.location.href = '/login'; // Redirect if user is not found
    }
    setLoading(false); // Stop loading once user data is fetched
  }, []);

  if (loading) {
    return <Loader />; // Show a loader while fetching the user data
  }

  if (!user) {
    return null; // Prevent rendering if no user is found (safety net)
  }
  

  return (
    <motion.div className="ml-20 min-h[350px]"
    >
      <Tabs defaultActiveKey="1">
        <TabPane tab={<span className="text-blue-600 text-xl">My Profile</span>} key="1" className=" min-h-[580px] ">
          <motion.div 
          initial={{ opacity: 0, y:50 }}
          whileInView={{ opacity: 1, y: 0 }}
           transition={{ duration: 1 }}className=" p-10 bg-orange-300 min-h-[300px] mx-10 md:mx-60 rounded-xl shadow-xl flex justify-center content-center  text-lg">
          <div className="">
          <img
                src={image}
                alt="Profile"
                className="w-40 h-40 rounded-full mb-5 mx-auto"
                
              />
              
            <p><span className="text-blue-500">Name: </span>{user.name}</p>
            <hr />
            <br />
            <p><span className="text-blue-500">UserId: </span>{user.id}</p>
            <hr />
            <br />
            <p><span className="text-blue-500">Email: </span>{user.email}</p>
            </div>
            
          </motion.div>
          <div className="flex justify-end">
            <button className="btn mt-5 p-3 mr-10">Edit Profile</button>
          </div>
        {user.role == 'admin' &&(<button className="btn flex gap-1 items-center" onClick={goToAdminPage}> <FaArrowLeft size={20} />Go Back To Admin Page</button>)}  
        </TabPane>
        {user.role !== 'admin' && (
          <TabPane tab={<span className="text-blue-600 text-xl">Bookings</span>} key="2">
            <div>
              {/* Pass the user.id as a prop to the Booking component */}
              <Booking userId={user.id} />
            </div>
          </TabPane>
        )}
        {user.role !== 'admin' &&( <TabPane tab={<span className="text-blue-600 text-xl">Archived</span>} key="3">
            <div>
              {/* Pass the user.id as a prop to the Booking component */}
              <Archived userId={user.id} />
            </div>
          </TabPane>)}
       
      </Tabs>
      
    </motion.div>
  );
}

export default ProfileScreen;

export function Booking({ userId }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [bookData, setBookData] = useState([]);


  useEffect(() => {
    const fetchBookingData = async () => {
      try {
        setLoading(true);
        // Use the userId prop to fetch the booking data
        const res = await axios.post('http://localhost:5000/api/routes/getBookById', { userId });
        const normalizedData = Array.isArray(res.data) ? res.data : [res.data];
        const bData = normalizedData.filter((item) => {
          if (item.status === 'Booked') {
            const [day, month, year] = item.toDate.split('-');
            const toDateObj = new Date(`${year}-${month}-${day}`); 
            return toDateObj >= Date.now();
          }
          return false;
        });
    
        
        setBookData(bData);
        // console.log(normalizedData);
      } catch (error) {
        console.log(error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchBookingData(); // Only fetch the data if the userId is available
    }
  }, [userId]);

  const cancelBooking = async (bookId, roomId) => {
    try {
      setLoading(true);
      const res = await axios.post('http://localhost:5000/api/routes/cancelBooking', { bookId, roomId });
      console.log(res);
      setLoading(false);
      Swal.fire({
        title: "Congratulations!",
        text: "Your booked room was cancelled successfully",
        icon: "success"
      }).then(res => { window.location.href = '/profile' });

    } catch (error) {
      setError(true);
      console.log(error);
      setLoading(false);
      Swal.fire({
        title: "Sorry",
        text: "Something went wrong, please try again!",
        icon: "error"
      });
    }
  }

  if (loading) {
    return <h1><Loader /></h1>;
  }

  if (error) {
    return <h1 className='bg-red-400 h-16 m-10 text-2xl content-center text-center'>Something went wrong, please try again</h1>;
  }

  return (
    
    <motion.div 
    className=" ">
                  <div className="flex justify-center">
                    <div className="">
                  
      {bookData.length === 0 ? (
              <tr>
                <td colSpan="9" className="text-center py-6 text-xl">No Upcoming Bookings</td>
              </tr>
            ):bookData.map((val, index) => (
        <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
         transition={{ duration: 1 }}
        key={index} className="bg-rose-200 p-10 w-[350px] min-h-[300px] rounded-xl shadow-xl content-center text-lg mb-5 relative md:text-xl md:w-[500px]">
          <h1>{val.room}</h1>
          <h1>Room ID: {val.roomId}</h1>
          <h1>Start Date: {val.fromDate}</h1>
          <h1>End Date: {val.toDate}</h1>
          <h1>Amount: {val.amount}</h1>
          <h1>Location: {val.location}</h1>
          <h1>Branch Name: {val.branch}</h1>
          {val.status === 'Cancelled' ? <h1>Status: <span className="text-red-500">{val.status}</span></h1> :
            <h1>Status: <span className="text-green-500">{val.status}</span></h1>}

          {val.status === 'Booked' && <button className="btn absolute right-8" onClick={() => cancelBooking(val._id, val.roomId)}>Cancel Booking</button>}
          <br />
        </motion.div>
      ))}
      </div>
      </div>
    </motion.div>
  );
}

export function Archived({ userId }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [archivedData, setArchivedData] = useState([]);

  useEffect(() => {
    const fetchBookingData = async () => {
      try {
        setLoading(true);

        // Fetch booking data by userId
        const res = await axios.post('http://localhost:5000/api/routes/getBookById', { userId });
        const normalizedData = Array.isArray(res.data) ? res.data : [res.data];

        const archived = normalizedData.filter((item) => {
          if (item.status === 'Cancelled') return true;
          const [day, month, year] = item.toDate.split('-');
          const toDateObj = new Date(`${year}-${month}-${day}`);
          return toDateObj < Date.now();
        });

        await updateExpiredBookings(archived);

        setArchivedData(archived);
      } catch (error) {
        console.error(error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    const updateExpiredBookings = async (bookings) => {
      for (const booking of bookings) {
        const [day, month, year] = booking.toDate.split('-');
        const toDateObj = new Date(`${year}-${month}-${day}`);

        if (booking.status === 'Booked' && toDateObj < Date.now()) {
          try {
            await axios.post('http://localhost:5000/api/routes/updateBookingStatus', {
              bookingId: booking._id,
              newStatus: 'Expired',
            });
            booking.status = 'Expired'; // Update status locally for UI
          } catch (error) {
            console.error(`Failed to update booking ${booking._id} status`, error);
          }
        }
      }
    };

    if (userId) {
      fetchBookingData(); // Only fetch data if `userId` is available
    }
  }, [userId]);

  const cancelBooking = async (bookingId, roomId) => {
    try {
      await axios.post('http://localhost:5000/api/routes/cancelBooking', { bookingId, roomId });
      setArchivedData((prevData) =>
        prevData.map((item) => (item._id === bookingId ? { ...item, status: 'Cancelled' } : item))
      );
    } catch (error) {
      console.error('Failed to cancel booking', error);
      setError(true);
    }
  };

  if (loading) {
    return <h1><Loader /></h1>;
  }

  if (error) {
    return <h1 className='bg-red-400 h-16 m-10 text-2xl content-center text-center'>Something went wrong, please try again</h1>;
  }

  return (
    <motion.div className="flex justify-center">
      <div className="">
        {archivedData.length === 0 ? (
              <tr>
                <td colSpan="9" className="text-center py-6 text-xl">No archived available</td>
              </tr>
            ):archivedData.map((val, index) => (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            key={index}
            className="bg-rose-200 p-10 w-[350px] min-h-[300px] rounded-xl shadow-xl content-center text-lg mb-5 relative md:text-xl md:w-[500px]"
          >
            <h1>{val.room}</h1>
            <h1>Room ID: {val.roomId}</h1>
            <h1>Start Date: {val.fromDate}</h1>
            <h1>End Date: {val.toDate}</h1>
            <h1>Amount: {val.amount}</h1>
            {val.status === 'Cancelled' ? (
              <h1>Status: <span className="text-red-500">{val.status}</span></h1>
            ) : (
              <h1>Status: <span className="text-green-500">{val.status}</span></h1>
            )}

            {val.status === 'Booked' && (
              <button
                className="btn absolute right-8"
                onClick={() => cancelBooking(val._id, val.roomId)}
              >
                Cancel Booking
              </button>
            )}
            <br />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}