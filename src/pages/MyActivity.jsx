import { MyActivityList, PagingContainer, SectionTitle } from "../components";
import { useLoaderData } from "react-router-dom";
import { customFetch } from "../utils";
import { toast } from "react-toastify";
export const loader =
  (store) =>
  async ({ request }) => {
    const user = store.getState().userState.user;
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);

    if (!user) {
      toast.warn("You must be logged in to checkout!");
      return redirect("/login");
    }
    // console.log(params);
    try {
      const response = await customFetch("users/activities", {
        params,
        headers: {
          "X-API-TOKEN": user.token,
        },
      });
      console.log(response);
      return {
        activities: response.data.data,
        paging: response.data.pagination,
      };
    } catch (error) {
      console.log(error);
      return null;
    }
  };
const MyActivity = () => {
  const { activities } = useLoaderData();

  if (activities.length < 1) {
    return <SectionTitle text="Belum mengikuti kegiatan satupun!" />;
  }
  return (
    <>
      <SectionTitle text="Kegiatan yang telah diikuti" size="sm:text-lg" />
      <MyActivityList />
      <PagingContainer />
    </>
  );
};

export default MyActivity;
