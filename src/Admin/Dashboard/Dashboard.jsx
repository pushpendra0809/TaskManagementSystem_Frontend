import React, { useEffect, useState } from 'react';
import DashNavbar from '../SideNavbar/SideNavbar.jsx';
import style from '../Dashboard/Dashboard.module.css';
import axios from 'axios';
import {Hostlink} from '../../Component/Hostlink/Hostlink.jsx'
const Dashboard = () => {
    const [userId, setUserId] = useState(""); 
      const [error, setError] = useState(null); 
    
    const [stats, setStats] = useState({
        totalAssigned: 0,
        totalUserTasks: 0,
        totalInProgress: 0,
        totalCompleted: 0,
    });
    const [latestTasks, setLatestTasks] = useState([]);

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
                const AllData = response.data.result;
                const userAssignedTasks = AllData.filter(task => task.userId === userId);
                const assignedTasks = userAssignedTasks.length;
                const userTasks = AllData.length;
                const inProgressTasks = AllData.filter(task => task.status === 'In Progress').length;
                const completedTasks = AllData.filter(task => task.status === 'Completed').length;

                setStats({
                    totalAssigned: assignedTasks,
                    totalUserTasks: userTasks,
                    totalInProgress: inProgressTasks,
                    totalCompleted: completedTasks
                });

                const latestAssigned = userAssignedTasks.filter(task => task.Assign_To).slice(-3).reverse(); 

                setLatestTasks(latestAssigned);
            } catch (error) {
                console.error("Failed to fetch data.");
            }
        };
        fetchData();
    }, [userId]);

    return (
        <> 

        <div className={style.withNavbar}>
            <DashNavbar />
            <div className={style.AllContent}>
            <div className={style.mainContainer12}>
                <div className={style.cardIteam12}>
                    <div className={style.Card12}>
                        <h4>Total Assigned Tasks</h4>
                        <p>{stats.totalAssigned}</p>
                    </div>
                    <div className={style.Card12}>
                        <h4>Total User Tasks</h4>
                        <p>{stats.totalUserTasks}</p>
                    </div>
                    <div className={style.Card12}>
                        <h4>Total In Progress Tasks</h4>
                        <p>{stats.totalInProgress}</p>
                    </div>
                    <div className={style.Card12}>
                        <h4>Total Completed Tasks</h4>
                        <p>{stats.totalCompleted}</p>
                    </div>
                </div>
            </div>

            <div className={style.newDiv}>
                <div className={style.newDivName}>
                  <h1>Latest Assign Task</h1>
                </div>

                <div className={style.newDivCard}>
                <div className={style.CardIteam}>
                    {latestTasks.length > 0 ? (
                        latestTasks.map((product) => (
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
                                <h4>Assign To:</h4>
                                <p>{product.Assign_To}</p>
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
            </div>
            </div>
            </div>
        </>
    );
}

export default Dashboard;
