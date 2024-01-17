import { useLoaderData, Link } from "react-router-dom";
import { getFormatDate } from "../utils";

const ActivityGrid = () => {
  const { activities } = useLoaderData();

  return (
    <div className="pt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {activities.map((activity) => {
        const { title, date, images, mandatory } = activity;
        return (
          <Link
            key={activity.id}
            to={`/activity/${activity.id}`}
            className="card w-full shadow-lg hover:shadow-2xl transition duration-300 "
          >
            <figure className="px-4 pt-4">
              <img
                src={images[0]}
                alt={title}
                className="object-cover h-64 md:h-48 w-full rounded-xl bg-base-200"
              />
            </figure>
            <div className="card-body text-center items-center ">
              <h2 className="card-title capitalize tracking-wider">{title}</h2>
              {!mandatory && (
                <span className="text-secondary">{getFormatDate(date)}</span>
              )}
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default ActivityGrid;
