import { useDispatch } from 'react-redux';
import {
  addDay,
  addTask,
  removeTask,
  updateTask,
  addTimeBlock,
  removeTimeBlock,
  updateTimeBlock,
  addMentoringSession,
  removeMentoringSession,
  updateMentoringSession,
  selectTask,
  selectDay,
  selectTimeBlock,
  selectMentoringSession,
} from '../../store/slices/tasks/tasksSlice';

const useHandlers = () => {
  const dispatch = useDispatch();

  const handleAddTask = (taskName) => {
    const newTask = {
      id: crypto.randomUUID(),
      taskName,
      days: [],
    };
    dispatch(addTask(newTask));
  };

  const handleSelectTask = (taskId) => {
    dispatch(selectTask(taskId));
  };

  const handleAddDay = (dayName) => {
    const newDay = {
      id: crypto.randomUUID(),
      dayName,
      timeBlocks: [],
      mentoringSessions: [],
    };
    dispatch(addDay({ taskId: selectedTaskId, newDay }));
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
    handleAddTask,
    handleSelectTask,
    handleAddDay,
    handleSelectDay,
    handleAddTimeBlock,
    handleSelectTimeBlock,
    handleAddMentoringSession,
    handleSelectMentoringSession,
  };
};

export default useHandlers;
