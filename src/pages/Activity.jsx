import axios from "axios";
import { Filters, ActivitiesContainer } from "../components";
export const loader = async ({ request }) => {
  try {
    const response = await axios.get(
      "https://6536670cbb226bb85dd20e09.mockapi.io/activities"
    );

    return { activities: response.data };
  } catch (error) {
    console.log(error);
    return null;
  }
};
const Activity = () => {
  return (
    <>
      <Filters />
      <ActivitiesContainer />
    </>
  );
};

export default Activity;
