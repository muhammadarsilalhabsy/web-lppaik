import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-neutral py-2 text-neutral-content">
      <div className="align-element flex justify-center sm:justify-end">
        <div className="flex justify-center items-center">
          <Link to="/login" className="text-xs sm:text-sm link link-hover">
            Masuk
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
