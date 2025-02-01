import React, { useState,useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { useParams } from "react-router-dom";
import axios from "axios";
const HotelGuestReviews = () => {
  const {hotelId}=useParams();
const[hotel,setHotel]=useState(null);


  useEffect(() => {
      const fetchHotel = async () => {
        try {
          const res = await fetch(`http://localhost:5000/api/routes/hotels/${hotelId}`);
          const data = await res.json();
          setHotel(data[0]); 
        } catch (err) {
          console.error("Error fetching hotel data:", err);
          setHotel({ error: "Failed to fetch hotel details. Please try again later." });
        }
      };
  
      fetchHotel();
    }, [hotelId]);

  const reviews = [
    {
      avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRQA0nWZwLx6fwhMKI_N1nzGOrRU_78S6l326esG8hCEi0M4sjI326cLvw70P659InGq4&usqp=CAU",
      name: "Abebe Alemu",
      Booked:"Room 10 on 10/01/2024",
      comment: "Amazing hotel ! The staff were friendly, and the rooms were spotless.",
      rating: 4.9,
    },
    {
      avatar: "https://i.pravatar.cc/150?img=45",
      name: "Abraham Smith on 13/10/2024",
      Booked:"Room 5 on 03/01/2024",
      comment: "It was perfect, recomended for those who want neat rooms.",
      rating: 5,
    },
    {
      avatar: "https://i.pravatar.cc/150?img=67",
      name: "Abenezer",
      Booked:"Room 5 on 03/12/2024",
      comment: "Decent hotel with good amenities, but the food was average.",
      rating: 4,
    },
    {
        avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDpWYsLSeY1sLvwgFNwBeJGjszUfEofDpwJw&s",
        name: "Abel Abebe",
        Booked:"Room 7 on 13/11/2024",
        comment: "Very good.",
        rating: 4,
      },
  ];

 
  const renderStars = (rating,numberOfReviews) => {
    const validRating = Math.max(0, Math.min(5, rating || 0));
    return (
      <div className="flex space-x-1">
        {[...Array(5)].map((_, index) => (
          <FaStar
            key={index}
            className={`${
              index < validRating ? "text-yellow-500" : "text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Guest Reviews
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

          { hotel?.numberOfReviews>0?reviews.map((review, index) => (
            <div
              key={index}
              className="flex flex-col items-center bg-white shadow-lg rounded-lg p-6 space-y-4"
            >
              {/* Avatar */}
              <img
                src={review.avatar || "/default-avatar.jpg"}
                alt={review.name}
                className="w-16 h-16 rounded-full border-2 border-gray-200"
              />
              {/* Content */}
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-800">
                  {review.name}
                </h3>
                <div className="flex justify-center mt-2">
                  {renderStars(review.rating,hotel.numberOfReviews)}
                </div>
                <p>Booked <span className="text-blue-500">{review.Booked}</span> in this hotel</p>
                <p className="mt-3 text-gray-600 text-sm">{review.comment}</p>
              </div>
            </div>
          )):<div className="text-xl text-center font-bold">No review</div>}
        </div>
      </div>
    </div>
  );
};

export default HotelGuestReviews;
