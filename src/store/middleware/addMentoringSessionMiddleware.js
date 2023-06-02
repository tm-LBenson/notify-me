import { db } from '@src/config/firebase';
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  where,
  updateDoc,
} from 'firebase/firestore';

const addMentoringSessionMiddleware =
  (storeAPI) => (next) => async (action) => {
    if (action.type === 'students/addMentoringSession') {
      try {
        const newSession = action.payload;
        const sessionsCollection = collection(db, 'sessions');

        // Build a query to find a session with the given studentId, classId, and dayId.
        const sessionQuery = query(
          sessionsCollection,
          where('studentId', '==', newSession.studentId),
          where('classId', '==', newSession.selectedClassId),
          where('dayId', '==', newSession.selectedDayId),
        );

        const querySnapshot = await getDocs(sessionQuery);

        // Check if a session already exists.
        if (!querySnapshot.empty) {
          // Update the existing session with the new event data.
          const existingSessionDoc = querySnapshot.docs[0];
          const sessionData = existingSessionDoc.data();

          const newEvent = {
            type: newSession.type,
            notes: newSession.notes,
            timestamp: newSession.timestamp,
          };

          sessionData.events.push(newEvent);

          await updateDoc(
            doc(db, 'sessions', existingSessionDoc.id),
            sessionData,
          );
        } else {
          // If the session doesn't exist, create a new one.
          const sessionData = {
            studentId: newSession.studentId,
            classId: newSession.selectedClassId,
            dayId: newSession.selectedDayId,
            events: [
              {
                type: newSession.type,
                notes: newSession.notes,
                timestamp: newSession.timestamp,
              },
            ],
          };

          const sessionDocRef = await addDoc(sessionsCollection, sessionData);

          const payloadWithFirebaseId = {
            ...sessionData,
            firebaseId: sessionDocRef.id,
          };

          const newAction = {
            ...action,
            payload: payloadWithFirebaseId,
          };

          return next(newAction);
        }
      } catch (err) {
        console.error('Error adding mentoring session: ', err);
      }
    }

    return next(action);
  };

export default addMentoringSessionMiddleware;
