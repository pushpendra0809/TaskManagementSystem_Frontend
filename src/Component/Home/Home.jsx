import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskCard from './TaskCard/TaskCard'; 
import style from '../Home/Home.module.css';
import Navbar from '../Navbar/Navbar'
const Home = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loginerror, setLoginError] = useState(null);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const fetchUserId = () => {
      const token = localStorage.getItem('token');  
      if (token) {
        try {
          const decodedToken = JSON.parse(atob(token.split('.')[1])); 
          setUserId(decodedToken.userID);  
        } catch (error) {
          setError('Error decoding token');
        }
      }else{
        setLoginError("Please Login")
      } 
    };

    fetchUserId();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/user/taskbyuser/${userId}`);
        setData(response.data.result);
        setError(null);
      } catch (error) {
        setError('Failed to fetch data.');
      }
    };

    fetchData();
  }, [userId]);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8000/user/task/${id}`);
      alert(response.data.message);
      setData(data.filter(task => task._id !== id));
    } catch (error) {
      console.error("Error deleting task:", error.message);
    }
  };

  const CompletedTask = data.filter((item) => item.status === "Completed");
  const PendingTask = data.filter((item) => item.status === "Pending");
  const ProgressTask = data.filter((item) => item.status === "In Progress");

  return (
    <>
      <Navbar />
      <div className={style.mainContainer}>
      <div className={style.Card}>
      <TaskCard title="Pending Tasks" tasks={PendingTask} loginerror={loginerror} handleDelete={handleDelete} />
      </div>
      <div className={style.Card}>
      <TaskCard title="In Progress Tasks" tasks={ProgressTask} loginerror={loginerror} handleDelete={handleDelete} />
      </div>
      <div className={style.Card}>
      <TaskCard title="Completed Tasks" tasks={CompletedTask} loginerror={loginerror} handleDelete={handleDelete} />
      </div>
      {error && <p className={style.error}>{error}</p>}
      </div>
    </>
  );
};

export default Home;
