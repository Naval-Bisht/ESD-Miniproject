import React, { useState } from "react";
import "../css/login.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import axios from "axios";

const EstateLogin = () => {
  const [formData, setFormData] = useState({
    who: "admin", // Default value
    email: "",
    password: "",
  });
  // To set an item in localStorage
  

  const [loginType, setLoginType] = useState("admin");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLoginSwitch = (type) => {
    setLoginType(type);
    setFormData({
      who: type === "admin" ? "admin" : "student", // Update 'who' value
      email: "",
      password: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
        const response = await axios.post("http://localhost:4000/login", formData);
        console.log("Response:", response.data);
        const token = response.data.token;

        // Save token to localStorage
        localStorage.setItem("authToken", token);

        if (loginType === "student") {
            localStorage.setItem("studentEmail", formData.email);
            localStorage.setItem("isLogin", "true");
            window.location.href = `/studentdetail`;
        } else {
            localStorage.setItem("isLogin", "true");
            window.location.href = `/Home`;
        }
    } catch (error) {
        console.error("Error logging in:", error);
        alert("Invalid credentials.");
    } finally {
        setIsLoading(false);
    }
};



  return (
    <div className="bodylogin">
      <div className="login-wrap">
        <div className="login-html">
          <h3 className="logintitle">IIITB Hostel Management</h3>
          {/* Admin Sign In */}
          <input
            id="tab-1"
            type="radio"
            name="tab"
            className="sign-in"
            checked={loginType === "admin"}
          />
          <label
            onClick={() => handleLoginSwitch("admin")}
            htmlFor="tab-1"
            className="tab"
          >
            Admin Sign IN
          </label>
          {/* Student Sign In */}
          <input
            id="tab-2"
            type="radio"
            name="tab"
            className="sign-up"
            checked={loginType === "student"}
          />
          <label
            onClick={() => handleLoginSwitch("student")}
            htmlFor="tab-2"
            className="tab"
          >
            Student Sign IN
          </label>
          <form className="login-form" onSubmit={handleSubmit}>
            <div
              className={loginType === "admin" ? "sign-in-htm" : "sign-up-htm"}
            >
              <div className="group">
                <label htmlFor="email" className="label">
                  Email
                </label>
                <input
                  id="email"
                  type="text"
                  className="input"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="group">
                <label htmlFor="password" className="label">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  className="input"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              {isLoading ? (
                <div>Loading...</div>
              ) : (
                <div className="group">
                  <input type="submit" className="button" value="Sign In" />
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EstateLogin;
