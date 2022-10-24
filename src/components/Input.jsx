import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faPaperPlane } from '@fortawesome/free-solid-svg-icons';

function Input() {
    return (
        <div className="w-full h-[68px] flex items-center justify-center bg-white shadow-2xl">
            <div className="flex items-center justify-center w-full px-6">
                <label htmlFor="upload" className="flex items-center cursor-pointer gap-2 text-sm capitalize">
                    <FontAwesomeIcon
                        className="p-2 text-xl  text-black rounded-full hover:bg-slate-500 hover:text-white"
                        icon={faImage}
                    />
                </label>
                <input
                    className=" mx-6 w-full h-9 border-b-2 border-gray-400  py-2  focus: outline-none focus:border-gray-600"
                    type="text"
                    placeholder="Message"
                />
                <input id="upload" type="file" className="hidden" />
                <button className="btn-icon">
                    <FontAwesomeIcon
                        className="p-2 text-xl  text-black rounded-full hover:bg-slate-500 hover:text-white"
                        icon={faPaperPlane}
                    />
                </button>
            </div>
        </div>
    );
}

export default Input;
