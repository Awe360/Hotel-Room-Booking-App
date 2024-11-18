import React, { useState } from 'react';
import { Tabs, Modal, Select } from "antd";
import BookingAdmin from '../components/BookingAdmin';
import RoomsAdmin from '../components/RoomsAdmin';
import NewroomAdmin from '../components/NewroomAdmin';
import UsersAdmin from '../components/UsersAdmin';

const { TabPane } = Tabs;
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
            setActiveTab("3"); // Set the tab to "Add New Room" tab
            setIsModalVisible(false);
        } else {
            alert("Please select a branch.");
        }
    };

    const handleModalCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <div className='text-center mt-5 mb-10'>
            <h1 className='text-3xl text-blue-600 font-serif'>Welcome To Admin Dashboard</h1>
            <div className=" ml-20 mx-auto">
                <Tabs activeKey={activeTab} onChange={key => setActiveTab(key)}>
                    <TabPane tab={<span className="text-red-900 text-xl font-serif">Bookings</span>} key="1">
                        <BookingAdmin />
                    </TabPane>
                    <TabPane tab={<span className="text-red-900 text-xl font-serif">Rooms</span>} key="2">
                        <RoomsAdmin />
                    </TabPane>
                    <TabPane tab={<span className="text-red-900 text-xl font-serif" onClick={handleAddRoomClick}>Add new room</span>} key="3">
                        {selectedBranch && <NewroomAdmin branch={selectedBranch} />}
                    </TabPane>
                    <TabPane tab={<span className="text-red-900 text-xl font-serif">Personnels</span>} key="4">
                        <UsersAdmin />
                    </TabPane>
                </Tabs>
            </div>

            <Modal
                title="Select a Branch"
                visible={isModalVisible}
                onOk={handleModalOk}
                onCancel={handleModalCancel}
            >
                <Select
                    placeholder="Select a branch"
                    style={{ width: '100%' }}
                    onChange={handleBranchSelect}
                >
                    <Option value="Main">Main</Option>
                    <Option value="MGN">MGN</Option>
                    <Option value="BOL">BOL</Option>
                    <Option value="4K">4K</Option>
                    <Option value="5K">5K</Option>
                    <Option value="6K">6K</Option>
                </Select>
            </Modal>
        </div>
    );
}

export default AdminPage;
