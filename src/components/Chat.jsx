import Input from '../components/Input';
import Chatbox from '../components/Chatbox';
import { useContext } from 'react';
import { ChatContext } from '../context/ChatContext';
import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faEllipsis,
    faRightFromBracket,
    faLeftRight,
    faImage,
    faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons';
import { db } from '../firebase';

function Chat({ handleShow }) {
    const { data } = useContext(ChatContext);
    const [user, setUser] = useState(null);

    const [showSearch, setShowSearch] = useState(false);

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
        <div className="flex flex-col grow">
            {/* HEADER */}
            <div className="w-full py-4  px-6 h-[68px] bg-white ">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        <img className="w-9 h-9 bg-cover rounded-full" src={user?.photoURL} alt="" />
                        <label className="font-semibold">{user?.displayName}</label>
                    </div>
                    <div className="flex flex-row items-center justify-center gap-3">
                        <button className="btn-icon">
                            <FontAwesomeIcon
                                onClick={() => setShowSearch(!showSearch)}
                                className="p-2 text-xl  text-black rounded-full hover:bg-black hover:text-white"
                                icon={faMagnifyingGlass}
                            />
                        </button>
                        <button className="btn-icon">
                            <FontAwesomeIcon
                                onClick={handleShow}
                                className="p-2 text-xl  text-black rounded-full hover:bg-black hover:text-white"
                                icon={faImage}
                            />
                        </button>
                    </div>
                </div>
            </div>
            <Chatbox showSearch={showSearch} />
            <Input />
        </div>
    );
}

export default Chat;
