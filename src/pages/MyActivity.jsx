import axios from "axios";
import { MyActivityList, SectionTitle } from "../components";
import { useLoaderData } from "react-router-dom";
export const loader =
  (store) =>
  async ({ request }) => {
    // const user = store.getState().userState.user;
    // const params = Object.fromEntries([
    //   ...new URL(request.url).searchParams.entries(),
    // ]);

    // if (!user) {
    //   toast.warn("You must be logged in to checkout!");
    //   return redirect("/login");
    // }
    // console.log(params);
    try {
      const response = await axios.get(
        "https://6351779adfe45bbd55c0ffd1.mockapi.io/activity"
      );
      console.log(response);
      return { activities: response.data };
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
    </>
  );
};

export default MyActivity;
