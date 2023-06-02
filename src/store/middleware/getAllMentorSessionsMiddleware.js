import { db } from '@src/config/firebase';
import { collection, getDocs } from 'firebase/firestore';

const getAllMentorSessionsMiddleware =
  (storeAPI) => (next) => async (action) => {
    if (action.type === 'students/getAllMentoringSession') {
      try {
        const sessionsCollection = collection(db, 'sessions');
        const sessionsSnapshot = await getDocs(sessionsCollection);

        const sessions = sessionsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const newAction = {
          ...action,
          payload: sessions,
        };

        return next(newAction);
      } catch (err) {
        console.error('Error fetching all mentoring sessions: ', err);
      }
    }

    return next(action);
  };

export default getAllMentorSessionsMiddleware;
