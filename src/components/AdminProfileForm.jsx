import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addProfile, updateProfile } from "../redux store/profileSlice";

function AdminProfileForm() {
  const { selectedProfile } = useSelector((state) => state.profiles);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  //   useEffect(() => {
  //     if (initialData) {
  //       setFormData(initialData);
  //     }
  //   }, [initialData]);

  // for handling all input field
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (selectedProfile) {
      setFormData(selectedProfile);
    } else {
      setFormData({ firstName: "", lastName: "", email: "" });
    }
  }, [selectedProfile]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedProfile) {
      dispatch(updateProfile(formData));
    } else {
      dispatch(addProfile(formData));
    }
    // onSubmit(formData);
    // setFormData({ firstName: "", lastName: "", email: "" });
    navigate("/admin");
  };
  return (
    <>
      <form onSubmit={handleSubmit} className="admin-form">
        <h2 className="form-title">
          {selectedProfile ? "Edit Profile" : "Add New Profile"}
        </h2>
        <div className="mb-3">
          <label htmlFor="firstName" className="form-label">
            First Name
          </label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="First Name"
            required
            className="form-control"
            id="firstName"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="lastName" className="form-label">
            Last Name
          </label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Last Name"
            required
            className="form-control"
            id="lastName"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
            className="form-control"
            id="email"
          />
        </div>

        <button type="submit" className="profile-btn">
          {selectedProfile ? "Update Profile" : "Add Profile"}
        </button>
      </form>
    </>
  );
}

export default AdminProfileForm;
