import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Navigation } from "swiper/modules";
import { Trophies } from "../lib/data/data";
import { useData } from "../components/Context";
import EnergyProgress from "../components/Energy/EnergyProgress";

const Trophy = () => {
  const { league, balance } = useData();
  return (
    <div className="w-full h-full">
      <Swiper
        modules={[Navigation]}
        spaceBetween={0}
        className={"w-full h-full"}
        grabCursor={true}
        mousewheel={true}
        centeredSlides={true}
        navigation={true}
        slidesPerView={1}
        freeMode={true}
        initialSlide={league}
      >
        {Trophies?.map((item, index) => (
          <SwiperSlide
            className={`w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))]
              ${index === 0 && 'from-blue-100 from-0% to-green-500 to-80%'}
              ${index === 1 && 'from-blue-200 from-0% to-green-500 to-80%'}
              ${index === 2 && 'from-blue-300 from-0% to-green-500 to-80%'}
              ${index === 3 && 'from-blue-400 from-0% to-green-500 to-80%'}
              ${index === 4 && 'from-blue-500 from-0% to-green-500 to-80%'}
              ${index === 5 && 'from-blue-600 from-0% to-green-500 to-80%'}
              `}
            key={index}
          >
            <div className="w-full h-full flex flex-col items-center justify-around p-5">
              <div className="flex justify-center items-center flex-col gap-2">
                <h1 className="text-white font-bold text-2xl mt-5">
                  {item?.title} League
                </h1>
                <p className="text-slate-800 text-center text-sm">
                  Your number of shares determines the league you enter.
                </p>
              </div>
              <img src={item?.src} alt={item?.title} />
              {index !== league && (
                <h1 className="font-bold text-white text-2xl">
                  From {Number(item?.threshold).toLocaleString()}
                </h1>
              )}
              {index === league && (
                <div className="w-[97%]">
                  <EnergyProgress
                    energyNow={balance}
                    energyLimit={item?.threshold}
                    topNotShow={true}
                    trophy={true}
                    trophyPrice={item?.threshold}
                  />
                </div>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Trophy;
