import React from 'react';
import { useSelector } from 'react-redux';

import ClassList from './ClassList';

import DayList from './DayList';

import TimeBlockList from './EventAccordion';

import useHandlers from './handlers';
import Mentorships from './Mentorships';

const TaskClock = () => {
  const { handleSelectDay, handleAddTimeBlock, handleSelectTimeBlock } =
    useHandlers();

  const { selectedClass, selectedDay } = useSelector((state) => state.selected);

  return (
    <div className="class-clock">
      <ClassList />
      {selectedClass && (
        <>
          <DayList
            days={selectedClass.days}
            onSelectDay={handleSelectDay}
          />
          {selectedDay && (
            <>
              <TimeBlockList
                timeBlocks={selectedDay.timeBlocks}
                onSelectTimeBlock={handleSelectTimeBlock}
                onAddTimeBlock={handleAddTimeBlock}
              />

              <Mentorships />
            </>
          )}
        </>
      )}
    </div>
  );
};

export default TaskClock;
