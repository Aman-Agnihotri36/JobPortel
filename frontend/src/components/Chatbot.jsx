// src/components/ChatbotWithClose.js
import React, { useState } from 'react';

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(true);

    const toggleChatbot = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            {isOpen ? (
                <div className="fixed bottom-5 right-5 w-80 h-96 bg-white border border-gray-300 rounded-lg shadow-lg flex flex-col z-50">
                    <div className="flex justify-between items-center bg-[#6A38C2] text-white px-4 py-2 rounded-t-lg">
                        <span className="font-semibold">JobBot</span>
                        <button
                            className="text-xl font-bold focus:outline-none"
                            onClick={toggleChatbot}
                            aria-label="Close Chatbot"
                        >
                            &times;
                        </button>
                    </div>
                    <iframe
                        src="https://landbot.online/v3/H-2613156-JKB2BSTZHILZMP0P/index.html"
                        title="Job Portal Chatbot"
                        className="flex-1 rounded-b-lg"
                    ></iframe>
                </div>
            ) : (
                <button
                    className="fixed bottom-5 right-5 bg-[#6A38C2] text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg z-50 hover:bg-[#381e65] transition-colors"
                    onClick={toggleChatbot}
                    aria-label="Open Chatbot"
                >
                    💬
                </button>
            )}
        </>
    );
};

export default Chatbot
