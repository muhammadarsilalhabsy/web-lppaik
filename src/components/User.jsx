import { useDispatch, useSelector } from "react-redux";
import profile from "../assets/haha.jpeg";
import { customFetch } from "../utils";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../features/user/userSlice";

const User = ({ user, hidden }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
  const IMG_URL = "http://localhost:8080/api/v1/image/";
  return (
    <div className="flex flex-col items-center justify-center p-4 bg-base-200 rounded-lg h-full shadow-lg">
      <div className="avatar">
        <div className="w-24 rounded-full">
          <img
            src={user.avatar ? IMG_URL + user.avatar : profile}
            alt="profile"
          />
        </div>
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
