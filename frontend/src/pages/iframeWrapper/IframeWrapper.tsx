import React from 'react';

interface IframeWrapperProps {
  src: string;
  title: string;
  width?: string;
  height?: string;
}

const IframeWrapper: React.FC<IframeWrapperProps> = ({ src, title, width = "100%", height = "100%" }) => {
  return (
    <div style={{ minHeight: "100vh" }}>
      <iframe
        src={src}
        title={title}
        width={width}
        height={height}
        style={{ border: 'none', minHeight: "100vh" }}
      />
    </div>
  );
};

export default IframeWrapper;