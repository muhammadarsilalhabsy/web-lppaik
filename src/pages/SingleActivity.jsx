import { useLoaderData, Link, useParams, useNavigate } from "react-router-dom";
import { SectionTitle, DetailActivity } from "../components";
import { customFetch } from "../utils";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

// loader
export const loader = async ({ params }) => {
  try {
    const response = await customFetch(`/activities/${params.id}`);

    return { activities: response.data.data };
  } catch (error) {
    console.log(error);
    return null;
  }
};

// component
const SingleActivity = () => {
  const { user, roles } = useSelector((state) => state.userState);

  const isAdmin = roles.includes("ADMIN");
  const { activities } = useLoaderData();
  const { id } = useParams();

  const navigate = useNavigate();

  const { title, date, images, location, description, startTime, endTime } =
    activities;

  const handelDelete = async () => {
    try {
      const response = await customFetch.delete(`/activities/${id}`, {
        headers: {
          "X-API-TOKEN": `${user.token}`,
        },
      });
      const msg = response.data.message;
      toast.success(msg || "Success delete");
      navigate("/activity");
    } catch (error) {
      console.log(error);
      const msg = null;
      toast.error(msg || "Something error with the operation");
      console.log(error);
    }
  };
  return (
    <section>
      <div className="flex items-center justify-between">
        <div className="text-sm breadcrumbs">
          <ul>
            <li>
              <Link to="/">Beranda</Link>
            </li>
            <li>
              <Link to="/activity">Kegiatan</Link>
            </li>
          </ul>
        </div>
        {isAdmin && (
          <div className="flex gap-4">
            <Link
              to={`/update-activity/${id}`}
              className="btn btn-primary btn-xs md:btn-sm"
            >
              Perbaruhi
            </Link>
            <button
              onClick={handelDelete}
              className="btn btn-error btn-xs md:btn-sm"
            >
              Hapus
            </button>
          </div>
        )}
      </div>

      <div className="mt-6 grid gap-y-8 lg:gap-x-16 lg:grid-cols-2">
        {/* IMG */}
        <img
          src={images[0]}
          alt={title}
          className="h-96 w-full object-cover rounded-lg"
        />
        {/* DEtail */}
        <div>
          <h2 className="text-2xl lg:text-3xl text-center lg:text-left font-bold mb-6">
            {title}
          </h2>
          {/* <h1 className="text-3xl font-bold capitalize">{title}</h1> */}
          <DetailActivity
            date={date}
            startTime={startTime}
            endTime={endTime}
            location={location}
          />
          <p className="mt-6 leading-8 lg:h-40 lg:overflow-auto">
            {description}
          </p>
        </div>
      </div>
    </section>
  );
};

export default SingleActivity;
