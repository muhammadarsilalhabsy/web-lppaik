import React, { useEffect, useState } from "react";
import profile from "../assets/haha.jpeg";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import SectionTitle from "./SectionTitle";
import { customFetch, getImage } from "../utils";
import { toast } from "react-toastify";

const Users = () => {
  const { roles, user } = useSelector((state) => state.userState);
  const isAdmin = roles.includes("ADMIN");
  const { users: initialUsers } = useLoaderData();
  const [users, setUsers] = useState(initialUsers);
  const [userImages, setUserImages] = useState({});
  const navigate = useNavigate();
  // getImage
  async function getAvatar(avatar) {
    try {
      const response = await getImage(avatar);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  if (users.length < 1) {
    return <SectionTitle text="Kami tidak menemukan hasil pencarian anda" />;
  }

  useEffect(() => {
    const fetchUserImages = async () => {
      const images = {};

      for (const person of users) {
        const { avatar, username } = person;
        if (avatar) {
          try {
            const imageUrl = await getAvatar(avatar);
            images[username] = imageUrl;
          } catch (error) {
            console.log(
              `Error fetching avatar for ${username}: ${error.message}`
            );
          }
        }
      }
      setUserImages(images);
    };

    fetchUserImages();
  }, []);

  async function handleDelete(username) {
    try {
      const response = await customFetch.delete(`/users/${username}`, {
        headers: {
          "X-API-TOKEN": `${user.token}`,
        },
      });
      const msg = response.data.message;
      toast.success(msg || "Success delete");

      setUsers(users.filter((user) => user.username !== username));
      navigate("/users");
      console.log(response);
    } catch (error) {
      const msg = error.response.data.message;
      toast.error(msg || "Something error with the operation");
      console.log(error);
    }
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
                            src={userImages[username] || profile}
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
                  <td>
                    <div className="flex justify-evenly gap-2">
                      <Link
                        to={`/users/${username}`}
                        className="btn btn-ghost btn-sm"
                      >
                        details
                      </Link>
                      {isAdmin && (
                        <>
                          <Link
                            to={`edit/${username}`}
                            className="btn btn-info btn-sm"
                          >
                            edit
                          </Link>

                          <button
                            onClick={() => handleDelete(username)}
                            className="btn btn-error btn-sm"
                          >
                            hapus
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
