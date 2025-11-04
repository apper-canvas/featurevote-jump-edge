import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const SortControls = ({ sortBy, onSortChange, className }) => {
  const sortOptions = [
    { value: "votes-desc", label: "Most Votes", icon: "TrendingUp" },
    { value: "votes-asc", label: "Least Votes", icon: "TrendingDown" },
    { value: "date-desc", label: "Newest", icon: "Clock" },
    { value: "date-asc", label: "Oldest", icon: "History" }
  ];

  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {sortOptions.map((option) => (
        <button
          key={option.value}
          onClick={() => onSortChange(option.value)}
          className={cn(
            "inline-flex items-center px-3 py-2 text-sm font-medium rounded-lg border transition-all duration-200",
            sortBy === option.value
              ? "bg-gradient-to-r from-primary-500 to-primary-600 text-white border-primary-600 shadow-md"
              : "bg-white text-surface-600 border-surface-200 hover:bg-surface-50 hover:border-surface-300"
          )}
        >
          <ApperIcon name={option.icon} className="w-4 h-4 mr-2" />
          {option.label}
        </button>
      ))}
    </div>
  );
};

export default SortControls;