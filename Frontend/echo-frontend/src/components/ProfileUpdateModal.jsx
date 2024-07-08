import React from "react";
import useFetchNT from "../hooks/useFetchNT";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const Overlay = (props) => {
  const usingFetch = useFetchNT();
  const queryClient = useQueryClient();

  const { mutate: callUpdateProfile } = useMutation({
    mutationFn: async () =>
      await usingFetch("/profile/" + props.id, "PATCH", {
        bio,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(["profile"]),
        props.setShowUpdateModal(false);
    },
  });
};

const ProfileUpdateModal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Overlay
          id={props.id}
          bio={props.bio}
          status={props.status}
          community={props.community}
          setShowUpdateModal={props.setShowUpdateModal}
        />,
        document.querySelector("#root")
      )}
    </>
  );
};

export default ProfileUpdateModal;
