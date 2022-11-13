import { useEffect, useRef, useState } from 'react';
import { arrayRemove, arrayUnion, updateDoc, FieldValue } from 'firebase/firestore';
import { ChatContext } from '../context/ChatContext';
import { useContext } from 'react';
import { db } from '../firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import { AuthContext } from '../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

function SelfMessage({ message }) {
    const ref = useRef();
    const [messages, setMessages] = useState([]);

    const { data } = useContext(ChatContext);

    const handleClick = () => {
        // let messageArray = [];
        const unsub = onSnapshot(doc(db, 'messages', data.chatId), (docSnap) => {
            docSnap.exists() && setMessages(docSnap.data().messages);
            console.log(docSnap.data().messages);
            console.log(message.id);
            // messageArray = docSnap.data().messages;

            // let foundIndex = messageArray.findIndex((x) => x.id === message.id);
            // messageArray[foundIndex] = {
            //     id: message.id,
            //     date: message.date,
            //     text: message.text,
            //     img: message.img,
            //     senderId: message.senderId,
            //     deleted: true,
            // };
            // console.log(foundIndex);
            // console.log(messageArray);

            const tempRef = doc(db, 'messages', data.chatId);
            let tempMessage = message;
            updateDoc(tempRef, {
                messages: arrayRemove(message),
            });
            updateDoc(tempRef, {
                messages: arrayUnion({
                    id: tempMessage.id,
                    date: tempMessage.date,
                    text: tempMessage.text,
                    img: tempMessage.img,
                    senderId: tempMessage.senderId,
                    deleted: true,
                }),
            });
        });

        return () => {
            unsub();
        };
    };

    useEffect(() => {
        ref.current?.scrollIntoView({ behavior: 'smooth' });
    }, [message]);

    return message.deleted ? (
        <span></span>
    ) : (
        <div ref={ref} className="flex justify-start flex-row-reverse mr-6 group">
            <div className="relative flex flex-col justify-start mb-3  ">
                <div className=" absolute top-1/2 transform -translate-y-1/2 -left-32 items-center justify-center flex-row hidden group-hover:flex">
                    <span className="text-white text-sm bg-black py-1 px-2 rounded-2xl ">
                        {message.date.toDate().toLocaleTimeString()}
                    </span>
                    <FontAwesomeIcon
                        onClick={handleClick}
                        className="cursor-pointer p-2 text-xl rounded-full"
                        icon={faTrash}
                    />
                </div>
                <span className="flex justify-end">
                    {message.text !== '' ? (
                        <p className="inline-block  break-words max-w-xs  bg-white px-4 py-[6px] rounded-xl">
                            {message.text}
                        </p>
                    ) : (
                        <span></span>
                    )}
                </span>
                {message.img ? (
                    <img className="bg-cover max-w-xs rounded-xl " src={message.img} alt="loading" />
                ) : (
                    <span></span>
                )}
            </div>
        </div>
    );
}

export default SelfMessage;
