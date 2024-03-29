import { FormInput, SubmitButton } from "../components";
import { Form, redirect } from "react-router-dom";
import { customFetch } from "../utils";
import { toast } from "react-toastify";
import { loginUser } from "../features/user/userSlice";

export const action =
  (store) =>
  async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    try {
      const response = await customFetch.post("/auth/login", data);
      store.dispatch(loginUser(response.data.data));
      toast.success("Logged in successfully");
      return redirect("/"); // redirect hanya diggunakan pada action dan loader
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || "please double check you credential";
      toast.error(errorMessage);
      return null;
    }
  };
const Login = () => {
  return (
    <section className="grid place-items-center h-screen">
      <Form
        method="POST"
        className="card bg-base-100 w-96 p-8 shadow-lg flex flex-col gap-y-4"
      >
        <h4 className="text-center text-3xl font-bold">Login</h4>
        <FormInput
          type="text"
          label="username"
          name="username"
          defaultValue="21916042"
        />
        <FormInput
          type="password"
          label="password"
          name="password"
          defaultValue="21916042"
        />
        <div className="mt-4">
          <SubmitButton text="login" size="btn-block" color="btn-primary" />
        </div>
      </Form>
    </section>
  );
};

export default Login;
