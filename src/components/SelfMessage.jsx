import { useEffect, useRef } from 'react';
import { arrayRemove, arrayUnion, updateDoc } from 'firebase/firestore';
import { ChatContext } from '../context/ChatContext';
import { useContext } from 'react';
import { db } from '../firebase';
import { doc } from 'firebase/firestore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

function SelfMessage({ search, message }) {
    const ref = useRef();
    // const [messages, setMessages] = useState([]);
    useEffect(() => {
        if (message.text.toLowerCase().includes(search.toLowerCase(), 0)) {
            ref.current?.scrollIntoView();
        }
    }, [search]);

    const { data } = useContext(ChatContext);

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
                        <img className="bg-cover max-w-xs rounded-xl " src={message.img} alt="" />
                    ) : (
                        <span></span>
                    )}
                </div>
            </div>
        )
    );
}

export default SelfMessage;
