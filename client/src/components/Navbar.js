import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const { authState } = useContext(AuthContext);

  return (
    <div>
      <nav className="navbar navbar-expand-sm navbar-light bg-light">
        <div className="container-fluid">
          {/* Logo */}
          <a className="navbar-brand" href="/">
            MedConnect
          </a>
          <button className="navbar-toggler" type="button">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="mynavbar">
            {/* Info links */}
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <a className="nav-link" href="/about">
                  About
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/services">
                  Services
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/team">
                  Team
                </a>
              </li>
            </ul>

            {/* Account links */}
            {!authState.status ? (
              <div className="not-authed">
                <ul className="navbar-nav ms-auto">
                  <li className="nav-item">
                    <a className="nav-link" href="/register">
                      Sign Up
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/login">
                      Log in
                    </a>
                  </li>
                </ul>
              </div>
            ) : (
              <div className="is-authed">
                <ul className="navbar-nav ms-auto">
                  <li className="nav-item">
                    <a className="nav-link" href="/about">
                      Log out
                    </a>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
