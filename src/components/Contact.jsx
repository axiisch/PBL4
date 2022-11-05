import { useEffect } from 'react';
import { useState } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { AuthContext } from '../context/AuthContext';

function Contact() {
    return (
        <div className="cursor-pointer  px-6 py-3 flex items-center gap-3 hover:bg-gray-300">
            <div>
                <img
                    className="w-14 h-14 bg-cover rounded-full"
                    src="https://i.pinimg.com/474x/e7/59/17/e75917f2f027002f522af4a9a3b7a88f.jpg"
                    alt="Contact Picture"
                />
            </div>
            <div className="grow flex flex-col">
                <label className="max-w-[270px] whitespace-nowrap overflow-hidden font-semibold">Contact</label>
                <p className="max-w-[270px] whitespace-nowrap overflow-hidden text-sm text-gray-600 ">Message Sent</p>
            </div>
        </div>
    );
}

export default Contact;
