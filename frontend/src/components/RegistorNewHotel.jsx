import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import Loader from './Loader';

function RegisterHotelPage() {
  const [hotel, setHotel] = useState({
    hotelId: "",
    name: "",
    location: "",
    description: "",
    contact: "",
    images: "",
    amenities: "",
  });
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setHotel({
      ...hotel,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newHotel = {
      hotelId: hotel.hotelId,
      name: hotel.name,
      location: hotel.location,
      description: hotel.description,
      contact: hotel.contact,
      images: hotel.images.split(","),
      amenities: hotel.amenities.split(","),
    };

    try {
      setLoading(true);
      const res = await axios.post("http://localhost:5000/api/routes/hotel/add", newHotel);
      Swal.fire({
        title: 'Congratulations!',
        text: 'You added a new Hotel successfully',
        icon: 'success',
      }).then(() => {
        navigate('/admin');
      });
      setLoading(false);
    } catch (err) {
      setError(true);
      setLoading(false);
      Swal.fire({
        title: 'Sorry!',
        text: 'Something went wrong, please try again',
        icon: 'error',
      });
    }
  };

  if (loading) {
    return <h1><Loader /></h1>;
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Register a New Hotel</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-lg max-w-xl mx-auto">
        <div className="grid grid-cols-1 gap-4">
          <input
            name="hotelId"
            value={hotel.hotelId}
            onChange={handleChange}
            placeholder="Hotel ID"
            required
            className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            name="name"
            value={hotel.name}
            onChange={handleChange}
            placeholder="Name"
            required
            className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            name="location"
            value={hotel.location}
            onChange={handleChange}
            placeholder="Location"
            required
            className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            name="description"
            value={hotel.description}
            onChange={handleChange}
            placeholder="Description"
            required
            className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none h-24"
          />
          <input
            name="contact"
            value={hotel.contact}
            onChange={handleChange}
            placeholder="Contact"
            required
            className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            name="images"
            value={hotel.images}
            onChange={handleChange}
            placeholder="Image URLs (comma-separated)"
            className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            name="amenities"
            value={hotel.amenities}
            onChange={handleChange}
            placeholder="Amenities (comma-separated)"
            className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 w-full transition-all duration-300"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default RegisterHotelPage;
