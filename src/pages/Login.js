import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

let Login = () => {
    const [state, setState] = useState({
        user: {
            username: '',
            password: ''
        }
    });

    const [errors, setErrors] = useState({});
    const [alert, setAlert] = useState({ message: '', type: '' });

    const updateUserName = (event) => {
        setState((prevState) => ({
            user: {
                ...prevState.user,
                [event.target.name]: event.target.value
            }
        }));
    };

    const navigate = useNavigate();

    const submitRegister = async (event) => {
      event.preventDefault();
      if (validateForm()) {
          try {
              const response = await axios.post('http://localhost:9090/user/login', state.user);
              const userData = response.data.data;
  
              // Store user in localStorage for persistent login
              localStorage.setItem("user", JSON.stringify(userData));
  
              setAlert({ message: 'Login successful!', type: 'success' });
  
              // Navigate to home or main page
              navigate("/");
              window.location.reload(); // this refreshes the navbar to reflect login state
          } catch (error) {
              console.error("Error Login:", error);
              setAlert({ message: 'Login failed! Invalid credentials.', type: 'danger' });
          }
      } else {
          alert("Please fix the validation errors.");
      }
  };

    const validateForm = () => {
        let tempError = {};
        const { username, password } = state.user;

        if (!username.trim())
            tempError.username = "Username is required";

        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!password)
            tempError.password = "Password is required";
        else if (!passwordRegex.test(password))
            tempError.password = "Password must contain an uppercase letter, a digit, and a special character.";

        setErrors(tempError);
        return Object.keys(tempError).length === 0;
    };

    return (
        <div className="container d-flex justify-content-center align-items-center py-5">
            <div className="col-md-5">
                <div className="card shadow-lg border-0 rounded-4">
                    <div className="card-header bg-primary text-white text-center py-3 rounded-top-4">
                        <h3 className="mb-0">Login</h3>
                        {alert.message && (
                            <div className={`alert mt-3 ${alert.type === 'success' ? 'alert-success' : 'alert-danger'}`}>
                                {alert.message}
                            </div>
                        )}
                    </div>
                    <div className="card-body px-4">
                        <form onSubmit={submitRegister}>
                            <div className="mb-3">
                                <label className="form-label">Username</label>
                                <input
                                    type="text"
                                    name="username"
                                    value={state.user.username}
                                    onChange={updateUserName}
                                    className="form-control"
                                    placeholder="Enter username"
                                />
                                {errors.username && <small className="text-danger">{errors.username}</small>}
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    value={state.user.password}
                                    onChange={updateUserName}
                                    className="form-control"
                                    placeholder="Enter password"
                                />
                                {errors.password && <small className="text-danger">{errors.password}</small>}
                            </div>

                            <div className="d-grid">
                                <button type="submit" className="btn btn-primary">Login</button>
                            </div>
                        </form>
                    </div>
                    <div className="card-footer text-center text-muted py-2">
                        Don't have an account? <a href="/register">Register here</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
