import { db } from '@src/config/firebase';
import {
  addDoc,
  arrayUnion,
  collection,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';

const addEventMiddleware = (storeAPI) => (next) => async (action) => {
  if (action.type === 'classes/addEvent') {
    try {
      if (action.payload?.day) {
        const eventsCollection = collection(db, 'events');
        const dayQuery = query(
          eventsCollection,
          where('dayFirebaseId', '==', action.payload.day.firebaseId),
        );

        const querySnapshot = await getDocs(dayQuery);
        let dayDoc = null;

        querySnapshot.forEach((doc) => {
          dayDoc = doc;
        });

        if (dayDoc) {
          const dayRef = doc(db, 'events', dayDoc.id);
          const newEvent = {
            timestamp: action.payload.newTimeBlock.data.timestamp,
            type: action.payload.newTimeBlock.data.type,
            notes: action.payload.newTimeBlock.data.notes,
          };

          await updateDoc(dayRef, {
            events: arrayUnion(newEvent),
          });
        } else {
          const newDay = {
            dayFirebaseId: action.payload.day.firebaseId,
            events: [
              {
                timestamp: action.payload.newTimeBlock.data.timestamp,
                type: action.payload.newTimeBlock.data.type,
                notes: action.payload.newTimeBlock.data.notes,
              },
            ],
          };

          await addDoc(eventsCollection, newDay);
        }
      }
    } catch (err) {
      console.error('Error adding event: ', err);
    }
  }

  return next(action);
};

export default addEventMiddleware;
