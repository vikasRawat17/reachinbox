import { ChevronDown, MoreVertical } from "lucide-react";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

export default function FunctionBar() {
  const { selectedEmail } = useSelector((state) => state.emails);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (selectedEmail && selectedEmail.length > 0) {
      const firstEmail = selectedEmail[0];
      const rawToName = firstEmail.toName?.trim();
      const toEmail = firstEmail.toEmail || "";
      const fallbackName = toEmail.split("@")[0];

      setName(rawToName || fallbackName);
      setEmail(toEmail);
    }
  }, [selectedEmail]);

  const [showMeetingDropdown, setShowMeetingDropdown] = useState(false);
  const [showMoreDropdown, setShowMoreDropdown] = useState(false);

  return (
    <div
      className="flex items-center justify-between bg-[#0E0E10] text-white border-b border-[#343A40] relative"
      style={{
        padding: "8px 8px 8px 17px",
      }}
    >
    
      <div className="flex flex-col">
        <span className="text-sm font-medium">{name}</span>
        <span className="text-xs text-gray-400">{email}</span>
      </div>

      
      <div className="flex items-center gap-2 relative">
       
        <div className="relative">
          <button
            className="flex items-center gap-1 bg-[#2c2c2c] px-3 py-[6px] rounded text-sm"
            onClick={() => setShowMeetingDropdown(!showMeetingDropdown)}
          >
            Meeting Completed <ChevronDown size={16} />
          </button>
          {showMeetingDropdown && (
            <div className="absolute right-0 mt-1 w-48 bg-[#1a1a1a] text-sm rounded shadow-lg border border-[#333] z-10">
              <div className="hover:bg-[#333] px-4 py-2 cursor-pointer">
                Meeting Scheduled
              </div>
              <div className="hover:bg-[#333] px-4 py-2 cursor-pointer">
                Meeting Completed
              </div>
              <div className="hover:bg-[#333] px-4 py-2 cursor-pointer">
                Reschedule
              </div>
            </div>
          )}
        </div>

       
        <div className="relative">
          <button
            className="bg-[#2c2c2c] px-3 py-[6px] rounded text-sm"
            onClick={() => setShowMoreDropdown(!showMoreDropdown)}
          >
            More
          </button>
          {showMoreDropdown && (
            <div className="absolute right-0 mt-1 w-40 bg-[#1a1a1a] text-sm rounded shadow-lg border border-[#333] z-10">
              <div className="hover:bg-[#333] px-4 py-2 cursor-pointer">
                Mark as Read
              </div>
              <div className="hover:bg-[#333] px-4 py-2 cursor-pointer">
                Move to Trash
              </div>
              <div className="hover:bg-[#333] px-4 py-2 cursor-pointer">
                Report
              </div>
            </div>
          )}
        </div>

       
        <MoreVertical size={20} />
      </div>
    </div>
  );
}
