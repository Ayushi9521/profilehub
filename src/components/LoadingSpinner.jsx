import { useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";

function LoadingSpinner() {
  const { loading } = useSelector((state) => state.profiles);
  return (
    <div
      className="loading-container"
      style={{ textAlign: "center", marginTop: "50px" }}
    >
      <ClipLoader color="#007BFF" loading={loading} size={50} />
      <p>Loading...</p>
    </div>
  );
}

export default LoadingSpinner;
