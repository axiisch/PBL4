import { useState } from 'react';
import { db } from '../firebase';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';
import { doc, onSnapshot } from 'firebase/firestore';

function Contacts() {
    const [contacts, setContacts] = useState([]);

    const { currentUser } = useContext(AuthContext);
    const { dispatch } = useContext(ChatContext);

    const handleClick = (u) => {
        dispatch({ type: 'CHANGE_USER', payload: u });
    };

    useEffect(() => {
        const getContacts = () => {
            const unsub = onSnapshot(doc(db, 'contacts', currentUser.uid), (doc) => {
                setContacts(doc.data());
                console.log(doc.data());
            });

            return () => {
                unsub();
            };
        };
        currentUser.uid && getContacts();
    }, [currentUser.uid]);

    return (
        <div className="flex flex-col w-96 h-full shadow-2xl z-50  ">
            <div className="grow bg-white overflow-scroll overflow-x-hidden">
                {Object.entries(contacts)
                    ?.sort((a, b) => b[1].date - a[1].date)
                    .map((contact) => (
                        <div
                            onClick={() => handleClick(contact[1].userInfo)}
                            key={contact[0]}
                            className="cursor-pointer  px-6 py-3 flex items-center gap-3 hover:bg-gray-300"
                        >
                            <div>
                                <img
                                    className="w-14 h-14 bg-cover rounded-full"
                                    src={contact[1].userInfo.photoURL}
                                    alt="error"
                                />
                            </div>
                            <div className="grow flex flex-col">
                                <label className="cursor-pointer max-w-[270px] whitespace-nowrap overflow-hidden font-semibold">
                                    {contact[1].userInfo.displayName}
                                </label>
                                <p className="max-w-[270px] whitespace-nowrap overflow-hidden text-sm text-gray-600 ">
                                    {contact[1].lastMessage?.text}
                                </p>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
}

export default Contacts;
