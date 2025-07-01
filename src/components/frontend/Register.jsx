import React from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };
  const navigate = useNavigate();
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
      .post(
        `https://ticket-api-production-3c8e.up.railway.app/api/register`,
        data
      )
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

              <div className="mb-3 position-relative">
                <label className="form-label">Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  onChange={handleInput}
                  value={registerInput.password}
                  className="form-control pe-5"
                  id="exampleInputPassword1"
                />
                <button
                  type="button"
                  onClick={togglePassword}
                  className="btn position-absolute top-50 end-0 translate-middle-y me-2 p-0 border-0 bg-transparent mt-3"
                  style={{ outline: "none", boxShadow: "none" }}
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <EyeOff size={20} color="gray" />
                  ) : (
                    <Eye size={20} color="gray" />
                  )}
                </button>
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
            <h6
              className="mt-2"
              style={{
                color: "lightslategray",
              }}
            >
              already have an account?{" "}
              <Link to="/login" className="text-decoration-none">
                login
              </Link>
            </h6>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
