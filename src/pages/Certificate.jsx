import { useLoaderData } from "react-router-dom";
import { Avatar, SearchOnly } from "../components";
import { customFetch } from "../utils";
// loader
export const loader = async ({ request }) => {
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ]);

  try {
    const response = await customFetch(`/certificate`, { params });

    return { user: response.data.data.user };
  } catch (error) {
    console.log(error);
    return null;
  }
};
const Certificate = () => {
  const loaderData = useLoaderData(); // <- bagai mana cara menghandel error apabila usernaya null

  if (loaderData === null || typeof loaderData !== "object") {
    // Handle jika loaderData adalah null atau bukan objek
    return (
      <div>
        <SearchOnly name="id" link="/certificate" />
        <h1>
          Laporkan jika nomor certificate tidak sesuai dengan nama pemiliknya
        </h1>
      </div>
    );
  }

  const { user } = loaderData;

  if (!user) {
    // Handle jika user adalah null
    return (
      <div>
        <SearchOnly name="id" link="/certificate" />
        <h1>Certifikat tidak ditemukan</h1>
      </div>
    );
  }

  return (
    <>
      <SearchOnly name="id" link="/certificate" />
      <div className="mt-8">
        <Avatar user={user} className="shadow-lg" />
        <div className="mt-4 w-full bg-accent text-center p-8 rounded-lg c capitalize font-bold text-2xl text-accent-content">
          Dinyatakan telah mampu baca tulis Al-Qur'an
        </div>
      </div>
    </>
  );
};

export default Certificate;
