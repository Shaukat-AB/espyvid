import { createPortal } from "react-dom";

const Loading = () => {
  return createPortal(
    <div className="loading">
      <span className="loading-text">Loading...</span>
    </div>,
    document.getElementById("root")
  );
};

export default Loading;
