import { Paperclip, Smile, ImagePlus, Send } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import { replyEmails } from "../../store/emails/Email";
import { useDispatch, useSelector } from "react-redux";

const ReplyForm = ({ originalEmail }) => {
  const [body, setBody] = useState("");
  const [cursorPosition, setCursorPosition] = useState(0);
  const textareaRef = useRef(null);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.login);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.setSelectionRange(cursorPosition, cursorPosition);
    }
  }, [body, cursorPosition]);

  useEffect(() => {
    const preventDeleteShortcut = (e) => {
      if (e.key.toLowerCase() === "d") {
        e.stopPropagation();
      }
    };

    const textarea = textareaRef.current;
    if (textarea) {
      textarea.addEventListener("keydown", preventDeleteShortcut);
    }

    return () => {
      if (textarea) {
        textarea.removeEventListener("keydown", preventDeleteShortcut);
      }
    };
  }, []);

  const insertVariable = (variable) => {
    if (textareaRef.current) {
      const start = textareaRef.current.selectionStart;
      const end = textareaRef.current.selectionEnd;

      const beforeText = body.substring(0, start);
      const afterText = body.substring(end, body.length);

      let valueToInsert;
      if (variable === "username") {
        valueToInsert = user?.user?.firstName || "User";
      } else if (variable === "date") {
        valueToInsert = new Date().toLocaleDateString(undefined, {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
      }

      const newText = `${beforeText}${valueToInsert}${afterText}`;
      setBody(newText);

      const newPosition = start + valueToInsert.length;
      setCursorPosition(newPosition);
    }
  };

  const handleSave = () => {
    alert("saved");
  };

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

    const username = user?.user?.firstName || "User";
    console.log(username);

    const options = { year: "numeric", month: "long", day: "numeric" };
    const currentDate = new Date().toLocaleDateString(undefined, options);
    console.log(currentDate);

    let processedBody = body;
    processedBody = processedBody.replace(/{username}/g, username);
    processedBody = processedBody.replace(/{date}/g, currentDate);

    const newMailPayload = {
      toName,
      to: originalEmail.fromEmail,
      from: originalEmail.toEmail,
      fromName,
      subject: originalEmail.subject,
      body: `<p>${processedBody}</p>`,
      references,
      inReplyTo: originalEmail.messageId,
    };

    dispatch(replyEmails({ id: originalEmail.threadId, mail: newMailPayload }));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const start = e.target.selectionStart;
      const end = e.target.selectionEnd;
      const newText = body.substring(0, start) + "    " + body.substring(end);
      setBody(newText);

      setCursorPosition(start + 4);
    }
  };

  return (
    <div className="bg-white dark:bg-black text-black dark:text-white rounded-lg border border-gray-700 p-4 max-w-2xl mx-auto">
      <div className="text-sm mb-2 border-b border-gray-700 pb-2">
        <div>
          <strong>To:</strong>{" "}
          <span className="text-black dark:text-white">
            {originalEmail.fromEmail}
          </span>
        </div>
        <div>
          <strong>From:</strong>{" "}
          <span className="text-black dark:text-white">
            {originalEmail.toEmail}
          </span>
        </div>
        <div>
          <strong>Subject:</strong>{" "}
          <span className="text-black dark:text-white">
            {originalEmail.subject}
          </span>
        </div>
      </div>

      <div className="flex gap-2 mb-2 flex-wrap">
        <button
          onClick={handleSave}
          className="px-2 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700"
        >
          SAVE
        </button>
        <button
          onClick={() => insertVariable("username")}
          className="px-2 py-1 text-sm bg-gray-200 dark:bg-gray-700 dark:text-white rounded hover:bg-gray-300 dark:hover:bg-gray-600"
          title={`Inserts "${user?.user?.firstName || "User"}"`}
        >
          Insert Name
        </button>
        <button
          onClick={() => insertVariable("date")}
          className="px-2 py-1 text-sm bg-gray-200 dark:bg-gray-700 dark:text-white rounded hover:bg-gray-300 dark:hover:bg-gray-600"
          title="Inserts current date"
        >
          Insert Date
        </button>
      </div>

      <textarea
        ref={textareaRef}
        value={body}
        onChange={(e) => {
          setBody(e.target.value);
          setCursorPosition(e.target.selectionStart);
        }}
        onKeyDown={handleKeyDown}
        placeholder="Write your message here..."
        className="w-full h-40 bg-white dark:bg-black text-black dark:text-white p-3 rounded-md border border-gray-600 resize-none focus:outline-none"
      />

      <div className="mt-2 space-y-2"></div>

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
        </div>

        <button
          onClick={handleSend}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-md flex items-center gap-1"
        >
          <Send size={16} />
          Send
        </button>
      </div>
    </div>
  );
};

export default ReplyForm;
