import {
  useLoaderData,
  Link,
  useParams,
  useNavigate,
  redirect,
} from "react-router-dom";
import {
  DetailActivity,
  AttendanceList,
  SearchOnly,
  Search,
} from "../components";
import { customFetch } from "../utils";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { removeUser } from "../features/user/userSlice";

// loader
export const loader =
  (store) =>
  async ({ params }) => {
    const user = store.getState().userState.user;

    try {
      if (user) {
        const responses = await Promise.allSettled([
          customFetch(`/activities/${params.id}`),
          customFetch(`/activities/${params.id}/attendance`, {
            headers: {
              "X-API-TOKEN": user.token,
            },
          }),
          customFetch(`/activities/${params.id}/register/users`, {
            headers: {
              "X-API-TOKEN": user.token,
            },
          }),
        ]);

        const successfulResponses = responses
          .filter((result) => result.status === "fulfilled")
          .map((result) => result.value.data.data);

        const activities = successfulResponses[0];
        const users = successfulResponses[1];
        const userRegisters = successfulResponses[2];
        const isRegister = successfulResponses[3];

        return { activities, users, userRegisters, isRegister };
      } else {
        const response = await customFetch(`/activities/${params.id}`);

        return {
          activities: response.data.data,
          users: undefined,
          userRegisters: undefined,
          isRegister: undefined,
        };
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  };

// action
export const action =
  (store) =>
  async ({ request, params }) => {
    const formData = await request.formData();
    const { username } = Object.fromEntries(formData);

    const user = store.getState().userState.user;

    try {
      const response = await customFetch.post(
        `/activities/${params.id}/for/${username}`,
        null,
        {
          headers: {
            "X-API-TOKEN": user.token,
          },
        }
      );
      console.log(response);
      toast.success(response?.data?.message || "Success");
      return null;
    } catch (error) {
      const msg = error.response.data.message;

      toast.error(msg || "Something error with your input");
      console.log(error.response.status);
      if (error.response.status === 401) {
        store.dispatch(removeUser());
        return redirect("/login");
      }
      return null;
    }
  };
// component
const SingleActivity = () => {
  const { user, roles } = useSelector((state) => state.userState);
  const { id } = useParams();
  const [isRegister, setIsRegister] = useState(false);

  const isAdmin = roles.includes("ADMIN");
  const { activities, users, userRegisters } = useLoaderData();

  const navigate = useNavigate();

  const {
    title,
    date,
    images,
    location,
    description,
    startTime,
    endTime,
    link,
    mandatory,
  } = activities;

  // Konversi string startTime menjadi objek Date
  const activityStartTime = new Date(date + " " + startTime);

  const isDateExpired = new Date() > activityStartTime;

  // Fungsi untuk mengecek apakah waktu sekarang lebih kecil dari startTime
  const isRegistrationAllowed = isRegister || isDateExpired;

  // handle function
  const handleRegister = async () => {
    try {
      const response = await customFetch.post(
        `/activities/${id}/register`,
        null,
        {
          headers: {
            "X-API-TOKEN": `${user.token}`,
          },
        }
      );
      const msg = response.data.message;
      toast.success(msg || "Success register");
      setIsRegister(true);
    } catch (error) {
      console.log(error);
      const msg = error.response.data.message;
      toast.error(msg || "Something error with the operation");
      console.log(error);
    }
  };

  const handelDelete = async () => {
    try {
      const response = await customFetch.delete(`/activities/${id}`, {
        headers: {
          "X-API-TOKEN": `${user.token}`,
        },
      });
      const msg = response.data.message;
      toast.success(msg || "Success delete");
      navigate("/activity");
    } catch (error) {
      console.log(error);
      const msg = null;
      toast.error(msg || "Something error with the operation");
      console.log(error);
    }
  };

  useEffect(() => {
    try {
      const fetchIsRegister = async () => {
        const response = await customFetch(`/activities/${id}/register`, {
          headers: {
            "X-API-TOKEN": user.token,
          },
        });
        setIsRegister(response.data.data);
      };
      fetchIsRegister();
    } catch (error) {
      console.log(error);
    }
  }, [isRegister]);

  return (
    <section>
      <div className="flex items-center justify-between">
        <div className="text-sm breadcrumbs">
          <ul>
            <li>
              <Link to="/">Beranda</Link>
            </li>
            <li>
              <Link to="/activity">Kegiatan</Link>
            </li>
          </ul>
        </div>
        {isAdmin && (
          <div className="flex gap-4">
            <Link
              to={`/update-activity/${id}`}
              className="btn btn-primary btn-xs md:btn-sm"
            >
              Perbaruhi
            </Link>
            <button
              onClick={handelDelete}
              className="btn btn-error btn-xs md:btn-sm"
            >
              Hapus
            </button>
          </div>
        )}
      </div>

      {/* isi */}
      <div className="mt-6 grid gap-y-8 lg:gap-x-16 lg:grid-cols-2">
        {/* IMG */}
        <img
          src={images[0]}
          alt={title}
          className="h-96 w-full object-cover rounded-lg bg-base-200"
        />
        {/* Detail */}
        <div>
          <h2 className="text-2xl lg:text-3xl text-center lg:text-left font-bold mb-6">
            {title}
          </h2>

          <DetailActivity
            date={date}
            startTime={startTime}
            endTime={endTime}
            location={location}
            link={link}
            mandatory={mandatory}
          />
          <p className="mt-6 leading-8 lg:h-40 lg:overflow-auto">
            {description}
          </p>
        </div>
      </div>

      {user && !mandatory && (
        <div className="mt-8">
          {isAdmin && (
            <div className="lg:w-1/2 md:w-3/5 w-full mx-auto mb-8">
              <Search name="username" find="Tambah" label="ID" />
            </div>
          )}
          <div className="flex items-center justify-center">
            <button
              className="btn btn-primary btn-sm"
              disabled={isRegistrationAllowed}
              onClick={handleRegister}
            >
              Registrasi
            </button>
          </div>
        </div>
      )}
      {!mandatory && (users || userRegisters) && (
        <AttendanceList expired={isDateExpired} />
      )}
    </section>
  );
};

export default SingleActivity;
