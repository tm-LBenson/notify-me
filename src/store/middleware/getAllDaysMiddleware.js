// getAllDaysMiddleware.js
import { db } from '@src/config/firebase';
import { collection, getDocs } from 'firebase/firestore';

const getAllDaysMiddleware = (storeAPI) => (next) => async (action) => {
  if (action.type === 'classes/getAllDays') {
    try {
      const daysCollection = collection(db, 'days');
      const daysSnapshot = await getDocs(daysCollection);
      const days = daysSnapshot.docs.map((doc) => ({
        firebaseId: doc.id,
        ...doc.data(),
      }));

      action.payload = days;
    } catch (err) {
      console.error('Error fetching days: ', err);
    }
  }

  return next(action);
};

export default getAllDaysMiddleware;
