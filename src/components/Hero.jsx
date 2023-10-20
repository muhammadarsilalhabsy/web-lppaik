import { Link } from "react-router-dom";
import hero1 from "../assets/hero1.jpeg";
import hero2 from "../assets/hero2.jpg";
import hero3 from "../assets/hero3.jpg";
import hero4 from "../assets/hero4.jpeg";

const carouselImageList = [hero4, hero1, hero3, hero2];
const Hero = () => {
  return (
    <div className="grid lg:grid-cols-2 gap-24 items-center">
      <div>
        <h3 className="text-lg font-bold mb-2">Tingkatkan Kemampuan</h3>

        <h1 className="font-bold text-3xl sm:text-5xl tracking-tight max-w-2xl">
          Baca Tulis Al-Quran Dengan Metode Yang Efektif Dan Efisien
        </h1>
        <p className="mt-8 leading-8 max-w-xl  sm:text-lg capitalize">
          Menjadikan Civitas Akademik Universitas Muhammadiyah Kendari Bebas
          Buta Baca Tulis Al-Qur'an, Bertakwa dan Berakhlakul Karimah.
        </p>
        <div className="mt-10">
          <Link to="/products" className="btn btn-primary">
            Lihat kegiatan
          </Link>
        </div>
      </div>
      <div className="hidden h-[28rem] lg:carousel carousel-center p-4 space-x-4 bg-neutral rounded-box">
        {carouselImageList.map((image) => {
          return (
            <div key={image} className="carousel-item">
              <img
                src={image}
                className="object-cover rounded-box h-full w-80"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Hero;
