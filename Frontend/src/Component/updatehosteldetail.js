import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../css/hostel.css";
import Header from "./header";

const StudentUpdatePage = () => {
  const navigate = useNavigate();

  // Ensure user is logged in
  useEffect(() => {
    if (localStorage.getItem("isLogin") !== "true") {
      return navigate("/");
    }
  }, [navigate]);

  const [hostels, setHostels] = useState([]);
  const [unallocatedStudents, setUnallocatedStudents] = useState([]);
  const [dataSent, setDataSent] = useState(false);
  const [filter, setFilter] = useState("all");
  const [selectedStudents, setSelectedStudents] = useState({});
  const [updatedData, setUpdatedData] = useState(false);

  // Retrieve JWT token
  const token = localStorage.getItem("authToken");

  const axiosInstance = axios.create({
    headers: {
      Authorization: `Bearer ${token}`, // Attach token to every request
    },
  });



  useEffect(() => {
    console.log("33333333---"+token);
    axiosInstance
      .get("http://localhost:4000/hostel/get-all")
      .then((response) => {
        if (response.status === 200) {
          const fetchedHostels = response.data.map((data) => {
            return {
              hostelid: data.id,
              hostelname: data.name,
              roomNumber: data.room,
              floor: data.floor,
              studentroll: data.student ? data.student.roll : "",
              studentname: data.student ? `${data.student.fname} ${data.student.lname}` : "",
              year: data.student ? data.student.year : "",
              availability: data.student ? "allocated" : "available",
            };
          });
          setHostels(fetchedHostels);
        } else {
          console.error("Error fetching hostels.");
        }
      })
      .catch((error) => {
        console.error("Error fetching hostels:", error);
      });

    fetchUnallocatedStudents();
  }, [updatedData]);

  const fetchUnallocatedStudents = () => {
    axiosInstance
      .get("http://localhost:4000/hostel/update")
      .then((response) => {
        if (response.status === 200) {
          setUnallocatedStudents(response.data);
        } else {
          console.error("Error fetching unallocated students.");
        }
      })
      .catch((error) => {
        console.error("Error fetching unallocated students:", error);
      });
  };

  const sendID = (hostelid, id) => {
    axiosInstance
      .get(`http://localhost:4000/hostel/update/${hostelid}/${id}`)
      .then((response) => {
        if (response.status === 200) {
          setDataSent(true);
          fetchUnallocatedStudents();
          setSelectedStudents({});
          setFilter("all");
          setUpdatedData(!updatedData); // Triggers re-fetching updated data
        } else {
          setDataSent(false);
        }
      })
      .catch((error) => {
        setDataSent(false);
      });
  };

  const handleAssignment = (hostelid, id) => {
    if (id === "Remove Student") {
      id = "null";
    }
    sendID(hostelid, id);
    console.log(hostelid);
    console.log(id);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const filteredHostels = hostels.filter((hostel) => {
    if (filter === "all") {
      return true;
    } else if (filter === "available") {
      return hostel.availability === "available";
    } else {
      return hostel.availability === "allocated";
    }
  });

  return (
    <div className="mainhostel">
      <Header />
      <div className="container-room">
        <h1 className="card-title" style={{ marginBottom: "1%" }}>
          Student Update Page
        </h1>
        <div className="row mb-3">
          <div className="col-lg-6">
            <select
              id="filter"
              className="form-select"
              value={filter}
              onChange={handleFilterChange}
            >
              <option value="all">All</option>
              <option value="available">Available</option>
              <option value="allocated">Allocated</option>
            </select>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <table className="table">
              <thead>
                <tr>
                  <th>Hostel Name</th>
                  <th>Floor</th>
                  <th>Room</th>
                  <th>Student</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredHostels.map((room, i) => (
                  <tr key={room.hostelid}>
                    <td>{room.hostelname}</td>
                    <td>{room.floor}</td>
                    <td>{room.roomNumber}</td>
                    <td>
                      <select
                        value={selectedStudents[i] || ""}
                        onChange={(e) => {
                          const updatedSelectedStudents = { ...selectedStudents };
                          updatedSelectedStudents[i] = e.target.value;
                          setSelectedStudents(updatedSelectedStudents);
                        }}
                      >
                        <option value="">-- Select Student --</option>
                        {room.availability === "allocated" && (
                          <option value={"Remove Student"}>Remove Student</option>
                        )}
                        {unallocatedStudents.map((student, j) => (
                          <option key={j} value={student.st_id}>
                            {student.fname} {student.lname}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <button
                        onClick={() => handleAssignment(room.hostelid, selectedStudents[i])}
                        disabled={!selectedStudents[i]}
                      >
                        {room.availability === "available" ? "Assign" : "Update"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {dataSent && <p>Data Updated Successfully!</p>}
        <div style={{ marginTop: "20px" }}>
          <Link to="/Home">
            <button className="btn btn-primary">Accommodation</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StudentUpdatePage;
