import { useState } from 'react';
import { Link } from 'react-router-dom';

import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase';

function ForgotPassword() {
    const [sent, setSent] = useState(false);
    const [error, setError] = useState('');
    const handleSubmit = (e) => {
        setError(false);
        e.preventDefault();
        sendPasswordResetEmail(auth, e.target[0].value)
            .then(() => {
                setSent(true);
            })
            .catch((err) => {
                setError('Invalid Email');
            });
    };

    return (
        <div className="bg-[url('./assets/img/bg1.jpg')] bg-cover w-screen h-screen flex items-center justify-center">
            <div className="w-96 bg-white shadow-2xl rounded-3xl">
                <form onSubmit={handleSubmit} className="px-14 py-8 flex items-center flex-col">
                    <label className="uppercase font-bold text-2xl mb-4">forgot password</label>
                    <div className="mb-2 w-full">
                        <label className="capitalize">Change password via email</label>
                        <input
                            className="pr-2 w-full py-2 border-b-2 border-cyan-400  focus: outline-none focus:border-cyan-500"
                            type="email"
                            placeholder="Type in your email"
                        ></input>
                        {/* <span className="text-sm mt-1 block h-4 text-red-600">error</span> */}
                    </div>

                    {error === '' ? <span>&nbsp;</span> : <span className="text text-red-500 w-full">{error}</span>}

                    <button className="font-semibold mb-6 mt-4 py-3 w-full uppercase text-white rounded-3xl  bg-black hover:bg-opacity-80">
                        send
                    </button>
                    {sent && (
                        <span className="text-sm text-center text-black capitalize mb-4">
                            link sent! check your inbox and spam
                        </span>
                    )}
                    <label className="capitalize text-sm">Return to login</label>
                    <span className="text-sm text-cyan-400 capitalize">
                        <Link to="/login">Login</Link>
                    </span>
                </form>
            </div>
        </div>
    );
}

export default ForgotPassword;
