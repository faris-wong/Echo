import React from "react";
import UseFetch from "../hooks/useFetch";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";

const Register = (props) => {
  const usingFetch = UseFetch();
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPW, setConfirmPW] = useState("");

  const { isSuccess, isError, error, isFetching, data } = useQuery({
    queryKey: ["echo"], // fill whatever necessary here
    queryFn: async () => await usingFetch("/roles"),
  });

  const { mutate } = useMutation({
    mutationFn: async () => {
      await usingFetch("/auth/register", "PUT", {
        email,
        password,
        role,
      });
    },
    onSuccess: () => props.setShowLogin(true),
  });

  return (
    <>
      <div className="row">
        <div className="col-md-6"></div>
        <input
          type="text"
          className="col-md-5"
          placeholder="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <div className="col-md-6"></div>
      </div>

      <div className="row">
        <div className="col-md-6"></div>
        <input
          type="text"
          className="col-md-5"
          placeholder="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </div>

      <div className="row">
        <div className="col-md-6"></div>
        <input
          type="text"
          className="col-md-5"
          placeholder="confirm password"
          value={confirmPW}
          onChange={(e) => {
            setConfirmPW(e.target.value);
          }}
        />
      </div>

      <div className="row">
        <div className="col-md-6"></div>
        <input
          type="text"
          className="col-md-5"
          placeholder="Please decide on username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
      </div>

      <div className="row">
        <div className="col-md-6"></div>
        <select
          name="roles"
          id="roles"
          className="col-md-5"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="none">Select Role</option>
          {data &&
            data.map((item) => {
              return (
                <option key={item} value={item}>
                  {item}
                </option>
              );
            })}
        </select>
        <div className="col-md-6"></div>

        <br />
        <div className="col">
          <div className="row-md-9"></div>
          {/* Conditionally render based on password match */}
          {password === confirmPW ? (
            <button className="row-md-9" onClick={mutate}>
              Register
            </button>
          ) : (
            <div>Passwords do not match</div>
          )}
          <div className="row-sm-8"></div>
        </div>

        <div className="col">
          <div className="row-md-8"></div>
          <button className="row-md-8" onClick={() => props.setShowLogin(true)}>
            Go to Login
          </button>
          <div className="row-md-8"></div>
        </div>
      </div>
    </>
  );
};

export default Register;
