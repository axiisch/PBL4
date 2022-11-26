import { useEffect, useRef } from 'react';
import { arrayRemove, arrayUnion, updateDoc } from 'firebase/firestore';
import { ChatContext } from '../context/ChatContext';
import { useContext } from 'react';
import { db } from '../firebase/firebase';
import { doc } from 'firebase/firestore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import ImageModal from '../components/ImageModal';
import { deleteMessage } from '../firebase/services';

function SelfMessage({ search, message }) {
    const ref = useRef();
    const [showImg, setShowImg] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [selectedImg, setSelectedImg] = useState(null);
    // const [selectedImg, setSelectedImg] = useState(null);
    useEffect(() => {
        if (message.text.toLowerCase().includes(search.toLowerCase(), 0)) {
            ref.current?.scrollIntoView();
        }
    }, [search]);
    const handleShowModal = () => {
        setShowModal(!showModal);
    };

    const handleSelect = (img) => {
        setSelectedImg(img);
        handleShowModal();
    };

    const { data } = useContext(ChatContext);

    // const handleShowImg = (img) => {
    //     setSelectedImg(img);
    //     setShowImg(!showImg);
    // };

    const handleClick = async () => {
        const tempRef = doc(db, 'messages', data.chatId);
        let tempMessage = message;
        await updateDoc(tempRef, {
            messages: arrayRemove(message),
        });
        await updateDoc(tempRef, {
            messages: arrayUnion({
                id: tempMessage.id,
                date: tempMessage.date,
                text: tempMessage.text,
                img: tempMessage.img,
                senderId: tempMessage.senderId,
                deleted: true,
            }),
        });
        // deleteMessage(data.chatId, message);
    };

    useEffect(() => {
        ref.current?.scrollIntoView();
    }, [message]);

    return (
        !message.deleted && (
            <div ref={ref} className="flex justify-start flex-row-reverse mr-6 group">
                <div className="relative flex flex-col justify-start mb-3  ">
                    <div className=" absolute top-1/2 transform -translate-y-1/2 -left-32 items-center justify-center flex-row hidden group-hover:flex">
                        <span className="text-white text-sm bg-black py-1 px-2 rounded-2xl ">
                            {message.date.toDate().toLocaleTimeString()}
                        </span>
                        <FontAwesomeIcon
                            onClick={handleClick}
                            className="cursor-pointer p-2 text-xl rounded-full"
                            icon={faTrash}
                        />
                    </div>
                    <span className="flex justify-end">
                        {message.text !== '' ? (
                            <p className="inline-block  break-words max-w-xs  bg-white px-4 py-[6px] rounded-xl">
                                {message.text}
                            </p>
                        ) : (
                            <span></span>
                        )}
                    </span>
                    {message.img ? (
                        <img
                            onClick={() => handleSelect(message.img)}
                            className="hover:opacity-90 cursor-pointer bg-cover max-w-xs rounded-xl "
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
        )
    );
}

export default SelfMessage;
