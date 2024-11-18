import React from 'react';
import { motion } from 'framer-motion';
const AboutUsPage = () => {
  return (
    <motion.section
    initial={{ opacity: 0, y: 20 }}
			whileInView={{ opacity: 1, y: 0 }}
			transition={{ duration: 1 }}
     className="bg-gray-100 py-12 font-serif">
      <div className="container mx-auto px-4">

        <h1 className="text-4xl font-bold text-green-500  text-center  mb-8">About Us</h1>
        
        <p className="text-lg text-center text-gray-600 mb-12">
          Welcome to <span className="font-bold">Hotel Room Booking Wesite</span>, 
          your trusted partner for finding the perfect place to stay. Whether you are on a business trip 
          or vacation, we are committed to providing you with the best hotel booking experience.
        </p>

        <div className="mb-10">
          <h2 className="text-3xl font-bold text-center text-green-500 mb-4">Our Mission</h2>
          <p className="text-lg text-gray-600">
            Our mission is to simplify the hotel booking process, providing our customers with a wide variety of accommodations 
            that meet their needs and budgets. We aim to deliver a seamless experience, from browsing to booking, ensuring 
            every traveler finds the perfect stay effortlessly.
          </p>
        </div>

   
        <div className="mb-10">
          <h2 className="text-3xl text-center font-bold text-green-500 mb-4">Our Vision</h2>
          <p className="text-lg text-gray-600">
            Our vision is to become the go-to platform for hotel bookings worldwide by offering an unparalleled selection of hotels, 
            user-friendly navigation, and outstanding customer service. We strive to make every trip memorable by connecting 
            travelers with the best accommodations in every destination.
          </p>
        </div>

        {/* Features */}
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-center text-green-500 mb-4">What We Offer</h2>
          <ul className="list-disc list-inside ml-20 md:ml-40 text-lg text-gray-600 space-y-4">
            <li>Wide range of hotels from budget to luxury accommodations</li>
            <li>Real-time availability and instant booking confirmations</li>
            <li>Secure payment options and transparent pricing</li>
            <li>24/7 customer support to assist with any booking inquiries</li>
            <li>User-friendly search filters to find the perfect stay</li>
            <li>Exclusive deals and discounts for registered members</li>
          </ul>
        </div>

        
      </div>
    </motion.section>
  );
};

export default AboutUsPage;
