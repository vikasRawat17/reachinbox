import { useState } from "react";
import EmailCard from "./emailcard";
import ReplyBox from "./emailreply";
import { useSelector } from "react-redux";

const EmailContent = () => {
  const { selectedEmail } = useSelector((state) => state.emails);
  console.log(selectedEmail);

  const [showAllReplies, setShowAllReplies] = useState(false);
  const [showReplyBox, setShowReplyBox] = useState(false);

  const latestEmail = selectedEmail[0];
  const otherEmails = selectedEmail.slice(1);

  const handleViewAll = () => setShowAllReplies(true);
  const handleReply = () => setShowReplyBox(true);

  return (
    <div className="p-4 space-y-4">
      <EmailCard email={latestEmail} />

      {!showAllReplies && otherEmails.length > 0 && (
        <button
          onClick={handleViewAll}
          className="text-blue-500 hover:underline text-sm"
        >
          View all {otherEmails.length} replies
        </button>
      )}

      {showAllReplies &&
        otherEmails.map((email, index) => (
          <EmailCard key={index} email={email} />
        ))}

      {!showReplyBox && (
        <button
          onClick={handleReply}
          className="bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          Reply
        </button>
      )}

      {showReplyBox && <ReplyBox toEmail={latestEmail.fromEmail} />}
    </div>
  );
};

export default EmailContent;
