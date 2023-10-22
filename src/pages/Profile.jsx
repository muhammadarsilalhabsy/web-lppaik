import { UserDetail, User } from "../components";

const Profile = () => {
  return (
    <div className="grid gap-4 md:grid-cols-3 items-start">
      <User />
      <div className="md:col-span-2">
        <UserDetail />
      </div>
    </div>
  );
};

export default Profile;
