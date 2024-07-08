import { React, useState, useEffect } from "react";
import styles from "./css/Navbar.module.css";
import { NavLink } from "react-router-dom";

const Navbar = (props) => {
  const [communitiesList, setCommunitiesList] = useState([]);

  const getCommunities = async () => {
    try {
      const response = await fetch(import.meta.env.VITE_SERVER + "/community", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("fetch error");
      }
      const communitydata = await response.json();
      setCommunitiesList(communitydata);
      console.log(communitydata);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getCommunities();
  }, []);

  return (
    <nav>
      <NavLink to="/" className={styles.title}>
        ECHO
      </NavLink>
      <ul className={styles.navlist}>
        <li className={styles.home}>
          <NavLink to="/Home">HOME</NavLink>
        </li>
        <li>
          <div className={styles.communitiesList}> COMMUNITIES </div>
          <ul>
            {communitiesList.map((community) => {
              const toVar = "/community/" + community._id;
              return (
                <li key={community.id}>
                  <NavLink to={toVar}>{community.communityname}</NavLink>
                </li>
              );
            })}
          </ul>
        </li>
        <li className={styles.profile}>
          <NavLink to="/Profile">
            <div className={styles.profileContainer}>
              <img
                src="https://img.freepik.com/free-photo/androgynous-avatar-non-binary-queer-person_23-2151100269.jpg?t=st=1720277317~exp=1720280917~hmac=131407d0cd2c4d6d0cd313ee799bb259e9d8255230e789861a0a31f571eb9f8a&w=826"
                className={styles.userIcon}
              ></img>
              <div className={styles.profileInfo}>
                <h1 className={styles.userName}>User1234</h1>
                <p className={styles.status}>Online</p>
              </div>
            </div>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
