function TestingMessage() {
    return (
        <div className="flex justify-start flex-row-reverse mr-6 gap-6 mb-8">
            <div className="flex flex-col justify-start ">
                <span className="flex justify-end">
                    <p className="mb-2 inline-block  break-words max-w-xs  bg-white px-4 py-2 rounded-xl">Hello</p>
                </span>
                <img
                    className="bg-cover max-w-xs rounded-xl"
                    src="https://i.pinimg.com/474x/e7/59/17/e75917f2f027002f522af4a9a3b7a88f.jpg"
                    alt="Profile Picture"
                />
            </div>
        </div>
    );
}

export default TestingMessage;
