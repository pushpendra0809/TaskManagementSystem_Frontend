import React, { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import style from "../CreateTask/CreateTask.module.css";
import Navbar from "../Navbar/Navbar.js";
import SideNavbar from "../../Admin/SideNavbar/SideNavbar.jsx"
const CreateTask = () => {
  const [PostBy, setPostBy] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [due_date, setDue_date] = useState("");
  const [status, setStatus] = useState("");
  const [Assign_To, setAssign_To] = useState("");
  const [tc, setTc] = useState(false);
  const [userId, setUserId] = useState(null);
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = () => {
      const token = localStorage.getItem("token");
      const userData = localStorage.getItem("user");

      if (token) {
        try {
          const decodedToken = JSON.parse(atob(token.split(".")[1]));
          if (decodedToken?.userID) {
            setUserId(decodedToken.userID);
          } else {
            setError("User ID not found in token");
          }
        } catch (error) {
          setError("Error decoding token");
        }
      } else {
        setError("No token found in localStorage");
      }

      if (userData) {
        try {
          const user = JSON.parse(userData);
          if (user?.Userrole) {
            setRole(user.Userrole);
            setEmail(user.email);
            if (user.Userrole === "User") {
              setAssign_To(user.email);
            }
          } else {
            setError("User role not found in localStorage.");
          }
          if (user?.firstname && user?.lastname) {
            setPostBy(`${user.firstname} ${user.lastname}`);
          } else {
            setError("First name or last name not found in localStorage.");
          }
        } catch (error) {
          setError("Error parsing user data from localStorage.");
        }
      }
    };

    fetchUserDetails();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      setError("User is not logged in.");
      return;
    }

    const formData = {
      userId,
      PostBy,
      title,
      due_date,
      description,
      status,
      Assign_To,
      tc,
    };

    try {
      const response = await axios.post("http://localhost:8000/user/task/", formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.data?.status === "Success") {
        alert("Task successfully assigned!");
        if(role === "Admin"){
          navigate("/adminasigntask");
        }else{
          navigate("/home");
        }
      } else {
        setError(response.data.message || "Something went wrong");
      }
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred while assigning the task.");
    }
  };

  return (
    <>
    <div className={style.withNavbar}>
    {role === "Admin" ? <SideNavbar /> : <Navbar />}
      <div className={`${style.container} ${role === "Admin" ? style.adminContainer : style.Containerresposiv}`}>
        <div className={style.mainheading}>
          <h2>Add Task</h2>
        </div>
        <form className={style.mainCard} onSubmit={handleSubmit}>
          <div className={style.Allfield}>
            <div className={style.field}>
              <label>Post By</label>
              <input type="text" value={PostBy}  />
            </div>
            <div className={style.field}>
              <label>Title</label>
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className={style.field}>
              <label>Due Date</label>
              <input type="datetime-local" value={due_date} onChange={(e) => setDue_date(e.target.value)} />
            </div>
            <div className={style.field}>
              <label>Description</label>
              <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>

            {role === "Admin" ? (
              <div className={style.field}>
                <label>Assign To</label>
                <input type="text" value={Assign_To} onChange={(e) => setAssign_To(e.target.value)} />
              </div>
            ) : (
              <div className={style.field}>
                <label>Assign To</label>
                <input type="text" value={email} readOnly />
              </div>
            )}

            <div className={style.field}>
              <label>Status</label>
              <select value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="">Select One</option>
                <option value="In Progress">In Progress</option>
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
            <div className={style.field}>
              <label>
                Terms & Conditions:
                <input type="checkbox" checked={tc} onChange={(e) => setTc(e.target.checked)} />
              </label>
            </div>
          </div>
          <div className={style.button}>
            <button type="submit">Add Task</button>
          </div>
          {error && <p className={style.error}>{error}</p>}
        </form>
      </div>
      </div>
    </>
  );
};

export default CreateTask;
