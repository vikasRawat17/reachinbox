// components/Home/Home.jsx

import EmailContent from "../emailContent/EmailContent";
import FunctionBar from "../functionbar/FunctionBAr";
import InboxSidebar from "../inboxSidebar/InboxSidebar";

export default function Inbox() {
  return (
    <div className="flex h-screen">
      <InboxSidebar />
      <div className="flex flex-col flex-1">
        <FunctionBar />
        <EmailContent />
      </div>
    </div>
  );
}
