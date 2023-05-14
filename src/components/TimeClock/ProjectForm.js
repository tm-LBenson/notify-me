import React, { useState } from 'react';

const ProjectForm = () => {
  const [projectName, setProjectName] = useState('');

  const handleProjectNameChange = (event) => {
    setProjectName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const projects = JSON.parse(localStorage.getItem('projects')) || [];
    projects.push({ projectName, totalTime: 0 });
    localStorage.setItem('projects', JSON.stringify(projects));
    setProjectName('');
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
