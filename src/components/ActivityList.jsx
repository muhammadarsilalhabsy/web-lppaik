import { useLoaderData } from "react-router-dom";

const ActivityList = () => {
  const { activities } = useLoaderData();

  return (
    <div className="mt-8">
      <h4 className="mb-4 capitalize text-sm sm:text-base">
        Total kegaitan : {activities.length}
      </h4>
      <div className="overflow-x-auto">
        <table className="table table-xs md:table-md table-zebra">
          {/* HEAD */}
          <thead>
            <tr>
              <th>No.</th>
              <th>Judul kegiatan</th>
              <th>Hari</th>
              <th>Absen oleh</th>
              <th>Dibuat</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity, index) => {
              const { title, day, absentBy, createdAt } = activity;
              const num = index + 1;
              // const date = day(createdAt).format("hh:mm a - MMM Do, YYYY");
              return (
                <tr key={activity.id}>
                  <td>{num}</td>
                  <td>{title}</td>
                  <td>{day}</td>
                  <td>{absentBy}</td>
                  <td>{createdAt}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ActivityList;
