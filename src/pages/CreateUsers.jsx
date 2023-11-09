import { toast } from "react-toastify";
import CreateSingleUser from "../components/CreateSingleUser";
import { customFetch } from "../utils";
import { Link, redirect } from "react-router-dom";
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
const CreateUsers = () => {
  return (
    <div>
      <div className="text-sm breadcrumbs mb-6">
        <ul>
          <li>
            <Link to="/">Beranda</Link>
          </li>
          <li>
            <Link to="/users">Pengguna</Link>
          </li>
        </ul>
      </div>
      <CreateSingleUser />
    </div>
  );
};

export default CreateUsers;
