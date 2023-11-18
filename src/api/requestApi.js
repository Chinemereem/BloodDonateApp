import firebase from 'firebase/compat';
import 'react-native-get-random-values';
import 'firebase/compat/storage';
import {auth} from '../../firebase';

import {setRequested} from '../store/auth/requestsSlice';
import {useDispatch} from 'react-redux';
import {v4 as uuidv4} from 'uuid';
import displayToast from '../components/DisplayToast';

export const createRequest = (request, addComplete) => {
  const db = firebase.firestore();
  const usersRef = db.collection('newUsers');
  const userId = auth?.currentUser.uid;
  usersRef
    .doc(userId)
    .update({
      createRequests: [
        {
          city: request.city,
          hospital: request.hospital,
          bloodType: request.bloodType,
          mobile: request.mobile,
          note: request.note,
        },
      ],
    })
    .then(data => {
      addComplete(data);
    })
    .catch(error => displayToast(error.message, 'errrrrr'));
};

export const addImageRequest = (request, addComplete) => {
  const db = firebase.firestore();
  const usersRef = db.collection('newUsers');
  const userId = auth?.currentUser.uid;
  usersRef
    .doc(userId)
    .update({
      updateImageRequests: [request],
    })
    .then(data => {
      addComplete(data);
    })
    .catch(error => displayToast(error.message, 'errrrrr'));
};
// export const addImageRequehst = (request, addComplete) => {
//   const db = firebase.firestore();
//   const usersRef = db.collection('newUsers');
//   const userId = auth?.currentUser.uid;
//   usersRef
//     .doc(userId)
//     .update({
//       updateImageRequests: request,
//     })
//     .then(() => {
//       addComplete(request);
//     })
//     .catch(error => displayToast(error.message, 'errrrrr'));
// };

export const getRequest = async dataRetreived => {
  const db = firebase.firestore();
  // const userId = auth?.currentUser.uid;
  const createRequestsRef = db.collection('newUsers');
  // Retrieve all documents in the 'orders' collection
  createRequestsRef
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(doc => {});
    })
    .catch(error => {
      console.warn(error);
    });
};

export const GetRequests = async () => {
  const requestList = [];
  const dispatch = useDispatch();
  const snapshot = await firebase
    .firestore()
    .collection('requests')
    .orderBy('createdAt')
    .get();
  snapshot.forEach(doc => {
    requestList.push(doc.data());
  });
  dispatch(setRequested(requestList));
};

export const getImageRequests = async dataRetreived => {
  const requestList = [];

  const snapshot = await firebase
    .firestore()
    .collection('requests')
    .orderBy('image')
    .get();
  snapshot.forEach(doc => {
    requestList.push(doc.data());
  });
  dataRetreived(requestList);
};

export function deleterequests(requests, deleteComplete) {
  firebase
    .firestore()
    .collection('requests')
    .doc(requests.id)
    .delete()
    .then(() => deleteComplete())
    .catch(error => displayToast(error.message, 'error'));
}
export const getUserData = async dataRetreived => {
  const userId = auth?.currentUser.uid;
  firebase
    .firestore()
    .collection('newUsers')
    .doc(userId)
    .get()
    .then(doc => {
      const userData = doc.data();
      dataRetreived(userData);
    });
};

export const uploadRequests = async (requests, onrequestsUploaded) => {
  if (requests.imageUri) {
    const response = await fetch(requests.imageUri);
    const blob = await response.blob();

    const fileExtension = requests.imageUri.split('.').pop();

    const uuid = uuidv4();

    const fileName = `${uuid}.${fileExtension}`;
    const storageRef = firebase
      .storage()
      .ref()
      .child(`newUsers/images/${fileName}`);
    storageRef.put(blob).on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      snapshot => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        if (snapshot.state === firebase.storage.TaskState.SUCCESS) {
        } else {
          displayToast(`Image Upload is ${progress}% done`);
        }
      },
      error => {
        displayToast(error.message, 'error');
      },
      () => {
        storageRef.getDownloadURL().then(downloadUrl => {
          requests.image = downloadUrl;
          delete requests.imageUri;
          displayToast('adding image...');
          addImageRequest(requests, onrequestsUploaded);
        });
      },
    );
  }
};

const API_URL = 'https://mocki.io/v1/77e4f682-2f2b-430e-9e0c-a69f98411a2d';

export const getusers = async dataRetreived => {
  try {
    const result = await fetch(API_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const json = await result.json();
    if (json) {
      dataRetreived(json);
    } else {
      displayToast('Unable to fetch!');
    }
  } catch (error) {
    displayToast(error.message, 'errror');
  }
};

export const AddMessages = (requests, requestComplete) => {
  firebase
    .firestore()
    .collection('conversations')
    .doc(requests.id)
    .then(() => requestComplete())
    .catch(error => displayToast(error.message, 'error'));
};

export const CreateConversation = (request, addComplete) => {
  const db = firebase.firestore();
  const usersRef = db.collection('newUsers');
  const userId = auth?.currentUser.uid;
  usersRef
    .doc(userId)
    .update({
      createConversation: [request],
    })
    .then(data => {
      addComplete(data);
    })
    .catch(error => displayToast(error.message, 'errrrrr'));
};

export const getCreateConversationData = async () => {
  const userId = auth?.currentUser.uid;
  const db = firebase.firestore();
  const usersRef = db.collection('newUsers');

  try {
    const doc = await usersRef.doc(userId).get();

    if (doc.exists) {
      const createConversationData = doc.data()?.createConversation || [];
      return createConversationData;
    } else {
      throw new Error('User document not found');
    }
  } catch (error) {
    throw new Error(error.message);
  }
};
