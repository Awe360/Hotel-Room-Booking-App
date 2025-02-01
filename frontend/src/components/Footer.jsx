import React from "react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-800 z-99 text-white py-6">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-6">
        {/* Footer Navigation Links */}
        <div className="flex flex-col md:flex-row gap-4">
          <a href="/" className="hover:text-blue-400">
            Home
          </a>
          <a href="/about" className="hover:text-blue-400">
            About Us
          </a>
          <a href="/contact" className="hover:text-blue-400">
            Contact
          </a>
          <a href="/faq" className="hover:text-blue-400">
            FAQ
          </a>
        </div>

        {/* Social Media Icons */}
        <div className="flex gap-4 mt-4 md:mt-0">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400"
          >
            <FaFacebook size={24} />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400"
          >
            <FaTwitter size={24} />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400"
          >
            <FaInstagram size={24} />
          </a>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="text-center mt-4 text-sm">
        © {new Date().getFullYear()} Hotel Room Booking App. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
