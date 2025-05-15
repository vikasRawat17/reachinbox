import { ChevronDown, MoreVertical } from "lucide-react";

export default function FunctionBar() {
  return (
    <div className="flex items-center justify-between px-4 py-2 border-b border-gray-700 bg-[#1a1a1a] text-white">
      <div className="flex items-center gap-4">
        <button className="flex items-center gap-1 bg-[#2c2c2c] px-3 py-1 rounded">
          All Inboxes <ChevronDown size={16} />
        </button>
        <button className="bg-[#2c2c2c] px-3 py-1 rounded text-sm">
          Meeting Completed
        </button>
      </div>
      <div className="flex items-center gap-2">
        <button className="bg-[#2c2c2c] px-3 py-1 rounded text-sm">
          Newest
        </button>
        <MoreVertical size={20} />
      </div>
    </div>
  );
}
