import { cn } from "@/utils/cn";
import StatusBadge from "@/components/molecules/StatusBadge";

const StatusFilter = ({ selectedStatus, onStatusChange, className }) => {
  const statusOptions = [
    { value: "all", label: "All" },
    { value: "submitted", label: "Submitted" },
    { value: "under-review", label: "Under Review" },
    { value: "planned", label: "Planned" },
    { value: "in-progress", label: "In Progress" },
    { value: "staging", label: "In Staging" },
    { value: "live", label: "Live" }
  ];

  return (
    <div className={cn("space-y-2", className)}>
      <h3 className="text-sm font-medium text-surface-700 mb-3">Filter by Status</h3>
      <div className="space-y-1">
        {statusOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => onStatusChange(option.value)}
            className={cn(
              "w-full text-left px-3 py-2 rounded-lg text-sm transition-colors duration-200",
              selectedStatus === option.value
                ? "bg-primary-50 text-primary-700 border border-primary-200"
                : "text-surface-600 hover:bg-surface-50 border border-transparent"
            )}
          >
            {option.value === "all" ? (
              option.label
            ) : (
              <StatusBadge status={option.value} size="sm" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default StatusFilter;