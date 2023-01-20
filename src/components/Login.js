import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Call API
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });

    const json = await response.json();

    if (json.success) {
      props.showInfo(`${json.user.name}`, `${json.user.email}`);
      localStorage.setItem("token", json.authToken);
      props.showAlert("Logged in successfully", "success");
      navigate("/");
    } else {
      props.showAlert(json.error, "danger");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div
        className="my-5"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <h1>Login to continue to iNoteBook</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div
          style={{
            border: "1px solid",
            borderWidth: "1.5px",
            width: "35%",
            marginLeft: "auto",
            marginRight: "auto",
            borderColor: "darkgreen",
            marginTop: "120px",
            boxShadow: "10px 10px 5px #aaaaaa",
          }}
        >
          <div
            className="my-4"
            style={{
              width: "60%",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={credentials.email}
              aria-describedby="emailHelp"
              onChange={onChange}
            />
          </div>
          <div
            className="my-4"
            style={{
              width: "60%",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={credentials.password}
              onChange={onChange}
            />
          </div>
          <div
            style={{
              width: "fit-content",
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: "35px",
              marginBottom: "20px",
            }}
          >
            <button type="submit" className="btn btn-outline-dark">
              Submit
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default Login;
