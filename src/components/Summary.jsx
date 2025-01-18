import MapComponent from "./MapComponent";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Summary() {
  const selectedProfile = useSelector(
    (state) => state.profiles.selectedProfile
  );

  const navigate = useNavigate();
  return (
    <>
      {/* Display Google Map with Profile's Address */}
      <h3>Location</h3>
      <MapComponent address={selectedProfile.address.city} />
      <button onClick={() => navigate("/")}>Back to Profile List</button>
    </>
  );
}

export default Summary;
