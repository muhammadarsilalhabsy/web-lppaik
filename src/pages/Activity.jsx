import {
  Filters,
  ActivitiesContainer,
  PaginationContainer,
} from "../components";
import { MdOutlineAdd } from "react-icons/md";
import { Link } from "react-router-dom";
import { customFetch } from "../utils";
export const loader = async ({ request }) => {
  console.log(request);
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ]);
  console.log(params);
  try {
    const response = await customFetch("/activities?size=9", { params });

    return {
      activities: response.data.data,
      pagination: response.data.pagination,
    };
  } catch (error) {
    console.log(error);
    return null;
  }
};
const Activity = () => {
  const role = true;
  return (
    <>
      <Filters text="title" link="/activity" />
      <ActivitiesContainer />
      <PaginationContainer />
      {role && (
        <Link
          title="Buat kegiatan baru"
          to="/create-activity"
          className="btn btn-circle btn-info fixed bottom-7 right-8 xl:right-28 xl:btn-lg z-[9999]"
        >
          <MdOutlineAdd className="w-6 h-6 xl:w-12 xl:h-12" />
        </Link>
      )}
    </>
  );
};

export default Activity;
