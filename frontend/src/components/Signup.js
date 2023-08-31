import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../services/helper";

const Signup = (props) => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = credentials;
    // Call API
    const response = await fetch(`${BASE_URL}/api/auth/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    const json = await response.json();
    console.log(json);
    if (json.success) {
      localStorage.setItem("token", json.authToken);
      props.showAlert("Account created successfully", "success");
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
        <h1>Create an account to use iNoteBook</h1>
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
              width: "65%",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              onChange={onChange}
              minLength={5}
              required
            />
          </div>
          <div
            className="my-4"
            style={{
              width: "65%",
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
              onChange={onChange}
              aria-describedby="emailHelp"
              required
            />
          </div>
          <div
            className="my-4"
            style={{
              width: "65%",
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
              onChange={onChange}
              minLength={8}
              required
            />
          </div>
          <div
            className="my-4"
            style={{
              width: "65%",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <label htmlFor="cpassword" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              className="form-control"
              id="cpassword"
              name="cpassword"
              onChange={onChange}
              minLength={8}
              required
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

export default Signup;
