import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faCamera, faEdit } from '@fortawesome/free-solid-svg-icons';
import { db, storage } from '../firebase';
import { doc, arrayUnion, Timestamp, serverTimestamp, updateDoc } from 'firebase/firestore';

import { updateProfile } from 'firebase/auth';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

// import { useNavigate } from 'react-router-dom';
import { ModalContext } from '../context/ModalContext';

// import { useEffect } from 'react';
import { useState } from 'react';

function ProfileModal() {
    const { currentUser } = useContext(AuthContext);
    const [edit, setEdit] = useState(false);
    const [sent, setSent] = useState(false);
    const [img, setImg] = useState(currentUser.photoURL);
    // const navigate = useNavigate();

    const { showModal, setShowModal } = useContext(ModalContext);

    const handleImgChanges = (e) => {
        setImg(URL.createObjectURL(e.target.files[0]));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const displayName = e.target[1].value;
        // console.log(e.target[1].value);
        const file = e.target[0].files[0];
        console.log(file);
        if (file !== undefined) {
            try {
                const date = new Date().getTime();
                const storageRef = ref(storage, `${displayName + date}`);
                await uploadBytesResumable(storageRef, file).then(() => {
                    getDownloadURL(storageRef).then(async (downloadURL) => {
                        try {
                            await updateProfile(currentUser, {
                                displayName,
                                photoURL: downloadURL,
                            });
                            await updateDoc(doc(db, 'users', currentUser.uid), {
                                displayName,
                                photoURL: downloadURL,
                            });
                        } catch (err) {}
                    });
                });
            } catch (err) {}
        }
        if (file === undefined) {
            try {
                await updateProfile(currentUser, {
                    displayName,
                });
                await updateDoc(doc(db, 'users', currentUser.uid), {
                    displayName,
                });
            } catch (err) {}
        }
    };
    /////////////////////////////////////// !!!
    // const handleClick = () => {
    //     sendPasswordResetEmail(auth, currentUser.email)
    //         .then(() => {
    //             setSent(true);
    //             // Need fixes : useEffect => rerender timer
    //             setTimeout(() => {
    //                 signOut(auth);
    //             }, 10000);
    //         })
    //         .catch((err) => {});
    // };

    // const [open, setOpen] = useState(false);
    return (
        <div className=" w-full h-full bg-black bg-opacity-80 flex justify-center items-center absolute top-1/2 left-1/2  transform -translate-x-1/2 -translate-y-1/2 z-50 ">
            <div className="w-96 bg-white shadow-2xl rounded-3xl">
                <form onSubmit={handleSubmit} className="relative px-14 py-8 flex items-center flex-col">
                    <span
                        onClick={() => setShowModal(!showModal)}
                        className="cursor-pointer absolute right-5 top-4 w-5 h-5 rounded-full hover:bg-black hover:text-white flex items-center justify-center"
                    >
                        <FontAwesomeIcon icon={faClose} />
                    </span>
                    <label className="uppercase font-bold text-2xl mb-4">User Information</label>
                    <div onClick={handleImgChanges} className="relative">
                        <label
                            htmlFor="upload"
                            className="text-2xl cursor-pointer absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-0 hover:opacity-30 rounded-full hover:bg-black hover:text-white flex items-center justify-center"
                        >
                            <FontAwesomeIcon icon={faCamera} />
                        </label>
                        <img className="w-20 h-20 rounded-full" src={img} alt="loading" />
                        <input onChange={handleImgChanges} id="upload" type="file" className="hidden" />
                    </div>
                    <div className="mb-4 w-full mt-4">
                        <label className="capitalize">display name</label>
                        <div className="relative">
                            <input
                                className={`${
                                    edit ? '' : 'pointer-events-none'
                                } pr-2 w-full py-2 border-b-2 border-cyan-400  focus: outline-none focus:border-cyan-500`}
                                type="text"
                                defaultValue={currentUser.displayName}
                            ></input>
                            <FontAwesomeIcon
                                onClick={() => setEdit(!edit)}
                                icon={faEdit}
                                className="absolute top-1/2 right-0 cursor-pointer transform -translate-y-1/2"
                            />
                        </div>
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

                    <button className="font-semibold my-6 py-3 w-full uppercase text-white rounded-3xl bg-black hover:bg-opacity-80">
                        save changes
                    </button>

                    {/* <button
                        onClick={handleClick}
                        className="font-semibold my-6 py-3 w-full uppercase text-white rounded-3xl bg-black hover:bg-opacity-80"
                    >
                        change password
                    </button>
                    {sent && (
                        <span className="text-sm text-center text-black capitalize">
                            a link to change your password has been sent to your email
                        </span>
                    )}
                    {sent && (
                        <span className="text-sm text-center text-black capitalize">Logging out in 8 seconds...</span>
                    )} */}
                </form>
            </div>
        </div>
    );
}

export default ProfileModal;
