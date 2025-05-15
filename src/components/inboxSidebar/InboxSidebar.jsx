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
  }, [dispatch]);

  if (status === "loading") return <div>Loading emails...</div>;
  if (status === "failed") return <div>Error: {error}</div>;

  return (
    <div className="w-[278px] bg-[#0f0f0f] text-white h-full border-r border-[#2c2c2c] flex flex-col">
      {/* Header */}
      <div className="px-4 py-3 border-b border-[#2c2c2c]">
        <div className="flex justify-between items-center">
          <h2 className="font-semibold">All Inbox(s)</h2>
          <button className="text-sm bg-[#1f1f1f] px-2 py-1 rounded">▼</button>
        </div>
        <p className="text-xs text-gray-400">25/25 inboxes selected</p>
      </div>

      {/* Search + Sort */}
      <div className="p-4 flex items-center gap-2 border-b border-[#2c2c2c]">
        <input
          type="text"
          placeholder="Search"
          className="w-full px-3 py-1 text-sm bg-[#1a1a1a] border border-gray-600 rounded outline-none"
        />
        <button className="text-sm bg-[#1f1f1f] px-2 py-1 rounded">
          Newest
        </button>
      </div>

      {/* Email List */}
      <div className="flex-1 overflow-y-auto">
        {emails.map((email) => (
          <div
            key={email.id}
            onClick={() => dispatch(selectEmail(email.threadId))}
            className={`px-4 py-3 cursor-pointer border-b border-[#2c2c2c] hover:bg-[#1f1f1f] ${
              selectedEmailId === email.id ? "bg-[#2c2c2c]" : ""
            }`}
          >
            <div className="font-medium text-sm truncate">{email.from}</div>
            <div className="text-xs text-gray-500 truncate">
              {email.subject}
            </div>
            <div className="mt-1 flex gap-1 flex-wrap">
              {email.tags?.map((tag, idx) => (
                <span
                  key={idx}
                  className="bg-[#333] text-[10px] px-2 py-[1px] rounded-full text-gray-300"
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
