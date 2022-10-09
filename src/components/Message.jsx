function Message() {
    return (
        <div className="flex flex-row ml-6 gap-6 mb-8">
            <div className="flex items-end justify-center">
                <img
                    className="w-9 h-9 bg-cover rounded-full"
                    src="https://i.pinimg.com/474x/e7/59/17/e75917f2f027002f522af4a9a3b7a88f.jpg"
                    alt="Profile Picture"
                />
            </div>
            <div>
                <p className="mb-2 inline-block break-words max-w-xs  bg-white px-4 py-2 rounded-xl">Hello</p>
                <img
                    className="bg-cover max-w-xs rounded-xl"
                    src="https://i.pinimg.com/474x/e7/59/17/e75917f2f027002f522af4a9a3b7a88f.jpg"
                    alt="Profile Picture"
                />
            </div>
        </div>
    );
}

export default Message;
