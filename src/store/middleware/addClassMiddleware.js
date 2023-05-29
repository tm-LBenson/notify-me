import { db } from '@src/config/firebase';
import { addDoc, collection } from 'firebase/firestore';

const addClassMiddleware = (storeAPI) => (next) => async (action) => {
  if (action.type === 'classes/addClass') {
    try {
      const newClass = action.payload;
      const docRef = await addDoc(collection(db, 'classes'), newClass);

      const payloadWithFirebaseId = {
        ...newClass,
        firebaseId: docRef.id,
      };

      const newAction = {
        ...action,
        payload: payloadWithFirebaseId,
      };

      return next(newAction);
    } catch (err) {
      console.error('Error adding class: ', err);
    }
  }

  return next(action);
};

export default addClassMiddleware;
