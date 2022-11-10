import { useContext, useRef, useEffect } from 'react';
import { ChatContext } from '../context/ChatContext';

function Message({ message }) {
    const { data } = useContext(ChatContext);
    const ref = useRef();

    useEffect(() => {
        ref.current?.scrollIntoView({ behavior: 'smooth' });
    }, [message]);

    return (
        <div ref={ref} className="flex flex-row ml-6 gap-6">
            <div className="flex items-end justify-center">
                <img className="w-9 h-9 bg-cover rounded-full" src={data.user.photoURL} alt="loading" />
            </div>
            <div className="relative group">
                <span className="text-white text-sm bg-black py-1 px-2 rounded-2xl absolute top-1/2 transform -translate-y-1/2 -right-32 hidden group-hover:block">
                    {message.date.toDate().toLocaleTimeString()}
                </span>
                {message.text !== '' ? (
                    <p className=" inline-block break-words max-w-xs text-white bg-gray-500 px-4 py-2 rounded-xl mb-3">
                        {message.text}
                    </p>
                ) : (
                    <span></span>
                )}

                {message.img ? (
                    <img className="bg-cover max-w-xs rounded-xl mb-3" src={message.img} alt="loading" />
                ) : (
                    <span></span>
                )}
            </div>
        </div>
    );
}

export default Message;
