import React from "react";
import { redirect, useLoaderData } from "react-router-dom";
import { customFetch } from "../utils";
import {
  FormControlBook,
  PaginationContainer,
  User,
  UserDetail,
} from "../components";
import { useSelector } from "react-redux";
import BTQList from "../components/BTQList";
import { toast } from "react-toastify";
import { removeUser } from "../features/user/userSlice";

export const action =
  (store) =>
  async ({ request, params }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    console.log(data);

    const user = store.getState().userState.user;
    console.log(user);
    try {
      const response = await customFetch.post(
        `/control-book/${params.id}`,
        data,
        {
          headers: {
            "X-API-TOKEN": user.token,
          },
        }
      );
      toast.success(response?.data?.message || "Success");
      return null;
    } catch (error) {
      console.log(error);

      toast.error(
        error.response.data.message || "Something error with your input"
      );
      if (error.response.status === 401) {
        store.dispatch(removeUser());
        return redirect("/login");
      }
      return null;
    }
  };
// loader
export const loader =
  (store) =>
  async ({ params, request }) => {
    const user = store.getState().userState.user;
    const reqParams = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);

    try {
      const [response1, response2] = await Promise.all([
        customFetch(`/users/${params.id}`),
        customFetch(`/users/control-book/${params.id}`, {
          params: reqParams,
          headers: {
            "X-API-TOKEN": `${user.token}`,
          },
        }),
      ]);

      return {
        user: response1.data.data,
        control: response2.data.data,
        pagination: response2.data.pagination,
      };
    } catch (error) {
      console.log(error);
      return null;
    }
  };

// action

// components
const SingleUser = () => {
  const roles = useSelector((state) => state.userState.roles);

  const isAdmin = roles.includes("ADMIN");
  const isTutor = roles.includes("TUTOR");
  const isDosen = roles.includes("DOSEN");

  const { user } = useLoaderData();

  return (
    <>
      <div className="grid gap-4 md:grid-cols-3 items-start">
        <User user={user} hidden={true} />
        <div className="md:col-span-2">
          <UserDetail user={user} disabled={true} />
        </div>
      </div>
      {(isAdmin || isTutor) && <FormControlBook />}
      {(isAdmin || isTutor || isDosen) && (
        <>
          <BTQList />
          <PaginationContainer />
        </>
      )}
    </>
  );
};

export default SingleUser;
