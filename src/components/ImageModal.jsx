import { useContext, useRef } from 'react';
import { AuthContext } from '../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faCamera, faEdit } from '@fortawesome/free-solid-svg-icons';
import { db, storage } from '../firebase/firebase';
import { doc, updateDoc } from 'firebase/firestore';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { updateProfile } from 'firebase/auth';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { updateUser } from '../firebase/services';
import { CSSTransition } from 'react-transition-group';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase/firebase';

// import { useNavigate } from 'react-router-dom';

// import { useEffect } from 'react';
import { useState } from 'react';
import { signOut } from 'firebase/auth';

function ImageModal({ handleShowModal, showModal, selectedImg }) {
    const nodeRef = useRef(null);
    const { currentUser } = useContext(AuthContext);
    const [edit, setEdit] = useState(false);

    const [img, setImg] = useState(currentUser.photoURL);
    // const navigate = useNavigate();

    // const { showModal, setShowModal } = useContext(ModalContext);

    return (
        <CSSTransition in={showModal} timeout={200} nodeRef={nodeRef} classNames="modal" unmountOnExit>
            <div className="w-full h-full bg-black bg-opacity-80 flex justify-center items-center fixed top-1/2 left-1/2  transform -translate-x-1/2 -translate-y-1/2 z-50 ">
                <ToastContainer
                    position="top-right"
                    autoClose={3500}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />
                <div className="w-full h-full bg-black bg-opacity-80 flex justify-center items-center fixed top-1/2 left-1/2  transform -translate-x-1/2 -translate-y-1/2 z-50">
                    <div ref={nodeRef} className="relative">
                        <img src={selectedImg} alt="" className="max-h-96 rounded-xl" />
                        <span
                            onClick={() => handleShowModal()}
                            className="cursor-pointer absolute right-5  text-white top-4 w-5 h-5 rounded-full hover:bg-white bg-opacity-10 hover:text-gray-400 flex items-center justify-center"
                        >
                            <FontAwesomeIcon icon={faClose} />
                        </span>
                    </div>
                </div>
            </div>
        </CSSTransition>
    );
}

export default ImageModal;
