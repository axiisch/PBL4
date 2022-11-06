import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear, faRightFromBracket, faLeftRight } from '@fortawesome/free-solid-svg-icons';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { AuthContext } from '../context/AuthContext';
import { useContext, useState } from 'react';
import { ModalContext } from '../context/ModalContext';

function Dashboard() {
    const { currentUser } = useContext(AuthContext);
    const [expand, setExpand] = useState(false);
    const { showModal, setShowModal } = useContext(ModalContext);

    return (
        <div
            className={`${
                expand ? 'w-44' : 'w-15'
            } relative z-50 flex flex-col  justify-between bg-gray-900 py-4 h-full `}
        >
            <div className="flex item-center justify-center flex-col">
                <div className="flex item-center justify-center">
                    <img className="w-9 h-9 bg-cover rounded-full" src={currentUser.photoURL} alt="error" />
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
                ${!expand ? '' : ' hover:bg-slate-500'}
                 py-3 flex flex-row cursor-pointer items-center w-full `}
                >
                    <button className="mx-2 btn-icon">
                        <FontAwesomeIcon
                            className="p-2 text-xl  text-white rounded-full hover:bg-slate-500"
                            icon={faLeftRight}
                        />
                    </button>
                    {expand && <span className="text-white">Collapse</span>}
                </div>

                <div
                    onClick={() => setShowModal(!showModal)}
                    className={`
                ${!expand ? '' : ' hover:bg-slate-500'}
                 py-3 flex flex-row  cursor-pointer items-center w-full `}
                >
                    <button className="mx-2 btn-icon">
                        <FontAwesomeIcon
                            className="p-2 text-xl  text-white rounded-full hover:bg-slate-500"
                            icon={faGear}
                        />
                    </button>
                    {expand && <span className="text-white">Settings</span>}
                </div>
                <div
                    onClick={() => signOut(auth)}
                    className={`
                ${!expand ? '' : ' hover:bg-slate-500'}
                 py-3 flex flex-row  cursor-pointer items-center w-full `}
                >
                    <button className="mx-2 btn-icon">
                        <FontAwesomeIcon
                            className="p-2 text-xl  text-white rounded-full hover:bg-slate-500"
                            icon={faRightFromBracket}
                        />
                    </button>
                    {expand && <span className="text-white">Sign Out</span>}
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
