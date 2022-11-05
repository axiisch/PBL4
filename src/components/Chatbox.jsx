import Message from './Message';

import { ChatContext } from '../context/ChatContext';
import { useContext } from 'react';
import { db } from '../firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useRef } from 'react';
import SelfMessage from './SelfMessage';

function Chatbox() {
    const [messages, setMessages] = useState([]);
    const { data } = useContext(ChatContext);

    const { currentUser } = useContext(AuthContext);

    useEffect(() => {
        const unSub = onSnapshot(doc(db, 'messages', data.chatId), (doc) => {
            doc.exists() && setMessages(doc.data().messages);
        });

        return () => {
            unSub();
        };
    }, [data.chatId]);

    const ref = useRef();

    useEffect(() => {
        ref.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <div className="bg-gray-200 shadow-[inset_0_0_30px_rgba(0,0,0,0.2)] h-full overflow-scroll overflow-x-hidden">
            {messages.map((m) =>
                m.senderId != currentUser.uid ? (
                    <Message message={m} key={m.id} />
                ) : (
                    <SelfMessage message={m} key={m.id} />
                ),
            )}
        </div>
    );
}

export default Chatbox;
