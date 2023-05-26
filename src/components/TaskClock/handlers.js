import { useDispatch } from 'react-redux';
import {
  addDay,
  addClass,
  removeClass,
  updateClass,
  addTimeBlock,
  removeTimeBlock,
  updateTimeBlock,
  addMentoringSession,
  removeMentoringSession,
  updateMentoringSession,
  selectClass,
  selectDay,
  selectTimeBlock,
  selectMentoringSession,
} from '../../store/slices/classes/classesSlice';

const useHandlers = () => {
  const dispatch = useDispatch();

  const handleAddClass = (className) => {
    const newClass = {
      id: crypto.randomUUID(),
      className,
      days: [],
    };
    dispatch(addClass(newClass));
  };

  const handleSelectClass = (classId) => {
    dispatch(selectClass(classId));
  };

  const handleAddDay = (dayName) => {
    const newDay = {
      id: crypto.randomUUID(),
      dayName,
      timeBlocks: [],
      mentoringSessions: [],
    };
    dispatch(addDay({ classId: selectedClassId, newDay }));
  };

  const handleSelectDay = (dayId) => {
    dispatch(selectDay(dayId));
  };

  const handleAddTimeBlock = (startTime, endTime) => {
    const newTimeBlock = {
      id: crypto.randomUUID(),
      startTime,
      endTime,
    };
    dispatch(addTimeBlock({ dayId: selectedDayId, newTimeBlock }));
  };

  const handleSelectTimeBlock = (timeBlockId) => {
    dispatch(selectTimeBlock(timeBlockId));
  };

  const handleAddMentoringSession = (sessionName) => {
    const newMentoringSession = {
      id: crypto.randomUUID(),
      sessionName,
    };
    dispatch(
      addMentoringSession({ dayId: selectedDayId, newMentoringSession }),
    );
  };

  const handleSelectMentoringSession = (mentoringSessionId) => {
    dispatch(selectMentoringSession(mentoringSessionId));
  };

  return {
    handleAddClass,
    handleSelectClass,
    handleAddDay,
    handleSelectDay,
    handleAddTimeBlock,
    handleSelectTimeBlock,
    handleAddMentoringSession,
    handleSelectMentoringSession,
  };
};

export default useHandlers;
