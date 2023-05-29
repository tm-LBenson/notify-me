import { db } from '@src/config/firebase';
import { addDoc, collection } from 'firebase/firestore';

const addStudentMiddleware = (storeAPI) => (next) => async (action) => {
  if (action.type === 'students/addStudent') {
    try {
      const newStudent = action.payload;
      const docRef = await addDoc(collection(db, 'students'), newStudent);

      const payloadWithFirebaseId = {
        ...newStudent,
        firebaseId: docRef.id,
      };

      const newAction = {
        ...action,
        payload: payloadWithFirebaseId,
      };

      return next(newAction);
    } catch (err) {
      console.error('Error adding student: ', err);
    }
  }

  return next(action);
};

export default addStudentMiddleware;
