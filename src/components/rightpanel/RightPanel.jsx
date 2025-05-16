import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmailById } from "../../store/emails/emailContent";

const RightPanel = () => {
  const dispatch = useDispatch();
  const { selectedEmail, loadingEmail, error } = useSelector(
    (state) => state.emails
  );
  const { selectedEmailId } = useSelector((state) => state.inbox);

  useEffect(() => {
    if (selectedEmailId) {
      dispatch(fetchEmailById(selectedEmailId));
    }
  }, [dispatch, selectedEmailId]);

  const emails = useSelector((state) => state.inbox.emails);

  const isValidThread =
    Array.isArray(selectedEmail) && selectedEmail.length > 0;
  const latestEmail = isValidThread
    ? selectedEmail[selectedEmail.length - 1]
    : null;

  if (!isValidThread || !latestEmail) {
    return (
      <div className="w-80 p-4 border-l border-gray-200 bg-white dark:bg-black text-black dark:text-white">
        <p>No email thread selected.</p>
      </div>
    );
  }

  return (
    <div className="w-80 p-4 border-l border-gray-200 bg-white dark:bg-black text-black dark:text-white space-y-6">
      <div className="bg-white dark:bg-gray-900 shadow-md rounded-lg p-4">
        <h2 className="font-semibold text-lg mb-4">Lead Details</h2>
        <div className="space-y-2 text-sm">
          <p>
            <strong>Name:</strong> {latestEmail.fromName || "N/A"}
          </p>
          <p>
            <strong>Email:</strong> {latestEmail.fromEmail || "N/A"}
          </p>
          <p>
            <strong>Company:</strong>{" "}
            {latestEmail.fromEmail?.split("@")[1] || "N/A"}
          </p>
          <p>
            <strong>Thread ID:</strong> {latestEmail.threadId || "N/A"}
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 shadow-md rounded-lg p-4">
        <h2 className="font-semibold text-lg mb-4">Activity</h2>
        {selectedEmail.map((mail, index) => (
          <div
            key={mail.id || index}
            className="border-t border-gray-200 dark:border-gray-700 pt-2"
          >
            <p>
              <strong>Step {index + 1}:</strong> {mail.subject || "No Subject"}
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-300">
              {mail.sentAt
                ? new Date(mail.sentAt).toLocaleDateString()
                : "No Date"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RightPanel;
