import { Hero, FeaturedActivities } from "../components";
import { customFetch } from "../utils";

export const loader = async () => {
  try {
    const response = await customFetch("/activities?mandatory=true", {
      headers: {
        Accept: "*/*",
      },
    });

    return { activities: response.data.data };
  } catch (error) {
    console.log(error);
    return null;
  }
};
const Landing = () => {
  return (
    <>
      <Hero />
      <FeaturedActivities />
    </>
  );
};

export default Landing;
