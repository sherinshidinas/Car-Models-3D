import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./navbar.scss";
function Navbar() {
  const location = useLocation();

  const isUploadModelRoute = location.pathname === "/upload";
  return (
    <>
      {isUploadModelRoute ? (
        <div className="navbar">
          <div className="container">
            <div className="logo">
              <Link className="logo" to="/">
                <span>INFUSORY 3D</span>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="navbar">
          <div className="container">
            <div className="logo">
              <Link className="logo" to="/">
                <span>INFUSORY 3D</span>
              </Link>
            </div>
            <div className="links">
              <Link to="/upload" className="links">
                <button>Upload Model</button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
