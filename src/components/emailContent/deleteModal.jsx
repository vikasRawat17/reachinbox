import React from "react";

const DeleteConfirmationModal = ({ onCancel, onConfirm }) => {
  return (
    <div className="fixed inset-0 bg-black/50 dark:bg-black/70 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-xl p-6 w-96 border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
          Are you sure?
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Your selected email will be deleted.
        </p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={onCancel}
            className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-4 py-2 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 dark:hover:bg-red-500 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
