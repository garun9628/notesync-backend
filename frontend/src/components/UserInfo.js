import React from "react";
import { Link, useLocation } from "react-router-dom";

const UserInfo = () => {
  const location = useLocation();
  const { name, email } = location.state;
  return (
    <>
      <div
        className="my-5"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <h1>User Profile</h1>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "150px",
        }}
      >
        <div className="card w-50" style={{ backgroundColor: "#eee" }}>
          <div className="card-body text-center">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
              alt="avatar"
              className="rounded-circle img-fluid"
              style={{ width: "150px" }}
            />
            <h5 className="my-3">{name}</h5>
            <p className="text-muted mb-1">{email}</p>
            <Link to="/login" className="btn btn-outline-secondary mt-3">
              Logout
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserInfo;
