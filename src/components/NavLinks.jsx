import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const links = [
  { id: 1, url: "/", text: "beranda" },
  { id: 2, url: "activity", text: "kegiatan" },
  { id: 3, url: "about", text: "tentang" },
  { id: 4, url: "certificate", text: "sertifikat" },
  { id: 5, url: "users", text: "pengguna" },
  { id: 6, url: "control-book-management", text: "buku kontrol" },
];

const NavLinks = () => {
  const roles = useSelector((state) => state.userState.roles);

  const isAdmin = roles.includes("ADMIN");
  const isTutor = roles.includes("TUTOR");
  const isDosen = roles.includes("DOSEN");

  return (
    <>
      {links.map((link) => {
        const { id, url, text } = link;

        // Tambahkan kondisi untuk selalu menampilkan tautan 1 hingga 4
        // Juga tambahkan kondisi untuk menampilkan 'control-book-management' jika pengguna adalah "TUTOR" atau "ADMIN"
        if (
          id <= 4 ||
          ((isAdmin || isTutor || isDosen) &&
            url === "control-book-management") ||
          ((isAdmin || isDosen) && url === "users")
        ) {
          return (
            <li key={id}>
              <NavLink to={url} className="capitalize">
                {text}
              </NavLink>
            </li>
          );
        } else {
          return null; // Sisanya tidak ditampilkan
        }
      })}
    </>
  );
};

export default NavLinks;
