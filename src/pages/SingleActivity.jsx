import { useLoaderData, Link, useParams } from "react-router-dom";
import { SectionTitle, DetailActivity } from "../components";
import { customFetch } from "../utils";

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
  const { activities } = useLoaderData();
  const { id } = useParams();
  const role = true;

  const { title, date, images, location, description, startTime, endTime } =
    activities;

  const handelDelete = () => {
    console.log("hapus activity id " + id);
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
        {role && (
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

      {/* PRODUCT */}
      <div className="mt-6 grid gap-y-8 lg:gap-x-16 lg:grid-cols-2">
        {/* IMG */}
        <img
          src={images[0]}
          alt={title}
          className="h-96 w-full object-cover rounded-lg"
        />
        {/* DEtail */}
        <div>
          <SectionTitle text={title} size="text-3xl" />
          {/* <h1 className="text-3xl font-bold capitalize">{title}</h1> */}
          <DetailActivity
            date={date}
            startTime={startTime}
            endTime={endTime}
            location={location}
          />
          <p className="mt-6 leading-8">{description}</p>
        </div>
      </div>
    </section>
  );
};

export default SingleActivity;
