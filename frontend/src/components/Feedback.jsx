import React from "react";
import { FaStar } from "react-icons/fa";

const GuestReview = ({ avatar, name, comment, rating }) => {
  const renderStars = (rating) => {
    const validRating = Math.max(0, Math.min(5, rating || 0));
    return (
      <div className="flex space-x-1">
        {[...Array(5)].map((_, index) => (
          <FaStar
            key={index}
            className={`${
              index < validRating ? "text-yellow-500" : "text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center bg-white shadow-lg rounded-lg p-6 space-y-4">
      {/* Avatar */}
      <img
        src={avatar || "/default-avatar.jpg"} // Default avatar fallback
        alt={name}
        className="w-16 h-16 rounded-full border-2 border-gray-200"
      />
      {/* Content */}
      <div className="w-full text-center">
        {/* Name and Rating */}
        <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
        <div className="flex justify-center mt-1">{renderStars(rating)}</div>
        {/* Comment */}
        <p className="mt-3 text-gray-600 text-sm">{comment}</p>
      </div>
    </div>
  );
};

export default GuestReview;
