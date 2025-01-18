import { useDispatch, useSelector } from "react-redux";
import { fetchProfile } from "../redux store/profileSlice";
import ProfileCard from "../components/ProfileCard";
import { useEffect } from "react";
import LoadingSpinner from "../components/LoadingSpinner";

function ProfileList() {
  const dispatch = useDispatch();
  const { filteredProfile, loading, error } = useSelector(
    (state) => state.profiles
  );

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  if (loading) return <LoadingSpinner />;
  if (error) return <p>{error}</p>;

  return (
    <>
      <div className="profile-list">
        {filteredProfile.map((profile) => (
          <ProfileCard key={profile.id} profile={profile} />
        ))}
      </div>
    </>
  );
}

export default ProfileList;
