import { useDispatch, useSelector } from "react-redux";
import profile from "../assets/haha.jpeg";
import { customFetch, getImage } from "../utils";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser, updateUserProfile } from "../features/user/userSlice";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

const User = ({ user, hidden }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const fileRef = useRef(null);
  const [avatarImage, setAvatarImage] = useState("");

  const handleLogout = async () => {
    try {
      const response = await customFetch.delete("/auth/logout", {
        headers: {
          "X-API-TOKEN": user.token,
        },
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }

    navigate("/");
    dispatch(logoutUser());
  };

  const handleExecute = async (data) => {
    try {
      const response = await customFetch.patch(
        "/users/avatar",
        { avatar: data },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "X-API-TOKEN": user.token,
          },
        }
      );
      console.log(response);
      dispatch(updateUserProfile({ avatar: URL.createObjectURL(data) }));

      toast.success(response.data.message);
    } catch (error) {
      const msg = error.response.data.message;

      toast.error(msg || "Something error with your input");
    }
  };

  // getImage
  async function getAvatar() {
    try {
      const response = await getImage(user.avatar);
      setAvatarImage(response);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (user.avatar) {
      if (!user.avatar.startsWith("blob:")) {
        getAvatar();
      }
    }
  }, []);

  // console.log(user.avatar, user.avatar.startsWith("blob:"));
  return (
    <div className="flex flex-col items-center justify-center p-4 bg-base-200 rounded-lg h-full shadow-lg">
      <div className="avatar">
        {!hidden ? (
          <>
            <input
              onChange={(e) => handleExecute(e.target.files[0])}
              type="file"
              ref={fileRef}
              hidden
              accept="image/*"
            />
            <div className="w-24 rounded-full">
              <img
                onClick={() => fileRef.current.click()}
                src={
                  user.avatar
                    ? user.avatar.startsWith("blob:")
                      ? user.avatar
                      : avatarImage
                    : profile
                }
                alt="profile"
                className="cursor-pointer"
              />
            </div>
          </>
        ) : (
          <div className="w-24 rounded-full">
            <img
              src={
                user.avatar
                  ? user.avatar.startsWith("blob:")
                    ? user.avatar
                    : avatarImage
                  : profile
              }
              alt="profile"
            />
          </div>
        )}
      </div>
      <h3 className="mt-4 font-medium text-sm md:text-base">
        ID: {user.username}
      </h3>
      {!hidden && (
        <>
          <Link
            to="/update-password"
            className="mt-6 btn btn-secondary btn-sm px-6"
          >
            ubah password
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            className="mt-6 btn btn-error btn-sm px-6"
          >
            keluar
          </button>
        </>
      )}
    </div>
  );
};

export default User;
