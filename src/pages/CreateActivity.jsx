import { Form, redirect } from "react-router-dom";
import { SubmitButton } from "../components";

import UploadImageActivity from "../components/UploadImageActivity";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { customFetch } from "../utils";
import { removeUser } from "../features/user/userSlice";
import ActivityInput from "../components/ActivityInput";
import { clearImages } from "../features/activity/activitySlice";

export const action =
  (store) =>
  async ({ request }) => {
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
    console.log(data);
    try {
      const response = await customFetch.post("/activities", data, {
        headers: {
          "X-API-TOKEN": user.token,
        },
      });
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

const CreateActivity = () => {
  const { images } = useSelector((state) => state.activityState);

  return (
    <div className="bg-base-300 shadow-lg rounded-l-md p-4">
      <Form method="POST" className="flex flex-wrap">
        <div className="space-y-4 w-full md:w-1/2 p-4">
          <ActivityInput
            date={new Date().toISOString().split("T")[0]}
            endTime={new Date().toLocaleTimeString([], {
              hour12: false,
              hour: "2-digit",
              minute: "2-digit",
            })}
            startTime={new Date().toLocaleTimeString([], {
              hour12: false,
              hour: "2-digit",
              minute: "2-digit",
            })}
            mandatory={false}
            online={false}
          />
        </div>
        <div className="space-y-4 w-full md:w-1/2 p-4 ">
          <UploadImageActivity />
        </div>
        <SubmitButton
          color="btn-success"
          size="btn-block"
          text="Buat kegiatan"
          disabled={images.length < 1}
        />
      </Form>
    </div>
  );
};

export default CreateActivity;
