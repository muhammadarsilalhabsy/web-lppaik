import React from "react";
import profile from "../assets/haha.jpeg";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const Avatar = ({ certificate, desc }) => {
  const { user, roles } = useSelector((state) => state.userState);
  const isAdmin = roles.includes("ADMIN");
  const isTutor = roles.includes("TUTOR");
  const isDosen = roles.includes("DOSEN");

  const IMG_URL = "http://localhost:8080/api/v1/image/";
  return (
    <div className="flex flex-col items-center justify-center p-4 bg-base-200 rounded-lg h-full shadow-lg">
      <div className="avatar">
        <div className="md:w-32 w-24 mask mask-squircle">
          <img
            src={certificate.avatar ? IMG_URL + certificate.avatar : profile}
            alt="profile"
          />
        </div>
      </div>
      <h3 className="mt-4 font-medium text-sm md:text-base">
        ID: {certificate.username}
      </h3>
      <h3 className="mt-2 md:text-3xl text-center font-bold capitalize">
        {certificate.name}
      </h3>
      <div className="md:my-8 space-y-4 my-4">
        <h4 className="md:text-base text-xs text-center font-bold capitalize">
          Program Studi: {certificate.major}
        </h4>
        {desc && (
          <h4 className="md:text-base text-xs text-center font-bold capitalize">
            {desc}
          </h4>
        )}
      </div>
      {user && (isAdmin || isTutor || isDosen) && (
        <Link className="btn btn-primary" to={`/users/${certificate.username}`}>
          Lihat Buku Kontrol btq
        </Link>
      )}
    </div>
  );
};

export default Avatar;
