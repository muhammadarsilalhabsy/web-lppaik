import { useLoaderData } from "react-router-dom";

const BTQList = () => {
  const { activities } = useLoaderData();

  return (
    <div className="mt-8">
      <h4 className="mb-4 capitalize text-sm sm:text-base">
        Total pelajaran : {activities.length}
      </h4>
      <div className="overflow-x-auto">
        <table className="table table-xs md:table-md table-zebra">
          {/* HEAD */}
          <thead>
            <tr>
              <th>No.</th>
              <th>Pelajaran</th>
              <th>Keterangan</th>
              <th>Hari</th>
              <th>Tutor</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity, index) => {
              const { lesson, day, tutor, detail } = activity;
              const num = index + 1;
              // const date = day(createdAt).format("hh:mm a - MMM Do, YYYY");
              return (
                <tr key={activity.id}>
                  <td>{num}</td>
                  <td>{lesson}</td>
                  <td>{detail}</td>
                  <td>{day}</td>
                  <td>{tutor}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BTQList;
