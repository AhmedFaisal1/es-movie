'use client';
import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import CarouselItem from "@/app/components/CarouselItem";

/**
 * Swiper Styles
 */
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

/**
 * Swiper Modules
 */
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import {Navigation , EffectFade, Autoplay, Keyboard} from "swiper/modules";

/**
 * React Icons
 */
import {
  BsFillArrowRightCircleFill,
  BsFillArrowLeftCircleFill,
} from "react-icons/bs";

interface CarouselProps {
  moviesList: {
    id: number;
    backdrop_path: string;
    poster_path: string;
    title: string;
    vote_average: number;
    overview: string;
  }[];
}

const Carousel: React.FC<CarouselProps> = ({ moviesList = [] }) => {
  const swiperRef = useRef<any>(null);
  const swiperSettings = {
    modules: [Navigation, EffectFade, Autoplay, Keyboard],
    spaceBetween: 50,
    slidesPerView: 1,
    effect: "fade" as const,
    loop: true,
    speed: 500,
    centeredSlides: true,
    keyboard: true,
    autoplay: {
      delay: 3500,
    },
    onBeforeInit: (swiper: any) => {
      swiperRef.current = swiper;
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
      },
    },
  };

  return (
    <>
      <Swiper {...swiperSettings}>
        {moviesList.map((singleMovie) => (
          <SwiperSlide key={singleMovie.id}>
            <CarouselItem singleMovie={singleMovie} />
          </SwiperSlide>
        ))}
        <button
          className="swiper-button-prev after:hidden"
          onClick={() => swiperRef.current?.slidePrev()}
        >
          <span className="text-3xl text-gray-500 hover:text-gray-100">
            <BsFillArrowLeftCircleFill />
          </span>
        </button>
        <button
          className="swiper-button-next after:hidden"
          onClick={() => swiperRef.current?.slideNext()}
        >
          <span className="text-3xl text-gray-500 hover:text-gray-100">
            <BsFillArrowRightCircleFill />
          </span>
        </button>
      </Swiper>
    </>
  );
};

export default Carousel;
