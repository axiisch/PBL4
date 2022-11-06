import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import Input from '../components/Input';
import Chatbox from '../components/Chatbox';
import { useContext } from 'react';
import { ChatContext } from '../context/ChatContext';

function Chat() {
    const { data } = useContext(ChatContext);

    return (
        <div className="flex flex-col grow">
            {/* HEADER */}
            <div className="w-full py-4  px-6 h-[68px] bg-white ">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        <img className="w-9 h-9 bg-cover rounded-full" src={data.user?.photoURL} alt="loading" />
                        <label>{data.user?.displayName}</label>
                    </div>
                    <button className="btn-icon">
                        <FontAwesomeIcon
                            className="p-2 w-[36px] text-xl  text-white rounded-full hover:bg-slate-500"
                            icon={faEllipsis}
                        />
                    </button>
                </div>
            </div>
            <Chatbox />
            <Input />
        </div>
    );
}

export default Chat;
