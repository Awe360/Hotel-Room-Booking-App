import React, { useState, useEffect } from "react";
import axios from "axios";
import Room from "../components/Room";
import Loader from "../components/Loader";
import { DatePicker } from "antd";
import moment from "moment";
import "./hs.css";
import { motion } from "framer-motion";
import { IoSearchOutline } from "react-icons/io5";
function HomeScreen() {
  const { RangePicker } = DatePicker;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();
  const [duplicate, setDuplicate] = useState([]);
  const [searchVal, setSearchVal] = useState("");
  const [sortCriteria, setSortCriteria] = useState(""); // New state for sort criteria
  const[dep,setDep]=useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/routes/all");
        setData(res.data);
        setDep(res.data)
        setDuplicate(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError(err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter rooms by date
  const filterByDate = (dates, dateString) => {
    setFromDate(dateString[0]);
    setToDate(dateString[1]);

    const temp = [];
    const fromDateMoment = moment(dateString[0], "DD-MM-YYYY");
    const toDateMoment = moment(dateString[1], "DD-MM-YYYY");

    for (const room of duplicate) {
      let availability = true;

      if (room.currentbookings.length > 0) {
        for (const booked of room.currentbookings) {
          const bookedStartDate = moment(booked.startDate, "DD-MM-YYYY");
          const bookedEndDate = moment(booked.endDate, "DD-MM-YYYY");

          if (
            fromDateMoment.isBetween(bookedStartDate, bookedEndDate, undefined, "[]") ||
            toDateMoment.isBetween(bookedStartDate, bookedEndDate, undefined, "[]")
          ) {
            availability = false;
            break;
          }
        }
      }
     

      if (availability || room.currentbookings.length === 0) {
        temp.push(room);
      }
    }

    setData(temp);
    setDep(temp)
  };

  // Filter rooms by search input (name)
  const filterBySearch = (e) => {
    const temp = dep.filter((room) =>
      room.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setData(temp);
  };

  // Filter rooms by type
  const filterByType = (e) => {
    if (e.toLowerCase() === "all") {
      setData(dep);
    } else {
      const temp = dep.filter(
        (room) => room.type.toLowerCase() === e.toLowerCase()
      );
      setData(temp);
    }
  };

  // Sort rooms by selected criteria (price or capacity)
  const sortRooms = (e) => {
    setSortCriteria(e.target.value);
    let sortedData = [...data];

    if (e.target.value === "price") {
      sortedData.sort((a, b) => a.rentperday - b.rentperday); // Sort by price
    } else if (e.target.value === "capacity") {
      sortedData.sort((a, b) => a.maxcount - b.maxcount); // Sort by capacity
    }

    setData(sortedData);
  };

  return (
    <div>
      <div className="border-4 flex font-mono justify-around items-center mx-6 md:mx-32 h-16 my-3 mt-4 md:my-5 shadow-lg rounded-lg">
        <RangePicker
          format="DD-MM-YYYY"
          onChange={filterByDate}
          size="12"
          className="text-12 h-10 w-1/3"
        />
        
        <input
          type="search"
          placeholder="Search rooms"
          className="h-10 w-1/3 relative outline-none border-2 text-blue-600 text-xl rounded-3xl p-2"
          onChange={filterBySearch} 
        />
        <IoSearchOutline className="absolute ml-[7%] sm:ml-[20%] md:ml-[16%] lg:ml-[30%]" size={30}/>
        <select
          name="sel"
          id=""
          className="h-10"
          onChange={(e) => filterByType(e.target.value)}
        >
          <option value="all">All</option>
          <option value="delux">Delux</option>
          <option value="none delux">Non-Delux</option>
        </select>

        {/* Dropdown for sorting by price or capacity */}
        <select
          name="sort"
          className="h-10"
          onChange={sortRooms}
        >
          <option value="">Sort by</option>
          <option value="price">Price</option>
          <option value="capacity">Capacity</option>
        </select>
      </div>

      {loading ? (
        <h1>
          <Loader />
        </h1>
      ) : error ? (
        <h1>Error: {error.message}</h1>
      ) : (
        data.map((val, index) => (
          <motion.div className="text-lg" key={val.id || index}
          initial={{ opacity: 1, y: 200 }}
                animate={{opacity: 1, y: 100}}
                whileInView={{ opacity: 1, y: 0 }}
                 transition={{ duration: 1 }}>
            <Room room={val} fromDate={fromDate} toDate={toDate} />
          </motion.div>
        ))
      )}
    </div>
  );
}

export default HomeScreen;
