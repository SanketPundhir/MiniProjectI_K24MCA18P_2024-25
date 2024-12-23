import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import toastify CSS
import Navbar from "../OnlyView/Navbars/Navbar";
import styles from "./AdminSignUp.module.css"; // Scoped CSS for styling

function AdminSignUp() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [ip, setIp] = useState("");

  const notifyA = (msg) => toast.error(msg);
  const notifyB = (msg) => toast.success(msg);

  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  useEffect(() => {
    // Uncomment if needed to redirect if already logged in
    // const token = localStorage.getItem("jwt");
    // if (token) {
    //   navigate("/");
    // }
  }, [navigate]);

  const postData = () => {
    // Validate email format
    if (!emailRegex.test(email)) {
      notifyA("Invalid Email");
      return;
    }

    // Send data to the server
    fetch("http://localhost:4000/adminSignup", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email.toLowerCase(),
        userName: userName,
        password: password,
        ip: ip,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          notifyA(data.error);
        } else {
          notifyB(data.message);
          navigate("/signin");
        }
      });
  };

  return (
    <div>
      <Navbar />
      <ToastContainer />
      <div className={styles.adminSignUp}>
        <div className={styles.formContainer}>
          <h1>Admin Sign-Up</h1>
          <div className={styles.inputGroup}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.inputField}
            />
          </div>
          <div className={styles.inputGroup}>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={styles.inputField}
            />
          </div>
          <div className={styles.inputGroup}>
            <input
              type="text"
              placeholder="Username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className={styles.inputField}
            />
          </div>
          <div className={styles.inputGroup}>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.inputField}
            />
          </div>
          <button
            className={styles.submitButton}
            onClick={postData}
          >
            Sign Up
          </button>
          <div className={styles.linkGroup}>
            <p>
              Already have an account?{" "}
              <Link to="/signin" className={styles.link}>
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminSignUp;