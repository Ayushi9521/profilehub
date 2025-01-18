import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function ProfileDetail() {
  const selectedProfile = useSelector(
    (state) => state.profiles.selectedProfile
  );
  const navigate = useNavigate();

  if (!selectedProfile) {
    return (
      <div>
        <p>No profile selected. Please go back to the profile list.</p>
        <button onClick={() => navigate("/")}>Go Back</button>
      </div>
    );
  }
  return (
    <div className="profile-detail">
      <div className="user-profile">
        <img src={selectedProfile.image} alt={selectedProfile.firstname} />
        <div className="user-name">{`${selectedProfile.firstName} ${selectedProfile.lastName}`}</div>
        <div className="user-profile-detail">{selectedProfile.email}</div>
        <div className="user-flex">
          <div className="label-title">DOB:</div>
          <div className="label-desc">{selectedProfile.birthDate}</div>
        </div>
        <div className="user-flex">
          <div className="label-title">Gender:</div>
          <div className="label-desc">{selectedProfile.gender}</div>
        </div>
        <div className="user-flex">
          <div className="label-title">Age: </div>
          <div className="label-desc">{selectedProfile.age}</div>
        </div>
        <div className="user-flex">
          <div className="label-title">Role:</div>
          <div className="label-desc">{selectedProfile.role}</div>
        </div>
        <div className="user-flex">
          <div className="label-title">Company Name:</div>
          <div className="label-desc">{selectedProfile.company.name}</div>
        </div>
        <div className="user-flex">
          <div className="label-title">Department:</div>
          <div className="label-desc">{selectedProfile.company.department}</div>
        </div>
        <div className="user-flex">
          <div className="label-title">Title:</div>
          <div className="label-desc">{selectedProfile.company.title}</div>
        </div>
        <div className="user-flex">
          <div className="label-title">University:</div>
          <div className="label-desc">{selectedProfile.university}</div>
        </div>
        <div className="user-flex">
          <div className="label-title">City: </div>
          <div className="label-desc">{selectedProfile.address.city}</div>
        </div>
        <div className="user-flex">
          <div className="label-title">State: </div>
          <div className="label-desc">{selectedProfile.address.state}</div>
        </div>
        <div className="user-flex">
          <div className="label-title">Postal Code:</div>
          <div className="label-desc">{selectedProfile.address.postalCode}</div>
        </div>
        <div className="user-flex">
          <div className="label-title">Country: </div>
          <div className="label-desc">{selectedProfile.address.country}</div>
        </div>
      </div>
    </div>
  );
}

export default ProfileDetail;
