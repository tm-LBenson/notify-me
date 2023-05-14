import React from 'react';
import { useSelector } from 'react-redux';
import TotalTimeOutput from './TotalTimeOutput';

export default function ProjectList() {
  const { projects } = useSelector((state) => state.projects);

  return (
    <section>
      <ul>
        {projects.map((project) => {
          return (
            <li key={project.projectName}>
              <p>{project.projectName}</p>
              <TotalTimeOutput totalTime={project.totalTime} />
            </li>
          );
        })}
      </ul>
    </section>
  );
}
