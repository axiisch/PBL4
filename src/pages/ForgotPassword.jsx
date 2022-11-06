import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function ForgotPassword() {
    const [visible, setVisibility] = useState(false);
    const [visible2, setVisibility2] = useState(false);
    const [exist, setExist] = useState(false);
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(e.target[0].value);
        if (e.target[0].value === '123@gmail.com') {
            setExist(true);
        }
    };

    const handleChangePassword = (e) => {
        e.preventDefault();
        console.log(e.target[0].value);
        console.log(e.target[1].value);
    };

    return (
        <div className="bg-[url('./assets/img/bg1.jpg')] bg-cover w-screen h-screen flex items-center justify-center">
            <div className="w-96 bg-white shadow-2xl rounded-3xl">
                {!exist && (
                    <form onSubmit={handleSubmit} className="px-14 py-8 flex items-center flex-col">
                        <label className="uppercase font-bold text-2xl mb-4">forogt password</label>
                        <div className="mb-4 w-full">
                            <label className="capitalize">email</label>
                            <input
                                className="pr-2 w-full py-2 border-b-2 border-cyan-400  focus: outline-none focus:border-cyan-500"
                                type="email"
                                placeholder="Type in your email"
                            ></input>
                            {/* <span className="text-sm mt-1 block h-4 text-red-600">error</span> */}
                        </div>
                        <button className="font-semibold my-6 py-3 w-full uppercase text-white rounded-3xl bg-gradient-to-r from-blue-500 to-pink-500  hover:from-pink-400 hover:to-blue-400">
                            check
                        </button>
                        <label className="capitalize text-sm">Return to login</label>
                        <span className="text-sm text-cyan-400 capitalize">
                            <Link to="/login">Login</Link>
                        </span>
                    </form>
                )}

                {exist && (
                    <form onSubmit={handleChangePassword} className="px-14 py-8 flex items-center flex-col">
                        <label className="uppercase font-bold text-2xl mb-4">change password</label>
                        <div className="relative mb-4">
                            <label className="capitalize">new password</label>
                            <input
                                className="pr-7 w-full py-2 border-b-2 border-cyan-400  focus: outline-none focus:border-cyan-500"
                                type={visible ? 'text' : 'password'}
                                placeholder="Type in your new password"
                            ></input>
                            <span className="h absolute right-0 bottom-2" onClick={() => setVisibility(!visible)}>
                                <FontAwesomeIcon icon={visible ? faEyeSlash : faEye} />
                            </span>
                        </div>
                        <div className="relative">
                            <label className="capitalize">confirm new password</label>
                            <input
                                className="pr-7 w-full py-2 border-b-2 border-cyan-400  focus: outline-none focus:border-cyan-500"
                                type={visible2 ? 'text' : 'password'}
                                placeholder="Confirm new password"
                            ></input>
                            <span className="h absolute right-0 bottom-2" onClick={() => setVisibility2(!visible2)}>
                                <FontAwesomeIcon icon={visible2 ? faEyeSlash : faEye} />
                            </span>
                        </div>
                        <button className="font-semibold my-6 py-3 w-full uppercase text-white rounded-3xl bg-gradient-to-r from-blue-500 to-pink-500  hover:from-pink-400 hover:to-blue-400">
                            confirm
                        </button>
                        <label className="capitalize text-sm">Return to login</label>
                        <span className="text-sm text-cyan-400 capitalize">
                            <Link to="/login">Login</Link>
                        </span>
                    </form>
                )}
            </div>
        </div>
    );
}

export default ForgotPassword;
