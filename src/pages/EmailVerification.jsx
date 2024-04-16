import { toast } from "react-toastify";
import { customFetch } from "../utils";
import AvatarValidation from "../components/AvatarValidation";
import { useLoaderData } from "react-router-dom";
// loader
export const loader = async ({ request }) => {
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ]);

  if (params.token) {
    try {
      const response = await customFetch(`/email/verify`, { params });

      return { user: response.data.data };
    } catch (error) {
      const msg = error.response.data.message;

      toast.error(msg || "Something error with your input");
      return { user: undefined };
    }
  } else {
    return { user: undefined };
  }
};

const EmailVerification = () => {
  const { user } = useLoaderData();
  console.log(user);

  if (!user) {
    return null;
  }
  return (
    <>
      <AvatarValidation certificate={user} />
    </>
  );
};

export default EmailVerification;
