import { Paperclip, Smile, ImagePlus, Send, Eye } from "lucide-react";
import React, { useState } from "react";
import { replyEmails } from "../../store/emails/Email";
import { useDispatch } from "react-redux";

const ReplyForm = ({ originalEmail }) => {
  const [body, setBody] = useState("");
  const dispatch = useDispatch();

  const handleSend = (e) => {
    e.preventDefault();

    const escapeHtml = (str) =>
      str?.replace(/</g, "&lt;").replace(/>/g, "&gt;");

    const toName =
      escapeHtml(originalEmail.fromName) ||
      originalEmail.fromEmail?.split("@")[0] ||
      "Recipient";

    const fromName =
      escapeHtml(originalEmail.toName) ||
      originalEmail.toEmail?.split("@")[0] ||
      "Sender";

    const references = Array.isArray(originalEmail.references)
      ? originalEmail.references
      : originalEmail.references
      ? [originalEmail.references]
      : [];

    const newMailPayload = {
      toName,
      to: originalEmail.fromEmail,
      from: originalEmail.toEmail,
      fromName,
      subject: originalEmail.subject,
      body: `<p>${body}</p>`,
      references,
      inReplyTo: originalEmail.messageId,
    };

    dispatch(replyEmails({ id: originalEmail.threadId, mail: newMailPayload }));
  };

  return (
    <div className="bg-[#1e1e1e] text-white rounded-lg border border-gray-700 p-4 max-w-2xl mx-auto">
      <div className="text-sm mb-2 border-b border-gray-700 pb-2">
        <div>
          <strong>To:</strong>{" "}
          <span className="text-gray-300">{originalEmail.fromEmail}</span>
        </div>
        <div>
          <strong>From:</strong>{" "}
          <span className="text-gray-300">{originalEmail.toEmail}</span>
        </div>
        <div>
          <strong>Subject:</strong>{" "}
          <span className="text-gray-300">{originalEmail.subject}</span>
        </div>
      </div>

      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="Write your message here..."
        className="w-full h-40 bg-[#2b2b2b] text-white p-3 rounded-md border border-gray-600 resize-none focus:outline-none"
      />

      <div className="flex justify-between items-center mt-3">
        <div className="flex gap-3 text-gray-400">
          <button>
            <Paperclip size={18} />
          </button>
          <button>
            <ImagePlus size={18} />
          </button>
          <button>
            <Smile size={18} />
          </button>
          <button>
            <Eye size={18} />
          </button>
        </div>

        <div className="flex items-center gap-2">
          <select className="bg-[#2b2b2b] text-gray-300 px-2 py-1 rounded-md border border-gray-600 text-sm">
            <option value="send">Send</option>
            <option value="schedule">Schedule</option>
          </select>
          <button
            onClick={handleSend}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-md flex items-center gap-1"
          >
            <Send size={16} />
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReplyForm;
