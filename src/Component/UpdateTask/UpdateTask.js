import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import style from '../UpdateTask/UpdateTask.module.css';
import Navbar from '../Navbar/Navbar';
import SideNavbar from '../../Admin/SideNavbar/SideNavbar.jsx'
const UpdateTask = () => {
  const { id: taskId } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState({
    PostBy: '',
    title: '',
    status: '',
    description: '',
    due_date: '',
    Assign_To: '',
    tc: false,
  });
  const [error, setError] = useState('');
  const [Userrole, setUserrole] = useState('');

  useEffect(() => {
    const storedUser = localStorage.getItem('user'); 
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUserrole(parsedUser.Userrole);
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
  
    const fetchTask = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/user/task/${taskId}`);
        const fetchedTask = response.data.result;
        setTask({
          PostBy: fetchedTask.PostBy,
          title: fetchedTask.title,
          status: fetchedTask.status,
          description: fetchedTask.description,
          tc: fetchedTask.tc || false,
          due_date: fetchedTask.due_date,
          Assign_To: fetchedTask.Assign_To,
        });
      } catch (error) {
        setError('Failed to fetch task details');
        console.error('Error:', error.message);
      }
    };
  
    if (taskId) fetchTask();
  }, [taskId]);
  

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setTask((prevState) => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedTask = {
      PostBy: task.PostBy,
      title: task.title,
      status: task.status,
      description: task.description,
      due_date: task.due_date,
      tc: task.tc,
    };

    if (Userrole === 'Admin') {
      updatedTask.Assign_To = task.Assign_To; 
    }

    try {
      const response = await axios.put(`http://localhost:8000/user/task/${taskId}`, updatedTask, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      alert(response.data.message);
      if (Userrole === 'Admin') {
        navigate('/allusertask');
      }else{
        navigate('/home');
      }
    } catch (error) {
      setError('Error updating task');
      console.error('Error:', error.message);
    }
  };

  return (
    <>
    <div className={style.withNavbar}>
    {Userrole === "Admin" ? <SideNavbar /> : <Navbar />}
      <div className={`${style.container} ${Userrole === "Admin" ? style.adminContainer : style.Containerresposiv}`}>
        <h1>Update Task</h1>
        <form className={style.mainCard} onSubmit={handleSubmit}>
          <div className={style.Allfield}>
            <div className={style.field}>
              <label>PostBy</label>
              <input type="text" name="PostBy" placeholder="Enter your PostBy" value={task.PostBy}  />
            </div>

            <div className={style.field}>
              <label>Title</label>
              <input type="text" name="title" placeholder="Title" value={task.title} onChange={handleChange} />
            </div>

            <div className={style.field}>
              <label>Status</label>
              <select name="status" value={task.status} onChange={handleChange}>
                <option value="">Select One</option>
                <option value="In Progress">In Progress</option>
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            <div className={style.field}>
              <label>Description</label>
              <input type="text" name="description" placeholder="Description" value={task.description} onChange={handleChange} />
            </div>

            {Userrole === 'Admin' && (
              <div className={style.field}>
                <label>Assign To</label>
                <input type="text" name="Assign_To" placeholder="Assign To" value={task.Assign_To} onChange={handleChange} />
              </div>
            )}

            <div className={style.field}>
              <label>Due Date</label>
              <input type="datetime-local" name="due_date" placeholder="Due Date" value={task.due_date} onChange={handleChange} />
            </div>

            <div className={style.field}>
              <label>
                Terms & Conditions:
                <input type="checkbox" name="tc" checked={task.tc} onChange={handleChange} />
              </label>
            </div>

            <div className={style.button}>
              <button type="submit" className={style.Submitfield}>Update Task</button>
            </div>
          </div>
          {error && <p className={style.error}>{error}</p>}
        </form>
      </div>
      </div>
    </>
  );
};

export default UpdateTask;
