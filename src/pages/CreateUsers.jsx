import { toast } from "react-toastify";
import CreateSingleUser from "../components/CreateSingleUser";
import { customFetch } from "../utils";
import { redirect } from "react-router-dom";
import { removeUser } from "../features/user/userSlice";

export const loader = async () => {
  try {
    const response = await customFetch("/majors");
    return { majors: response.data.data };
  } catch (error) {
    console.log(error);
    return null;
  }
};
export const action =
  (store) =>
  async ({ request }) => {
    const formData = await request.formData();
    const formDataObject = Object.fromEntries(formData);

    const { name, username, email, major, gender, ...roles } = formDataObject;
    const rolesArray = Object.keys(roles).filter((key) => roles[key] === "on");

    const newUser = { name, username, email, major, gender, roles: rolesArray };

    const user = store.getState().userState.user;

    try {
      const response = await customFetch.post("/users/create", newUser, {
        headers: {
          "X-API-TOKEN": user.token,
        },
      });
      toast.success(response?.data?.message || "Success");
      return redirect("/users");
    } catch (error) {
      console.log(error);

      toast.error("Something error with your input");
      if (error.response.status === 401 || 403) {
        store.dispatch(removeUser());
        return redirect("/login");
      }
      return null;
    }
  };
const CreateUsers = () => {
  return (
    <div>
      <CreateSingleUser />
    </div>
  );
};

export default CreateUsers;
