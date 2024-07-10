import { React, useState, useEffect, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import styles from "./css/Navbar.module.css";
import { NavLink } from "react-router-dom";
import CreateCommunitiesModal from "./CreateCommunitiesModal";
import UpdateCommunitiesModal from "./UpdateCommunitiesModal";
import user from "../context/user";

const Navbar = (props) => {
  const [communitiesList, setCommunitiesList] = useState([]);
  const [showCommunitiesModal, setShowCommunitiesModal] = useState(false);
  const [showUpdateCommunitiesModal, setShowUpdateCommunitiesModal] =
    useState(false);
  const [communityId, setCommunityId] = useState("");
  const userCtx = useContext(user);

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
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getCommunities();
  }, []);


  const handleClick = (id) => {
    setShowUpdateCommunitiesModal(true);
    setCommunityId(id);
  };

  const { isSuccess, isError, error, isFetching, data } = useQuery({
    queryKey: ["profile"],
    queryFn: async () =>
      await usingFetch(
        "/profileaccount",
        "POST",
        {
          accountlink: props.authID,
        },
        userCtx.accessToken
      ),
  });



  return (
    <>
      {showUpdateCommunitiesModal && userCtx.role === "admin" && (
        <UpdateCommunitiesModal
          getCommunities={getCommunities}
          setShowUpdateCommunitiesModal={setShowUpdateCommunitiesModal}
          communityId={communityId}
        />
      )}

      {showCommunitiesModal && userCtx.role === "admin" && (
        <CreateCommunitiesModal
          getCommunities={getCommunities}
          setShowCommunitiesModal={setShowCommunitiesModal}
        />
      )}
      <nav>
        <NavLink to="/" className={styles.title}>
          ECHO
        </NavLink>
        <ul className={styles.navlist}>
          <li className={styles.home}>
            <NavLink to="/Home">HOME</NavLink>
          </li>
          {userCtx.accessToken && (
            <>
              <li>
                <div className={styles.communitiesList}>
                  <span>COMMUNITIES</span>
                  <div
                    className={styles.addCommunityIcon}
                    onClick={() => setShowCommunitiesModal(true)}
                  >
                    <i className="fa fa-plus"></i>
                  </div>
                </div>
                <ul>
                  {communitiesList.map((community) => {
                    const toVar = "/community/" + community._id;

                    return (
                      <li key={community._id} className={styles.communityItem}>
                        <NavLink to={toVar}>{community.communityname}</NavLink>
                        <div
                          className={styles.updateCommunityIcon}
                          onClick={() => handleClick(community._id)}
                        >
                          <i className="far fa-edit"></i>
                        </div>
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
                     {isSuccess &&( <h1 className={styles.userName}>{data[0].username}</h1>)}
                      {isSuccess && (<p className={styles.status}>{data[0].status}</p>)}
                    </div>
                  </div>
                </NavLink>
              </li>
            </>
          )}

          {!userCtx.accessToken && (
            <li className={styles.profile}>
              <NavLink to="/Login">
                <div className={styles.profileContainer}>
                  <img
                    src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/add5b631521013.56547054d7447.jpg"
                    className={styles.userIcon}
                  ></img>
                  <div className={styles.profileInfo}>
                    <h1 className={styles.userName}>Login/Register</h1>
                    <p className={styles.status}>Click Here</p>
                  </div>
                </div>
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
