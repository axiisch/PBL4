import { useState } from 'react';
import { db } from '../firebase';
import { collection, query, where, getDocs, setDoc, doc, updateDoc, serverTimestamp, getDoc } from 'firebase/firestore';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

function Search() {
    // Hold search content
    const [username, setUsername] = useState('');
    // Hold targeted user
    const [user, setUser] = useState(null);

    const { currentUser } = useContext(AuthContext);

    const handleSearch = async () => {
        setUser(null);
        const q = query(collection(db, 'users'), where('displayName', '==', username));

        try {
            // Map users collection => Find username => Set target user
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                setUser(doc.data());
            });
        } catch (err) {}
    };

    const handleKey = (e) => {
        e.code === 'Enter' && handleSearch();
    };

    const handleSelect = async () => {
        // Connect uid of both users and set it as an array
        const combinedId = currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid;
        try {
            const res = await getDoc(doc(db, 'messages', combinedId));

            // Create new contact between 2 users if not existed
            if (!res.exists()) {
                // Create messages collection, left blank
                await setDoc(doc(db, 'messages', combinedId), { messages: [] });

                // [Nested collection] Create connection on both user ends
                await updateDoc(doc(db, 'userChats', currentUser.uid), {
                    [combinedId + '.userInfo']: {
                        uid: user.uid,
                        displayName: user.displayName,
                        photoURL: user.photoURL,
                    },
                    [combinedId + '.date']: serverTimestamp(),
                });

                await updateDoc(doc(db, 'userChats', user.uid), {
                    [combinedId + '.userInfo']: {
                        uid: currentUser.uid,
                        displayName: currentUser.displayName,
                        photoURL: currentUser.photoURL,
                    },
                    [combinedId + '.date']: serverTimestamp(),
                });
            }
        } catch (err) {}

        // Clear search and targeted user
        setUser(null);
        setUsername('');
    };

    return (
        <div className="flex flex-col w-96 h-auto shadow-2xl z-50  ">
            <div className="w-full py-4 px-6 drop-shadow-lg bg-white">
                <input
                    onKeyDown={handleKey}
                    onChange={(e) => setUsername(e.target.value)}
                    className="bg-gray-800 w-full h-9 text-white  rounded-3xl px-4 py-2  focus: outline-none"
                    type="text"
                    placeholder="Search people"
                />
            </div>

            <div className="grow bg-white">
                {user && (
                    <div
                        onClick={handleSelect}
                        className="cursor-pointer  px-6 py-3 flex items-center gap-3 hover:bg-gray-300"
                    >
                        <div>
                            <img className="w-14 h-14 bg-cover rounded-full" src={user.photoURL} alt="error" />
                        </div>
                        <div className="grow flex flex-col">
                            <label className="cursor-pointer max-w-[270px] whitespace-nowrap overflow-hidden font-semibold">
                                {user.displayName}
                            </label>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Search;
