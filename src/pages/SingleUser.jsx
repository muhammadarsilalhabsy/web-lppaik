import { useState } from "react";
import {
  redirect,
  useLoaderData,
  useNavigate,
  useParams,
} from "react-router-dom";
import { customFetch } from "../utils";
import {
  FormControlBook,
  MyActivityList,
  PaginationContainer,
  PagingContainer,
  User,
  UserDetail,
} from "../components";
import { useDispatch, useSelector } from "react-redux";
import BTQList from "../components/BTQList";
import { toast } from "react-toastify";
import { removeUser, setShow } from "../features/user/userSlice";

export const action =
  (store) =>
  async ({ request, params }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    console.log(data);

    const user = store.getState().userState.user;
    console.log(user);
    try {
      const response = await customFetch.post(
        `/control-book/${params.id}`,
        data,
        {
          headers: {
            "X-API-TOKEN": user.token,
          },
        }
      );
      toast.success(response?.data?.message || "Success");
      return null;
    } catch (error) {
      console.log(error);

      toast.error(
        error.response.data.message || "Something error with your input"
      );
      if (error.response.status === 401) {
        store.dispatch(removeUser());
        return redirect("/login");
      }
      return null;
    }
  };
// loader
export const loader =
  (store) =>
  async ({ params, request }) => {
    const user = store.getState().userState.user;
    const reqParams = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);

    try {
      const [response1, response2, response3, response4] = await Promise.all([
        customFetch(`/users/${params.id}`),
        customFetch(`/users/control-book/${params.id}`, {
          params: reqParams,
          headers: {
            "X-API-TOKEN": `${user.token}`,
          },
        }),
        customFetch(`/users/activities/${params.id}`, {
          params: reqParams,
          headers: {
            "X-API-TOKEN": `${user.token}`,
          },
        }),
        customFetch(`/email/verify/${params.id}`),
      ]);

      return {
        user: response1.data.data,
        control: response2.data.data,
        pagination: response2.data.pagination,
        activities: response3.data.data,
        paging: response3.data.pagination,
        emailRes: response4.data.data,
      };
    } catch (error) {
      console.log(error);
      return null;
    }
  };

// action

// components
const SingleUser = () => {
  const { roles, show, user: access } = useSelector((state) => state.userState);
  const [isSend, setIsSend] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const params = useParams();
  const navigate = useNavigate();
  const isAdmin = roles.includes("ADMIN");
  const isTutor = roles.includes("TUTOR");
  const isDosen = roles.includes("DOSEN");

  const { user, emailRes } = useLoaderData();

  console.log(isSubmitting);
  console.log(user);
  const dispatch = useDispatch();

  function handleBtq() {
    dispatch(setShow("btq"));
    navigate(`/users/${params.id}`);
  }
  function handleActivities() {
    dispatch(setShow("kegiatan"));
    navigate(`/users/${params.id}`);
  }

  // handle function
  const handleSendEmail = async () => {
    setIsSubmitting(true);
    try {
      const response = await customFetch.post(
        `/email/verify/${params.id}`,
        null,
        {
          headers: {
            "X-API-TOKEN": `${access.token}`,
          },
        }
      );
      const msg = response.data.message;
      toast.success(msg || "Success Send Email");
      setIsSend(true);
    } catch (error) {
      console.log(error);
      const msg = error.response.data.message;
      toast.error(msg || "Something error with the operation");
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {!emailRes.id && !user.certificate && (isAdmin || isTutor) && (
        <div className="flex justify-end mb-4">
          <button
            className="btn btn-success btn-sm"
            onClick={handleSendEmail}
            disabled={isSend || isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className="loading loading-spinner"></span> sending...
              </>
            ) : (
              "Rekomendasi mampu BTQ"
            )}
          </button>
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-3 items-start">
        <User user={user} hidden={true} />
        <div className="md:col-span-2">
          <UserDetail user={user} disabled={true} />
        </div>
      </div>
      {(isAdmin || isTutor) && (
        <FormControlBook
          date={new Date().toISOString().split("T")[0]}
          btn="Tambahkan control book"
          method="POST"
        />
      )}
      {(isAdmin || isTutor || isDosen) && (
        <>
          <div className="flex items-center justify-center gap-4 mb-4 mt-8">
            <button className="btn btn-primary btn-sm" onClick={handleBtq}>
              BTQ
            </button>
            <button
              className="btn btn-primary btn-sm"
              onClick={handleActivities}
            >
              Kegiatan
            </button>
          </div>
          {show === "btq" ? (
            <>
              <BTQList />
              <PaginationContainer />
            </>
          ) : (
            <>
              <MyActivityList />
              <PagingContainer />
            </>
          )}
        </>
      )}
    </>
  );
};

export default SingleUser;
