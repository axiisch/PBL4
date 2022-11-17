import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear, faRightFromBracket, faLeftRight } from '@fortawesome/free-solid-svg-icons';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { AuthContext } from '../context/AuthContext';
import { useContext, useState } from 'react';
import { ChatContext } from '../context/ChatContext';

import ProfileModal from '../components/ProfileModal';

import { db } from '../firebase';
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

function Dashboard() {
    const { currentUser } = useContext(AuthContext);
    const [showModal, setShowModal] = useState(false);
    const { dispatch } = useContext(ChatContext);
    const [expand, setExpand] = useState(false);

    const handleSignOut = async () => {
        await updateDoc(doc(db, 'users', currentUser.uid), {
            online: false,
        });
        dispatch({ type: 'CLEAR_USER' });
        signOut(auth);
    };

    const handleShowModal = () => {
        setShowModal(!showModal);
    };

    return (
        <div
            className={`${expand ? 'w-44' : 'w-15'} relative z-50 flex flex-col  justify-between bg-black pt-4 h-full `}
        >
            <div className="flex item-center justify-center flex-col">
                <div className="flex item-center justify-center">
                    <img className="w-9 h-9 bg-cover rounded-full" src={currentUser.photoURL} alt="" />
                </div>
                {expand ? (
                    <div className="flex mt-3 item-center justify-center text-white">{currentUser.displayName}</div>
                ) : (
                    <span></span>
                )}
            </div>

            <div className="flex flex-col justify-center items-center">
                <div
                    onClick={() => setExpand(!expand)}
                    className={`
                ${!expand ? '' : ' hover:bg-slate-900'}
                 py-3 flex flex-row cursor-pointer items-center w-full
                 text-white  hover:text-black hover:bg-white `}
                >
                    <button className="mx-2 btn-icon">
                        <FontAwesomeIcon className="p-2 text-xl  rounded-full" icon={faLeftRight} />
                    </button>
                    {expand && <span>Collapse</span>}
                </div>

                <div
                    onClick={() => setShowModal(!showModal)}
                    className={`
                ${!expand ? '' : ' hover:bg-slate-900'}
                 py-3 flex flex-row  cursor-pointer items-center w-full
                 text-white  hover:text-black hover:bg-white`}
                >
                    <button className="mx-2 btn-icon">
                        <FontAwesomeIcon className="p-2 text-xl rounded-full  " icon={faGear} />
                    </button>
                    {expand && <span>Settings</span>}
                </div>
                <div
                    onClick={handleSignOut}
                    className={`
                ${!expand ? '' : ' hover:bg-slate-900'}
                 py-3 flex flex-row  cursor-pointer items-center w-full
                 text-white  hover:text-black hover:bg-white
                 `}
                >
                    <button className="mx-2 btn-icon">
                        <FontAwesomeIcon className="p-2 text-xl  rounded-full" icon={faRightFromBracket} />
                    </button>
                    {expand && <span>Sign Out</span>}
                </div>
            </div>
            <ProfileModal handleShowModal={handleShowModal} showModal={showModal} />
        </div>
    );
}

export default Dashboard;
