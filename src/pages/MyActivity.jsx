import { MyActivityList, PagingContainer, SectionTitle } from "../components";
import { useLoaderData } from "react-router-dom";
import { customFetch } from "../utils";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
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
  const { token } = useSelector((state) => state.userState.user);

  const handleDownload = async () => {
    try {
      const response = await customFetch(
        "/activities/download-current-user-activity",
        {
          responseType: "blob",
          headers: {
            "X-API-TOKEN": token,
          },
        }
      );

      const blob = new Blob([response.data], { type: "application/pdf" });

      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "my-activity.pdf";

      document.body.appendChild(a);
      a.click();

      document.body.removeChild(a);
    } catch (error) {
      console.log(error);
    }
  };

  if (activities.length < 1) {
    return <SectionTitle text="Belum mengikuti kegiatan satupun!" />;
  }
  return (
    <>
      <SectionTitle text="Kegiatan yang telah diikuti" size="sm:text-lg" />

      <div className="flex items-center justify-end mt-4">
        <button
          disabled={activities.length < 1}
          onClick={handleDownload}
          className="btn btn-primary btn-sm"
        >
          Print
        </button>
      </div>

      <MyActivityList />
      <PagingContainer />
    </>
  );
};

export default MyActivity;
