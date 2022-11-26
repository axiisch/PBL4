import React from 'react';
import { CSSTransition } from 'react-transition-group';
import { ChatContext } from '../context/ChatContext';
import { useContext } from 'react';
import { db } from '../firebase/firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import { useEffect, useState, useRef } from 'react';

import ImageModal from '../components/ImageModal';

function Gallery({ show }) {
    const [messages, setMessages] = useState([]);
    const { data } = useContext(ChatContext);
    const [showModal, setShowModal] = useState(false);
    const [selectedImg, setSelectedImg] = useState(null);
    const handleShowModal = () => {
        setShowModal(!showModal);
    };

    const handleSelect = (img) => {
        setSelectedImg(img);
        handleShowModal();
    };

    const nodeRef = useRef(null);
    useEffect(() => {
        const unSub = onSnapshot(doc(db, 'messages', data.chatId), (doc) => {
            doc.exists() && setMessages(doc.data().messages);
        });

        return () => {
            unSub();
        };
    }, [data.chatId]);

    return (
        <CSSTransition in={show} timeout={200} classNames="gallery" nodeRef={nodeRef} unmountOnExit>
            <div ref={nodeRef} className="w-72 z-40 h-full">
                <div className="h-[68px] flex items-center justify-center">
                    <label className="font-semibold">Image Gallery</label>
                </div>
                <div class="grid grid-cols-3 max-h-[calc(100%-68px)] gap-2 mx-2 overflow-y-scroll text-center overflow-x-hidden">
                    {messages.map(
                        (message) =>
                            !message.deleted &&
                            message.img != null && (
                                <div
                                    className="hover:opacity-90 drop-shadow-xl m-auto w-16 h-16 flex items-center justify-center bg-black  rounded-xl bg-opacity-60"
                                    key={message.id}
                                >
                                    <img
                                        onClick={() => handleSelect(message.img)}
                                        className="rounded-xl cursor-pointer"
                                        src={message.img}
                                        alt=""
                                    />
                                </div>
                            ),
                    )}
                </div>
                <ImageModal handleShowModal={handleShowModal} showModal={showModal} selectedImg={selectedImg} />
            </div>
        </CSSTransition>
    );
}

export default Gallery;
