import Contacts from './Contacts';
import Search from './Search';

function Sidebar() {
    return (
        <div className="z-10 bg-slate-700 flex flex-col">
            <Search />
            <Contacts />
        </div>
    );
}

export default Sidebar;
