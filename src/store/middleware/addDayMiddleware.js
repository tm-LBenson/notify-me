import { db } from '@src/config/firebase';
import { addDoc, collection } from 'firebase/firestore';

const addDayMiddleware = (storeAPI) => (next) => async (action) => {
  if (action.type === 'classes/addDay') {
    try {
      const daysCollection = collection(db, 'days');
      const newDay = {
        ...action.payload.newDay,
        classFirebaseId: action.payload.class.firebaseId,
      };

      const newDayDoc = await addDoc(daysCollection, newDay);

      const payloadWithFirebaseId = {
        ...action.payload,
        newDay: {
          ...action.payload.newDay,
          firebaseId: newDayDoc.id,
        },
      };

      const newAction = {
        ...action,
        payload: payloadWithFirebaseId,
      };

      return next(newAction);
    } catch (err) {
      console.error('Error adding day: ', err);
    }
  }

  return next(action);
};

export default addDayMiddleware;
