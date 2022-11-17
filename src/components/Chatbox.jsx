import Message from './Message';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear, faRightFromBracket, faLeftRight } from '@fortawesome/free-solid-svg-icons';
import React from 'react';

import ScrollToBottom from 'react-scroll-to-bottom';
import { ChatContext } from '../context/ChatContext';
import { useContext } from 'react';
import { db } from '../firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import SelfMessage from './SelfMessage';
function Chatbox({ showSearch }) {
    const [messages, setMessages] = useState([]);
    const { data } = useContext(ChatContext);
    const { currentUser } = useContext(AuthContext);
    const [search, setSearch] = useState('');

    useEffect(() => {
        const unSub = onSnapshot(doc(db, 'messages', data.chatId), (doc) => {
            doc.exists() && setMessages(doc.data().messages);
        });

        return () => {
            unSub();
        };
    }, [data.chatId]);

    return (
        <React.Fragment>
            {showSearch && (
                <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="fixed top-[68px] z-50 px-6 w-full h-9 py-2 text-white bg-black focus: outline-none focus:border-gray-600"
                    type="text"
                    placeholder="Search Messages"
                />
            )}

            <ScrollToBottom className="bg-gray-200 py-2 shadow-[inset_0_0_30px_rgba(0,0,0,0.2)] h-full overflow-scroll overflow-x-hidden">
                {messages.map((m) =>
                    m.senderId !== currentUser.uid ? (
                        <Message search={search} message={m} key={m.id} />
                    ) : (
                        <SelfMessage search={search} message={m} key={m.id} />
                    ),
                )}
            </ScrollToBottom>
        </React.Fragment>
    );
}

export default Chatbox;
