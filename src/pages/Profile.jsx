import { useSelector } from "react-redux";
import { UserDetail, User } from "../components";

const Profile = () => {
  const user = useSelector((state) => state.userState.user);

  return (
    <div className="grid gap-4 md:grid-cols-3 items-start">
      <User user={user} hidden={false} />
      <div className="md:col-span-2">
        <UserDetail user={user} disabled={false} />
      </div>
    </div>
  );
};

export default Profile;
