import { useContext } from 'react';
import Chat from '../components/Chat';
import { ChatContext } from '../context/ChatContext';
import Sidebar from './Sidebar';

function Content() {
    const user = useContext(ChatContext);

    return (
        <div className="w-full bg-slate-700 flex">
            <Sidebar />
            <Chat />
        </div>
    );
}

export default Content;
