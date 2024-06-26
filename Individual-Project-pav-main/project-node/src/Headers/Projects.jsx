import React, { useState, useEffect } from 'react';
import { NavLink, Route } from 'react-router-dom';
import Task from './TaskObj/Task';
import TaskDetails from './TaskObj/TaskDetails';
import '../Css/Project.css';
import axios from 'axios';
 
const TaskApp = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    name: '',
    description: '',
    priority: 'Low',
    status: 'To do',
  });
  const [showForm, setShowForm] = useState(false);
  const [addButtonText, setAddButtonText] = useState('Add new task');
  const [editingTask, setEditingTask] = useState(false);
  const [formClass, setFormClass] = useState('task-form');
 
  useEffect(() => {
    axios.get('http://localhost:8080/api/useremail/employees')
      .then((response) => {
        console.log(response.data);
        setTasks(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
 
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask({ ...newTask, [name]: value });
  };
 
  const handleStatusChange = () => {
    const statuses = ['To do', 'In Progress', 'Done'];
    const currentIndex = statuses.indexOf(newTask.status);
    const nextIndex = (currentIndex + 1) % statuses.length;
    setNewTask({
      ...newTask,
      status: statuses[nextIndex]
    });
  };
 
  const handleAddTask = () => {
    if (!showForm) {
      setShowForm(true);
      setAddButtonText('Close');
      setFormClass('task-form-grid');
    } else {
      setShowForm(false);
      setAddButtonText('Add new task');
      setEditingTask(false);
      setNewTask({
        name: '',
        description: '',
        priority: 'Low',
        status: 'To do',
      });
      setFormClass('task-form');
    }
  };
 
  const handleCreateTask = () => {
    if (validateTask()) {
      if (editingTask) {
        axios.put(`http://localhost:8080/api/useremail/employees/${newTask.id}`, newTask)
          .then(response => {
            const updatedTasks = tasks.map(task =>
              task.id === newTask.id ? { ...newTask, lastUpdated: new Date().toISOString() } : task
            );
            setTasks(updatedTasks);
            setNewTask({
              name: '',
              description: '',
              priority: 'Low',
              status: 'To do',
            });
            setEditingTask(false);
            setShowForm(false);
            setAddButtonText('Add new task');
            setFormClass('task-form');
          })
          .catch(error => {
            console.error(error);
          });
      } else {
        axios.post('http://localhost:8080/api/useremail/employees', newTask)
          .then(response => {
            const updatedTask = response.data;
            const updatedTasks = [...tasks, updatedTask];
            setTasks(updatedTasks);
            setNewTask({
              name: '',
              description: '',
              priority: 'Low',
              status: 'To do',
            });
            setShowForm(false);
            setAddButtonText('Add new task');
            setFormClass('task-form');
          })
          .catch(error => {
            console.error(error);
          });
      }
    } else {
      alert('Please fill in all fields');
    }
  };
 
  const validateTask = () => {
    return Object.values(newTask).every((val) => val !== '');
  };
 
  const handleDeleteTask = (taskId) => {
    axios.delete(`http://localhost:8080/api/useremail/employees/${taskId}`)
      .then(response => {
        const updatedTasks = tasks.filter(task => task.id !== taskId);
        setTasks(updatedTasks);
      })
      .catch(error => {
        console.error(error);
      });
  };
 
  const handleEditTask = (taskId) => {
    setEditingTask(true);
    const taskToEdit = tasks.find(task => task.id === taskId);
    setNewTask(taskToEdit);
    setShowForm(true);
    setAddButtonText('Close');
    setFormClass('task-form-grid');
  };
 
  return (
    <div className="task-app">
      <h1>Tasks</h1>
      <div className={formClass}>
        {showForm && (
          <>
            <input
              className="task-input"
              type="text"
              placeholder="Task Name"
              name="name"
              value={newTask.name}
              onChange={handleInputChange}
            />
            <textarea
              className="task-input"
              type="text"
              placeholder="Description"
              name="description"
              value={newTask.description}
              onChange={handleInputChange}
            ></textarea>
            <button className="task-button status-button" onClick={handleStatusChange}>
              {newTask.status}
            </button>
            <div className="button-row">
              <button className="task-button" onClick={handleAddTask}>Close</button>
              <button className="task-button" onClick={handleCreateTask}>{editingTask ? 'Update' : 'Create'}</button>
            </div>
          </>
        )}
        {!showForm && (
          <div className="button-row">
            <button className="task-button" onClick={handleAddTask}>{addButtonText}</button>
          </div>
        )}
      </div>
      <div>
        {tasks.map((task, index) => (
          <div key={index}>
            <Task
              className="task-item"
              task={task}
              onDeleteTask={handleDeleteTask}
              onEditTask={handleEditTask}
            />
          </div>
        ))}
      </div>
      <Route path="/tasks/:id" component={() => <TaskDetails tasks={tasks} />} />
    </div>
  );
};
 
export default TaskApp;