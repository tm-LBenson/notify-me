// getAllEventsMiddleware.js
import { db } from '@src/config/firebase';
import { collection, getDocs } from 'firebase/firestore';

const getAllEventsMiddleware = (storeAPI) => (next) => async (action) => {
  if (action.type === 'classes/getAllEvents') {
    try {
      const eventCollection = collection(db, 'events');
      const eventSnapshot = await getDocs(eventCollection);
      const events = eventSnapshot.docs.map((doc) => ({
        firebaseId: doc.id,
        ...doc.data(),
      }));

      action.payload = events;
    } catch (err) {
      console.error('Error fetching events: ', err);
    }
  }

  return next(action);
};

export default getAllEventsMiddleware;
