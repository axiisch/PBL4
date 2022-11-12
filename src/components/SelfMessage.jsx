import { useEffect, useRef } from 'react';

function SelfMessage({ message }) {
    const ref = useRef();

    useEffect(() => {
        ref.current?.scrollIntoView({ behavior: 'smooth' });
    }, [message]);

    return (
        <div ref={ref} className="flex justify-start flex-row-reverse mr-6">
            <div className="relative flex flex-col justify-start mb-3  group">
                <span className="text-white text-sm bg-black py-1 px-2 rounded-2xl absolute top-1/2 transform -translate-y-1/2 -left-32 hidden group-hover:block">
                    {message.date.toDate().toLocaleTimeString()}
                </span>
                <span className="flex justify-end">
                    {message.text !== '' ? (
                        <p className="inline-block  break-words max-w-xs  bg-white px-4 py-[6px] rounded-xl">
                            {message.text}
                        </p>
                    ) : (
                        <span></span>
                    )}
                </span>
                {message.img ? (
                    <img className="bg-cover max-w-xs rounded-xl " src={message.img} alt="loading" />
                ) : (
                    <span></span>
                )}
            </div>
        </div>
    );
}

export default SelfMessage;
