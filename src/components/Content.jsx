import Contacts from '../components/Contacts';
import Chat from '../components/Chat';

function Content() {
    return (
        <div className="w-full bg-slate-700 flex">
            <Contacts />
            <Chat />
        </div>
    );
}

export default Content;
