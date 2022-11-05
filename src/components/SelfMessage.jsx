function SelfMessage({ message }) {
    return (
        <div className="flex justify-start flex-row-reverse mr-6 gap-6 mb-2">
            <div className="flex flex-col justify-start ">
                <span className="flex justify-end">
                    {message.text != '' ? (
                        <p className="mb-2 inline-block  break-words max-w-xs  bg-white px-4 py-2 rounded-xl">
                            {message.text}
                        </p>
                    ) : (
                        <span></span>
                    )}
                </span>
                {message.img ? (
                    <img className="bg-cover max-w-xs rounded-xl" src={message.img} alt="Profile Picture" />
                ) : (
                    <span></span>
                )}
            </div>
        </div>
    );
}

export default SelfMessage;
