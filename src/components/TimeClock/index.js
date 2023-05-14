import React, { useEffect, useRef, useState } from 'react';
import ProjectForm from './ProjectForm';
import TotalTimeOutput from './TotalTimeOutput';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProjects, updateProject } from '@src/store/slices/projects';
import ProjectList from './ProjectList';
import { setSelectedProject } from '@src/store/slices/selectedProject';
import LiveTimer from './LiveTimer';

const TimeClock = () => {
  const [timerStarted, setTimerStarted] = useState(false);
  const [projectStartTimes, setProjectStartTimes] = useState({});
  const startTime = useRef(null);
  const dispatch = useDispatch();
  const { projects } = useSelector((state) => state.projects);
  const { selectedProject } = useSelector((state) => state.selectedProject);

  useEffect(() => {
    const storedProjects = JSON.parse(localStorage.getItem('projects')) || [];
    dispatch(getAllProjects(storedProjects));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleProjectChange = (event) => {
    const project = projects.find((p) => p.projectName === event.target.value);
    dispatch(setSelectedProject(project));
  };

  const handleStartTime = () => {
    setProjectStartTimes((times) => ({
      ...times,
      [selectedProject.projectName]: new Date(),
    }));
    setTimerStarted(true);
  };

  const handleEndTime = () => {
    const end = new Date();
    const elapsedTime =
      Math.abs(end - projectStartTimes[selectedProject.projectName]) / 1000; // convert to seconds

    const updatedProject = {
      ...selectedProject,
      totalTime: selectedProject.totalTime + elapsedTime,
    };

    dispatch(updateProject(updatedProject));
    localStorage.setItem('projects', JSON.stringify(projects));
    dispatch(setSelectedProject(updatedProject));
    setTimerStarted(false);
  };

  return (
    <>
      <ProjectForm />
      {selectedProject && (
        <LiveTimer
          timerStarted={timerStarted}
          startTime={projectStartTimes[selectedProject?.projectName]}
          totalTime={selectedProject?.totalTime || 0}
        />
      )}
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
      <ProjectList />
    </>
  );
};

export default TimeClock;
