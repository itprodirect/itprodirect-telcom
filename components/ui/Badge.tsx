interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "success" | "warning" | "info" | "new";
  className?: string;
}

export function Badge({
  children,
  variant = "default",
  className = "",
}: BadgeProps) {
  const variants = {
    default: "bg-gray-100 text-gray-800 dark:bg-slate-700 dark:text-slate-200",
    success: "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300",
    warning: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300",
    info: "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300",
    new: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}

export function ConditionBadge({
  condition,
}: {
  condition: "new" | "like-new" | "tested-working" | "as-is";
}) {
  const conditionConfig = {
    new: { label: "New", variant: "new" as const },
    "like-new": { label: "Like New", variant: "success" as const },
    "tested-working": { label: "Tested Working", variant: "info" as const },
    "as-is": { label: "As-Is", variant: "warning" as const },
  };

  const config = conditionConfig[condition];

  return <Badge variant={config.variant}>{config.label}</Badge>;
}
