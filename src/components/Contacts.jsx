import { useState } from 'react';
import { db } from '../firebase/firebase';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';
import { collection, query, getDocs, doc, onSnapshot } from 'firebase/firestore';
import { v4 as uuid } from 'uuid';
// import { getAllUsers } from '../firebase/services';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';

function Contacts() {
    // const [users, setUsers] = useState([]);
    const [real, setReal] = useState([]);
    const [contacts, setContacts] = useState([]);
    const { currentUser } = useContext(AuthContext);
    const { dispatch } = useContext(ChatContext);

    const handleClick = (u) => {
        dispatch({ type: 'CHANGE_USER', payload: u });
    };

    useEffect(() => {
        const getContacts = async () => {
            let users = [];
            const q = query(collection(db, 'users'));
            try {
                const querySnapshot = await getDocs(q);
                querySnapshot.forEach((doc) => {
                    users.push(doc.data());
                });
                console.log(users);
                setReal(users);
                console.log(real);
            } catch (err) {}
            // let a = getAllUsers;
            // console.log(a);
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
        <div className="flex flex-col w-full h-full  overflow-y-hidden">
            <div className="grow bg-white overflow-scroll overflow-x-hidden">
                {Object.entries(contacts)
                    ?.sort((a, b) => b[1].date - a[1].date)
                    .map((contact) =>
                        real.map((user) =>
                            user.uid === contact[1].userRef ? (
                                <div
                                    onClick={() => handleClick(contact[1])}
                                    key={uuid()}
                                    className="cursor-pointer px-6 py-3 flex items-center gap-3 hover:bg-gray-300"
                                >
                                    <div className="relative">
                                        <img className="w-14 h-14 bg-cover rounded-full" src={user.photoURL} alt="" />
                                        <FontAwesomeIcon
                                            className={`${
                                                user.online ? 'text-green-500' : 'text-gray-500'
                                            } absolute -right-1 bottom-1 text-md border-2 rounded-full border-white`}
                                            icon={faCircle}
                                        />
                                    </div>
                                    <div className="grow flex flex-col">
                                        <label className="cursor-pointer max-w-[250px] whitespace-nowrap overflow-hidden font-semibold">
                                            {user.displayName}
                                        </label>
                                        <p className="max-w-[250px] whitespace-nowrap overflow-hidden text-sm text-gray-600 ">
                                            {contact[1].latestMessage} &nbsp;
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                <span></span>
                            ),
                        ),
                    )}
            </div>
        </div>
    );
}

export default Contacts;
