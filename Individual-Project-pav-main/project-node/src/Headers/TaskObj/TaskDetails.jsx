import React from 'react';
import Task from './Task';

const TaskDetails = ({ tasks }) => {
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString(); // Adjust the format as needed
    };

    const isValidDate = (dateString) => {
        if (!dateString) return false;
        const date = new Date(dateString);
        // Check for "70-01-01 03:00" and invalid dates
        return dateString !== "70-01-01 03:00" && !isNaN(date);
    };

    return (
        <div>
            <h2>Task Details</h2>
            {tasks.map((task, index) => (
                <div key={index}>
                    <Task task={task} />
                    <p>Creation Date: {formatDate(task.creationDate)}</p>
                    {isValidDate(task.lastUpdated) && (
                        <p>Last Updated: {formatDate(task.lastUpdated)}</p>
                    )}
                </div>
            ))}
        </div>
    );
};

export default TaskDetails;