import axios from "axios";
import { SectionTitle } from "../components";
import BTQList from "../components/BTQList";
import { useLoaderData } from "react-router-dom";

// loader
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
        "https://6351779adfe45bbd55c0ffd1.mockapi.io/btq"
      );
      console.log(response);
      return { activities: response.data };
    } catch (error) {
      console.log(error);
      return null;
    }
  };

// components
const ControlBook = () => {
  const { activities } = useLoaderData();
  if (activities.length < 1) {
    return (
      <SectionTitle text="Belum mengikuti program Baca Tulis Al-Qur'an satupun!" />
    );
  }

  return (
    <>
      <SectionTitle text="Laporan Baca Tulis Al-Qur'an" />
      <BTQList />
    </>
  );
};

export default ControlBook;
