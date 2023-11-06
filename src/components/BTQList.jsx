import { useLoaderData } from "react-router-dom";
import {
  calculateNumber,
  getFormatDate,
  getFormatDateDayAMonth,
  getFormatDateWithoutDay,
} from "../utils";

const BTQList = () => {
  const { control, pagination } = useLoaderData();

  return (
    <div className="mt-8">
      <h4 className="mb-4 capitalize text-sm sm:text-base">
        Total pelajaran : {control.length}
      </h4>
      <div className="overflow-x-auto">
        <table className="table table-xs md:table-md table-zebra">
          {/* HEAD */}
          <thead>
            <tr>
              <th>No.</th>
              <th>Pelajaran</th>
              <th>Keterangan</th>
              <th className="text-center">Hari</th>
              <th className="text-center">Tutor</th>
            </tr>
          </thead>
          <tbody>
            {control.map((activity, index) => {
              const { lesson, date, tutor, description } = activity;
              const num = index + 1;
              // const date = day(createdAt).format("hh:mm a - MMM Do, YYYY");
              return (
                <tr key={activity.id}>
                  <td>{calculateNumber(pagination.page, num)}</td>
                  <td>{lesson}</td>
                  <td>{description}</td>
                  <td className="text-center">
                    {getFormatDateDayAMonth(date)}
                    <br />
                    <span class="badge badge-ghost badge-sm">
                      {getFormatDateWithoutDay(date)}
                    </span>
                  </td>
                  <td className="text-center">{tutor}</td>
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
