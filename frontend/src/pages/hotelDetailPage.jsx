import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { FaLocationDot } from "react-icons/fa6";
import HotelGuestReviews from "./GuestReview";
import Loader from "../components/Loader";

const HotelDetailPage = () => {
  const { hotelId } = useParams();
  const [hotel, setHotel] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");
  const navigate = useNavigate();

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

  const renderStars = (rating, numberOfReviews) => {
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
              style={{ width: `${partialFill * 100}%` }}
            >
              <FaStar className="text-yellow-500" />
            </div>
          </div>
        )}
  
        {[...Array(emptyStars)].map((_, index) => (
          <FaStar key={fullStars + index + 1} className="text-gray-400" />
        ))}
        {" (" + numberOfReviews + " Reviews)"}
      </div>
    );
  };

  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
  };

  return (
    <div className="container mx-auto p-6">
      {hotel ? (
        <>
         
          <h1 className="text-4xl font-bold text-center mb-8">{hotel.name}</h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Image Carousel */}
            <div>
              <Slider {...carouselSettings}>
                {hotel.images?.map((image, index) => (
                  <div key={index}>
                    <img
                      src={image || "/default-image.jpg"}
                      alt={`Hotel Image ${index + 1}`}
                      className="w-full h-96 object-cover rounded-lg shadow-md"
                    />
                  </div>
                ))}
              </Slider>
            </div>

           
            <div className="flex justify-between items-start bg-gray-200 rounded-lg p-4">

  
  <div className="w-full">
    <h2 className="text-xl font-bold text-center mb-4">Hotel Location</h2>

    <div className="flex flex-col justify-center items-center text-gray-600">
      <div className="flex items-center mb-4">
        <FaLocationDot className="mr-2" />
        <span>{hotel.location}</span>
      </div>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d15761.076273183038!2d38.75824810539282!3d9.039202264202784!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1s5%20Kilo%20%20%22hotel%22!5e0!3m2!1sen!2set!4v1737381988904!5m2!1sen!2set"
        width="100%"
        height="450"
        style={{ border: "0" }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  </div>
</div>

          </div>

          {/* Overview Section */}
          <div className="flex justify-between items-center mb-6">
            <div>{renderStars(hotel.rating, hotel.numberOfReviews)}</div>
            <p className="text-gray-600 text-lg">{hotel.location}</p>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-300 mb-6">
            <div className="flex space-x-6">
              <button
                className={`py-2 px-4 ${
                  activeTab === "overview" ? "border-b-2 border-blue-600 font-bold" : "text-gray-500"
                }`}
                onClick={() => setActiveTab("overview")}
              >
                Overview
              </button>
              <button
                className={`py-2 px-4 ${
                  activeTab === "rooms" ? "border-b-2 border-blue-600 font-bold" : "text-gray-500"
                }`}
                onClick={() => {
                  setActiveTab("rooms");
                  navigate(`/matchingRoom/${hotelId}`);
                }}
              >
                Rooms
              </button>
              <button
                className={`py-2 px-4 ${
                  activeTab === "guestReviews" ? "border-b-2 border-blue-600 font-bold" : "text-gray-500"
                }`}
                onClick={() => setActiveTab("guestReviews")}
              >
                Guest Reviews
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div>
            {activeTab === "overview" && (
              <div>
                <h2 className="text-2xl font-semibold mb-4">About the Hotel</h2>
                <p>{hotel.description}</p>
              </div>
            )}
            {activeTab === "rooms" && (
              <div>
                <h2 className="text-2xl font-semibold mb-4">Available Rooms</h2>
                <p>Details about the rooms will go here.</p>
              </div>
            )}
            {activeTab === "guestReviews" && (
              <div>
                <HotelGuestReviews />
              </div>
            )}
          </div>

          {/* Amenities */}
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4">Top Services</h3>
            <ul className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {hotel.amenities?.map((amenity, index) => (
                <li key={index} className="bg-gray-300 hover:bg-gray-500 p-2 rounded-lg text-center">
                  {amenity}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
            <p>{hotel.contact}</p>
          </div>
        </>
      ) : (
        <Loader/>
      )}
    </div>
  );
};

export default HotelDetailPage;
