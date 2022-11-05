import { useState } from 'react';
import Contact from './Contact';

import { db } from '../firebase';
import { collection, query, where, getDocs, setDoc, doc, updateDoc, serverTimestamp, getDoc } from 'firebase/firestore';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

function Contacts() {
    return (
        <div className="flex flex-col w-96 h-full shadow-2xl z-50  ">
            <div className="grow bg-white overflow-scroll overflow-x-hidden">
                <Contact />
                <Contact />
                <Contact />
                <Contact />
            </div>
        </div>
    );
}

export default Contacts;
