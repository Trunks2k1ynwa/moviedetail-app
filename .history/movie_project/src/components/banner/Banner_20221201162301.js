import { Swiper, SwiperSlide } from "swiper/react";
import useSWR from "swr";
import 'swiper/css';
import { fetcher } from "../../config";
import BannerItem from "./BannerItem";
const Banner = ({ type }) => {
  const { data} = useSWR(
    `https://api.themoviedb.org/3/movie/${type}?api_key=03bd541bf2f755415dbc79580980a1ff&language=en-US&page=1`,
    fetcher
  );
  return (
    <section className="banner h-[400px] page-container overflow-hidden mb-20">
      {data && data.results && (
        <Swiper grabCursor={"true"} slidesPerView={"auto"}>
          {data.results.length > 0 &&
            data.results.map((movie) => (
              <SwiperSlide key={movie.id}>
                <BannerItem item={movie}></BannerItem>
              </SwiperSlide>
            ))}
        </Swiper>
      )}
    </section>
  );
};

export default Banner;
