import { useLoaderData } from "react-router-dom";
import {
  calculateNumber,
  getFormatDateDayAMonth,
  getFormatDateWithoutDay,
} from "../utils";

const MyActivityList = () => {
  const { activities, paging } = useLoaderData();

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
              <th className="text-center">Hari</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity, index) => {
              const { title, date } = activity;
              const num = index + 1;

              return (
                <tr key={activity.id}>
                  <td>{calculateNumber(paging.page, num)}</td>
                  <td>{title}</td>
                  <td className="text-center">
                    {getFormatDateDayAMonth(date)}
                    <br />
                    <span class="badge badge-ghost badge-sm">
                      {getFormatDateWithoutDay(date)}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyActivityList;
