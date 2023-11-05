import React from "react";

const Avatar = ({ user }) => {
  const IMG_URL = "http://localhost:8080/api/v1/image/";
  return (
    <div className="flex flex-col items-center justify-center p-4 bg-base-200 rounded-lg h-full shadow-lg">
      <div className="avatar">
        <div className="md:w-32 w-24 mask mask-squircle">
          <img
            src={user.avatar ? IMG_URL + user.avatar : profile}
            alt="profile"
          />
        </div>
      </div>
      <h3 className="mt-4 font-medium text-sm md:text-base">
        ID: {user.username}
      </h3>
      <div className="md:my-8 my-4">
        <h3 className="md:text-2xl text-center font-bold capitalize">
          {user.name}
        </h3>
      </div>
    </div>
  );
};

export default Avatar;
