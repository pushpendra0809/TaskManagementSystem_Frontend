import React, { useState } from 'react';
import { Link } from "react-router-dom";
import style from './TaskCard.module.css';

const TaskCard = ({ title, tasks, handleDelete, loginerror }) => {
  const [showCard, setShowCard] = useState(6);

  const AddmoreCard = () => {
    setShowCard((prev) => Math.min(prev + 3, tasks.length));
  };

  const AddLessCard = () => {
    setShowCard((prev) => Math.max(prev - 3, 6));
  };

  return (
    <div className={style.card}>
      <h1>{title}</h1>
      <div className={style.CardIteam}>
        {tasks.length > 0 ? (
          tasks.slice(0, showCard).map((product) => (
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
                  <button className={style.Btncancle} onClick={() => handleDelete(product._id)}>Delete Task</button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <>
          <p>No tasks available.</p>
          <p>{loginerror}</p>
          </>
        )}
      </div>
      <div className={style.showButton}>
        {showCard < tasks.length && <button onClick={AddmoreCard}>Show More</button>}
        {showCard > 4 && <button onClick={AddLessCard}>Show Less</button>}
      </div>
    </div>
  );
};

export default TaskCard;
