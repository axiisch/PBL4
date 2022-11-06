import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faCamera } from '@fortawesome/free-solid-svg-icons';

import { useNavigate } from 'react-router-dom';
import { ModalContext } from '../context/ModalContext';

function ProfileModal() {
    const { currentUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const { showModal, setShowModal } = useContext(ModalContext);
    const handleClick = () => {
        navigate('/forgotpassword');
    };
    // const [open, setOpen] = useState(false);
    return (
        <div className=" w-full h-full bg-black bg-opacity-80 flex justify-center items-center absolute top-1/2 left-1/2  transform -translate-x-1/2 -translate-y-1/2 z-50 ">
            <div className="w-96 bg-white shadow-2xl rounded-3xl">
                <div className="relative px-14 py-8 flex items-center flex-col">
                    <span
                        onClick={() => setShowModal(!showModal)}
                        className="cursor-pointer absolute right-5 top-4 w-5 h-5 rounded-full hover:bg-black hover:text-white flex items-center justify-center"
                    >
                        <FontAwesomeIcon icon={faClose} />
                    </span>

                    <label className="uppercase font-bold text-2xl mb-4">User Information</label>

                    <div className="relative">
                        <span className="text-2xl cursor-pointer absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-0 hover:opacity-30 rounded-full hover:bg-black hover:text-white flex items-center justify-center">
                            <FontAwesomeIcon icon={faCamera} />
                        </span>
                        <img className="w-20 h-20 rounded-full" src={currentUser.photoURL} alt="loading" />
                    </div>

                    <div className="mb-4 w-full mt-4">
                        <label className="capitalize">display name</label>
                        <input
                            className="pointer-events-none pr-2 w-full py-2 border-b-2 border-cyan-400  focus: outline-none focus:border-cyan-500"
                            type="text"
                            defaultValue={currentUser.displayName}
                        ></input>
                    </div>

                    <div className="w-full mb-4 ">
                        <label className="capitalize">Email</label>
                        <div className="relative">
                            <input
                                className="pointer-events-none pr-7 w-full py-2 border-b-2 border-cyan-400  focus: outline-none focus:border-cyan-500"
                                type="email"
                                defaultValue={currentUser.email}
                            ></input>
                            <span className="h absolute right-0 bottom-2"></span>
                        </div>
                    </div>

                    <button
                        onClick={handleClick}
                        className="font-semibold my-6 py-3 w-full uppercase text-white rounded-3xl bg-black hover:bg-opacity-80"
                    >
                        change password
                    </button>

                    <span className="text-sm text-cyan-400 capitalize"></span>
                </div>
            </div>
        </div>
    );
}

export default ProfileModal;
