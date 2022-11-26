import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

import { useNavigate, Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/firebase';
import { useContext } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../context/AuthContext';

function Login() {
    // Toggle password visibility

    const { currentUser } = useContext(AuthContext);
    const [visible, setVisibility] = useState(false);

    const navigate = useNavigate();

    const toastPopUp = (customError) => {
        toast.error(customError, {
            position: 'top-right',
            autoClose: 3500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = e.target[0].value;
        const password = e.target[1].value;
        if (password === '' || email === '') {
            toastPopUp('Please fill in all the input fields');
        } else if (password.length < 6) {
            toastPopUp('Password length must be more than 6 characters');
        } else {
            try {
                await signInWithEmailAndPassword(auth, email, password);
                // console.log(currentUser);
                // if (currentUser) {
                // }
                navigate('/');
            } catch (err) {
                toastPopUp('Incorrect email or password. Please try again');

                // toast.error('Invalid or missing input please check again!', {
                //     position: 'top-right',
                //     autoClose: 3500,
                //     hideProgressBar: false,
                //     closeOnClick: true,
                //     pauseOnHover: true,
                //     draggable: true,
                //     progress: undefined,
                //     theme: 'light',
                // });
            }
            // console.log(currentUser.uid);
        }
    };

    return (
        <div className="bg-[url('./assets/img/bg1.jpg')] bg-cover w-screen h-screen flex items-center justify-center">
            <ToastContainer
                position="top-right"
                autoClose={3500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <div className="w-96 bg-white shadow-2xl rounded-3xl">
                <form onSubmit={handleSubmit} className="px-14 py-8 flex items-center flex-col">
                    <label className="uppercase font-bold text-2xl mb-4">login</label>
                    <div className="mb-4 w-full">
                        <label className="capitalize">email</label>
                        <input
                            className="pr-2 w-full py-2 border-b-2 border-cyan-400  focus: outline-none focus:border-cyan-500"
                            type="email"
                            placeholder="Type in your email"
                        ></input>
                        {/* <span className="text-sm mt-1 block h-4 text-red-600">error</span> */}
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

                        {/* <span className="text-sm mt-1 block h-4 text-red-600">error</span> */}
                    </div>

                    <label className="text-cyan-400 text-sm capitalize w-full flex justify-end">
                        <Link to="/forgotpassword">forgot password</Link>
                    </label>
                    {/* bg-gradient-to-r from-blue-500 to-pink-500  hover:from-pink-400 hover:to-blue-400 */}
                    <button className="font-semibold my-6 py-3 w-full uppercase text-white rounded-3xl  bg-black hover:bg-opacity-80">
                        login
                    </button>

                    <label className="capitalize text-sm">become a user</label>
                    <span className="text-sm text-cyan-400 capitalize">
                        <Link to="/register">register</Link>
                    </span>
                </form>
            </div>
        </div>
    );
}

export default Login;
