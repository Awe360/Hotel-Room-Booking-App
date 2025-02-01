import React, { useState } from "react";
import { Modal, Select } from "antd";
import Sidebar from "../components/AdminSidebar";
import BookingAdmin from "../components/BookingAdmin";
import RoomsAdmin from "../components/RoomsAdmin";
import NewroomAdmin from "../components/NewroomAdmin";
import UsersAdmin from "../components/UsersAdmin";
import Hotels from "../components/Hotels";

const { Option } = Select;

function AdminPage() {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedBranch, setSelectedBranch] = useState(null);
    const [activeTab, setActiveTab] = useState("1");

    const handleAddRoomClick = () => {
        setIsModalVisible(true);
    };

    const handleBranchSelect = (value) => {
        setSelectedBranch(value);
    };

    const handleModalOk = () => {
        if (selectedBranch) {
            setActiveTab("3");
            setIsModalVisible(false);
        } else {
            alert("Please select a branch.");
        }
    };

    const handleModalCancel = () => {
        setIsModalVisible(false);
    };

    const renderContent = () => {
        switch (activeTab) {
            case "1":
                return <BookingAdmin />;
            case "2":
                return <RoomsAdmin />;
            case "3":
                return selectedBranch ? <NewroomAdmin branch={selectedBranch} /> : null;
            case "4":
                return <UsersAdmin />;
            case "5":
                return <Hotels />;
            default:
                return <BookingAdmin />;
        }
    };

    return (
        <div className="flex h-screen">
            <Sidebar
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                onAddRoomClick={handleAddRoomClick}
            />
            <div className="flex-1 py-4 bg-gray-50 overflow-y-auto">{renderContent()}</div>
            <Modal
                title="Select a Branch"
                visible={isModalVisible}
                onOk={handleModalOk}
                onCancel={handleModalCancel}
            >
                <Select
                    placeholder="Select a branch"
                    style={{ width: "100%" }}
                    onChange={handleBranchSelect}
                >
                    <Option value="Main">Main</Option>
                    <Option value="MGN">Megenagna</Option>
                    <Option value="BOL">Bole</Option>
                    <Option value="4K">4 Kilo</Option>
                    <Option value="5K">5 Kilo</Option>
                    <Option value="6K">6 Kilo</Option>
                    <Option value="6K">Merkato</Option>
                </Select>
            </Modal>
        </div>
    );
}

export default AdminPage;
