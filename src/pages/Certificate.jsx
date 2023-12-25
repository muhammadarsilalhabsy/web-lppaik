import { toast } from "react-toastify";
import { SearchOnly, UserCertificate } from "../components";
import { customFetch } from "../utils";
// loader
export const loader = async ({ request }) => {
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ]);

  if (params.id) {
    try {
      const response = await customFetch(`/certificate`, { params });

      console.log(response);
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
const Certificate = () => {
  return (
    <>
      <SearchOnly name="id" link="/certificate" />
      <UserCertificate />
    </>
  );
};

export default Certificate;
