import React from "react";
import { useState } from "react";
import UseFetchNT from "../hooks/useFetchNT";
import { useMutation, useQuery } from "@tanstack/react-query";

const CreatingProfile = () => {
  const usingFetch = UseFetchNT();
  const [username, setUsername] = useState("");

  const { isSuccess, isError, error, isFetching, data } = useQuery({
    queryKey: ["createProfile"], // fill whatever necessary here
    queryFn: async () => await usingFetch("/profile"),
  });

  const { mutate } = useMutation({
    mutationFn: async (props) => {
      await usingFetch(`/profile + ${props.id}`, "PUT", {
        username,
      });
    },
    onSuccess: () => props.setShowLogin(true),
  });

  return <div></div>;
};

export default CreatingProfile;
