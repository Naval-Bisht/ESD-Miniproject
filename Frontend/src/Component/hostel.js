import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import "../css/hostel.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import Header from "./header";
import { useNavigate } from "react-router-dom";

const HostelList = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("isLogin") !== "true") {
      return navigate("/");
    }
  }, [navigate]);

  const [hostels, setHostels] = useState([]);
  const [filteredHostels, setFilteredHostels] = useState([]);
  const [filters, setFilters] = useState({
    availability: "all",
    floor: "",
    hostelName: "",
    roomNumber: "",
  });

  useEffect(() => {
    const fetchHostels = async () => {
      try {
        const token = localStorage.getItem("authToken"); // Get the token from localStorage
        if (!token) {
          console.error("No token found. Redirecting to login.");
          return navigate("/");
        }

        const response = await axios.get("http://localhost:4000/hostel/get-all", {
          headers: {
            Authorization: `Bearer ${token}`, // Add the token to the Authorization header
          },
        });

        if (response.status === 200) {
          const fetchedHostels = response.data
            .map((data) => {
              return {
                hostelid: data.id,
                hostelname: data.name,
                roomNumber: data.room,
                floor: data.floor,
                studentroll: data.student ? data.student.roll : "",
                studentname: data.student
                  ? `${data.student.fname} ${data.student.lname}`
                  : "",
                year: data.student ? data.student.year : "",
                availability: data.student ? "allocated" : "available",
              };
            })
            .sort((a, b) => {
              if (a.hostelname !== b.hostelname) {
                return a.hostelname.localeCompare(b.hostelname);
              } else if (a.floor !== b.floor) {
                return a.floor - b.floor;
              } else {
                return a.roomNumber - b.roomNumber;
              }
            });
          setHostels(fetchedHostels);
        } else {
          console.error("Error fetching data.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchHostels();
  }, [navigate]);



  const applyFilters = useCallback(() => {
    let filtered = hostels;
    if (filters.availability !== "all") {
      filtered = filtered.filter(
        (hostel) => hostel.availability === filters.availability
      );
    }
    if (filters.floor !== "") {
      filtered = filtered.filter(
        (hostel) => hostel.floor === parseInt(filters.floor)
      );
    }
    if (filters.hostelName !== "") {
      filtered = filtered.filter((hostel) =>
        hostel.hostelname
          .toLowerCase()
          .includes(filters.hostelName.toLowerCase())
      );
    }
    if (filters.roomNumber !== "") {
      filtered = filtered.filter(
        (hostel) => hostel.roomNumber === parseInt(filters.roomNumber)
      );
    }
    setFilteredHostels(filtered);
  }, [filters, hostels]);



  useEffect(() => {
    applyFilters();
  }, [applyFilters]);


  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  const isAvailableFilter = filters.availability === "available";

  const handleUpdateRedirect = () => {
    window.location.href = "/Home/update";
  };

  
  return (
    <div className="mainhostel">
      <Header />
      <div className="container-room">
        <div className="row align-items-center mb-3">
          <div className="col-md-6">
            <h5 className="card-title">Hostel List</h5>
          </div>
          <div className="col-md-6">
            <div className="row g-3">
              <div className="col-md-3">
                <select
                  name="availability"
                  className="form-select filter"
                  onChange={handleFilterChange}
                >
                  <option value="all">All</option>
                  <option value="available">Available</option>
                  <option value="allocated">Allocated</option>
                </select>
              </div>
              <div className="col-md-3">
                <input
                  type="text"
                  className="form-control filter"
                  placeholder="Hostel Name"
                  name="hostelName"
                  value={filters.hostelName}
                  onChange={handleFilterChange}
                />
              </div>
              <div className="col-md-3">
                <input
                  type="text"
                  className="form-control filter"
                  placeholder="Floor"
                  name="floor"
                  value={filters.floor}
                  onChange={handleFilterChange}
                />
              </div>
              <div className="col-md-3">
                <input
                  type="text"
                  className="form-control filter"
                  placeholder="Room Number"
                  name="roomNumber"
                  value={filters.roomNumber}
                  onChange={handleFilterChange}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <div className="table-responsive">
              <table className="table project-list-table table-nowrap align-middle table-borderless">
                <thead>
                  <tr>
                    <th scope="col">Hostel ID</th>
                    <th scope="col">Hostel Name</th>
                    <th scope="col">Floor</th>
                    <th scope="col">Room Number</th>
                    {!isAvailableFilter && (
                      <>
                        <th scope="col">Roll No</th>
                        <th scope="col">Student Name</th>
                        <th scope="col">Graduation Year</th>
                      </>
                    )}
                    <th scope="col">Availability</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredHostels.map((hostel) => (
                    <tr key={hostel.hostelid}>
                      <td>{hostel.hostelid}</td>
                      <td>{hostel.hostelname}</td>
                      <td>{hostel.floor}</td>
                      <td>{hostel.roomNumber}</td>
                      {!isAvailableFilter && (
                        <>
                          <td>{hostel.studentroll}</td>
                          <td>{hostel.studentname}</td>
                          <td>{hostel.year}</td>
                        </>
                      )}
                      <td>{hostel.availability}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="text-end mt-3">
              <button className="btn btn-primary" onClick={handleUpdateRedirect}>
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HostelList;
