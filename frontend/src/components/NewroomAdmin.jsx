import React, { useState } from 'react';
import axios from 'axios';
import Loader from './Loader';
import Swal from 'sweetalert2';
import { useParams } from 'react-router-dom';

function NewroomAdmin({branch}) {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [rentperday, setRentperday] = useState('');
  const [capacity, setCapacity] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('');
  const[location,setLocation]=useState('')
  const [phone, setPhone] = useState('');
  const [services, setServices] = useState(['']);
  const [images, setImages] = useState(['']);
const {hotelId}=useParams();
  const addRoom = async () => {
    const newRoom = {
      hotelId,
      name,
      maxcount: capacity,
      phonenumber: phone,
      type,
      location,
      branch,
      description,
      rentperday,
      imageurls: images,
      services: services,
    };
    try {
      setLoading(true);
      setError(false);
      const res = await axios.post('http://localhost:5000/api/routes/newRoom', newRoom);
      const resData = res.data;
      console.log(resData);
      Swal.fire({
        title: 'Congratulations!',
        text: 'You added new room successfully',
        icon: 'success',
      }).then((res) => {
        window.location.href = '/admin';
      });
      setLoading(false);
      resetForm();
    } catch (error) {
      setError(true);
      setLoading(false);
      console.log(error);
      Swal.fire({
        title: 'Sorry!',
        text: 'Something went wrong, please try again',
        icon: 'error',
      });
    }
  };

  const resetForm = () => {
    setName('');
    setRentperday('');
    setCapacity('');
    setDescription('');
    setType('');
    setLocation('');
    setPhone('');
    setServices(['']);
    setImages(['']);
  };

  const handleAddService = () => {
    setServices([...services, '']);
  };

  const handleAddImage = () => {
    setImages([...images, '']);
  };

  const handleServiceChange = (value, index) => {
    const newServices = [...services];
    newServices[index] = value;
    setServices(newServices);
  };

  const handleImageChange = (value, index) => {
    const newImages = [...images];
    newImages[index] = value;
    setImages(newImages);
  };

  if (loading) {
    return <h1><Loader /></h1>;
  }

  if (error) {
    return <h1 className='bg-red-400 h-16 m-10 text-2xl content-center text-center'>Something went wrong, please try again</h1>;
  }

  return (
    <div>
      <div className="flex flex-col mx-auto bg-emerald-300 w-[500px] rounded-xl shadow-xl shadow-black">
        <h1 className='text-2xl font-serif text-center'>New Room Details</h1>
        <input type="text" className='border-2 mx-auto p-1 outline-none text-lg my-2 w-[400px]' placeholder='Room ID' value={name} onChange={(e) => setName(e.target.value)} />
        <input type="text" className='border-2 p-1 mx-auto outline-none text-lg my-2 w-[400px]' placeholder='Location' value={location} onChange={(e) => setLocation(e.target.value)} />
        <input type="number" className='border-2 p-1 mx-auto outline-none text-lg my-2 w-[400px]' placeholder='Rent per day' value={rentperday} onChange={(e) => setRentperday(e.target.value)} />
        <input type="number" className='border-2 p-1 mx-auto outline-none text-lg my-2 w-[400px]' placeholder='Capacity' value={capacity} onChange={(e) => setCapacity(e.target.value)} min={0} />
        <input type="text" className='border-2 p-1 mx-auto outline-none text-lg my-2 w-[400px]' placeholder='Description' value={description} onChange={(e) => setDescription(e.target.value)} />
        <input type="text" className='border-2 p-1 mx-auto outline-none text-lg my-2 w-[400px]' placeholder='Phone number' value={phone} onChange={(e) => setPhone(e.target.value)} />
        <input type="text" className='border-2 p-1 mx-auto outline-none text-lg my-2 w-[400px]' placeholder='Type' value={type} onChange={(e) => setType(e.target.value)} />

        {services.map((service, index) => (
          <input key={index} type="text" className='border-2 p-1 mx-auto outline-none text-lg my-2 w-[400px]' placeholder={`Service ${index + 1}`} value={service} onChange={(e) => handleServiceChange(e.target.value, index)} />
        ))}
        <button onClick={handleAddService} className='btn ml-[60%] w-[150px] mb-4'>Add More Service</button>

        {images.map((image, index) => (
          <input key={index} type="text" className='border-2 p-1 mx-auto outline-none text-lg my-2 w-[400px]' placeholder={`Image ${index + 1}`} value={image} onChange={(e) => handleImageChange(e.target.value, index)} />
        ))}
        <button onClick={handleAddImage} className='btn ml-[60%]  w-[150px] mb-4'>Add More Image</button>

        <button onClick={addRoom} className='btn mx-auto w-[300px] mb-5'>Submit</button>
      </div>
    </div>
  );
}

export default NewroomAdmin;
