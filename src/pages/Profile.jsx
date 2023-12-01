import { useSelector } from "react-redux";
import { UserDetail, User } from "../components";
import { customFetch } from "../utils";
import { toast } from "react-toastify";
import { removeUser, updateUser } from "../features/user/userSlice";
import { redirect } from "react-router-dom";

export const action =
  (store) =>
  async ({ request }) => {
    const formData = await request.formData();
    const { email, motto } = Object.fromEntries(formData);

    const user = store.getState().userState.user;

    const data = {
      email,
      motto,
    };
    console.log(data);
    try {
      const response = await customFetch.patch("/users/detail", data, {
        headers: {
          "X-API-TOKEN": user.token,
        },
      });
      toast.success(response?.data?.message || "Success");
      store.dispatch(updateUser(data));
      return null;
    } catch (error) {
      const msg = error.response.data.message;

      toast.error(msg || "Something error with your input");
      console.log(error.response.status);
      if (error.response.status === 401) {
        store.dispatch(removeUser());
        return redirect("/login");
      }
      return null;
    }
  };
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
