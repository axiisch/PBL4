import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import Input from '../components/Input';
import Chatbox from '../components/Chatbox';
import { useContext } from 'react';
import { ChatContext } from '../context/ChatContext';
import { useEffect, useState, useRef } from 'react';
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
} from 'firebase/firestore';

import { db } from '../firebase';

// import { useEffect } from 'react';

function Message({ message }) {
    const { data } = useContext(ChatContext);
    const [user, setUser] = useState(null);
    const ref = useRef();

    useEffect(() => {
        ref.current?.scrollIntoView({ behavior: 'smooth' });
    }, [message]);

    useEffect(() => {
        setUser(null);
        const getInfo = async () => {
            const docRef = doc(db, 'users', data.user.userRef);
            const docSnap = await getDoc(docRef);
            setUser(docSnap.data());
            console.log(docSnap.data());
        };
        data.user.userRef && getInfo();
    }, [data.user.userRef]);

    return (
        <div ref={ref} className="flex flex-row ml-6 gap-6">
            <div className="flex items-start justify-center">
                <img className="w-9 h-9 bg-cover rounded-full" src={user?.photoURL} alt="loading" />
            </div>
            <div className="relative group">
                <span className="text-white text-sm bg-black py-1 px-2 rounded-2xl absolute top-1/2 transform -translate-y-1/2 -right-32 hidden group-hover:block">
                    {message.date.toDate().toLocaleTimeString()}
                </span>
                {message.text !== '' ? (
                    <p className=" inline-block break-words max-w-xs text-white bg-gray-500 px-4 py-2 rounded-xl mb-3">
                        {message.text}
                    </p>
                ) : (
                    <span></span>
                )}

                {message.img ? (
                    <img className="bg-cover max-w-xs rounded-xl mb-3" src={message.img} alt="loading" />
                ) : (
                    <span></span>
                )}
            </div>
        </div>
    );
}

export default Message;
