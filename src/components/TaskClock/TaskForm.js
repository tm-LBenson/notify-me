import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '@src/store/slices/tasks/tasksSlice';

const TaskForm = () => {
  const [taskName, setTaskName] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (taskName.trim() !== '') {
      const newTask = {
        id: crypto.randomUUID(),
        taskName,
        days: [],
      };
      dispatch(addTask(newTask));
      setTaskName('');
    }
  };

  const handleChange = (event) => {
    setTaskName(event.target.value);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="task-form"
    >
      <input
        type="text"
        value="springhill-code-102n1"
        onChange={handleChange}
        placeholder="springhill-code-102n1"
        required
      />
      <button
        type="submit"
        className="btn task-form__button"
      >
        Add Class
      </button>
    </form>
  );
};

export default TaskForm;
