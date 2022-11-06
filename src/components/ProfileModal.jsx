import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

import { ModalContext } from '../context/ModalContext';

function ProfileModal() {
    const { currentUser } = useContext(AuthContext);

    const { showModal, setShowModal } = useContext(ModalContext);
    // const [open, setOpen] = useState(false);
    return (
        <div className=" w-full h-full bg-black bg-opacity-80 flex justify-center items-center absolute top-1/2 left-1/2  transform -translate-x-1/2 -translate-y-1/2 z-50 ">
            <div className="w-96 bg-white shadow-2xl rounded-3xl">
                <div className="px-14 py-8 flex items-center flex-col">
                    <label className="uppercase font-bold text-2xl mb-4">User Information</label>

                    <div>
                        <img className="w-20 h-20 rounded-full" src={currentUser.photoURL} alt="loading" />
                    </div>

                    <div className="mb-4 w-full mt-4">
                        <label className="capitalize">display name</label>
                        <input
                            className="pointer-events-none pr-2 w-full py-2 border-b-2 border-cyan-400  focus: outline-none focus:border-cyan-500"
                            type="text"
                            defaultValue={currentUser.displayName}
                        ></input>
                    </div>

                    <div className="w-full mb-4 ">
                        <label className="capitalize">Email</label>
                        <div className="relative">
                            <input
                                className="pointer-events-none pr-7 w-full py-2 border-b-2 border-cyan-400  focus: outline-none focus:border-cyan-500"
                                type="email"
                                defaultValue={currentUser.email}
                            ></input>
                            <span className="h absolute right-0 bottom-2"></span>
                        </div>
                    </div>

                    <button
                        onClick={() => setShowModal(!showModal)}
                        className="font-semibold my-6 py-3 w-full uppercase text-white rounded-3xl bg-gradient-to-r from-blue-500 to-pink-500  hover:from-pink-400 hover:to-blue-400"
                    >
                        close
                    </button>

                    <span className="text-sm text-cyan-400 capitalize"></span>
                </div>
            </div>
        </div>
    );
}

export default ProfileModal;
