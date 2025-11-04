import Badge from "@/components/atoms/Badge";
import ApperIcon from "@/components/ApperIcon";

const StatusBadge = ({ status, size = "md" }) => {
  const statusConfig = {
    submitted: {
      label: "Submitted",
      variant: "submitted",
      icon: "Clock"
    },
    "under-review": {
      label: "Under Review", 
      variant: "under-review",
      icon: "Eye"
    },
    planned: {
      label: "Planned",
      variant: "planned", 
      icon: "Calendar"
    },
    "in-progress": {
      label: "In Progress",
      variant: "in-progress",
      icon: "Zap"
    },
    staging: {
      label: "In Staging",
      variant: "staging",
      icon: "TestTube"
    },
    live: {
      label: "Live",
      variant: "live",
      icon: "CheckCircle"
    }
  };

  const config = statusConfig[status] || statusConfig.submitted;

  return (
    <Badge variant={config.variant} size={size}>
      <ApperIcon name={config.icon} className="w-3 h-3 mr-1" />
      {config.label}
    </Badge>
  );
};

export default StatusBadge;