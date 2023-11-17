import { useState } from "react";
import { useSelector } from "react-redux";
import { useLoaderData, useParams } from "react-router-dom";
import { customFetch } from "../utils";
import { toast } from "react-toastify";
import profile from "../assets/haha.jpeg";

const AttendanceList = () => {
  const { roles, user } = useSelector((state) => state.userState);
  const isAdmin = roles.includes("ADMIN");
  const isKating = roles.includes("KATING");
  const { users: initialUsers } = useLoaderData();
  const IMG_URL = "http://localhost:8080/api/v1/image/";
  const [users, setUsers] = useState(initialUsers);
  const params = useParams();
  console.log(params);

  async function handleDelete(username) {
    try {
      const response = await customFetch.delete(
        `/activities/${params.id}/for/${username}`,
        {
          headers: {
            "X-API-TOKEN": `${user.token}`,
          },
        }
      );
      const msg = response.data.message;
      toast.success(msg || "Success delete");

      setUsers(users.filter((user) => user.username !== username));
      console.log(response);
    } catch (error) {
      const msg = error.response.data.message;
      toast.error(msg || "Something error with the operation");
      console.log(error);
    }
  }

  if (users.length === 0) {
    return (
      <div className="mt-8">
        <h1 className="text-center text-sm underline">Belum ada peserta</h1>
      </div>
    );
  }
  return (
    <div className="mt-8">
      <div className="overflow-x-auto mt-8">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="text-center">
              <th>Nama</th>
              <th>Jurusan</th>
              <th>Peran</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {users &&
              users.map((user) => {
                const { username, name, avatar, major, roles } = user;
                return (
                  <tr key={username}>
                    <td>
                      <div className="flex items-center space-x-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img
                              src={avatar ? IMG_URL + avatar : profile}
                              alt={name}
                            />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold capitalize">{name}</div>
                          <div className="text-sm opacity-50">{username}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <p className="capitalize ">{major}</p>
                    </td>
                    <td>
                      <div className="flex flex-col gap-y-1 items-center">
                        {roles.map((role) => {
                          return (
                            <span
                              key={role}
                              className="capitalize badge badge-ghost badge-sm"
                            >
                              {role}
                            </span>
                          );
                        })}
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        {(isAdmin || isKating) && (
                          <button
                            onClick={() => handleDelete(username)}
                            className="btn btn-error btn-sm"
                          >
                            hapus
                          </button>
                        )}
                      </div>
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

export default AttendanceList;
