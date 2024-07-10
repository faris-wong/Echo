import React, { useContext, useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";
import { jwtDecode } from "jwt-decode";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import mp3File from "../../public/unlockSound.mp3";

const Login = (props) => {
  // sound file
  const playAudio = () => {
    const audio = new Audio(mp3File);
    audio.play();
  };
  const usingFetch = useFetch();
  const userCtx = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  // const [authID, setAuthID] = useState("");

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
      props.setAuthID(data.id);
      console.log(data.id);
      userCtx.setAccessToken(data.access);
      const decoded = jwtDecode(data.access);
      userCtx.setRole(decoded.role);
      // <Navigate to="/Home"></Navigate>;
      navigate("Home");
      playAudio();
    }
  }, [data]);

  return (
    <>
      <br />
      <div className="row">
        <div className="col-md-3"></div>
        <input
          style={{
            padding: "10px",
            borderRadius: "25px",
            gap: "2px",
            backgroundColor: "violet",
            color: "black",
          }}
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
          style={{
            padding: "5px",
            borderRadius: "25px",
            gap: "2px",
            backgroundColor: "violet",
            color: "black",
          }}
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
        <button
          style={{
            padding: "5px",
            borderRadius: "30px",
            gap: "2px",
            backgroundColor: "cyan",
            color: "black",
          }}
          className="col-sm-1"
          onClick={refetch}
        >
          Login
        </button>
        <button
          style={{
            padding: "5px",
            borderRadius: "30px",
            gap: "2px",
            backgroundColor: "#89bbff",
            color: "black",
          }}
          className="col-sm-2"
          onClick={() => props.setShowLogin(false)}
        >
          Register
        </button>
        <div className="col-md-3"></div>
      </div>
    </>
  );
};

export default Login;
