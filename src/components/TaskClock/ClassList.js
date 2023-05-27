import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addClass,
  getAllClasses,
} from '@src/store/slices/classes/classesSlice';
import { setSelectedClass } from '@src/store/slices/classes/selectedSlice';

const ClassList = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [className, setClassName] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const { classes } = useSelector((state) => state.classes);
  const { selectedClass } = useSelector((state) => state.selected);

  useEffect(() => {
    dispatch(getAllClasses());
  }, [dispatch]);

  const handleClassSelect = (classItem) => {
    dispatch(setSelectedClass(classItem));
    setIsOpen(false);
  };

  const handleNewButtonClick = () => {
    setIsFormOpen(!isFormOpen);
  };

  useEffect(() => {
    if (classes.length > 0) {
      const newClass = classes[classes.length - 1];
      dispatch(setSelectedClass(newClass));
    }
  }, [classes, dispatch]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (className.trim() !== '') {
      const newClass = {
        className,
      };
      await dispatch(addClass(newClass));
      setClassName('');
      setIsFormOpen(false);
      setIsOpen(false);
    }
  };

  const handleChange = (event) => {
    setClassName(event.target.value);
  };

  return (
    <div className="accordion">
      <h2
        onClick={() => setIsOpen(!isOpen)}
        className={`clickable-heading ${
          selectedClass && !isOpen ? '' : 'selected-header'
        }`}
      >
        {selectedClass && !isOpen
          ? `Class: ${selectedClass.className}`
          : 'All Classes'}
      </h2>

      {isOpen && (
        <div>
          {classes.map((classItem) => (
            <div
              onClick={() => handleClassSelect(classItem)}
              key={classItem.id}
              className={`item ${
                selectedClass && selectedClass.id === classItem.id
                  ? 'selected'
                  : ''
              }`}
            >
              {classItem.className}
            </div>
          ))}
          <div className="button-container">
            <button
              onClick={handleNewButtonClick}
              className={`btn new-button ${isFormOpen ? 'cancel' : ''}`}
            >
              {isFormOpen ? 'Cancel' : 'Add Class'}
            </button>

            {isFormOpen && (
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  value={className}
                  onChange={handleChange}
                  placeholder="springhill-code-102n1"
                  required
                />
                <button
                  type="submit"
                  className="btn form__button"
                >
                  Add Class
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ClassList;
