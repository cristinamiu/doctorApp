import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = React.useState({});
  const { authState, setAuthState } = useContext(AuthContext);

  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:5000/auth", {
        name: name,
        email: email,
        password: password,
        confirmPassword: confirmPassword,
      })
      .then(() => {
        console.log("Success");
        setErrors({});
        axios
          .post("http://localhost:5000/auth/login", {
            email: email,
            password: password,
          })
          .then((response) => {
            setErrors({});
            setAuthState({
              email: response.data.email,
              id: response.data.id,
              role: response.data.role,
              status: true,
            });
            localStorage.setItem("accessToken", response.data.accessToken);
            console.log(response.data);
            navigate("/patients/dashboard");
          })
          .catch((err) => {
            setErrors(err.response.data);
          });
      })
      .catch((err) => {
        setErrors(err.response.data);
      });
  };

  return (
    <div>
      <section>
        <div className="container">
          <div className="row d-flex justify-content-center align-items-center">
            <div className="col-lg-12 col-xl-11">
              <div className="card text-black" style={{ borderRadius: "25" }}>
                <div className="card-body ">
                  <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                        Sign up
                      </p>

                      <form className="mx-1 mx-md-4" onSubmit={onSubmit}>
                        <div className="d-flex flex-row align-items-center mb-1">
                          <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <label className="form-label">Name</label>
                            <input
                              type="text"
                              id="form3Example1c"
                              className="form-control"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              required
                            />
                            {errors.name && (
                              <p class="auth_error">{errors.name}</p>
                            )}
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-1">
                          <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <label className="form-label">Email/username</label>
                            <input
                              type="text"
                              id="form3Example3c"
                              className="form-control"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              required
                            />
                            {errors.email && (
                              <p class="auth_error">{errors.email}</p>
                            )}
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-1">
                          <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <label className="form-label">Password</label>
                            <input
                              type="password"
                              id="form3Example4c"
                              className="form-control"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              required
                            />
                            {errors.password && (
                              <p class="auth_error">{errors.password}</p>
                            )}
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <label className="form-label">
                              Confirm password
                            </label>
                            <input
                              type="password"
                              id="form3Example4cd"
                              className="form-control"
                              value={confirmPassword}
                              onChange={(e) =>
                                setConfirmPassword(e.target.value)
                              }
                              required
                            />
                            {errors.confirmPassword && (
                              <p class="auth_error">{errors.confirmPassword}</p>
                            )}
                          </div>
                        </div>
                        <div className="m-3">
                          {Object.keys(errors).length > 0 && (
                            <p className="auth_error">{errors.error}</p>
                          )}
                        </div>

                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                          <button
                            type="submit"
                            className="btn btn-primary btn-lg"
                          >
                            Register
                          </button>
                        </div>
                      </form>
                    </div>
                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                        className="img-fluid"
                        alt="Sign Up"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default RegisterPage;
