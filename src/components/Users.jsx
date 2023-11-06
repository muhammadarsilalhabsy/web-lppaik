import React from "react";
import profile from "../assets/haha.jpeg";
import { Link, useLoaderData } from "react-router-dom";
import { useSelector } from "react-redux";
import SectionTitle from "./SectionTitle";

const Users = () => {
  const roles = useSelector((state) => state.userState.roles);

  const isAdmin = roles.includes("ADMIN");

  const { users } = useLoaderData();
  const IMG_URL = "http://localhost:8080/api/v1/image/";

  if (users.length < 1) {
    return <SectionTitle text="Kami tidak menemukan hasil penacarian anda" />;
  }

  return (
    <div className="overflow-x-auto mt-8">
      <table className="table">
        {/* head */}
        <thead>
          <tr className="text-center">
            <th>Nama</th>
            <th>Jurusan</th>
            <th>Peran</th>
            <th>Sertifikat</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {users &&
            users.map((user) => {
              const { username, name, avatar, completed, major, roles } = user;
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
                  <td className="text-center">
                    {completed ? (
                      <div className="badge badge-success">Punya</div>
                    ) : (
                      <div className="badge badge-warning">Belum</div>
                    )}
                  </td>
                  <th>
                    <div className="flex justify-evenly gap-2">
                      <Link
                        to={`/users/${username}`}
                        className="btn btn-ghost btn-sm"
                      >
                        details
                      </Link>
                      {isAdmin && (
                        <>
                          <button className="btn btn-info btn-sm">edit</button>
                          <button className="btn btn-error btn-sm">
                            hapus
                          </button>
                        </>
                      )}
                    </div>
                  </th>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
