import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-neutral py-2 text-neutral-content">
      <div className="align-element flex justify-center sm:justify-end">
        <div className="flex gap-x-6 justify-center items-center">
          <Link to="/login" className="text-xs sm:text-sm link link-hover">
            Masuk
          </Link>
          <Link to="/register" className="text-xs sm:text-sm link link-hover">
            Buat akun
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
