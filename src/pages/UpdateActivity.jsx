import { Form, redirect, useLoaderData } from "react-router-dom";
import { SubmitButton } from "../components";

import UploadImageActivity from "../components/UploadImageActivity";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { customFetch } from "../utils";
import { removeUser } from "../features/user/userSlice";
import ActivityInput from "../components/ActivityInput";
import { clearImages, setImages } from "../features/activity/activitySlice";
export const loader =
  (store) =>
  async ({ params }) => {
    try {
      const response = await customFetch(`/activities/${params.id}`);

      store.dispatch(setImages(response.data.data.images));

      return { activities: response.data.data };
    } catch (error) {
      console.log(error);
      return null;
    }
  };
export const action =
  (store) =>
  async ({ request, params }) => {
    const formData = await request.formData();
    const {
      link,
      date,
      title,
      endTime,
      location,
      startTime,
      description,
      mandatory,
      online,
    } = Object.fromEntries(formData);

    const { images } = store.getState().activityState;
    const user = store.getState().userState.user;

    const data = {
      link,
      date,
      title,
      images,
      endTime,
      location,
      startTime,
      description,
      mandatory: mandatory === "on" ? true : false,
      online: online === "on" ? true : false,
    };

    try {
      const response = await customFetch.patch(
        `/activities/${params.id}`,
        data,
        {
          headers: {
            "X-API-TOKEN": user.token,
          },
        }
      );
      toast.success(response?.data?.message || "Success");
      store.dispatch(clearImages());
      return redirect("/activity");
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

const UpdateActivity = () => {
  const { images } = useSelector((state) => state.activityState);
  const { activities } = useLoaderData();
  const { link, date, title, endTime, location, startTime, description } =
    activities;
  return (
    <div className="bg-base-300 shadow-lg rounded-l-md p-4">
      <Form method="PATCH" className="flex flex-wrap">
        <div className="space-y-4 w-full md:w-1/2 p-4">
          <ActivityInput
            date={date}
            endTime={endTime}
            startTime={startTime}
            mandatory={false}
            online={link === null ? false : true}
            description={description}
            title={title}
            location={location}
            link={link}
          />
        </div>
        <div className="space-y-4 w-full md:w-1/2 p-4 ">
          <UploadImageActivity />
        </div>
        <SubmitButton
          color="btn-success"
          size="btn-block"
          text="update kegiatan"
          disabled={images.length < 1}
        />
      </Form>
    </div>
  );
};

export default UpdateActivity;
