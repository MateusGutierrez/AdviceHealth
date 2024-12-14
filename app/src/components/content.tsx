import React from 'react';

interface ContentProps {
  children: React.ReactNode;
  className?: string;
}

const Content: React.FC<ContentProps> = ({ children, className = '' }) => {
  return (
    <div className={`vh-100 container py-4 ${className}`}>
      {children}
    </div>
  );
};

export default Content;
