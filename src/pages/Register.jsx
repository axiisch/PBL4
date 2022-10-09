import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faImage } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

function Register() {
    const [visible, setVisibility] = useState(false);

    return (
        <div className="bg-[url('./assets/img/bg1.jpg')] bg-cover w-screen h-screen flex items-center justify-center">
            <div className="w-96 bg-white shadow-2xl rounded-3xl">
                <form className="px-14 py-8 flex items-center flex-col">
                    <label className="uppercase font-bold text-2xl mb-4">register</label>
                    <div className="mb-4 w-full">
                        <label className="capitalize">username</label>
                        <input
                            className="pr-2 w-full py-2 border-b-2 border-cyan-400  focus: outline-none focus:border-cyan-500"
                            type="text"
                            placeholder="Type in your username"
                        ></input>
                        <span className="text-sm mt-1 block h-4 text-red-600">error</span>
                    </div>

                    <div className="w-full mb-4 ">
                        <label className="capitalize">password</label>
                        <div className="relative">
                            <input
                                className="pr-7 w-full py-2 border-b-2 border-cyan-400  focus: outline-none focus:border-cyan-500"
                                type={visible ? 'text' : 'password'}
                                placeholder="Type in your password"
                            ></input>
                            <span className="h absolute right-0 bottom-2" onClick={() => setVisibility(!visible)}>
                                <FontAwesomeIcon icon={visible ? faEyeSlash : faEye} />
                            </span>
                        </div>

                        <span className="text-sm mt-1 block h-4 text-red-600">error</span>
                    </div>

                    <div className="mb-4 w-full">
                        <label className="capitalize">email</label>
                        <input
                            className="pr-2 w-full py-2 border-b-2 border-cyan-400  focus: outline-none focus:border-cyan-500"
                            type="text"
                            placeholder="Type in your email"
                        ></input>
                        <span className="text-sm mt-1 block h-4 text-red-600">error</span>
                    </div>

                    <div className="flex items-center justify-start w-full">
                        <input id="upload" type="file" className="hidden" />
                        <label
                            htmlFor="upload"
                            className="flex items-center cursor-pointer gap-2  text-cyan-400 text-sm capitalize"
                        >
                            <FontAwesomeIcon className="text-2xl" icon={faImage} />
                            upload your profile picture
                        </label>
                    </div>

                    <button className="cursor-pointer font-semibold my-6 py-3 w-full uppercase text-white rounded-3xl bg-gradient-to-r from-blue-500 to-pink-500  hover:from-pink-400 hover:to-blue-400">
                        register
                    </button>

                    <label className="capitalize text-sm">already a user</label>
                    <span className="text-sm text-cyan-400 capitalize">login</span>
                </form>
            </div>
        </div>
    );
}

export default Register;
