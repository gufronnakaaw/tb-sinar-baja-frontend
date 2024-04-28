import React from "react";

interface DashboardContainerProps {
  children: React.ReactNode;
  className?: string;
}

export default function DashboardContainer({
  children,
  className,
}: DashboardContainerProps) {
  return (
    <div className="min-h-screen">
      <div className={`grid ${className}`}>{children}</div>
    </div>
  );
}
