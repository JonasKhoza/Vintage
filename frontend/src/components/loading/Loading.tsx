import { Circles } from "react-loader-spinner";

function Loading() {
  return (
    <div className="loading">
      <Circles height="80" width="80" color="#ff470f" ariaLabel="loading" />
    </div>
  );
}

export default Loading;
