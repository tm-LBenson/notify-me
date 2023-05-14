import { getAllProjects } from '@src/store/slices/projects';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

const ProjectForm = () => {
  const [projectName, setProjectName] = useState('');
  const dispatch = useDispatch();
  const handleProjectNameChange = (event) => {
    setProjectName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let projects = JSON.parse(localStorage.getItem('projects')) || [];
    projects.push({ projectName, totalTime: 0 });
    localStorage.setItem('projects', JSON.stringify(projects));
    setProjectName('');
    projects = JSON.parse(localStorage.getItem('projects'));
    dispatch(getAllProjects(projects));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="project-form"
    >
      <label
        htmlFor="projectName"
        className="project-form__label"
      >
        Project Name:
      </label>
      <input
        type="text"
        id="projectName"
        name="projectName"
        value={projectName}
        onChange={handleProjectNameChange}
        className="project-form__input"
        required
      />
      <button
        type="submit"
        className="btn project-form__button project-form__button--active"
      >
        Add Project
      </button>
    </form>
  );
};

export default ProjectForm;
