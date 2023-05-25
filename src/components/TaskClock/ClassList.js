import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedClass } from '@src/store/slices/classes/selectedSlice';

const ClassList = () => {
  const dispatch = useDispatch();
  const { classes } = useSelector((state) => state.classes);
  const { selectedClass } = useSelector((state) => state.selected);
  console.log(classes)
  const handleClassSelect = (classItem) => {
    dispatch(setSelectedClass(classItem));
  };

  return (
    <div className="class-list">
      <h2>All Classes</h2>
      {classes.length > 0 ? (
        <ul>
          {classes.map((classItem) => (
            <li
              key={classItem.className}
              onClick={() => handleClassSelect(classItem)}
              className={selectedClass && selectedClass.className === classItem.className ? 'selected' : ''}
            >
              {classItem.className}
            </li>
          ))}
        </ul>
      ) : (
        <p>No classes yet</p>
      )}
    </div>
  );
};

export default ClassList;
