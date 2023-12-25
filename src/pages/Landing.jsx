import { Hero, FeaturedActivities } from "../components";
import { customFetch } from "../utils";

export const loader = async () => {
  try {
    const response = await customFetch("/activities?mandatory=true", {
      headers: {
        Accept: "*/*",
      },
    });

    console.log(response);
    return { activities: response.data.data };
  } catch (error) {
    console.log(error);
    return null;
  }
};
const Landing = () => {
  console.log(import.meta.env.VITE_SPRING_API_URL);
  return (
    <>
      <Hero />
      <FeaturedActivities />
    </>
  );
};

export default Landing;
