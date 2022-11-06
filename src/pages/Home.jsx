import Content from '../components/Content';
import Dashboard from '../components/Dashboard';

import ProfileModal from '../components/ProfileModal';
import { ModalContext } from '../context/ModalContext';
import { useState } from 'react';

function Home() {
    const [showModal, setShowModal] = useState(false);
    return (
        <div className="flex w-screen h-screen relative ">
            <ModalContext.Provider value={{ showModal, setShowModal }}>
                <Dashboard />
                {showModal && <ProfileModal />}
            </ModalContext.Provider>
            <Content />
        </div>
    );
}

export default Home;
