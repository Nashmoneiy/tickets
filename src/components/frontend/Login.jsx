import React from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [InputErrorList, setInputErrorList] = useState({});
  const [alert, setAlert] = useState({ show: false, type: "", message: "" });
  const [loginInput, setLogin] = useState({
    email: "",
    password: "",
  });

  const handleInput = (e) => {
    const { name, value } = e.target;

    setLogin((prev) => ({
      ...prev,
      [name]: value,
    }));

    setInputErrorList((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const loginSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 2000);

    const data = {
      email: loginInput.email,
      password: loginInput.password,
    };

    axios
      .post(`https://ticket-api-production-3c8e.up.railway.app/api/login`, data)
      .then((response) => {
        if (response.status === 200) {
          const now = new Date().getTime(); // current time in ms
          const expiryTime = now + 40 * 60 * 1000; // 20 minutes from now

          localStorage.setItem("auth_token", response.data.token);
          localStorage.setItem("role", response.data.role);
          localStorage.setItem("auth_token_expiry", expiryTime); // new line
          localStorage.setItem("name", response.data.user);

          navigate("/home");
          window.location.reload();
        }
      })
      .catch(function (error) {
        console.log(error);
        if (error.response.data.status === 422) {
          setInputErrorList(error.response.data.errors);
        }
        if (error.response.data.status === 401) {
          setAlert({
            show: true,
            type: "danger",
            message: error.response.data.message,
          });
          setLogin((prev) => ({
            ...prev,
            password: "",
          }));

          //window.location.reload();
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
            <form onSubmit={loginSubmit}>
              <div className="mb-3">
                <label className="form-label">Email address</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  onChange={handleInput}
                  value={loginInput.email}
                />
                <span className="text-danger">{InputErrorList.email}</span>
              </div>

              <div className="mb-3 position-relative">
                <label className="form-label">Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  onChange={handleInput}
                  value={loginInput.password}
                  className="form-control pe-5"
                  id="exampleInputPassword1"
                />
                <button
                  type="button"
                  onClick={togglePassword}
                  className="btn position-absolute top-50 mt-3 end-0 translate-middle-y me-2 p-0 border-0 bg-transparent"
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
                variant="primary"
                disabled={loading}
                className="btn text-white border-0"
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
              className="mt-2 menu"
              style={{
                color: "lightslategray",
              }}
            >
              dont have an account?{" "}
              <Link to="/register" className="text-decoration-none">
                create one
              </Link>
            </h6>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
