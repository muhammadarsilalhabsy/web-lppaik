import { NavLink } from "react-router-dom";

const links = [
  { id: 1, url: "profile", text: "Lihat profile" },
  { id: 2, url: "my-activity", text: "Kegiatan ku" },
  { id: 3, url: "control-book", text: "Buku kontrol" },
];

const UserLinks = () => {
  return (
    <>
      {links.map((link) => {
        const { id, url, text } = link;
        return (
          <li key={id}>
            <NavLink to={url}>{text}</NavLink>
          </li>
        );
      })}
    </>
  );
};

export default UserLinks;
