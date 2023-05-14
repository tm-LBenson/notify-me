import React, { useEffect, useState } from 'react';
import ProjectForm from './ProjectForm';
import TotalTimeOutput from './TotalTimeOutput';

const TimeClock = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [timerStarted, setTimerStarted] = useState(false);
  const [startTime, setStartTime] = useState(null);

  useEffect(() => {
    const storedProjects = JSON.parse(localStorage.getItem('projects')) || [];
    setProjects(storedProjects);
  }, []);

  const handleProjectChange = (event) => {
    const project = projects.find((p) => p.projectName === event.target.value);
    setSelectedProject(project);
  };

  const handleStartTime = () => {
    setStartTime(new Date());
    setTimerStarted(true);
  };

  const handleEndTime = () => {
    const end = new Date();
    const elapsedTime = Math.abs(end - startTime) / 1000; // convert to seconds
    const updatedProjects = projects.map((p) => {
      if (p.projectName === selectedProject.projectName) {
        p.totalTime += elapsedTime;
      }
      return p;
    });
    localStorage.setItem('projects', JSON.stringify(updatedProjects));
    setTimerStarted(false);
  };

  return (
    <>
      <ProjectForm />
      <div className="project-timer">
        <select
          onChange={handleProjectChange}
          value={selectedProject?.projectName}
        >
          <option value="">Select a project</option>
          {projects.map((project) => (
            <option
              key={project.projectName}
              value={project.projectName}
            >
              {project.projectName}
            </option>
          ))}
        </select>
        <button
          onClick={handleStartTime}
          disabled={timerStarted || !selectedProject}
          className="btn project-timer__button project-timer__button--active"
        >
          Clock In
        </button>
        <button
          onClick={handleEndTime}
          disabled={!timerStarted}
          className="btn project-timer__button project-timer__button--active"
        >
          Clock Out
        </button>
        {selectedProject && (
          <TotalTimeOutput totalTime={selectedProject.totalTime} />
        )}
      </div>
    </>
  );
};

export default TimeClock;
