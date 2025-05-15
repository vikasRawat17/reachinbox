import { useState } from "react";

const ReplyBox = ({ toEmail }) => {
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");

  const handleSend = () => {
    console.log("Sending:", { toEmail, subject, body });
  };

  return (
    <div className="bg-gray-900 text-white p-4 rounded-md shadow-lg space-y-3">
      <div>
        <label className="block text-sm">To:</label>
        <input
          type="text"
          value={toEmail}
          readOnly
          className="bg-gray-800 w-full p-2 rounded"
        />
      </div>
      <div>
        <label className="block text-sm">Subject:</label>
        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="bg-gray-800 w-full p-2 rounded"
        />
      </div>
      <div>
        <label className="block text-sm">Body:</label>
        <textarea
          rows="6"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="bg-gray-800 w-full p-2 rounded"
        />
      </div>
      <button onClick={handleSend} className="bg-blue-600 px-4 py-2 rounded-md">
        Send
      </button>
    </div>
  );
};

export default ReplyBox;
