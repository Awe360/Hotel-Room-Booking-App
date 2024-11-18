import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Loader from './Loader';
import Swal from 'sweetalert2';
import { useAuthStore } from '../store/authStore';
import { formatDate } from '../utils/date';

function UsersAdmin() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = useAuthStore();

  const deleteUser = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete user"
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`http://localhost:5000/api/auth/deleteUser`, { data: { id } });
        Swal.fire({
          title: "Deleted!",
          text: "User deleted successfully",
          icon: "success"
        }).then(() => {
          setUsers(users.filter(user => user._id !== id));
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(false);
        const result = await axios.get('http://localhost:5000/api/auth/allUsers');
        setUsers(result.data);
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
    <div className="p-8">
      <h1 className="text-center text-3xl font-serif mb-6">Personnels Detail</h1>
      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="min-w-full bg-white rounded-lg">
          <thead>
            <tr className="bg-blue-500 text-white">
              <th className="border px-6 py-4 text-center text-lg uppercase tracking-wider">ID</th>
              <th className="border px-6 py-4 text-center text-lg uppercase tracking-wider">Name</th>
              <th className="border px-6 py-4 text-center text-lg uppercase tracking-wider">Email</th>
              <th className="border px-6 py-4 text-center text-lg uppercase tracking-wider">Role</th>
              <th className="border px-6 py-4 text-center text-lg uppercase tracking-wider">Registered Date</th>
              <th className="border px-6 py-4 text-center text-lg uppercase tracking-wider">Last Logged In</th>
              <th className="border px-6 py-4 text-center text-lg uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-6 text-lg">No user data available</td>
              </tr>
            ) : (
              users.map((item) => (
                <tr
                  key={item._id}
                  className={`border-t odd:hover:bg-blue-300 even:bg-slate-400 transition duration-200`}
                >
                  <td className="border px-6 py-4 text-center">{item._id}</td>
                  <td className="border px-6 py-4 text-center">{item.name}</td>
                  <td className="border px-6 py-4 text-center">{item.email}</td>
                  <td className="border px-6 py-4 text-center">{item.role}</td>
                  <td className="border px-6 py-4 text-center">{formatDate(item.createdAt)}</td>
                  <td className="border px-6 py-4 text-center">{formatDate(item.lastLogin)}</td>
                  <td className="border px-6 py-4 text-center">
                    {item.role === 'user' && (
                      <button
                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-2 rounded focus:outline-none focus:shadow-outline"
                        onClick={() => deleteUser(item._id)}
                      >
                        Delete User
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UsersAdmin;
