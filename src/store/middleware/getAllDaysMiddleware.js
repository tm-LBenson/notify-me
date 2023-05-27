// getAllDaysMiddleware.js
import { db } from '@src/config/firebase';
import { collection, getDocs } from 'firebase/firestore';

const getAllDaysMiddleware = (storeAPI) => (next) => async (action) => {
  if (action.type === 'classes/getAllDays') {
    try {
      const dayCollection = collection(db, 'days');
      const daySnapshot = await getDocs(dayCollection);
      const days = daySnapshot.docs.map((doc) => doc.data());

      action.payload = days;
    } catch (err) {
      console.error('Error fetching days: ', err);
    }
  }

  return next(action);
};

export default getAllDaysMiddleware;
