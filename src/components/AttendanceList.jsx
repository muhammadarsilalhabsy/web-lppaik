import { useState } from "react";
import { useSelector } from "react-redux";
import { useLoaderData, useParams } from "react-router-dom";
import { customFetch } from "../utils";
import { toast } from "react-toastify";
import profile from "../assets/haha.jpeg";

const AttendanceList = () => {
  const { roles, user } = useSelector((state) => state.userState);
  const params = useParams();
  const IMG_URL = "http://localhost:8080/api/v1/image/";
  const isAdmin = roles.includes("ADMIN");
  const isKating = roles.includes("KATING");

  // loader
  const { users: initialUsers, userRegisters: initialUserRegister } =
    useLoaderData();
  const [userRegisters, setUserRegisters] = useState(initialUserRegister);
  const [users, setUsers] = useState(initialUsers);

  // handel function
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

  async function handleAbsent(username, regId) {
    try {
      const response = await customFetch.post(
        `/activities/${params.id}/for/${username}/with-register/${regId}`,
        null,
        {
          headers: {
            "X-API-TOKEN": `${user.token}`,
          },
        }
      );

      const msg = response.data.message;
      toast.success(msg || "Success added");

      setUserRegisters((prevUserRegisters) =>
        prevUserRegisters.filter((user) => user.username !== username)
      );

      const absentUser = userRegisters.find(
        (user) => user.username === username
      );

      setUsers((prevUsers) => [...prevUsers, absentUser]);
    } catch (error) {
      const msg = error.response.data.message;
      toast.error(msg || "Something error with the operation");
      console.log(error);
    }
  }

  async function handleDeleteRegister(username, regId) {
    try {
      const response = await customFetch.delete(
        `/activities/${regId}/register`,

        {
          headers: {
            "X-API-TOKEN": `${user.token}`,
          },
        }
      );
      const msg = response.data.message;
      toast.success(msg || "Success delete");
      setUserRegisters(
        userRegisters.filter((user) => user.username !== username)
      );
    } catch (error) {
      const msg = error.response.data.message;
      toast.error(msg || "Something error with the operation");
      console.log(error);
    }
  }

  return (
    <div
      className={`mt-6 ${
        (isAdmin || isKating) &&
        userRegisters.length !== 0 &&
        "grid gap-y-8 lg:gap-x-16 lg:grid-cols-2"
      }`}
    >
      {/* LIST USERS REGISTERS */}

      {(isAdmin || isKating) && userRegisters.length !== 0 && (
        <div className="overflow-x-auto mt-8">
          <table className="table">
            <thead>
              <tr className="text-center">
                <th>Nama</th>
                <th>Jurusan</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {userRegisters &&
                userRegisters.map((user) => {
                  const { username, name, avatar, major, regId } = user;
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
                        <div className="flex justify-evenly gap-2">
                          <button
                            onClick={() => handleAbsent(username, regId)}
                            className="btn btn-success btn-sm"
                          >
                            Hadir
                          </button>
                          <button
                            onClick={() =>
                              handleDeleteRegister(username, regId)
                            }
                            className="btn btn-error btn-sm"
                          >
                            remove
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      )}

      {/* LIST ATTENDANCE */}
      {users.length !== 0 ? (
        <div className="overflow-x-auto mt-8">
          <table className="table">
            <thead>
              <tr className="text-center">
                <th>Nama</th>
                <th>Jurusan</th>
                {(isAdmin || isKating) && <th>Aksi</th>}
              </tr>
            </thead>
            <tbody>
              {users &&
                users.map((user) => {
                  const { username, name, avatar, major } = user;
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
                        <p className="capitalize text-center">{major}</p>
                      </td>
                      <td>
                        <div className="flex items-center justify-center">
                          {(isAdmin || isKating) && (
                            <button
                              onClick={() => handleDelete(username)}
                              className="btn btn-error btn-sm"
                            >
                              remove
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
      ) : (
        <div className="mt-8">
          <h1 className="text-center text-sm underline">Belum ada peserta</h1>
        </div>
      )}
    </div>
  );
};

export default AttendanceList;
