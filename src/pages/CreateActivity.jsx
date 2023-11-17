import { Form, Link, redirect } from "react-router-dom";
import FormInput from "../components/FormInput";
import FormTextArea from "../components/FormTextArea";
import FormTimeInput from "../components/FormTimeInput";
import FormCheckbox from "../components/FormCheckbox";
import { useState } from "react";
import FormCheckboxWithOnChange from "../components/FormCheckboxWithOnChange";
import { SubmitButton } from "../components";
import { BiLinkExternal } from "react-icons/bi";
import FormInputWithOnChange from "../components/FormInputIWithOnChange";
import UploadImageActivity from "../components/UploadImageActivity";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { customFetch } from "../utils";
import { removeUser } from "../features/user/userSlice";
import DateInput from "../components/DateInput";

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

    const user = store.getState().userState.user;

    try {
      const response = await customFetch.post("/activities", data, {
        headers: {
          "X-API-TOKEN": user.token,
        },
      });
      toast.success(response?.data?.message || "Success");
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
  const [onlineChecked, setOnlineChecked] = useState(false);
  const [link, setLink] = useState("");

  return (
    <div className="bg-base-300 shadow-lg rounded-l-md p-4">
      <Form method="POST" className="flex flex-wrap">
        <div className="space-y-4 w-full md:w-1/2 p-4">
          <FormInput
            label="Judul kegiatan"
            name="title"
            size="input-sm"
            defaultValue=""
          />
          <FormInput
            label="Tempat / lokasi"
            name="location"
            size="input-sm"
            defaultValue=""
          />

          <div className="flex justify-evenly">
            <FormTimeInput
              label="Mulai"
              name="startTime"
              defaultValue={new Date().toLocaleTimeString([], {
                hour12: false,
                hour: "2-digit",
                minute: "2-digit",
              })}
            />
            <FormTimeInput
              label="Berakhir"
              name="endTime"
              defaultValue={new Date().toLocaleTimeString([], {
                hour12: false,
                hour: "2-digit",
                minute: "2-digit",
              })}
            />
            <DateInput
              name="date"
              label="tanggal"
              defaultValue={new Date().toISOString().split("T")[0]}
            />
          </div>
          <FormTextArea
            label="Deskripsi"
            name="description"
            size="textarea-sm"
            defaultValue=""
          />
          <div className="flex justify-evenly">
            <FormCheckbox name="mandatory" label="Wajib" size="checkbox-sm" />
            <FormCheckboxWithOnChange
              name="online"
              label="Online"
              size="checkbox-sm"
              checked={onlineChecked}
              onChange={() => setOnlineChecked(!onlineChecked)}
            />
          </div>
          {onlineChecked && (
            <div className="flex justify-end">
              <div className="w-11/12">
                <FormInputWithOnChange
                  label="link"
                  name="link"
                  size="input-sm"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                />
              </div>
              <div className="w-1/12 flex items-end">
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2"
                >
                  <BiLinkExternal className="w-5 h-5" />
                </a>
              </div>
            </div>
          )}
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
