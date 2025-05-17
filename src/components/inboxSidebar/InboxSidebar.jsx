import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmails, selectEmail } from "../../store/emails/Email";

export default function InboxSidebar() {
  const dispatch = useDispatch();
  const emails = useSelector((state) => state.inbox.emails);
  const status = useSelector((state) => state.inbox.status);
  const error = useSelector((state) => state.inbox.error);
  const selectedEmailId = useSelector((state) => state.inbox.selectedEmailId);

  useEffect(() => {
    dispatch(fetchEmails());

    const refreshInterval = setInterval(() => {
      dispatch(fetchEmails());
    }, 30000);

    return () => clearInterval(refreshInterval);
  }, [dispatch]);

  if (status === "loading")
    return (
      <div className="w-72 h-full bg-white text-black border-black dark:bg-black dark:text-white dark:border-gray-500 border flex items-center justify-center">
        Loading emails...
      </div>
    );

  if (status === "failed")
    return (
      <div className="w-72 h-full bg-white dark:bg-zinc-900 text-red-600 dark:text-red-400 border-r border-black dark:border-gray-700 flex items-center justify-center">
        Error: {error}
      </div>
    );

  return (
    <div className="w-72 bg-white dark:bg-zinc-900 text-black dark:text-white h-full border border-black dark:border-gray-700 flex flex-col">
      <div className="px-4 py-3 border-b border-black dark:border-gray-700">
        <div className="flex justify-between items-center">
          <h2 className="font-semibold">All Inbox(s)</h2>
          <button className="text-sm bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
            ▼
          </button>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          25/25 inboxes selected
        </p>
      </div>

      <div className="p-4 flex items-center gap-2 border-b border-gray-200 dark:border-gray-700">
        <input
          type="text"
          placeholder="Search"
          className="w-full px-3 py-1 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded outline-none text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
        />
        <button className="text-sm bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
          Newest
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {emails.map((email) => (
          <div
            key={email.id}
            onClick={() => dispatch(selectEmail(email.threadId))}
            className={`px-4 py-3 cursor-pointer border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 ${
              selectedEmailId === email.id ? "bg-gray-100 dark:bg-gray-700" : ""
            }`}
          >
            <div className="font-medium text-sm truncate">{email.from}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
              {email.subject}
            </div>
            <div className="mt-1 flex gap-1 flex-wrap">
              {email.tags?.map((tag, idx) => (
                <span
                  key={idx}
                  className="bg-gray-200 dark:bg-gray-700 text-xs px-2 py-1 rounded-full text-gray-700 dark:text-gray-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
