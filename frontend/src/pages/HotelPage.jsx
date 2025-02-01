import React, { useState, useEffect } from "react";
import axios from "axios";
import { IoStar } from "react-icons/io5";
import { FaStar, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import AnimatedTitle from "../components/AnimatedTitle";
import { FaLocationDot } from "react-icons/fa6";
function AllHotelsPage() {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState({}); // Track image index for each hotel

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/routes/hotels");
        setHotels(res.data);

        
        const initialIndexes = res.data.reduce((acc, hotel) => {
          acc[hotel.hotelId] = 0;
          return acc;
        }, {});
        setCurrentImageIndex(initialIndexes);

        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchHotels();
  }, []);

  const renderStars = (rating,numberOfReviews) => {
    const validRating = Math.max(0, Math.min(5, rating || 0));
    const fullStars = Math.floor(validRating);
    const partialFill = validRating % 1;
    const emptyStars = 5 - fullStars - (partialFill > 0 ? 1 : 0);

    return (
    
      <div className="flex items-center space-x-1">
        {[...Array(fullStars)].map((_, index) => (
          <FaStar key={index} className="text-yellow-500" />
        ))}
        {partialFill > 0 && (
          <div className="relative">
            <FaStar className="text-gray-400" />
            <div
              className="absolute top-0 left-0 h-full overflow-hidden"
              style={{
                width: `${partialFill * 100}%`,
              }}
            >
              <FaStar className="text-yellow-500" />
            </div>
          </div>
        )}
        {[...Array(emptyStars)].map((_, index) => (
          <FaStar key={fullStars + index + 1} className="text-gray-400" />
        ))}
        {" ("+(numberOfReviews)+" Reviews)"}
      </div>
    );
  };

  const handlePrevious = (hotelId, imagesLength) => {
    setCurrentImageIndex((prev) => ({
      ...prev,
      [hotelId]: prev[hotelId] === 0 ? imagesLength - 1 : prev[hotelId] - 1,
    }));
  };

  const handleNext = (hotelId, imagesLength) => {
    setCurrentImageIndex((prev) => ({
      ...prev,
      [hotelId]: prev[hotelId] === imagesLength - 1 ? 0 : prev[hotelId] + 1,
    }));
  };

  return (
    <div className="container mx-auto px-6">
      <div className="mb-5">
        <AnimatedTitle />
      </div>

      {loading ? (
        <p className="text-center">Loading hotels...</p>
      ) : error ? (
        <p className="text-center text-red-600">Error: {error}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {hotels.map((hotel) => (
            <div
              key={hotel.hotelId}
              className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer hover:scale-105 transform transition duration-300 ease-in-out"
            >
              <div className="relative">
                <img
                  src={
                    hotel.images[currentImageIndex[hotel.hotelId]] ||
                    "/default-image.jpg"
                  }
                  alt={`Hotel Image ${currentImageIndex[hotel.hotelId] + 1}`}
                  className="w-full h-64 object-cover"
                />
                <button
                  onClick={() =>
                    handlePrevious(hotel.hotelId, hotel.images.length)
                  }
                  className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700"
                >
                  <FaArrowLeft />
                </button>
                <button
                  onClick={() =>
                    handleNext(hotel.hotelId, hotel.images.length)
                  }
                  className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700"
                >
                  <FaArrowRight />
                </button>
                <div className="absolute top-2 left-2 bg-gray-800 text-white px-3 py-1 text-xs rounded-full">
                  {hotel.rating} <IoStar />
                </div>
              </div>

              <div className="p-6">
                <Link
                  className="text-2xl font-bold text-gray-800 hover:underline"
                  to={`/hotels/${hotel.hotelId}`}
                >
                  {hotel.name}
                </Link>
                <p className="text-gray-600 text-sm">{hotel.location}</p>
                 <div className="flex gap-10 items-center bg-gray-300 rounded-lg px-10 py-2"><FaLocationDot size={20} color='red'  /> <p><a href={`https://www.google.com/maps?q=${hotel.location} +"hotel"`} target="_blank" rel="noopener noreferrer" className=''>View Map</a></p></div>
                <div className="mt-4">{renderStars(hotel.rating,hotel.numberOfReviews)}</div>
                <p className="text-gray-700 mt-4">{hotel.description}</p>
                <div className="mt-4">
                  <ul className="flex space-x-3">
                    {hotel.amenities.slice(0, 2).map((amenity, index) => (
                      <li
                        key={index}
                        className="bg-gray-200 p-2 rounded-full text-xs"
                      >
                        {amenity}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-6 text-center">
                  <Link
                    to={`/hotels/${hotel.hotelId}`}
                    className="text-blue-600 hover:underline"
                  >
                    View More
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AllHotelsPage;
