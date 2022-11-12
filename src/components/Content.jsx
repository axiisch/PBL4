import { useContext } from 'react';
import Chat from '../components/Chat';
import { ChatContext } from '../context/ChatContext';
import Sidebar from './Sidebar';

function Content() {
    const user = useContext(ChatContext);
    // console.log(user);
    return (
        <div className="w-full bg-white flex">
            <Sidebar />
            {user.data.chatId === 'null' ? (
                <div className="flex items-center justify-center grow">
                    <p className="text-3xl">Select a user to start chatting!</p>
                </div>
            ) : (
                <Chat />
            )}
        </div>
    );
}

export default Content;
