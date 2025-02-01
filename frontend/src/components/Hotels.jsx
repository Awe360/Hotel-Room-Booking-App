import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaPlusCircle, FaStar, FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Loader from "./Loader";

function AdminHotelsPage() {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [currentHotel, setCurrentHotel] = useState(null);

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

  const deleteHotel = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete Hotel"
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`http://localhost:5000/api/routes/deleteHotel`, { data: { id } });
        Swal.fire({
          title: "Deleted!",
          text: "Hotel deleted successfully",
          icon: "success"
        }).then(() => {
          setHotels(hotels.filter(hotel => hotel._id !== id));
        });
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: "Something went wrong",
          icon: "error"
        });
      }
    }
  };
  
  const editHotel = (hotel) => {
    setEditMode(true);
    setCurrentHotel(hotel);
  };
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/routes/updateHotel`, currentHotel);
      Swal.fire({
        title: "Success!",
        text: "Hotel updated successfully",
        icon: "success"
      }).then(() => {
        setEditMode(false);
        setHotels(hotels.map(hotel => hotel._id === currentHotel._id ? currentHotel : hotel));
      });
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Failed to update hotel",
        icon: "error"
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentHotel({ ...currentHotel, [name]: value });
  };

  if (loading) {
    return <h1><Loader /></h1>;
  }

  if (error) {
    return <h1 className="bg-red-400 h-16 m-10 text-2xl content-center text-center">Something went wrong, please try again</h1>;
  }
  
  

  const renderStars = (rating) => {
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
      </div>
    );
  };

  return (
    <div className="container mx-auto px-6 py-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">All Registered Hotels</h1>

      {loading ? (
        // <p className="text-center">Loading hotels...</p>
        <Loader/>
      ) : error ? (
        <p className="text-center text-red-600">Error: {error}</p>
      ) : (
        <>
        {editMode ? (
        <form onSubmit={handleEditSubmit} className="mb-6 p-4 bg-gray-200 rounded-lg">
          <h2 className="text-2xl mb-4">Edit Hotel</h2>
          <label>Name</label>
          <input type="text" name="name" value={currentHotel.name} onChange={handleChange} className="mb-2 p-2 border rounded w-full"/>
          <label>Location</label>
          <input type="text" name="location" value={currentHotel.location} onChange={handleChange} className="mb-2 p-2 border rounded w-full"/>
          <label>Description</label>
          <textarea name="description" value={currentHotel.description} onChange={handleChange} className="mb-2 p-2 border rounded w-full"/>
          <label>Contact</label>
          <input type="text" name="contact" value={currentHotel.contact} onChange={handleChange}  className="mb-2 p-2 border rounded w-full"/>
          <label>Rating</label>
          <input type="number" name="rating" value={currentHotel.rating}  className="mb-2 p-2 border rounded w-full"/>
          <label>Number of Reviews</label>
          <input type="number" name="numberOfReviews" value={currentHotel.numberOfReviews} readOnly className="mb-2 p-2 border rounded w-full"/>
          <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mr-2">Save</button>
          <button onClick={() => setEditMode(false)} className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded">Cancel</button>
        </form>
      ):<>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {hotels.map((hotel) => (
        <div
          key={hotel.hotelId}
          className="bg-white rounded-lg shadow-lg overflow-hidden"
        >
          <div className="relative">
            <Link to={`/admin/hotels/${hotel.hotelId}`}>
              <img
                src={
                  Array.isArray(hotel.images) &&
                  hotel.images.length > 0 &&
                  currentImageIndex[hotel.hotelId] !== undefined
                    ? hotel.images[currentImageIndex[hotel.hotelId]]
                    : "/default-image.jpg"
                }
                alt="Hotel"
                className="w-full h-64 object-cover cursor-pointer"
              />
            </Link>
          </div>

          <div className="p-6">
            <Link
              to={`/admin/hotels/${hotel.hotelId}`}
              className="text-2xl font-bold text-gray-800 hover:underline"
            >
              {hotel.name}
            </Link>
            <div className="mt-2">{renderStars(hotel.rating)}</div>
            <div className="flex justify-between items-center mt-4">
              <button
                
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 flex items-center"
                onClick={() => editHotel(hotel)}
              >
                <FaEdit className="mr-2" /> Edit
              </button>
              <button
                onClick={() => deleteHotel(hotel._id)}
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 flex items-center"
              >
                <FaTrash className="mr-2" /> Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
    <div className="mt-8 text-center">
            <Link
              to="/admin/registerNewHotel"
              className="bg-green-500 text-white py-3 px-6 rounded-full hover:bg-green-600 flex items-center justify-center mx-auto"
            >
              <FaPlusCircle className="mr-2" />
              Register New Hotel
            </Link>
          </div></>}
         

          
        </>
      )}
    </div>
  );
}

export default AdminHotelsPage;
