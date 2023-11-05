import { PaginationContainer, SectionTitle } from "../components";
import BTQList from "../components/BTQList";
import { redirect, useLoaderData } from "react-router-dom";
import { customFetch } from "../utils";
import { toast } from "react-toastify";

// loader
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
    console.log(params);

    try {
      const response = await customFetch("users/control-book", {
        params,
        headers: {
          "X-API-TOKEN": user.token,
        },
      });
      console.log(response);
      return {
        control: response.data.data,
        pagination: response.data.pagination,
      };
    } catch (error) {
      console.log(error);
      return null;
    }
  };

// components
const MyControlBook = () => {
  const { control } = useLoaderData();
  console.log(control);
  if (control.length < 1) {
    return (
      <SectionTitle text="Belum mengikuti program Baca Tulis Al-Qur'an satupun!" />
    );
  }

  return (
    <>
      <SectionTitle text="Laporan Baca Tulis Al-Qur'an" />
      <BTQList />
      <PaginationContainer />
    </>
  );
};

export default MyControlBook;
