import React, { useEffect, useRef, useState } from 'react';
import ProjectForm from './ProjectForm';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProjects, updateProject } from '@src/store/slices/projects';
import ProjectList from './ProjectList';
import { setSelectedProject } from '@src/store/slices/selectedProject';
import LiveTimer from './LiveTimer';

const TimeClock = () => {
  const [timerStarted, setTimerStarted] = useState(false);
  const [projectStartTimes, setProjectStartTimes] = useState({});
  const [liveTotalTime, setLiveTotalTime] = useState(0);
  const dispatch = useDispatch();
  const { projects } = useSelector((state) => state.projects);
  const { selectedProject } = useSelector((state) => state.selectedProject);

  const prevSelectedProject = useRef();

  useEffect(() => {
    if (
      prevSelectedProject.current &&
      selectedProject.projectName !== prevSelectedProject.current.projectName
    ) {
      setLiveTotalTime(0);
      setTimerStarted(false);
    }
    prevSelectedProject.current = selectedProject;
  }, [selectedProject]);

  useEffect(() => {
    const storedProjects = JSON.parse(localStorage.getItem('projects')) || [];
    dispatch(getAllProjects(storedProjects));
  }, [dispatch]);

  useEffect(() => {
    if (projects.length > 0) {
      localStorage.setItem('projects', JSON.stringify(projects));
    }
  }, [projects]);

  useEffect(() => {
    let intervalId;
    if (timerStarted) {
      intervalId = setInterval(() => {
        const elapsedTime =
          (new Date() - projectStartTimes[selectedProject.projectName]) / 1000;
        setLiveTotalTime(selectedProject.totalTime + elapsedTime);
      }, 1000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [timerStarted, selectedProject, projectStartTimes]);

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
    const elapsedTime = Math.round(
      (end - projectStartTimes[selectedProject.projectName]) / 1000,
    );

    const updatedProject = {
      ...selectedProject,
      totalTime: selectedProject.totalTime + elapsedTime,
    };

    dispatch(updateProject(updatedProject));
    dispatch(setSelectedProject(updatedProject));
    setLiveTotalTime(updatedProject.totalTime);
    setTimerStarted(false);
  };

  return (
    <>
      <div className="time-clock">
        <section className="time-clock__form">
          <ProjectForm />
          {selectedProject && (
            <LiveTimer
              timerStarted={timerStarted}
              startTime={projectStartTimes[selectedProject?.projectName]}
              totalTime={liveTotalTime}
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
              className="btn project-timer__button clock-in project-timer__button--active"
            >
              Clock In
            </button>
            <button
              onClick={handleEndTime}
              disabled={!timerStarted}
              className="btn project-timer__button clock-out project-timer__button--active"
            >
              Clock Out
            </button>
          </div>
        </section>
        <ProjectList />
      </div>
    </>
  );
};

export default TimeClock;
