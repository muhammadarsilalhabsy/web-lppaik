import { Users, Filters, PaginationContainer, SearchOnly } from "../components";
import { customFetch } from "../utils";

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
    console.log(params);
    try {
      const response = await customFetch.get("/users", {
        params,
        headers: {
          "X-API-TOKEN": `${user.token}`,
        },
      });
      console.log(response);
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
  return (
    <>
      <SearchOnly name="identity" link="/users" />
      <Users />
      <PaginationContainer />
    </>
  );
};

export default UserManagement;
