const About = () => {
  return (
    <>
      <div className="flex flex-wrap gap-2 sm:gap-x-6 items-center justify-center">
        <h1 className="text-4xl sm:text-6xl font-bold leading-none -tracking-tight">
          Apa itu
        </h1>
        <div className="stats bg-primary shadow">
          <div className="stat">
            <div className="stat-title text-primary-content text-4xl font-bold tracking-widest">
              LPPAIK
            </div>
          </div>
        </div>
      </div>
      <p className="mt-6 text-lg leading-8 max-w-2xl mx-auto">
        LPPAIK Universitas Muhammadiyah Kendari adalah lembaga yang berdedikasi
        tinggi dalam mewujudkan visi luhurnya, yaitu menjadikan civitas akademik
        Universitas Muhammadiyah Kendari sebagai komunitas yang bebas buta Baca
        Tulis Al-Qur'an (BTQ), bertakwa, dan berakhlakul karima.
      </p>
    </>
  );
};

export default About;
