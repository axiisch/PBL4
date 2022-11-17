import Message from './Message';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear, faRightFromBracket, faLeftRight } from '@fortawesome/free-solid-svg-icons';
import React from 'react';

import { ChatContext } from '../context/ChatContext';
import { useContext } from 'react';
import { db } from '../firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import SelfMessage from './SelfMessage';
import { useRef } from 'react';

function Gallery({ show }) {
    const [messages, setMessages] = useState([]);
    const { data } = useContext(ChatContext);

    useEffect(() => {
        const unSub = onSnapshot(doc(db, 'messages', data.chatId), (doc) => {
            doc.exists() && setMessages(doc.data().messages);
        });

        return () => {
            unSub();
        };
    }, [data.chatId]);

    return (
        show && (
            <div className="w-72 h-full">
                <div className="h-[68px] flex items-center justify-center">
                    <label className="font-semibold">Image Gallery</label>
                </div>
                <div class="grid grid-cols-3 max-h-[calc(100%-68px)] gap-3 mx-3 overflow-y-scroll text-center overflow-x-hidden">
                    {messages.map(
                        (message) =>
                            !message.deleted &&
                            message.img != null && (
                                <div
                                    className="drop-shadow-xl m-auto w-16 h-16 flex items-center justify-center bg-black  rounded-xl bg-opacity-60"
                                    key={message.id}
                                >
                                    <img className="rounded-xl cursor-pointer" src={message.img} alt="" />
                                </div>
                            ),
                    )}
                </div>
            </div>
        )
    );
}

export default Gallery;
