import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addDay } from '@src/store/slices/classes/classesSlice';
import { setSelectedDay } from '@src/store/slices/classes/selectedSlice';

const DayAccordion = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [dayName, setDayName] = useState('');
  const [isOpen, setIsOpen] = useState(true);
  const dispatch = useDispatch();
  const { selectedClass, selectedDay } = useSelector((state) => state.selected);

  const handleDaySelect = (day) => {
    dispatch(setSelectedDay(day));
    setIsOpen(false);
  };

  const handleHeadingClick = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  const handleNewButtonClick = () => {
    setIsFormOpen((prevIsFormOpen) => !prevIsFormOpen);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newDay = {
      id: crypto.randomUUID(),
      dayName,
      events: [],
      mentoringSessions: [],
    };
    dispatch(addDay({ className: selectedClass.className, newDay }));
    dispatch(setSelectedDay(newDay));
    setDayName('');
    setIsFormOpen(false);
    setIsOpen(false);
  };

  const handleChange = (event) => {
    setDayName(event.target.value);
  };

  return (
    <div className="accordion">
      <h2
        onClick={handleHeadingClick}
        className={`clickable-heading ${
          selectedDay && !isOpen ? '' : 'selected-header'
        }`}
      >
        {selectedDay && !isOpen ? `Date: ${selectedDay.dayName}` : 'Add Day'}
      </h2>

      {isOpen && (
        <div>
          {selectedClass?.days?.length > 0 ? (
            selectedClass.days.map((day) => (
              <div
                onClick={() => handleDaySelect(day)}
                key={day.id}
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
              onClick={handleNewButtonClick}
              className={`btn new-button ${isFormOpen ? 'cancel' : ''}`}
            >
              {isFormOpen ? 'Cancel' : 'Add Day'}
            </button>

            {isFormOpen && (
              <form onSubmit={handleSubmit}>
                <input
                  type="date"
                  value={dayName}
                  onChange={handleChange}
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
