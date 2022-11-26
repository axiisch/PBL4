import { db, storage } from './firebase';
import {
    collection,
    query,
    orderBy,
    startAt,
    endAt,
    getDocs,
    setDoc,
    doc,
    updateDoc,
    serverTimestamp,
    getDoc,
    arrayUnion,
    Timestamp,
    arrayRemove,
} from 'firebase/firestore';
import { updateProfile } from 'firebase/auth';

import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { v4 as uuid } from 'uuid';

export const addMessage = async (chatId, text, senderId, img) => {
    return await updateDoc(doc(db, 'messages', chatId), {
        messages: arrayUnion({
            id: uuid(),
            text,
            senderId,
            date: Timestamp.now(),
            img,
        }),
    });
};

export const updateContact = async (useruid, chatId, text) => {
    return await updateDoc(doc(db, 'contacts', useruid), {
        [chatId + '.latestMessage']: {
            text,
        },
        [chatId + '.date']: serverTimestamp(),
    });
};

export const createContact = async (combinedId, currentUserUid, otherUserUid) => {
    return await updateDoc(doc(db, 'contacts', currentUserUid), {
        [combinedId + '.userRef']: otherUserUid,
        [combinedId + '.date']: serverTimestamp(),
        [combinedId + '.latestMessage']: '',
    });
};

// async function getA(username) {
//     const q = query(collection(db, 'users'), orderBy('displayName'), startAt(username), endAt(username + '\uf8ff'));
//     let users = [];

//     const querySnapshot = await getDocs(q);
//     querySnapshot.forEach((doc) => {
//         users.push(doc.data());
//     });
//     users.then(() => {
//         return users;
//     });
// }

// export const getUsersWithUsername = (username) => {
//     return getA(username);
// };

export const deleteMessage = async (chatId, message) => {
    const tempRef = doc(db, 'messages', chatId);
    let tempMessage = message;
    await updateDoc(tempRef, {
        messages: arrayRemove(message),
    });
    await updateDoc(tempRef, {
        messages: arrayUnion({
            id: tempMessage.id,
            date: tempMessage.date,
            text: tempMessage.text,
            img: tempMessage.img,
            senderId: tempMessage.senderId,
            deleted: true,
        }),
    });
};

export const updateUser = async (currentUser, currentUserUid, displayName, file) => {
    const date = new Date().getTime();
    const storageRef = ref(storage, `${displayName + date}`);
    if (file !== undefined) {
        await uploadBytesResumable(storageRef, file).then(() => {
            getDownloadURL(storageRef).then(async (downloadURL) => {
                try {
                    await updateProfile(currentUser, {
                        displayName,
                        photoURL: downloadURL,
                    });
                    await updateDoc(doc(db, 'users', currentUserUid), {
                        displayName,
                        photoURL: downloadURL,
                    });
                } catch (err) {}
            });
        });
    } else {
        try {
            await updateProfile(currentUser, {
                displayName,
            });
            await updateDoc(doc(db, 'users', currentUserUid), {
                displayName,
            });
        } catch (err) {}
    }
};
// export const getAllUsers = await Promise.all(usersNew);

// async function usersNew() {
//     let users = [];
//     const q = query(collection(db, 'users'));
//     // try async{
//     const querySnapshot = await getDocs(q);
//     querySnapshot.forEach((doc) => {
//         users.push(doc.data());
//     });
//     console.log(users);
//     // } catch (err) {}
//     return users;
// }
