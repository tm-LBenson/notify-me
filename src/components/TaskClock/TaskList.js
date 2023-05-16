import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedTask } from '@src/store/slices/tasks/selectedSlice';

const TaskList = () => {
  const dispatch = useDispatch();
  const { tasks } = useSelector((state) => state.tasks);

  const handleTaskSelect = (task) => {
    dispatch(setSelectedTask(task));
  };

  return (
    <div className="task-list">
      <h2>All Classes</h2>
      {tasks.length > 0 ? (
        <ul>
          {tasks.map((task) => (
            <li
              key={task.taskName}
              onClick={() => handleTaskSelect(task)}
            >
              {task.taskName}
            </li>
          ))}
        </ul>
      ) : (
        <p>No tasks yet</p>
      )}
    </div>
  );
};

export default TaskList;
