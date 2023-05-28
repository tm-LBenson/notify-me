import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ClassList from './ClassList';

import DayList from './DayList';

import TimeBlockList from './EventAccordion';

import Mentorships from './Mentorships';
import { addEvent } from '@src/store/slices/classes/classesSlice';
import Timeline from './Timeline.js';

const TaskClock = () => {
  const dispatch = useDispatch();
  const { selectedClass, selectedDay } = useSelector((state) => state.selected);

  const handleSelectTimeBlock = (timeBlockId) => {
    dispatch(selectTimeBlock(timeBlockId));
  };
  const handleAddTimeBlock = (data) => {
    const newTimeBlock = {
      data,
    };
    dispatch(addEvent({ day: selectedDay, newTimeBlock }));
  };
  return (
    <>
      
      <Timeline />
      <div className="class-clock">
        <ClassList />
        {selectedClass && (
          <>
            <DayList
              days={selectedClass.days}
              onSelectDay={(item) => dispatch(selectDay(item))}
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
    </>
  );
};

export default TaskClock;
