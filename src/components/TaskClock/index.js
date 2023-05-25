import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ClassForm from './ClassForm';
import ClassList from './ClassList';
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
    handleAddClass,
    handleSelectClass,
    handleAddDay,
    handleSelectDay,
    handleAddTimeBlock,
    handleSelectTimeBlock,
    handleAddMentoringSession,
    handleSelectMentoringSession,
  } = useHandlers();
  const dispatch = useDispatch();
  const { classes } = useSelector((state) => state.classes);
  const { selectedStudent } = useSelector((state) => state.selected);
  const {
    selectedClass,
    selectedDay,
    selectedTimeBlock,
    selectedMentoringSession,
  } = useSelector((state) => state.selected);

  return (
    <div className="class-clock">
      <ClassForm onAddClass={handleAddClass} />
      <ClassList
        classes={classes}
        onSelectClass={handleSelectClass}
      />
      {selectedClass && (
        <>
          <DayForm onAddDay={handleAddDay} />
          <DayList
            days={selectedClass.days}
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
