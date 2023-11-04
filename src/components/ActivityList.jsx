import { useLoaderData, Link } from "react-router-dom";

const ActivityList = () => {
  const { activities } = useLoaderData();
  // console.log(activities);
  return (
    <div className="pt-12 grid gap-y-8">
      {activities.map((activity) => {
        const { title, location, images, time } = activity;

        return (
          <Link
            key={activity.id}
            to={`/activity/${activity.id}`}
            className="p-8 rounded-lg flex flex-col sm:flex-row gap-y-4 flex-wrap shadow-lg hover:shadow-2xl group duration-300 "
          >
            <img
              src={images[0]}
              alt={title}
              className="object-cover h-24 w-24  sm:h-32 sm:w-32 rounded-xl group-hover:scale-105 transition duration-300"
            />

            <div className="ml-0 sm:ml-16">
              <h2 className="capitalize font-medium text-lg">{title}</h2>
              <h4 className="capitalize text-md text-neutral-content">
                {location}
              </h4>
            </div>

            <p className="font-medium text-lg ml-0 sm:ml-auto">{time}</p>
          </Link>
        );
      })}
    </div>
  );
};

export default ActivityList;
