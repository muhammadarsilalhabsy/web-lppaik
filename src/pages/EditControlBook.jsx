import { redirect, useLoaderData } from "react-router-dom";
import { customFetch } from "../utils";
import { FormControlBook } from "../components";
import { toast } from "react-toastify";
import { removeUser } from "../features/user/userSlice";

export const loader = async ({ params }) => {
  console.log(params);
  try {
    const response = await customFetch(`/control-book/${params.id}`);

    return { control: response.data.data };
  } catch (error) {
    console.log(error);
    return null;
  }
};
export const action =
  (store) =>
  async ({ request, params }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    console.log(data);

    const user = store.getState().userState.user;
    console.log(user);
    try {
      const response = await customFetch.patch(
        `/control-book/${params.id}`,
        data,
        {
          headers: {
            "X-API-TOKEN": user.token,
          },
        }
      );
      toast.success(response?.data?.message || "Success");
      return redirect("/users");
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
const EditControlBook = () => {
  const { control } = useLoaderData();
  const { date, lesson, description } = control;

  return (
    <FormControlBook
      btn="update control book"
      date={date}
      description={description}
      method="PATCH"
      lesson={lesson}
    />
  );
};

export default EditControlBook;
