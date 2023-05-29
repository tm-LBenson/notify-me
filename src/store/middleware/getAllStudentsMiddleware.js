// getAllClassesMiddleware.js
import { db } from '@src/config/firebase';
import { collection, getDocs } from 'firebase/firestore';

const getAllStudentsMiddleware = (storeAPI) => (next) => async (action) => {
  if (action.type === 'students/getAllStudents') {
    try {
      const studentCollection = collection(db, 'students');
      const studentSnapshot = await getDocs(studentCollection);
      const students = studentSnapshot.docs.map((doc) => ({
        firebaseId: doc.id,
        ...doc.data(),
      }));
      console.log(students);
      action.payload = students;
    } catch (err) {
      console.error('Error fetching students: ', err);
    }
  }

  return next(action);
};

export default getAllStudentsMiddleware;
