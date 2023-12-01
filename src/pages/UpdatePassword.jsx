import React from "react";
import { customFetch } from "../utils";
import { toast } from "react-toastify";
import { Form, redirect } from "react-router-dom";
import { FormInput, SubmitButton } from "../components";
import { removeUser } from "../features/user/userSlice";

export const action =
  (store) =>
  async ({ request }) => {
    const formData = await request.formData();
    const newPassData = Object.fromEntries(formData);

    const user = store.getState().userState.user;

    console.log(newPassData);
    try {
      const response = await customFetch.patch("/users/password", newPassData, {
        headers: {
          "X-API-TOKEN": user.token,
        },
      });
      console.log(response);
      toast.success(response?.data?.message || "Success");
      return redirect("/profile");
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
const UpdatePassword = () => {
  return (
    <div className="p-4 bg-base-200 rounded-lg shadow-lg ">
      <Form method="PATCH" className="space-y-4">
        <FormInput
          label={"new password"}
          name={"newPassword"}
          size={"input-sm"}
        />
        <FormInput
          label={"confirm password"}
          name={"confirmNewPassword"}
          size={"input-sm"}
          type={"password"}
        />

        <div className="flex justify-end">
          <SubmitButton text={"update"} color={"btn-primary"} size={"btn-sm"} />
        </div>
      </Form>
    </div>
  );
};

export default UpdatePassword;
