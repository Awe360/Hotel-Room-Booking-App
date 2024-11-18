import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Loader from './Loader';
import Swal from 'sweetalert2';

function RoomsAdmin() {
  const [rooms, setRooms] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentRoom, setCurrentRoom] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(false);
        const result = await axios.get('http://localhost:5000/api/routes/allRooms');
        setRooms(result.data);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const deleteRoom = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete room"
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`http://localhost:5000/api/routes/deleteRoom`, { data: { id } });
        Swal.fire({
          title: "Deleted!",
          text: "Room deleted successfully",
          icon: "success"
        }).then(() => {
          setRooms(rooms.filter(room => room._id !== id));
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

  const editRoom = (room) => {
    setEditMode(true);
    setCurrentRoom(room);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/routes/updateRoom`, currentRoom);
      Swal.fire({
        title: "Success!",
        text: "Room updated successfully",
        icon: "success"
      }).then(() => {
        setEditMode(false);
        setRooms(rooms.map(room => room._id === currentRoom._id ? currentRoom : room));
      });
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Failed to update room",
        icon: "error"
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentRoom({ ...currentRoom, [name]: value });
  };

  if (loading) {
    return <h1><Loader /></h1>;
  }

  if (error) {
    return <h1 className="bg-red-400 h-16 m-10 text-2xl content-center text-center">Something went wrong, please try again</h1>;
  }

  return (
    <div className="p-8">
      <h1 className="text-center text-3xl font-serif mb-6">Rooms Detail</h1>
      {editMode ? (
        <form onSubmit={handleEditSubmit} className="mb-6 p-4 bg-gray-200 rounded-lg">
          <h2 className="text-2xl mb-4">Edit Room</h2>
          <label>Name</label>
          <input type="text" name="name" value={currentRoom.name} onChange={handleChange} className="mb-2 p-2 border rounded w-full"/>
          <label>Type</label>
          <input type="text" name="type" value={currentRoom.type} onChange={handleChange} className="mb-2 p-2 border rounded w-full"/>
          <label>Rent Per Day</label>
          <input type="number" name="rentperday" value={currentRoom.rentperday} onChange={handleChange} className="mb-2 p-2 border rounded w-full"/>
          <label>Capacity</label>
          <input type="number" name="maxcount" value={currentRoom.maxcount} onChange={handleChange} className="mb-2 p-2 border rounded w-full"/>
          <label>Phone Number</label>
          <input type="text" name="phonenumber" value={currentRoom.phonenumber} onChange={handleChange} className="mb-2 p-2 border rounded w-full"/>
          <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mr-2">Save</button>
          <button onClick={() => setEditMode(false)} className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded">Cancel</button>
        </form>
      ) : (
        <div className="overflow-x-auto shadow-lg rounded-lg">
          <table className="min-w-full bg-white rounded-lg">
            <thead>
              <tr className="bg-blue-500 text-white">
                <th className="border px-6 py-4 text-left text-lg uppercase tracking-wider">Room ID</th>
                <th className="border px-6 py-4 text-left text-lg uppercase tracking-wider">Name</th>
                <th className="border px-6 py-4 text-left text-lg uppercase tracking-wider">Type</th>
                <th className="border px-6 py-4 text-left text-lg uppercase tracking-wider">Rent Per Day</th>
                <th className="border px-6 py-4 text-left text-lg uppercase tracking-wider">Capacity</th>
                <th className="border px-6 py-4 text-left text-lg uppercase tracking-wider">Phone Number</th>
                <th className="border px-6 py-4 text-left text-lg uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody>
              {rooms.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-6 text-lg">No booked data</td>
                </tr>
              ) : rooms.map(item => (
                <tr key={item._id} className="border-t odd:hover:bg-blue-300 even:bg-slate-400 transition duration-200">
                  <td className="border px-6 py-4">{item._id}</td>
                  <td className="border px-6 py-4">{item.name}</td>
                  <td className="border px-6 py-4">{item.type}</td>
                  <td className="border px-6 py-4">{item.rentperday}</td>
                  <td className="border px-6 py-4">{item.maxcount}</td>
                  <td className="border px-6 py-4">{item.phonenumber}</td>
                  <td className="border px-6 py-4">
                    <div className="flex">
                      <button 
                        className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
                        onClick={() => editRoom(item)}
                      >
                        Edit Room
                      </button>
                      <button 
                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        onClick={() => deleteRoom(item._id)}
                      >
                        Delete Room
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default RoomsAdmin;
