import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const links = [
  { id: 1, url: "/", text: "branda" },
  { id: 2, url: "kegiatan", text: "kegiatan" },
  { id: 3, url: "tentang", text: "tentang" },
  { id: 4, url: "sertifikat", text: "sertifikat" },
  { id: 5, url: "pengguna", text: "pengguna" },
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
