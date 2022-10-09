import Contact from './Contact';

function Contacts() {
    return (
        <div className="flex flex-col w-96 h-full shadow-2xl z-50  ">
            <div className="w-full py-4 px-6 bg-teal-100">
                <input
                    className="w-full h-9 rounded-3xl px-4 py-2  focus: outline-none"
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
