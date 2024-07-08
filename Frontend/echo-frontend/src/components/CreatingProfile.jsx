import React from "react";
import { useState } from "react";
import UseFetchNT from "../hooks/useFetchNT";
import { useMutation, useQuery } from "@tanstack/react-query";

const CreatingProfile = (props) => {
  const usingFetch = UseFetchNT();
  const [username, setUsername] = useState("");

  const { isSuccess, isError, error, isFetching, data } = useQuery({
    queryKey: ["createProfile"], // fill whatever necessary here
    queryFn: async () => await usingFetch("/profile"),
  });

  const { mutate } = useMutation({
    mutationFn: async (props) => {
      await usingFetch("/profile/" + props.id, "PUT", {
        username,
      });
    },
    onSuccess: () => {
      props.setShowLogin(true);
      queryClient.invalidateQueries(["books"]);
    },
  });

  return (
    <>
      <div>hello</div>
      <div>{JSON.stringify(props.setId)}</div>
      {/* <div className="row">
        <div className="col-md-3">
          <input
            type="text"
            className="col-md-3"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          ></input>
        </div>
      </div> */}
    </>
  );
};

export default CreatingProfile;
