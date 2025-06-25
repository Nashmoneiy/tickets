import React from "react";
import { useState } from "react";
import axios from "axios";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [InputErrorList, setInputErrorList] = useState({});
  const [alert, setAlert] = useState({ show: false, type: "", message: "" });
  const [registerInput, setRegister] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleInput = (e) => {
    const { name, value } = e.target;

    setRegister((prev) => ({
      ...prev,
      [name]: value,
    }));

    setInputErrorList((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const registerSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);

    const data = {
      name: registerInput.name,
      email: registerInput.email,
      password: registerInput.password,
    };

    axios
      .post(`http://127.0.0.1:8000/api/register`, data)
      .then((response) => {
        setAlert({
          show: true,
          type: "success",
          message: response.data.message,
        });
        setRegister({
          name: "",
          email: "",
          password: "",
        });
      })
      .catch(function (error) {
        console.log(error);
        if (error.response) {
          setInputErrorList(error.response.data.errors);
        }
      });
  };
  return (
    <div
      className="d-flex flex-column min-vh-100"
      style={{ paddingTop: "4.5rem" }} // Adjust depending on your navbar height
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-5">
            {alert.show && (
              <div
                className={`alert alert-${alert.type} alert-dismissible fade show mt-2`}
                role="alert"
              >
                {alert.message}
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setAlert({ ...alert, show: false })}
                ></button>
              </div>
            )}
            <h5
              className="mb-3"
              style={{
                fontSize: "2.2rem",
                background: "linear-gradient(90deg, #6a0dad, #0000ff)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontWeight: "bold",
                textShadow: "0 0 4px rgba(106, 13, 173, 0.4)",
              }}
            >
              Register
            </h5>
            <form onSubmit={registerSubmit}>
              <div className="mb-3">
                <label className="form-label">Username</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  onChange={handleInput}
                  value={registerInput.name}
                />
                <span className="text-danger">{InputErrorList.name}</span>
              </div>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  onChange={handleInput}
                  value={registerInput.email}
                />
                <span className="text-danger">{InputErrorList.email}</span>
              </div>

              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  onChange={handleInput}
                  value={registerInput.password}
                />
                <span className="text-danger">{InputErrorList.password}</span>
              </div>

              <button
                type="submit"
                className="btn text-white border-0 mt-3"
                variant="primary"
                disabled={loading}
                style={{
                  background: "linear-gradient(90deg, #6a0dad, #0000ff)",
                  padding: "0.6rem 1.5rem",
                  fontWeight: "bold",
                  borderRadius: "8px",
                }}
              >
                {loading ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    Loading...
                  </>
                ) : (
                  "submit"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
