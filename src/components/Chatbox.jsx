import Message from './Message';
import TestingMessage from './TestingMessage';

function Chatbox() {
    return (
        <div className="bg-gray-200 shadow-[inset_0_0_30px_rgba(0,0,0,0.2)] h-full overflow-scroll overflow-x-hidden">
            <TestingMessage />
            <Message />
            <TestingMessage />
            <TestingMessage />

            <Message />
            <TestingMessage />
            <TestingMessage />
            <Message />
            <Message />
        </div>
    );
}

export default Chatbox;
