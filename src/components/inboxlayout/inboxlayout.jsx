import EmailContent from "../emailContent/EmailContent";
import InboxSidebar from "../inboxSidebar/InboxSidebar";
import RightPanel from "../rightpanel/RightPanel";
import FunctionBar from "../functionbar/FunctionBAr";
import SnoozeNotification from "../notificationSnooze/Snoozenotification";

export default function Inbox() {
  return (
    <div className="flex h-screen overflow-hidden">
      <InboxSidebar />
      <div className="flex flex-col flex-1">
        <FunctionBar />
        <div className="flex flex-1 overflow-hidden">
          <div className="flex-1 overflow-y-auto hide-scrollbar bg-white dark:bg-black text-black dark:text-white">
            <EmailContent />
            <SnoozeNotification />
          </div>
          <RightPanel />
        </div>
      </div>
    </div>
  );
}
