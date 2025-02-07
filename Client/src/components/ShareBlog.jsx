import React from "react";
import { FiX, FiCopy } from "react-icons/fi";
import { RiWhatsappFill, RiInstagramFill, RiLinkedinFill, RiTwitterFill } from "react-icons/ri";
import { useState } from "react";

const SharePage = ({ blogUrl, onClose }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(blogUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const shareOptions = [
        { name: "WhatsApp", icon: <RiWhatsappFill className="text-[#25D366]" />, url: `https://wa.me/?text=${blogUrl}` },
        { name: "Instagram", icon: <RiInstagramFill className="text-[#E4405F]" />, url: `https://www.instagram.com/` },
        { name: "LinkedIn", icon: <RiLinkedinFill className="text-[#0077B5]" />, url: `https://www.linkedin.com/sharing/share-offsite/?url=${blogUrl}` },
        { name: "Twitter", icon: <RiTwitterFill className="text-[#1DA1F2]" />, url: `https://twitter.com/intent/tweet?url=${blogUrl}` },
    ];

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            {/* Light-themed overlay */}
            <div className="absolute inset-0 bg-white/50 backdrop-blur-lg"></div>

            {/* Share Modal */}
            <div className="relative bg-white shadow-xl rounded-2xl p-6 w-[400px] border border-gray-200">
                {/* Close Button */}
                <button 
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 transition" 
                    onClick={onClose}
                >
                    <FiX className="w-6 h-6" />
                </button>

                {/* Header */}
                <h2 className="text-2xl font-semibold text-gray-900 text-center mb-4" style={{ fontFamily: "Inter, sans-serif" }}>
                    Share this Blog
                </h2>

                {/* Copy Link Section */}
                <div className="flex items-center border border-gray-300 bg-gray-100 p-3 rounded-lg mb-4">
                    <input 
                        type="text" 
                        value={blogUrl} 
                        readOnly 
                        className="flex-grow bg-transparent text-gray-800 font-medium outline-none px-2"
                    />
                    <button 
                        onClick={handleCopy} 
                        className="ml-2 p-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
                    >
                        <FiCopy className="text-gray-600 w-5 h-5" />
                    </button>
                </div>
                {copied && <p className="text-green-600 text-sm text-center mb-4">Copied to clipboard!</p>}

                {/* Social Media Sharing */}
                <div className="grid grid-cols-2 gap-3">
                    {shareOptions.map(({ name, icon, url }) => (
                        <a 
                            key={name} 
                            href={url} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="flex items-center gap-3 px-4 py-2 border border-gray-200 rounded-xl bg-gray-50 hover:bg-gray-100 transition"
                        >
                            <span className="text-xl">{icon}</span>
                            <span className="text-gray-700 font-medium">{name}</span>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SharePage;
