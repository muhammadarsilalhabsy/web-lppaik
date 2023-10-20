import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const links = [
  { id: 1, url: "/", text: "beranda" },
  { id: 2, url: "activity", text: "kegiatan" },
  { id: 3, url: "about", text: "tentang" },
  { id: 4, url: "certificate", text: "sertifikat" },
  { id: 5, url: "user-management", text: "pengguna" },
];

const NavLinks = () => {
  return (
    <>
      {links.map((link) => {
        const { id, url, text } = link;

        return (
          <li key={id}>
            <NavLink to={url} className="capitalize">
              {text}
            </NavLink>
          </li>
        );
      })}
    </>
  );
};

export default NavLinks;
