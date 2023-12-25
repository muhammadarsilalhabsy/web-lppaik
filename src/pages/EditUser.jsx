import React from "react";
import { customFetch } from "../utils";
import { redirect, useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import { removeUser } from "../features/user/userSlice";
import { EditSingleUser } from "../components";

export const loader = async ({ params }) => {
  try {
    const [resUser, resMajors] = await Promise.all([
      customFetch(`/users/${params.id}`),
      customFetch(`/majors`),
    ]);

    return { user: resUser.data.data, majors: resMajors.data.data };
  } catch (error) {
    console.log(error);
    return null;
  }
};
export const action =
  (store) =>
  async ({ request, params }) => {
    const formData = await request.formData();
    const formDataObject = Object.fromEntries(formData);

    const {
      name,
      username,
      email,
      major,
      gender,
      completed,
      password,
      ...roles
    } = formDataObject;
    const rolesArray = Object.keys(roles).filter((key) => roles[key] === "on");

    const updateUser = {
      name,
      username,
      email,
      major,
      password,
      gender,
      completed: completed === "on",
      roles: rolesArray,
    };
    console.log(updateUser);

    console.log(params);
    console.log(formDataObject);

    const user = store.getState().userState.user;

    try {
      const response = await customFetch.patch(
        `/users/${params.id}`,
        updateUser,
        {
          headers: {
            "X-API-TOKEN": user.token,
          },
        }
      );
      toast.success(response?.data?.message || "Success");
      return redirect("/users");
    } catch (error) {
      const msg = error.response.data.message;

      toast.error(msg || "Something error with your input");
      if (error.response.status === 401) {
        store.dispatch(removeUser());
        return redirect("/login");
      }
      return null;
    }
  };
const EditUser = () => {
  return (
    <div>
      <EditSingleUser />
    </div>
  );
};

export default EditUser;
