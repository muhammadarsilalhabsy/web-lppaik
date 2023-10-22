import { useSelector } from "react-redux";
import profile from "../assets/haha.jpeg";
const User = () => {
  const user = useSelector((state) => state.userState.user);

  const IMG_URL = "http://localhost:8080/api/v1/image/";
  return (
    <div className="flex flex-col items-center justify-center p-4 bg-base-200 rounded-lg h-full">
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
      <button type="button" className="mt-6 btn btn-secondary btn-sm px-6">
        ubah password
      </button>
      <button type="button" className="mt-6 btn btn-error btn-sm px-6">
        keluar
      </button>
    </div>
  );
};

export default User;
