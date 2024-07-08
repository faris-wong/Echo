import React, { useContext, useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";
import { jwtDecode } from "jwt-decode";
import { useQuery } from "@tanstack/react-query";

const Login = (props) => {
  const usingFetch = useFetch();
  const userCtx = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { isError, error, data, refetch } = useQuery({
    queryKey: ["login"],
    queryFn: async () => {
      try {
        return await usingFetch("/auth/login", "POST", { email, password });
      } catch (error) {
        throw error.message;
      }
    },
    enabled: false,
  });

  useEffect(() => {
    if (data) {
      userCtx.setAccessToken(data.access);
      const decoded = jwtDecode(data.access);
      userCtx.setRole(decoded.role);
    }
  }, [data]);

  return (
    <>
      <br />
      <div className="row">
        <div className="col-md-3"></div>
        <input
          type="text"
          className="col-md-3"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <div className="col-md-3"></div>
      </div>

      <div className="row">
        <div className="col-md-3"></div>
        <input
          type="password"
          className="col-md-3"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <div className="col-md-3"></div>
      </div>

      <div className="row">
        <div className="col-md-3"></div>
        <button className="col-md-3" onClick={refetch}>
          Login
        </button>
        <div className="col-md-3"></div>
      </div>

      <div className="row">
        <div className="col-md-3"></div>
        <button className="col-md-3" onClick={() => props.setShowLogin(false)}>
          Register
        </button>
        <div className="col-md-3"></div>
      </div>
    </>
  );
};

export default Login;
