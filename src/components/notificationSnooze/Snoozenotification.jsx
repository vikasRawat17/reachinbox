import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchEmails } from "../../store/emails/Email";

export default function SnoozeNotification() {
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const theme = useSelector((state) => state.theme);
  const dispatch = useDispatch();

  useEffect(() => {
    const checkSnoozedEmails = () => {
      const snoozedEmails = JSON.parse(
        localStorage.getItem("snoozedEmails") || "{}"
      );
      const currentTime = Date.now();

      let expiredFound = false;

      for (const [id, data] of Object.entries(snoozedEmails)) {
        const snoozeUntil = typeof data === "object" ? data.snoozeUntil : data;
        const subject = typeof data === "object" ? data.subject : "Email";

        if (currentTime > snoozeUntil) {
          setNotificationMessage(`Snooze complete: "${subject}"`);
          setShowNotification(true);

          delete snoozedEmails[id];
          localStorage.setItem("snoozedEmails", JSON.stringify(snoozedEmails));

          dispatch(fetchEmails());

          expiredFound = true;

          setTimeout(() => setShowNotification(false), 5000);
          break;
        }
      }

      if (expiredFound) {
        dispatch(fetchEmails());
      }
    };

    const interval = setInterval(checkSnoozedEmails, 1000);
    return () => clearInterval(interval);
  }, [dispatch]);

  if (!showNotification) return null;

  return (
    <div
      className={`fixed bottom-4 right-4 p-4 rounded shadow-lg ${
        theme === "dark"
          ? "bg-gray-800 text-white border border-gray-700"
          : "bg-white text-gray-800 border border-gray-200"
      }`}
    >
      <div className="flex items-center">
        <span>{notificationMessage}</span>
        <button
          onClick={() => setShowNotification(false)}
          className="ml-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
