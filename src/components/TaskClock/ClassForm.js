import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addClass } from '@src/store/slices/classes/classesSlice';

const ClassForm = () => {
  const [className, setClassName] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (className.trim() !== '') {
      const newClass = {
        id: crypto.randomUUID(),
        className,
        days: [],
      };
      dispatch(addClass(newClass));
      setClassName('');
    }
  };

  const handleChange = (event) => {
    setClassName(event.target.value);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="class-form"
    >
      <input
        type="text"

        onChange={handleChange}
        placeholder="springhill-code-102n1"
        required
      />
      <button
        type="submit"
        className="btn class-form__button"
      >
        Add Class
      </button>
    </form>
  );
};

export default ClassForm;
