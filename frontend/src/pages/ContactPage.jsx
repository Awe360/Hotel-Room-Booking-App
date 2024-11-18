import React from 'react';
import { FaTelegramPlane, FaYoutube } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { motion} from 'framer-motion';

const ContactPage = () => {
  const [result, setResult] = React.useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    
    const formData = new FormData(event.target);
    formData.append("access_key", "2224e41c-e3e6-425f-8825-9c1a78f86ecf");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (data.success) {
      setResult("Form Submitted Successfully");
      Swal.fire({
        title: "Success!",
        text: "Your form was submitted successfully.",
        icon: "success"
      });
      event.target.reset();
    } else {
      console.log("Error", data);
      setResult(data.message);
      Swal.fire({
        title: "Error!",
        text: "There was an issue with your submission. Please try again.",
        icon: "error"
      });
    }
  };

  return (
    <motion.section initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="flex font-mono items-center justify-center min-h-[500px]">
      <form onSubmit={onSubmit} className="bg-blue-500 p-5 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-black mb-6">Contact Us</h2>

        {/* Full Name Field */}
        <div className="mb-4">
          <label className="block text-black text-sm font-semibold mb-2" htmlFor="name">
            Full Name
          </label>
          <div className="flex items-center border border-gray-600 rounded-lg bg-gray-700 px-3 py-2">
            <input
              type="text"
              name="name"
              className="w-full bg-transparent text-white placeholder-gray-400 focus:outline-none"
              placeholder="Enter your name"
              required
            />
          </div>
        </div>

        {/* Email Field */}
        <div className="mb-4">
          <label className="block text-black text-sm font-semibold mb-2">
            Email Address
          </label>
          <div className="flex items-center border border-gray-600 rounded-lg bg-gray-700 px-3 py-2">
            <input
              type="email"
              name="email"
              className="w-full bg-transparent text-white placeholder-gray-400 focus:outline-none"
              placeholder="Enter your email"
              required
            />
          </div>
        </div>

        {/* Message Field */}
        <div className="mb-6">
          <label className="block text-black text-sm font-semibold mb-2" htmlFor="message">
            Your Message
          </label>
          <textarea
            className="w-full bg-gray-700 text-white placeholder-gray-400 border border-gray-600 rounded-lg px-3 py-2 focus:outline-none"
            placeholder="Enter your message"
            name="message"
            rows="2"
            required
          ></textarea>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-pink-500 to-yellow-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none transition duration-300"
          >
            Send Message
          </button>
        </div>

        {/* Display Result */}
        {result && <p className="text-center text-green-400 mt-4">{result}</p>}

        {/* Social Icons */}
        <div className="flex justify-center space-x-6 mt-8">
          
          <a href="https://t.me/ag19ag" target="_blank" rel="noopener noreferrer">
            <FaTelegramPlane className="text-green-400 text-3xl hover:text-green-500 transition duration-300" />
          </a>
          <a href="https://www.youtube.com/watch?v=3-2yQE36ltM" target="_blank" rel="noopener noreferrer">
            <FaYoutube className="text-red-600 text-3xl hover:text-red-700 transition duration-300" />
          </a>
        </div>
      </form>
    </motion.section>
  );
};

export default ContactPage;
