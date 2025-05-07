import axios from "axios";
import React, { useState } from "react";

let Register = () => {
  let [state, setState] = useState({
    user: {
      username: '',
      password: '',
      cfmPassword: '',
      emailId: '',
      role: '',
      term: false
    }
  });

  let [errors, setErrors] = useState({});
  const [alert, setAlert] = useState({ message: '', type: '' });

  let updateInput = (event) => {
    setState((prevState) => ({
      user: {
        ...prevState.user,
        [event.target.name]: event.target.value
      }
    }));
  };

  let updateCheck = (event) => {
    setState((prevState) => ({
      user: {
        ...prevState.user,
        [event.target.name]: event.target.checked
      }
    }));
  };

  let submitRegister = async (e) => {
    e.preventDefault();
    console.log(state.user);

    if (validateForm()) {
      try {
        let response = await axios.post('http://localhost:9090/user/register', state.user);
        console.log(response);
        setAlert({ message: 'Registration successful!', type: 'success' });
      } catch (error) {
        console.error("Error registering admin:", error);
        setAlert({ message: '❌ Registration failed. Please try again.', type: 'error' });
      }
    } else {
      setAlert({ message: "Please fix the validation errors.", type: "error" });
    }
  };

  let validateForm = () => {
    let tempError = {};
    let { username, password, cfmPassword, emailId, role, term } = state.user;

    if (!username.trim())
      tempError.username = "Username is required";

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!password)
      tempError.password = "Password is required";
    else if (!passwordRegex.test(password))
      tempError.password = "Password must contain at least 8 characters, one uppercase letter, one number, and one special character.";

    if (!cfmPassword)
      tempError.cfmPassword = "Confirm password is empty";
    else if (password !== cfmPassword)
      tempError.cfmPassword = "Passwords do not match";

    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailId)
      tempError.email = "Email is required";
    else if (!emailRegex.test(emailId))
      tempError.email = "Invalid email format";

    if (!role)
      tempError.role = "Role is required";

    if (!term)
      tempError.term = "You must accept terms and conditions";

    setErrors(tempError);
    return Object.keys(tempError).length === 0;
  };

  return (
    <div className="container d-flex justify-content-center py-5">
      <div className="col-md-6">
        <div className="card shadow-lg border-0 rounded-4 p-4">
          <div className="card-header bg-primary text-white rounded-3 text-center mb-3">
            <h4 className="my-2">Register</h4>
          </div>

          {alert.message && (
            <div
              className={`alert ${alert.type === "success" ? "alert-success" : "alert-danger"}`}
              role="alert"
            >
              {alert.message}
            </div>
          )}

          <form onSubmit={submitRegister}>
            <div className="mb-3">
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={state.user.username}
                onChange={updateInput}
                className="form-control"
              />
              <small className="text-danger">{errors.username}</small>
            </div>

            <div className="mb-3">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={state.user.password}
                onChange={updateInput}
                className="form-control"
              />
              <small className="text-danger">{errors.password}</small>
            </div>

            <div className="mb-3">
              <input
                type="password"
                name="cfmPassword"
                placeholder="Confirm Password"
                value={state.user.cfmPassword}
                onChange={updateInput}
                className="form-control"
              />
              <small className="text-danger">{errors.cfmPassword}</small>
            </div>

            <div className="mb-3">
              <input
                type="email"
                name="emailId"
                placeholder="Email"
                value={state.user.emailId}
                onChange={updateInput}
                className="form-control"
              />
              <small className="text-danger">{errors.email}</small>
            </div>

          
            <div className="mb-3">
                <label className="form-label">Role</label>
              <select
                 name="role"
                 value={state.user.role}
                 onChange={updateInput}
                  className="form-select"
                  >
                     <option value="">Select Role</option>
                     <option value="USER">User</option>
                     <option value="ADMIN">Admin</option>
              </select>
              {errors.role && <small className="text-danger">{errors.role}</small>}
            </div>

            <div className="form-check mb-3">
              <input
                type="checkbox"
                name="term"
                checked={state.user.term}
                onChange={updateCheck}
                className="form-check-input"
                id="termCheck"
              />
              <label htmlFor="termCheck" className="form-check-label">
                I agree to terms and conditions
              </label>
              <br />
              <small className="text-danger">{errors.term}</small>
            </div>

            <div className="d-grid">
              <button type="submit" className="btn btn-success">
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
