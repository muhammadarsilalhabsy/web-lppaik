import { Outlet, useLocation, useNavigation } from "react-router-dom";
import { Header, Loading, Navbar } from "../components";
import { useSelector } from "react-redux";

const HomeLayout = () => {
  const navigation = useNavigation();
  const user = useSelector((state) => state.userState.user);

  const isLoading = navigation.state === "loading";
  return (
    <>
      {!user && <Header />}
      <Navbar />
      {isLoading ? (
        <Loading />
      ) : (
        <section className="align-element py-20">
          <Outlet />
        </section>
      )}
    </>
  );
};

export default HomeLayout;
