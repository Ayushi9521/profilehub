import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { setFilterBy, setSearchQuery } from "../redux store/profileSlice";

function Navbar() {
  const location = useLocation();
  const dispatch = useDispatch();

  const showSearchAndFilter =
    location.pathname === "/" || location.pathname === "/admin";

  const handleSearch = (e) => {
    dispatch(setSearchQuery(e.target.value));
  };
  const handleFilter = (e) => {
    dispatch(setFilterBy(e.target.value));
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg ">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            ProfileHub
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Profile List
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/admin">
                  Admin Page
                </Link>
              </li>
            </ul>
            {showSearchAndFilter && (
              <form className="d-flex">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  onChange={handleSearch}
                />
                <select className="form-select me-2" onChange={handleFilter}>
                  <option value="">Filter By</option>
                  <option value="name">Name</option>
                  <option value="email">Email</option>
                  <option value="role">Role</option>
                </select>
              </form>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
