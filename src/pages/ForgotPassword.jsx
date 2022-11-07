import { useState } from 'react';
import { Link } from 'react-router-dom';

import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase';

function ForgotPassword() {
    const [sent, setSent] = useState(false);
    const handleSubmit = (e) => {
        e.preventDefault();
        sendPasswordResetEmail(auth, e.target[0].value)
            .then(() => {
                setSent(true);
            })
            .catch((err) => {});
    };

    return (
        <div className="bg-[url('./assets/img/bg1.jpg')] bg-cover w-screen h-screen flex items-center justify-center">
            <div className="w-96 bg-white shadow-2xl rounded-3xl">
                <form onSubmit={handleSubmit} className="px-14 py-8 flex items-center flex-col">
                    <label className="uppercase font-bold text-2xl mb-4">forgot password</label>
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
                    {sent && (
                        <span className="text-sm text-center text-black capitalize">
                            a link to change your password has been sent to your email
                        </span>
                    )}
                </form>
            </div>
        </div>
    );
}

export default ForgotPassword;
