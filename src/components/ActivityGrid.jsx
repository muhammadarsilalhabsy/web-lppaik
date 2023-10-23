import { useLoaderData, Link } from "react-router-dom";

const ActivityGrid = () => {
  const { activities } = useLoaderData();
  // console.log(activities);
  return (
    <div className="pt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {activities.map((activity) => {
        const { title, time, image } = activity;
        return (
          <Link
            key={activity.id}
            to={`/activity/${activity.id}`}
            className="card w-full shadow-lg hover:shadow-2xl transition duration-300 "
          >
            <figure className="px-4 pt-4">
              <img
                src={image}
                alt={title}
                className="object-cover h-64 md:h-48 w-full rounded-xl"
              />
            </figure>
            <div className="card-body text-center items-center ">
              <h2 className="card-title capitalize tracking-wider">{title}</h2>
              <span className="text-secondary">{time}</span>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default ActivityGrid;
