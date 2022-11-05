import Chat from '../components/Chat';
import Sidebar from './Sidebar';

function Content() {
    return (
        <div className="w-full bg-slate-700 flex">
            <Sidebar />
            <Chat />
        </div>
    );
}

export default Content;
