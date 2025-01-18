import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProfile,
  deleteProfile,
  setSelectedProfile,
} from "../redux store/profileSlice";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";

function AdminDashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { filteredProfile, loading, error } = useSelector(
    (state) => state.profiles
  );
  const maleCount = filteredProfile.filter(
    (profile) => profile.gender == "male"
  ).length;
  const femaleCount = filteredProfile.filter(
    (profile) => profile.gender == "female"
  ).length;

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  const handleNewProfile = () => {
    dispatch(setSelectedProfile(null));
    navigate("/admin/add");
  };

  const handleEditProfile = (profile) => {
    dispatch(setSelectedProfile(profile));
    navigate("/admin/edit");
  };

  const handleDeleteProfile = (id) => {
    dispatch(deleteProfile(id));
  };

  if (loading) return <LoadingSpinner />;

  if (error) return <p>{error}</p>;
  return (
    <div>
      <div className="admin-heading">Admin Dashboard</div>
      <div className="admin-container">
        <div className="profile-card-container">
          {filteredProfile.map((p) => (
            <div key={p.id} className="profile-card">
              <img src={p.image} alt={p.firstname} />
              <div className="user-name">
                {p.firstName} {p.lastName}
              </div>
              <div className="email">{p.email}</div>
              <div className="d-flex justify-content-between gap-2 ">
                <button
                  onClick={() => handleEditProfile(p)}
                  className="btn btn-view"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteProfile(p.id)}
                  className="btn btn-view"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="profile-sec-card">
          <div className="profile-title">Profile Details</div>
          <div className="d-flex justify-content-between gap-3 flex-column">
            <div className="pd-card">
              <div className="profle-card-title">Total Profile</div>
              <div className="profile-count blue">{filteredProfile.length}</div>
            </div>
            <div className="pd-card">
              <div className="profle-card-title">Male </div>
              <div className="profile-count blue">{maleCount}</div>
            </div>
            <div className="pd-card">
              <div className="profle-card-title">Female </div>
              <div className="profile-count blue">{femaleCount}</div>
            </div>
          </div>
          <button onClick={handleNewProfile} className="add-btn">
            Add New Profile
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
