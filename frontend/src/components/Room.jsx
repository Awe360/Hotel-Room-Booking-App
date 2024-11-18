import React, { useState } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import './Room.css'
import { FaLocationDot } from "react-icons/fa6";
import {motion} from 'framer-motion'
import { FaCheck } from "react-icons/fa";
import { useNavigate } from 'react-router-dom'; 
function Room({ room, fromDate, toDate }) {
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();  
  const isLoggedIn = () => {
    const storedUser = localStorage.getItem("user");
    if (storedUser && storedUser !== "undefined") {
      const user = JSON.parse(storedUser);
      return user; // Return the parsed user object
    }
    return null; // If no user is found
  };
  
  const handleBookNow = () => {
    const user = isLoggedIn();
    
    if (user) {
      // Check if the user's role is 'admin' and redirect them to the admin page
      if (user.role === 'admin') {
        navigate('/admin');
      } else {
        // Redirect regular users to the room booking page
        navigate(`/getroombyid/${room._id}/${fromDate}/${toDate}`);
      }
    } else {
      // Redirect to the login page if the user is not logged in
      navigate('/login');
    }
  };
  
  const handleViewDetailsClick = () => {
    setShowPopup(true);
  };
  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className='flex justify-center'>
      <div className="mt-5 w-[75%] flex bg-blue-400 rounded-xl overflow-hidden shadow-lg shadow-black hover:cursor-pointer hover:scale-105 duration-300">
        <img src={room.imageurls[0]} className='w-2/5 h-60' alt={room.name} />
        <div className="ml-5 text-10 mt-5 flex flex-col">
          <p className='font-bold font-serif'>{room.name}</p>
          <p>Maximum Capacity:{" " + room.maxcount}</p>
          <p>Rent per Day:{"$"+room.rentperday}</p>
          <p>Type:{" " + room.type}</p>
          <p>Branch Name:{" " + room.branch}</p>
          <div className="flex gap-2 items-center"><FaLocationDot size={20} color='white'  /> Location :{" " +room.location}</div>
          {room.services && room.services.length > 0 && (
            <p className="flex items-center gap-3"><FaCheck className="text-green-500" /> {room.services[0]}</p>
          )}
          {room.services && room.services.length > 1 && (
            <p className="flex items-center gap-3"><FaCheck className="text-green-500" /> {room.services[1]}</p>
          )}

          <div className="flex flex-wrap ml-2 gap-x-10 gap-y-3">
            <button className='btn w-32 lg:ml-40 font-serif' onClick={handleViewDetailsClick}>
              View Details
            </button>
            {fromDate && toDate && (
              <button className='btn w-32' onClick={handleBookNow}>
                Book Now
              </button>
            )}
          </div>
        </div>
      </div>

      {showPopup && (
        <div className="fixed font-mono inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-5 rounded-lg shadow-lg w-[90%] max-w-lg">
            <h2 className="font-bold mb-1">{room.name}</h2>

            <Carousel showArrows={true} autoPlay={true} infiniteLoop={true}>
              {room.imageurls.map((url, index) => (
                <div key={index} 
               
                >
                  <img src={url} alt={`Room Image ${index + 1}`} className="h-32 object-cover" />
                </div>
              ))}
            </Carousel>

            <p className="mt-1 text-sm"><strong>Rent Per Day:</strong> {"$" + room.rentperday}</p>
            <p className='text-sm'><strong>Description:</strong> {room.description}</p>
            <p className='text-sm'><strong>Type:</strong> {room.type}</p>
            <p className='text-sm'><strong>Location:</strong> {room.location}</p>
            <p><strong className='text-sm font-bold'>Capacity:</strong>{room.maxcount}</p>
            <p><strong className='text-sm font-bold'>Phone Number:</strong> {"+251" + room.phonenumber}</p>
            <div className="grid grid-cols-2">
              {Array.isArray(room.services) && room.services.length > 0 ? (
                room.services.map((service, index) => (
                  <p className="flex items-center gap-3" key={index}>
                    <FaCheck className="text-green-500" /> {service}
                  </p>
                ))
              ) : (
                <p>No services available</p>
              )}
            </div>

            <button
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
              onClick={handleClosePopup}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Room;
