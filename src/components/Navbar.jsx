import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear, faRightFromBracket, faMessage } from '@fortawesome/free-solid-svg-icons';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

function Navbar() {
    return (
        <div className="relative z-50 flex flex-col items-center justify-between bg-gray-900 py-4 w-16 h-full ">
            <div className="flex items-center justify-center">
                <img
                    className="w-9 h-9 bg-cover rounded-full"
                    src="https://i.pinimg.com/474x/e7/59/17/e75917f2f027002f522af4a9a3b7a88f.jpg"
                    alt="Profile Picture"
                />
            </div>

            <div className="flex items-center flex-col justify-center gap-3">
                <button className="btn-icon">
                    <FontAwesomeIcon
                        className="p-2 text-xl  text-white rounded-full hover:bg-slate-500"
                        icon={faMessage}
                    />
                </button>
                <button className="btn-icon">
                    <FontAwesomeIcon
                        className="p-2 text-xl  text-white rounded-full hover:bg-slate-500"
                        icon={faGear}
                    />
                </button>
                <button className="btn-icon" onClick={() => signOut(auth)}>
                    <FontAwesomeIcon
                        className="p-2 text-xl  text-white rounded-full hover:bg-slate-500"
                        icon={faRightFromBracket}
                    />
                </button>
            </div>
        </div>
    );
}

export default Navbar;
