import React from "react";

const ConfirmDelete = ({ message, onCancel, onConfirm }) => {
    return (
        <div className="fixed inset-0 bg-white/50 backdrop-blur-md flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-xl flex flex-col items-center space-y-6">
                <h1 className="text-4xl font-extrabold text-gray-900">Delete Blog</h1>
                <h2 className="text-lg text-gray-600 text-center max-w-xs">
                    Deletion is not reversible. The blog will be permanently deleted. Are you sure?
                </h2>

                <div className="flex justify-center gap-6 mt-6">
                    <button
                        className="px-6 py-2 bg-gray-200 rounded-lg text-gray-800 font-medium transition-all transform hover:bg-gray-300 hover:scale-105"
                        onClick={onCancel}
                    >
                        Cancel
                    </button>
                    <button
                        className="px-6 py-2 bg-red-600 text-white rounded-lg font-medium transition-all transform hover:bg-red-700 hover:scale-105"
                        onClick={onConfirm}
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmDelete;

