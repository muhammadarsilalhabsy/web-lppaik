import React from "react";
import Avatar from "./Avatar";
import { useLoaderData } from "react-router-dom";

const UserCertificate = () => {
  const { user } = useLoaderData();

  if (!user) {
    return null;
  }

  return (
    <div className="mt-8">
      <Avatar
        certificate={user}
        desc={"Dinyatakan telah mampu membaca Al-Qur’an"}
      />
    </div>
  );
};

export default UserCertificate;
