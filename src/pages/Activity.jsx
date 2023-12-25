import {
  Filters,
  ActivitiesContainer,
  PaginationContainer,
  SearchOnly,
} from "../components";
import { MdOutlineAdd } from "react-icons/md";
import { Link } from "react-router-dom";
import { customFetch } from "../utils";
import { useDispatch, useSelector } from "react-redux";
import { clearImages } from "../features/activity/activitySlice";

// loader
export const loader = async ({ request }) => {
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ]);

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

// page
const Activity = () => {
  const { roles } = useSelector((state) => state.userState);
  const isAdmin = roles.includes("ADMIN");
  const dispatch = useDispatch();
  function handelRemove() {
    dispatch(clearImages());
  }
  return (
    <>
      <SearchOnly link="/activity" name="title" />
      <ActivitiesContainer />
      <PaginationContainer />
      {isAdmin && (
        <Link
          onClick={handelRemove}
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
