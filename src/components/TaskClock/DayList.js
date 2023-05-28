import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addDay,
  getAllDays,
  getAllEvents,
} from '@src/store/slices/classes/classesSlice';
import { setSelectedDay } from '@src/store/slices/classes/selectedSlice';

const DayAccordion = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [dayName, setDayName] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const { selectedClass, selectedDay } = useSelector((state) => state.selected);
  const { days } = useSelector((state) => state.classes);

  useEffect(() => {
    dispatch(getAllDays());
  }, [dispatch]);

  useEffect(() => {
    if (selectedDay) {
      dispatch(getAllEvents());
    }
  }, [dispatch, selectedDay]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const newDay = {
      dayName,
    };
    dispatch(addDay({ class: selectedClass, newDay }));

    dispatch(setSelectedDay(newDay));
    setDayName('');
    setIsFormOpen(false);
    setIsOpen(false);
  };

  const filteredDays = days.filter((day) => {
    return day.classFirebaseId === selectedClass.firebaseId;
  });

  return (
    <div className="accordion">
      <h2
        onClick={() => {
          setIsOpen((prevIsOpen) => !prevIsOpen);
        }}
        className={`clickable-heading ${
          selectedDay && !isOpen ? '' : 'selected-header'
        }`}
      >
        {selectedDay && !isOpen ? `Date: ${selectedDay.dayName}` : 'Select Day'}
      </h2>

      {isOpen && (
        <div>
          {filteredDays?.length > 0 ? (
            filteredDays.map((day) => (
              <div
                onClick={() => {
                  dispatch(setSelectedDay(day));
                  setIsOpen(false);
                }}
                key={day.firebaseId}
                className={`item ${
                  selectedDay && selectedDay.id === day.id ? 'selected' : ''
                }`}
              >
                {day.dayName}
              </div>
            ))
          ) : (
            <p>No days yet</p>
          )}
          <div className="button-container">
            <button
              onClick={() => setIsFormOpen((prevIsFormOpen) => !prevIsFormOpen)}
              className={`btn new-button ${isFormOpen ? 'cancel' : ''}`}
            >
              {isFormOpen ? 'Cancel' : 'Add Day'}
            </button>

            {isFormOpen && (
              <form onSubmit={handleSubmit}>
                <input
                  type="date"
                  value={dayName}
                  onChange={(event) => setDayName(event.target.value)}
                  placeholder={new Date().toLocaleDateString('en-US')}
                  required
                />
                <button
                  type="submit"
                  className="btn form__button"
                >
                  Add Day
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DayAccordion;
