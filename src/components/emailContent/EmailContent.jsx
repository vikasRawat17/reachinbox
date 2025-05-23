import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmailById } from "../../store/emails/emailContent";
import ReplyForm from "./emailreply";
import {
  deleteEmails,
  fetchEmails,
  selectEmail,
  snoozeEmail,
} from "../../store/emails/Email";
import DeleteConfirmationModal from "./deleteModal";

const EmailContent = () => {
  const dispatch = useDispatch();
  const { selectedEmail, loadingEmail, error } = useSelector(
    (state) => state.emails
  );
  const { selectedEmailId } = useSelector((state) => state.inbox);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAllReplies, setShowAllReplies] = useState(false);
  const [replyOpenIds, setReplyOpenIds] = useState([]);
  const [isSnoozing, setIsSnoozing] = useState(false);

  useEffect(() => {
    if (selectedEmailId) {
      dispatch(fetchEmailById(selectedEmailId));
      setShowAllReplies(false);
      setReplyOpenIds([]);
    }
  }, [dispatch, selectedEmailId]);

  const handleReplyToggle = (emailId) => {
    setReplyOpenIds((prev) =>
      prev.includes(emailId)
        ? prev.filter((id) => id !== emailId)
        : [...prev, emailId]
    );
  };

  const handleSnooze = async () => {
    if (!selectedEmailId || isSnoozing) return;

    setIsSnoozing(true);

    try {
      const snoozeDuration = 60 * 1000;
      await dispatch(
        snoozeEmail({ id: selectedEmailId, duration: snoozeDuration })
      );
      dispatch(selectEmail(null));
    } catch (error) {
      console.error("Failed to snooze email:", error);
    } finally {
      setIsSnoozing(false);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key.toLowerCase() === "d" && selectedEmailId) {
        setShowDeleteModal(true);
      }

      // Add keyboard shortcut for reply (r key)
      if (
        e.key.toLowerCase() === "r" &&
        selectedEmailId &&
        selectedEmail &&
        selectedEmail.length > 0
      ) {
        // Open reply for the current/first email in the thread
        const currentEmailId = selectedEmail[0].id;
        handleReplyToggle(currentEmailId);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedEmailId, selectedEmail]);

  const handleDeleteEmail = async () => {
    try {
      await dispatch(deleteEmails({ id: selectedEmailId }));
      setShowDeleteModal(false);
      dispatch(selectEmail(null));
    } catch (err) {
      console.error("Failed to delete email:", err);
      setShowDeleteModal(false);
    }
  };

  if (!selectedEmailId)
    return <div className="p-4 text-gray-500">Select an email to read</div>;
  if (loadingEmail) return <div className="p-4">Loading email...</div>;
  if (error) return <div className="p-4 text-red-600">Error: {error}</div>;
  if (
    !selectedEmail ||
    !Array.isArray(selectedEmail) ||
    selectedEmail.length === 0
  )
    return <div className="p-4 text-gray-500">No email data found.</div>;

  const emailsToDisplay = showAllReplies ? selectedEmail : [selectedEmail[0]];

  return (
    <div className="p-4 space-y-4  bg-white text-black border-black dark:bg-black dark:text-white dark:border-gray-500 border ">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Email Thread</h1>
        <button
          onClick={handleSnooze}
          disabled={isSnoozing}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            isSnoozing
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-yellow-100 text-yellow-800 hover:bg-yellow-200 active:bg-yellow-300"
          }`}
        >
          {isSnoozing ? "Snoozing..." : "Snooze Email Thread"}
        </button>
      </div>

      {emailsToDisplay.map((email, index) => (
        <div
          key={email.id || index}
          className="bg-gray-50 dark:bg-gray-800 shadow-md rounded-xl p-4 border border-gray-200 dark:border-gray-700"
        >
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-semibold">
              {email.subject
                ? email.subject
                    .replace(/\s*[\|•]\s*[\w\d]+(\s+[\w\d]+)*$/, "")
                    .trim()
                : "No Subject"}
            </h2>
            <span className="text-sm">
              {new Date(email.sentAt).toLocaleString() || "Unknown Date"}
            </span>
          </div>
          <div className="text-sm mb-1">
            <strong>From:</strong> {email.fromName || email.fromEmail}
          </div>
          <div className="text-sm mb-3">
            <strong>To:</strong> {email.toEmail || "N/A"}
          </div>
          <div
            className="prose prose-sm"
            dangerouslySetInnerHTML={{ __html: email.body }}
          />

          <div className="flex justify-between items-center mt-3">
            <button
              onClick={() => handleReplyToggle(email.id)}
              className="text-blue-600 text-sm font-medium hover:underline"
            >
              {replyOpenIds.includes(email.id) ? "Cancel Reply" : "Reply"}{" "}
              <span className="text-gray-400 text-xs">(or press 'r')</span>
            </button>
          </div>

          {replyOpenIds.includes(email.id) && (
            <div className="mt-3">
              <ReplyForm originalEmail={email} />
            </div>
          )}
        </div>
      ))}

      {!showAllReplies && selectedEmail.length > 1 && (
        <button
          onClick={() => setShowAllReplies(true)}
          className="block mx-auto mt-4 text-sm text-gray-600 hover:text-blue-600 hover:underline"
        >
          View all {selectedEmail.length} replies
        </button>
      )}

      {showAllReplies && selectedEmail.length > 1 && (
        <button
          onClick={() => setShowAllReplies(false)}
          className="block mx-auto mt-4 text-sm text-gray-600 hover:text-blue-600 hover:underline"
        >
          Show less
        </button>
      )}

      {showDeleteModal && (
        <DeleteConfirmationModal
          onCancel={() => setShowDeleteModal(false)}
          onConfirm={handleDeleteEmail}
        />
      )}
    </div>
  );
};

export default EmailContent;
