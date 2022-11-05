import { useContext } from 'react';
import { ChatContext } from '../context/ChatContext';

function Message({ message }) {
    const { data } = useContext(ChatContext);
    return (
        <div className="flex flex-row ml-6 gap-6 mb-2">
            <div className="flex items-end justify-center">
                <img className="w-9 h-9 bg-cover rounded-full" src={data.user.photoURL} alt="Profile Picture" />
            </div>
            <div>
                {message.text != '' ? (
                    <p className="mb-2 inline-block break-words max-w-xs  bg-white px-4 py-2 rounded-xl">
                        {message.text}
                    </p>
                ) : (
                    <span></span>
                )}

                {message.img ? (
                    <img className="bg-cover max-w-xs rounded-xl" src={message.img} alt="Profile Picture" />
                ) : (
                    <span></span>
                )}
            </div>
        </div>
    );
}

export default Message;
