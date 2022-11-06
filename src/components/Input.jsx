import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';
import { db, storage } from '../firebase';
import { doc, arrayUnion, Timestamp, serverTimestamp, updateDoc } from 'firebase/firestore';
import { v4 as uuid } from 'uuid';
import { uploadBytesResumable, getDownloadURL, ref } from 'firebase/storage';

function Input() {
    const [text, setText] = useState('');
    const [img, setImg] = useState(null);

    const { currentUser } = useContext(AuthContext);
    const { data } = useContext(ChatContext);

    const handleKey = (e) => {
        e.code === 'Enter' && handleSend();
    };

    const handleSend = async () => {
        if (text !== '' || img !== null) {
            if (img) {
                const storageRef = ref(storage, uuid());
                const uploadTask = uploadBytesResumable(storageRef, img);

                uploadTask.on(
                    (error) => {},
                    () => {
                        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                            await updateDoc(doc(db, 'messages', data.chatId), {
                                messages: arrayUnion({
                                    id: uuid(),
                                    text,
                                    senderId: currentUser.uid,
                                    date: Timestamp.now(),
                                    img: downloadURL,
                                }),
                            });
                        });
                    },
                );
            } else {
                await updateDoc(doc(db, 'messages', data.chatId), {
                    messages: arrayUnion({
                        id: uuid(),
                        text,
                        senderId: currentUser.uid,
                        date: Timestamp.now(),
                        img: null,
                    }),
                });
                await updateDoc(doc(db, 'contacts', currentUser.uid), {
                    [data.chatId + '.lastMessage']: {
                        text,
                    },
                    [data.chatId + '.date']: serverTimestamp(),
                });

                await updateDoc(doc(db, 'contacts', data.user.uid), {
                    [data.chatId + '.lastMessage']: {
                        text,
                    },
                    [data.chatId + '.date']: serverTimestamp(),
                });
            }
            setText('');
            setImg(null);
        }
    };

    return (
        <div className="w-full h-[68px] flex items-center justify-center bg-white shadow-2xl -z-0">
            <div className="flex items-center justify-center w-full px-6">
                <label htmlFor="upload" className="flex items-center cursor-pointer gap-2 text-sm capitalize">
                    <FontAwesomeIcon
                        className="p-2 text-xl  text-black rounded-full hover:bg-black hover:text-white"
                        icon={faImage}
                    />
                </label>
                <input
                    onKeyDown={handleKey}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className=" mx-6 w-full h-9 border-b-2 border-gray-400  py-2  focus: outline-none focus:border-gray-600"
                    type="text"
                    placeholder="Message"
                />
                <input onChange={(e) => setImg(e.target.files[0])} id="upload" type="file" className="hidden" />
                <button onClick={handleSend} className="btn-icon">
                    <FontAwesomeIcon
                        className="p-2 text-xl  text-black rounded-full hover:bg-black hover:text-white"
                        icon={faPaperPlane}
                    />
                </button>
            </div>
        </div>
    );
}

export default Input;
