import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import '../Css/Progress.css';
import axios from "axios"; 

const Taskss = () => {
  const [tasks, setTasks] = useState([]);
  const [viewType, setViewType] = useState('list');

  useEffect(() => {
    // Загружаем задачи с сервера при монтировании компонента
    axios.get('http://localhost:8080/api/employees')
      .then((response) => {
        console.log(response.data);
        setTasks(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className={`task-app ${viewType === 'list' ? 'list-view' : 'grid-view'}`}>
      <h1>Tasks</h1>
      <div>
        <div className="view-buttons">
          <button className={viewType === 'list' ? 'active' : ''} onClick={() => setViewType('list')}>List</button>
          <button className={viewType === 'grid' ? 'active' : ''} onClick={() => setViewType('grid')}>Grid</button>
        </div>
        <div className={`columns ${viewType === 'list' ? 'gridobj' : ''}`}>
          <div className={`column ${viewType === 'list' ? 'list-view-column' : 'grid-view-column'}`}>
            <h2>Todo</h2>
            {viewType === 'list' ? (
              <div className="list-view">
                {tasks.filter(task => task.status === 'To do').map((task, index) => (
                  <div className='obj-change' key={index}>
                    <p>{task.name}</p>
                    <NavLink className="details-link-nav" to={`/projects/${task.id}`}>More Details</NavLink>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid-view">
                {tasks.filter(task => task.status === 'To do').map((task, index) => (
                  <div key={index}>
                    <p>{task.name}</p>
                    <NavLink className="details-link-nav" to={`/projects/${task.id}`}>More Details</NavLink>
                  </div>
                ))}
              </div>
            )}
            {tasks.filter(task => task.status === 'To do').length === 0 && <p>Lets start</p>}
          </div>
          <div className={`column ${viewType === 'list' ? 'list-view-column' : 'grid-view-column'}`}>
            <h2>In Progress</h2>
            {viewType === 'list' ? (
              <div className="list-view">
                {tasks.filter(task => task.status === 'In Progress').map((task, index) => (
                  <div className='obj-change' key={index}>
                    <p>{task.name}</p>
                    <NavLink className="details-link-nav" to={`/projects/${task.id}`}>More Details</NavLink>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid-view">
                {tasks.filter(task => task.status === 'In Progress').map((task, index) => (
                  <div key={index}>
                    <p>{task.name}</p>
                    <NavLink className="details-link-nav" to={`/projects/${task.id}`}>More Details</NavLink>
                  </div>
                ))}
              </div>
            )}
            {tasks.filter(task => task.status === 'In Progress').length === 0 && <p>No tasks in progress</p>}
          </div>
          <div className={`column ${viewType === 'list' ? 'list-view-column' : 'grid-view-column'}`}>
            <h2>Done</h2>
            {viewType === 'list' ? (
              <div className="list-view">
                {tasks.filter(task => task.status === 'Done').map((task, index) => (
                  <div className='obj-change' key={index}>
                    <p>{task.name}</p>
                    <NavLink className="details-link-nav" to={`/projects/${task.id}`}>More Details</NavLink>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid-view">
                {tasks.filter(task => task.status === 'Done').map((task, index) => (
                  <div key={index}>
                    <p>{task.name}</p>
                    <NavLink className="details-link-nav" to={`/projects/${task.id}`}>More Details</NavLink>
                  </div>
                ))}
              </div>
            )}
            {tasks.filter(task => task.status === 'Done').length === 0 && <p>No tasks completed</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Taskss;
