// getAllClassesMiddleware.js
import { db } from '@src/config/firebase';
import { collection, getDocs } from 'firebase/firestore';

const getAllClassesMiddleware = (storeAPI) => (next) => async (action) => {
  if (action.type === 'classes/getAllClasses') {
    try {
      const classCollection = collection(db, 'classes');
      const classSnapshot = await getDocs(classCollection);
      const classes = classSnapshot.docs.map((doc) => ({
        firebaseId: doc.id,
        ...doc.data(),
      }));

      action.payload = classes;
    } catch (err) {
      console.error('Error fetching classes: ', err);
    }
  }

  return next(action);
};

export default getAllClassesMiddleware;
