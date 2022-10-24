import Contact from './Contact';

function Contacts() {
    return (
        <div className="flex flex-col w-96 h-full shadow-2xl z-50  ">
            <div className="w-full py-4 px-6 drop-shadow-lg bg-white">
                <input
                    className="bg-gray-800 w-full h-9 text-white  rounded-3xl px-4 py-2  focus: outline-none"
                    type="text"
                    placeholder="Search people"
                />
            </div>

            <div className="grow bg-white overflow-scroll overflow-x-hidden">
                <Contact />
                <Contact />
                <Contact />
                <Contact />
                <Contact />
                <Contact />
                <Contact />
                <Contact />
                <Contact />
                <Contact />
                <Contact />
                <Contact />
                <Contact />
                <Contact />
                <Contact />
                <Contact />
                <Contact />
                <Contact />
                <Contact />
                <Contact />
                <Contact />
                <Contact />
                <Contact />
                <Contact />
                <Contact />
                <Contact />
                <Contact />
                <Contact />
                <Contact />
                <Contact />
                <Contact />
                <Contact />
                <Contact />
                <Contact />
                <Contact />
                <Contact />
                <Contact />
                <Contact />
                <Contact />
                <Contact />
                <Contact />
            </div>
        </div>
    );
}

export default Contacts;
