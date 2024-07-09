import React, { useEffect } from "react";
import UseFetchNT from "../hooks/useFetchNT";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import ModalCP from "./ModalCP";

const Register = (props) => {
  const usingFetch = UseFetchNT();
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPW, setConfirmPW] = useState("");
  const [authId, setAuthId] = useState("");
  const [modalCP, setModalCP] = useState(false);

  const { isSuccess, isError, error, isFetching, data } = useQuery({
    queryKey: ["echo"], // fill whatever necessary here
    queryFn: async () => await usingFetch("/roles"),
  });

  const { mutate, data: newUserProfile } = useMutation({
    mutationFn: async () => {
      return await usingFetch("/auth/register", "PUT", {
        email,
        password,
        role,
      });
    },
    onSuccess: (data) => {
      if (data && data.id) {
        setAuthId(data.id);
        // auth id
        // Optionally, trigger some other actions based on success
      }
    },
  });

  useEffect(() => {
    console.log(authId);
  }, [authId]);

  return (
    <>
      <div className="row">
        <div className="col-sm-1"></div>
        <input
          style={{ backgroundColor: "purple", color: "whitesmoke" }}
          type="text"
          className="col-sm-3"
          placeholder="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <div className="col-sm-1"></div>
      </div>

      <div className="row">
        <div className="col-sm-1"></div>
        <input
          style={{ backgroundColor: "purple", color: "whitesmoke" }}
          type="text"
          className="col-sm-3"
          placeholder="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <div className="col-sm-1"></div>
      </div>

      <div className="row">
        <div className="col-sm-1"></div>
        <input
          style={{ backgroundColor: "purple", color: "whitesmoke" }}
          type="text"
          className="col-sm-3"
          placeholder="confirm password"
          value={confirmPW}
          onChange={(e) => {
            setConfirmPW(e.target.value);
          }}
        />
        <div className="col-sm-1"></div>
      </div>

      <div className="row">
        <div className="col-sm-1"></div>
        <select
          style={{ backgroundColor: "green", color: "whitesmoke" }}
          name="roles"
          id="roles"
          className="col-sm-3"
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
        <div className="col-sm-1"></div>
      </div>
      <div className="row">
        <div className="col-sm-1"></div>
        {/* Conditionally render based on password match */}
        {password === confirmPW ? (
          <button
            style={{ backgroundColor: "green", color: "whitesmoke" }}
            className="col-sm-3"
            onClick={() => {
              mutate();
              setModalCP(true);
            }}
          >
            Register
          </button>
        ) : (
          <div style={{ color: "yellow" }} className="col-sm-3">
            Passwords do not match!
          </div>
        )}
      </div>
      <div className="col-sm-1"></div>

      <div className="row">
        <div className="col-sm-1"></div>
        <button
          style={{ backgroundColor: "blue", color: "whitesmoke" }}
          className="col-sm-3"
          onClick={() => props.setShowLogin(true)}
        >
          Go to Login
        </button>
        <div className="col-sm-1"></div>
      </div>

      {modalCP && (
        <ModalCP
          setShowLogin={props.setShowLogin}
          setModalCP={setModalCP}
          authId={authId}
        ></ModalCP>
      )}
    </>
  );
};

export default Register;
