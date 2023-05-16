import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addDay,
  addTimeBlock,
  addMentoringSession,
} from '../../store/slices/tasks/tasksSlice';
import {
  setSelectedTask,
  setSelectedDay,
  setSelectedTimeBlock,
  setSelectedMentoringSession,
  setSelectedStudent,
} from '../../store/slices/tasks/selectedSlice';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import DayForm from './DayForm';
import DayList from './DayList';
import TimeBlockForm from './TimeBlockForm';
import TimeBlockList from './TimeBlockList';
import MentoringSessionForm from './MentoringSessionForm';
import MentoringSessionList from './MentoringSessionList';
import useHandlers from './handlers';
import NewStudentForm from './NewStudentForm';
import StudentView from './StudentView';
const TaskClock = () => {
  const {
    handleAddTask,
    handleSelectTask,
    handleAddDay,
    handleSelectDay,
    handleAddTimeBlock,
    handleSelectTimeBlock,
    handleAddMentoringSession,
    handleSelectMentoringSession,
  } = useHandlers();
  const dispatch = useDispatch();
  const { tasks } = useSelector((state) => state.tasks);
  const { selectedStudent } = useSelector((state) => state.selected);
  const {
    selectedTask,
    selectedDay,
    selectedTimeBlock,
    selectedMentoringSession,
  } = useSelector((state) => state.selected);

  return (
    <div className="task-clock">
      <TaskForm onAddTask={handleAddTask} />
      <TaskList
        tasks={tasks}
        onSelectTask={handleSelectTask}
      />
      {selectedTask && (
        <>
          <DayForm onAddDay={handleAddDay} />
          <DayList
            days={selectedTask.days}
            onSelectDay={handleSelectDay}
          />
          {selectedDay && (
            <>
              <TimeBlockForm onAddTimeBlock={handleAddTimeBlock} />
              <TimeBlockList
                timeBlocks={selectedDay.timeBlocks}
                onSelectTimeBlock={handleSelectTimeBlock}
              />
              <StudentView />
              <NewStudentForm />
              {selectedStudent && (
                <MentoringSessionForm
                  onAddMentoringSession={handleAddMentoringSession}
                />
              )}
              <MentoringSessionList
                mentoringSessions={selectedDay.mentoringSessions}
                onSelectMentoringSession={handleSelectMentoringSession}
              />
            </>
          )}
        </>
      )}
    </div>
  );
};

export default TaskClock;
