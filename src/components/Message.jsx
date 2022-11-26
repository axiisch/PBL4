import { useContext } from 'react';
import { ChatContext } from '../context/ChatContext';
import { useEffect, useState, useRef } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { faClose, faCamera, faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ImageModal from '../components/ImageModal';

import { db } from '../firebase/firebase';
// import { useEffect } from 'react';

function Message({ search, message }) {
    const { data } = useContext(ChatContext);
    const [user, setUser] = useState(null);
    const ref = useRef();
    // const [showImg, setShowImg] = useState(false);
    // const [selectedImg, setSelectedImg] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [selectedImg, setSelectedImg] = useState(null);
    // const handleShowImg = (img) => {
    //     setSelectedImg(img);
    //     setShowImg(!showImg);
    // };
    const handleShowModal = () => {
        setShowModal(!showModal);
    };

    const handleSelect = (img) => {
        setSelectedImg(img);
        handleShowModal();
    };

    useEffect(() => {
        if (message.text.toLowerCase().includes(search.toLowerCase(), 0)) {
            ref.current?.scrollIntoView();
        }
    }, [search]);

    useEffect(() => {
        ref.current?.scrollIntoView();
    }, [message]);

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

    return message.deleted ? (
        <span></span>
    ) : (
        <div ref={ref} className=" flex flex-row ml-6 gap-6 mb-3 group">
            <div className="flex items-start justify-center">
                <img className="w-9 h-9 bg-cover rounded-full" src={user?.photoURL} alt="" />
            </div>
            <div className="relative ">
                <span className="text-white text-sm  bg-black py-1 px-2 rounded-2xl absolute top-1/2 transform -translate-y-1/2 -right-32 hidden group-hover:block">
                    {message.date.toDate().toLocaleTimeString()}
                </span>
                {message.text !== '' ? (
                    <p className=" inline-block break-words max-w-xs text-white bg-gray-500 px-4 py-[6px] rounded-xl ">
                        {message.text}
                    </p>
                ) : (
                    <span></span>
                )}

                {message.img ? (
                    <img
                        onClick={() => handleSelect(message.img)}
                        className="bg-cover max-w-xs rounded-xl hover:opacity-90 cursor-pointer "
                        src={message.img}
                        alt=""
                    />
                ) : (
                    <span></span>
                )}

                <ImageModal handleShowModal={handleShowModal} showModal={showModal} selectedImg={selectedImg} />

                {/* {message.img === selectedImg && showImg && (
                    <div className="w-full h-full bg-black bg-opacity-80 flex justify-center items-center fixed top-1/2 left-1/2  transform -translate-x-1/2 -translate-y-1/2 z-50">
                        <div className="relative">
                            <img src={selectedImg} alt="" className="max-h-96 rounded-xl" />
                            <span
                                onClick={() => setShowImg(!showImg)}
                                className="cursor-pointer absolute right-5  text-white top-4 w-5 h-5 rounded-full hover:bg-white bg-opacity-10 hover:text-gray-400 flex items-center justify-center"
                            >
                                <FontAwesomeIcon icon={faClose} />
                            </span>
                        </div>
                    </div>
                )} */}
            </div>
        </div>
    );
}

export default Message;
