import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { Users, PaginationContainer, SearchOnly } from "../components";
import { customFetch } from "../utils";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export const loader =
  (store) =>
  async ({ request }) => {
    const user = store.getState().userState.user;
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);

    // if (!user) {
    //   toast.warn("You must be logged in to checkout!");
    //   return redirect("/login");
    // }
    // console.log(params);
    try {
      const response = await customFetch.get("/users", {
        params,
        headers: {
          "X-API-TOKEN": `${user.token}`,
        },
      });
      // console.log(response);
      return {
        users: response.data.data,
        pagination: response.data.pagination,
      };
    } catch (error) {
      console.log(error);
      return null;
    }
  };
const UserManagement = () => {
  const roles = useSelector((state) => state.userState.roles);

  const isAdmin = roles.includes("ADMIN");
  return (
    <>
      <SearchOnly name="identity" link="/users" />
      {isAdmin && (
        <div className="flex justify-center md:justify-end md:mr-8 my-8">
          <Link to="create" className="btn btn-sm btn-primary">
            <span>Tambahkan pengguna</span>
            <AiOutlineUsergroupAdd className="font-bold" />
          </Link>
        </div>
      )}

      <Users />
      <PaginationContainer />
    </>
  );
};

export default UserManagement;
