import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Link} from "react-router-dom"
import style from '../AdminAsignTask/AdminAsignTask.module.css';
import DashNavbar from '../SideNavbar/SideNavbar.jsx';
import {Hostlink} from '../../Component/Hostlink/Hostlink.jsx'
const AdminAsignTask = () => {
  const [data, setData] = useState([]); 
  const [showCard, setShowCard] = useState(6);
  const [error, setError] = useState(null); 
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
      } else {
        setError('No token found in localStorage');
      }
    };

    fetchUserId();
  }, []); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${Hostlink}/user/task/`); 
        const allTask = response.data.result;
        const filteredTask = allTask.filter(task => task.userId === userId);
        setData(filteredTask); 
      } catch (error) {
        setError('Failed to fetch data.');
      }
    };

    fetchData();
  }, [userId]); 


  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${Hostlink}/user/task/${id}`);
      alert(response.data.message); 
      setData(data.filter(product => product._id !== id));
    } catch (error) {
      console.error("Error deleting product:", error.message);
    }
  };

  const AddmoreCard = () => {
    setShowCard((prev) => Math.min(prev + 3, data.length));
  };

  const AddLessCard = () => {
    setShowCard((prev) => Math.max(prev - 3, 6));
  };


  return (
    <>
    <div className={style.withNavbar}>
    <DashNavbar />
    <div className={style.fullContainer}>
      <div className={style.card}>
        <div>
          <h1 className={style.mainHeading}>Admin Asign Task</h1>
        </div>
        <div className={style.CardIteam}>
          {data.length > 0 ? (
            data.slice(0, showCard).map((product) => (
              <div key={product._id} className={style.mainContainer}>
                <div className={style.DocterCard}>
                  <div className={style.iteam}>
                    <h4>Title:</h4>
                    <p>{product.title}</p>
                  </div>
                  <div className={style.iteam}>
                    <h4>Description:</h4>
                    <p>{product.description}</p>
                  </div>
                  <div className={style.iteam}>
                    <h4>Due Date :</h4>
                    <p>{product.due_date}</p>
                  </div>
                  <div className={style.iteam}>
                    <h4>PostBy:</h4>
                    <p>{product.PostBy}</p>
                  </div>
                  <div className={style.iteam}>
                    <h4>Status:</h4>
                    <p>{product.status}</p>
                  </div>
                  <div className={style.iteam}>
                    <Link className={style.Btncancles} to={`/updatetask/${product._id}`}>Update Task</Link>
                     <button  className={style.Btncancle} onClick={() => handleDelete(product._id)}>Delete Task</button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No task available for you.</p>
          )}
        </div>
        {error && <p className={style.error}>{error}</p>}
      </div>
      <div className={style.showButton}>
        {showCard < data.length && (
          <button onClick={AddmoreCard}>Show More</button>
        )}
        {showCard > 4 && (
          <button onClick={AddLessCard}>Show Less</button>
        )}
      </div>
      </div>
      </div>
      
    </>
  );
};

export default AdminAsignTask;