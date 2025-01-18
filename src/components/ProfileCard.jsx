import { useDispatch } from "react-redux";
import { setSelectedProfile } from "../redux store/profileSlice";
import { useNavigate } from "react-router-dom";

function ProfileCard({ profile }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDetail = () => {
    dispatch(setSelectedProfile(profile));
    navigate(`/profile/${profile.id}`);
  };
  const handleSummary = () => {
    dispatch(setSelectedProfile(profile));
    navigate(`/profile/summary`);
  };

  return (
    <>
      <div className="profile-card">
        <img src={profile.image} alt={profile.firstname} />
        <div className="user-name">
          {profile.firstName} {profile.lastName}
        </div>
        <div className="email">{profile.email}</div>
        <div className="gender">{profile.gender}</div>
        <div className="gender">{profile.role}</div>
        <div className="d-flex justify-content-between gap-2">
          <button onClick={handleDetail} className="btn btn-view">
            View Detail
          </button>
          <button onClick={handleSummary} className="btn btn-summary">
            Summary
          </button>
        </div>
      </div>
    </>
  );
}

export default ProfileCard;
