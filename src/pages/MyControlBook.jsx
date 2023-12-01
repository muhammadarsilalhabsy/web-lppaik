import { PaginationContainer, SectionTitle } from "../components";
import BTQList from "../components/BTQList";
import { redirect, useLoaderData } from "react-router-dom";
import { customFetch } from "../utils";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useState } from "react";

// loader
export const loader =
  (store) =>
  async ({ request }) => {
    const user = store.getState().userState.user;
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);

    if (!user) {
      toast.warn("You must be logged in to checkout!");
      return redirect("/login");
    }
    console.log(params);

    try {
      const response = await customFetch("users/control-book", {
        params,
        headers: {
          "X-API-TOKEN": user.token,
        },
      });
      console.log(response);
      return {
        control: response.data.data,
        pagination: response.data.pagination,
      };
    } catch (error) {
      console.log(error);
      return null;
    }
  };

// components
const MyControlBook = () => {
  const { completed, certificate, token } = useSelector(
    (state) => state.userState.user
  );
  const { control } = useLoaderData();

  const handleDownloadCBD = async () => {
    try {
      const response = await customFetch("/control-book/download", {
        responseType: "blob",
        headers: {
          "X-API-TOKEN": token,
        },
      });

      const blob = new Blob([response.data], { type: "application/pdf" });

      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "laporan-btq.pdf";

      document.body.appendChild(a);
      a.click();

      document.body.removeChild(a);
    } catch (error) {
      console.log(error);
    }
  };
  const handleDownload = async () => {
    try {
      const response = await customFetch("/certificate/download", {
        responseType: "blob",
        headers: {
          "X-API-TOKEN": token,
        },
      });

      const blob = new Blob([response.data], { type: "application/pdf" });

      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "sertifikat.pdf";

      document.body.appendChild(a);
      a.click();

      document.body.removeChild(a);
    } catch (error) {
      console.log(error);
    }
  };

  if (control.length < 1) {
    return (
      <SectionTitle text="Belum mengikuti program Baca Tulis Al-Qur'an satupun!" />
    );
  }

  return (
    <>
      <SectionTitle text="Laporan Baca Tulis Al-Qur'an" />

      <div className="flex gap-4 items-center justify-end mt-4">
        {completed && certificate && (
          <button onClick={handleDownload} className="btn btn-primary btn-sm">
            Print sertifikat
          </button>
        )}
        {control.length >= 1 && (
          <button
            onClick={handleDownloadCBD}
            className="btn btn-primary btn-sm"
          >
            Print kontrol book
          </button>
        )}
      </div>

      <BTQList />
      <PaginationContainer />
    </>
  );
};

export default MyControlBook;
