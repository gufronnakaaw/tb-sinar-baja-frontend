import React from "react";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

const Container = ({ children, className }: ContainerProps) => {
  return (
    <div className="min-h-screen">
      <div className={`grid ${className}`}>{children}</div>
    </div>
  );
};

export default Container;
