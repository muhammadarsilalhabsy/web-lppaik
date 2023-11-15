import { Link, useLoaderData } from "react-router-dom";
import {
  calculateNumber,
  getFormatDate,
  getFormatDateDayAMonth,
  getFormatDateWithoutDay,
} from "../utils";
import { useSelector } from "react-redux";

const BTQList = () => {
  const { control, pagination } = useLoaderData();
  const roles = useSelector((state) => state.userState.roles);

  const isAdmin = roles.includes("ADMIN");
  const isTutor = roles.includes("TUTOR");

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
              {(isAdmin || isTutor) && <th className="text-center">Aksi</th>}
            </tr>
          </thead>
          <tbody>
            {control.map((activity, index) => {
              const { lesson, date, tutor, description, id } = activity;
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
                    <span className="badge badge-ghost badge-sm">
                      {getFormatDateWithoutDay(date)}
                    </span>
                  </td>
                  <td className="text-center">{tutor}</td>
                  {(isAdmin || isTutor) && (
                    <td className="flex justify-evenly gap-2">
                      <Link
                        to={`/control-book/${id}`}
                        className="btn btn-info btn-sm"
                      >
                        edit
                      </Link>

                      <button className="btn btn-error btn-sm">hapus</button>
                    </td>
                  )}
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
