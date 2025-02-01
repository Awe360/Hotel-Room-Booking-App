import React from "react";
import { HomeOutlined, AppstoreAddOutlined, UserOutlined, FileTextOutlined } from "@ant-design/icons";
import { LiaHotelSolid } from "react-icons/lia";
const Sidebar = ({ activeTab, setActiveTab, onAddRoomClick }) => {
    return (
        <div className="w-64 bg-gray-800 text-white flex flex-col">
            <h1 className="text-2xl font-bold text-center py-6 bg-gray-900 font-serif">Admin Dashboard</h1>
            <hr />
            <ul className="flex flex-col space-y-2 p-4">
                <li
                    className={`flex items-center gap-3 p-3 rounded cursor-pointer ${
                        activeTab === "1" ? "bg-blue-600" : "hover:bg-gray-700"
                    }`}
                    onClick={() => setActiveTab("1")}
                >
                    <HomeOutlined className="text-xl" />
                    <span>Bookings</span>
                </li>
                <li
                    className={`flex items-center gap-3 p-3 rounded cursor-pointer ${
                        activeTab === "2" ? "bg-blue-600" : "hover:bg-gray-700"
                    }`}
                    onClick={() => setActiveTab("2")}
                >
                    <FileTextOutlined className="text-xl" />
                    <span>Rooms</span>
                </li>
                {/* <li
                    className={`flex items-center gap-3 p-3 rounded cursor-pointer ${
                        activeTab === "3" ? "bg-blue-600" : "hover:bg-gray-700"
                    }`}
                    onClick={onAddRoomClick}
                >
                    <AppstoreAddOutlined className="text-xl" />
                    <span>Add New Room</span>
                </li> */}
                <li
                    className={`flex items-center gap-3 p-3 rounded cursor-pointer ${
                        activeTab === "4" ? "bg-blue-600" : "hover:bg-gray-700"
                    }`}
                    onClick={() => setActiveTab("4")}
                >
                    <UserOutlined className="text-xl" />
                    <span>Personnels</span>
                </li>
                <li
                    className={`flex items-center gap-3 p-3 rounded cursor-pointer ${
                        activeTab === "5" ? "bg-blue-600" : "hover:bg-gray-700"
                    }`}
                    onClick={() => setActiveTab("5")}
                >
                    <LiaHotelSolid className="text-xl" />
                    <span>Hotels</span>
                </li>
                
               
            </ul>
        </div>
    );
};

export default Sidebar;
