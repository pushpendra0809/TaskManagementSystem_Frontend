import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskCard from './AllUserTaskCard/AllUserTaskCard.jsx';
import style from '../AllUserTask/AllUserTask.module.css';
import DashNavbar from '../SideNavbar/SideNavbar.jsx';
import { Hostlink } from '../../Component/Hostlink/Hostlink.jsx';
const AllUserTask = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [selectedAssignee, setSelectedAssignee] = useState('All');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${Hostlink}/user/task/`);
        setData(response.data.result);
        setError(null);
      } catch (error) {
        setError('Failed to fetch data.');
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${Hostlink}/user/task/${id}`);
      alert(response.data.message);
      setData(data.filter(task => task._id !== id));
    } catch (error) {
      console.error("Error deleting task:", error.message);
    }
  };

  const uniqueAssignees = ['All', ...new Set(data.map(task => task.Assign_To))];

  const filteredData = selectedAssignee === 'All' ? data : data.filter(task => task.Assign_To === selectedAssignee);

  const PendingTask = filteredData.filter((item) => item.status === "Pending");
  const ProgressTask = filteredData.filter((item) => item.status === "In Progress");
  const CompletedTask = filteredData.filter((item) => item.status === "Completed");

  return (
    <>
      <div className={style.withNavbar}>
        <DashNavbar />
        <div className={style.CardName}>
          <div className={style.TopHeader}>
          <h1 className={style.CardNameHeading}>All User Task</h1>

          <div className={style.filterDropDown}>
            <label htmlFor="assigneeFilter" style={{color:"aqua"}}>Filter by Assign To : </label>
            <select className={style.filterBar}
              id="assigneeFilter"
              value={selectedAssignee}
              onChange={(e) => setSelectedAssignee(e.target.value)}
            >
              {uniqueAssignees.map((assignee, index) => (
                <option key={index} value={assignee}>
                  {assignee}
                </option>
              ))}
            </select>
          </div>
          </div>

          <div className={style.mainContainer}>
            <div className={style.Card}>
              <TaskCard title="Pending Tasks" tasks={PendingTask} handleDelete={handleDelete} />
            </div>
            <div className={style.Card}>
              <TaskCard title="Progress Tasks" tasks={ProgressTask} handleDelete={handleDelete} />
            </div>
            <div className={style.Card}>
              <TaskCard title="Completed Tasks" tasks={CompletedTask} handleDelete={handleDelete} />
            </div>
            {error && <p className={style.error}>{error}</p>}
          </div>
        </div>
      </div>
    </>
  );
};

export default AllUserTask;
