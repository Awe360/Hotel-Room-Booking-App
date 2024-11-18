import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Loader from './Loader';

function BookingAdmin() {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(false);
        const result = await axios.get('http://localhost:5000/api/routes/allBookings');
        setBookings(result.data);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <h1><Loader /></h1>;
  }

  if (error) {
    return <h1 className="bg-red-400 h-16 m-10 text-2xl content-center text-center">Something went wrong, please try again</h1>;
  }

  return (
    <div className="p-8 font-times New Roman">
      <h1 className="text-center text-3xl font-serif mb-6">Bookings Detail</h1>
      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="min-w-full bg-white rounded-lg">
          <thead>
            <tr className="bg-blue-500 text-white">
              <th className="border px-6 py-4 text-left text-lg uppercase tracking-wider">Booked By</th>
              <th className="border px-6 py-4 text-left text-lg uppercase tracking-wider">User ID</th>
              <th className="border px-6 py-4 text-left text-lg uppercase tracking-wider">Room</th>
              <th className="border px-6 py-4 text-left text-lg uppercase tracking-wider">Booking ID</th>
              <th className="border px-6 py-4 text-left text-lg uppercase tracking-wider">Start Date</th>
              <th className="border px-6 py-4 text-left text-lg uppercase tracking-wider">End Date</th>
              <th className="border px-6 py-4 text-left text-lg uppercase tracking-wider">Status</th>
              <th className="border px-6 py-4 text-left text-lg uppercase tracking-wider">Amount Paid</th>
              <th className="border px-6 py-4 text-left text-lg uppercase tracking-wider">Transaction ID</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length === 0 ? (
              <tr>
                <td colSpan="9" className="text-center py-6 text-lg">No booking data available</td>
              </tr>
            ) : bookings.map(item => (
              <tr key={item._id} className="border-t odd:hover:bg-blue-300 even:bg-slate-400 transition duration-200">
                <td className="border px-6 py-4">{item.userName}</td>
                <td className="border px-6 py-4">{item.userId}</td>
                <td className="border px-6 py-4">{item.room}</td>
                <td className="border px-6 py-4">{item._id}</td>
                <td className="border px-6 py-4">{item.fromDate}</td>
                <td className="border px-6 py-4">{item.toDate}</td>
                <td className="border px-6 py-4">{item.status}</td>
                <td className="border px-6 py-4">{item.amount}</td>
                <td className="border px-6 py-4">{item.transactionId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default BookingAdmin;
