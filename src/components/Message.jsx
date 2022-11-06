import { useContext, useRef, useEffect } from 'react';
import { ChatContext } from '../context/ChatContext';

function Message({ message }) {
    const { data } = useContext(ChatContext);
    const ref = useRef();

    useEffect(() => {
        ref.current?.scrollIntoView({ behavior: 'smooth' });
    }, [message]);

    return (
        <div ref={ref} className="flex flex-row ml-6 gap-6 mb-2">
            <div className="flex items-end justify-center">
                <img className="w-9 h-9 bg-cover rounded-full" src={data.user.photoURL} alt="loading" />
            </div>
            <div className="relative">
                <span className="text-white text-sm bg-gray-500 py-1 px-2 rounded-xl absolute top-1/2 transform -translate-y-1/2 -right-32 opacity-0 hover:opacity-100">
                    {message.date.toDate().toLocaleTimeString()}
                </span>
                {message.text !== '' ? (
                    <p className=" inline-block break-words max-w-xs  bg-white px-4 py-2 rounded-xl">{message.text}</p>
                ) : (
                    <span></span>
                )}

                {message.img ? (
                    <img className="bg-cover max-w-xs rounded-xl" src={message.img} alt="loading" />
                ) : (
                    <span></span>
                )}
            </div>
        </div>
    );
}

export default Message;
