import React from "react";
import { useLoaderData } from "react-router-dom";
import { customFetch } from "../utils";
import { User, UserDetail } from "../components";

// loader
export const loader = async ({ params }) => {
  try {
    const response = await customFetch(`/users/${params.id}`);

    return { user: response.data.data };
  } catch (error) {
    console.log(error);
    return null;
  }
};
const SingleUser = () => {
  const { user } = useLoaderData();
  return (
    <div className="grid gap-4 md:grid-cols-3 items-start">
      <User user={user} hidden={true} />
      <div className="md:col-span-2">
        <UserDetail user={user} disabled={true} />
      </div>
    </div>
  );
};

export default SingleUser;
