import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faImage } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, storage, db } from '../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate, Link } from 'react-router-dom';

function Register() {
    // Toggle password visibility
    const [visible, setVisibility] = useState(false);
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const displayName = e.target[0].value;
        const password = e.target[1].value;
        const email = e.target[2].value;
        const file = e.target[3].files[0];

        try {
            // Create new user account
            const res = await createUserWithEmailAndPassword(auth, email, password);

            // Create unique image file name and upload to Firebase storage
            const date = new Date().getTime();
            const storageRef = ref(storage, `${displayName + date}`);

            await uploadBytesResumable(storageRef, file).then(() => {
                getDownloadURL(storageRef).then(async (downloadURL) => {
                    try {
                        // Update (Add) additional info to previously created user
                        await updateProfile(res.user, {
                            displayName,
                            photoURL: downloadURL,
                        });

                        // Add user to database
                        await setDoc(doc(db, 'users', res.user.uid), {
                            uid: res.user.uid,
                            displayName,
                            email,
                            photoURL: downloadURL,
                        });

                        // Create empty contact in contacts collection on database
                        await setDoc(doc(db, 'contacts', res.user.uid), {});

                        navigate('/');
                    } catch (err) {
                        setError(true);
                        console.log(err);
                    }
                });
            });
        } catch (err) {
            setError(true);
        }
    };
    return (
        <div className="bg-[url('./assets/img/bg1.jpg')] bg-cover w-screen h-screen flex items-center justify-center">
            <div className="w-96 bg-white shadow-2xl rounded-3xl">
                <form onSubmit={handleSubmit} className="px-14 py-8 flex items-center flex-col">
                    <label className="uppercase font-bold text-2xl mb-4">register</label>
                    <div className="mb-4 w-full">
                        <label className="capitalize">username</label>
                        <input
                            className="pr-2 w-full py-2 border-b-2 border-cyan-400  focus: outline-none focus:border-cyan-500"
                            type="text"
                            placeholder="Type in your username"
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

                    <div className="mb-4 w-full">
                        <label className="capitalize">email</label>
                        <input
                            className="pr-2 w-full py-2 border-b-2 border-cyan-400  focus: outline-none focus:border-cyan-500"
                            type="text"
                            placeholder="Type in your email"
                        ></input>
                        {/* <span className="text-sm mt-1 block h-4 text-red-600">error</span> */}
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

                    <button className="font-semibold my-6 py-3 w-full uppercase text-white rounded-3xl  bg-black hover:bg-opacity-80">
                        register
                    </button>

                    <label className="capitalize text-sm">already a user</label>
                    <span className="text-sm text-cyan-400 capitalize">
                        <Link to="/login">login</Link>
                    </span>
                    {error && (
                        <span className="text-red-600 text-sm mt-4 text-center">
                            Missing or Invalid Info. Please try again
                        </span>
                    )}
                </form>
            </div>
        </div>
    );
}

export default Register;
