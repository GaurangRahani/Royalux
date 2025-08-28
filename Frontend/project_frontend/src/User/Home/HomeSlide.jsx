import React, { useRef } from "react";
import "./HomeSlide.css";
import { Swiper, SwiperSlide } from "swiper/react";

import villa from "../../Assests/Image/Home1/ihouse.jpg";
import lux from "../../Assests/Image/Home1/luxury.avif";
import apar from "../../Assests/Image/Home1/apar.jpeg";
import aroom from "../../Assests/Image/Home1/room2.jpg";

import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export const HomeSlide = () => {
  const swiperRef = useRef(null);

  // navigation functions
  const goPrev = () => {
    if (swiperRef.current) swiperRef.current.swiper.slidePrev();
  };

  const goNext = () => {
    if (swiperRef.current) swiperRef.current.swiper.slideNext();
  };

  return (
    <>
      {/* Section Heading */}
      <div className="tw-flex tw-justify-center">
        <div className="tw-border-2 tw-border-white tw-mt-16 text-center slider-container">
          <div className="tw-flex tw-items-center tw-justify-center">
            <div
              className="lg:tw-w-[200px] tw-w-20 tw-border-b-2"
              style={{ border: "0px solid #d3a478" }}
            ></div>

            <h2 className="tw-text-lg tw-mb-3 tw-mr-8 tw-ml-8">
              FEATURED <span className="tw-font-bold">COLLECTIONS</span>
            </h2>

            <div
              className="lg:tw-w-[200px] tw-w-20 tw-border-b-2"
              style={{ border: "0px solid #d3a478" }}
            ></div>
          </div>

          <p
            className="tw-mb-10"
            style={{
              fontFamily: "Cormorant Garamond, serif",
              fontSize: "40px",
            }}
          >
            Handpicked projects for you
          </p>

          {/* Prev Button */}
          <div
            className="slider-arrow slider-prev"
            onClick={goPrev}
            style={{ color: "black" }}
          >
            <button className="tw-text-6xl tw-mt-[130px] tw-font-bold">
              <div
                id="circle"
                className="md:tw-mt-[70px] tw-flex tw-justify-center tw-items-center tw-shadow-full tw-mt-[120px] tw-ml-[-260px] md:tw-ml-[-500px]"
                style={{
                  borderRadius: "50%",
                  height: "60px",
                  width: "60px",
                  background: "white",
                  boxShadow:
                    "0 4px 6px rgba(0, 0, 0, 0.1), 0 6px 15px rgba(0, 0, 0, 0.1), 0 9px 28px rgba(0, 0, 0, 0.1)",
                  transition: "background 0.3s",
                }}
              >
                <ArrowBackIcon style={{ height: "30px", width: "30px" }} />
              </div>
            </button>
          </div>

          {/* Next Button */}
          <div
            className="slider-arrow slider-next"
            onClick={goNext}
            style={{ color: "black" }}
          >
            <button className="tw-text-6xl tw-mt-[130px] tw-font-bold">
              <div
                id="circle"
                className="md:tw-mt-[70px] tw-flex tw-justify-center tw-items-center tw-shadow-full tw-mt-[120px] tw-ml-[-320px] md:tw-ml-[-120px] tw-mr-20"
                style={{
                  borderRadius: "50%",
                  height: "60px",
                  width: "60px",
                  background: "white",
                  boxShadow:
                    "0 4px 6px rgba(0, 0, 0, 0.1), 0 6px 15px rgba(0, 0, 0, 0.1), 0 9px 28px rgba(0, 0, 0, 0.1)",
                  transition: "background 0.3s",
                }}
              >
                <ArrowForwardIcon style={{ height: "30px", width: "30px" }} />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Swiper Section */}
      <div className="tw-flex tw-place-content-center md:tw-mb-[20px] md:tw-ml-[200px] md:tw-mr-[200px] tw-p-10">
        <Swiper
          pagination
          className="demo-swiper-multiple mx-auto"
          spaceBetween={0}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
          }}
          ref={swiperRef}
        >
          {/* Slide 1 */}
          <SwiperSlide className="md:tw-me-[2px] md:tw-mb-10">
            <img
              src={villa}
              alt="Independent House"
              className="rounded-4"
              style={{ width: "330px", height: "240px", marginBottom: "10px" }}
            />
            <div>
              <h4
                className="tw-mt-[-70px] tw-text-white tw-font-bold tw-ml-[105px]"
                style={{ fontSize: "20px" }}
              >
                Independent House
              </h4>
              <p
                className="tw-text-white tw-font-medium tw-ml-[55px]"
                style={{ fontSize: "13px" }}
              >
                Comfortable homes available for immediate use
              </p>
            </div>
          </SwiperSlide>

          {/* Slide 2 */}
          <SwiperSlide className="md:tw-me-[2px]">
            <img
              src={apar}
              alt="Townships"
              className="rounded-4"
              style={{ width: "330px", height: "240px" }}
            />
            <div>
              <h4
                className="tw-mt-[-60px] tw-text-white tw-font-bold tw-ml-[135px]"
                style={{ fontSize: "20px" }}
              >
                Townships
              </h4>
              <p
                className="tw-text-white tw-font-medium tw-ml-[100px]"
                style={{ fontSize: "13px" }}
              >
                Redefining community living
              </p>
            </div>
          </SwiperSlide>

          {/* Slide 3 */}
          <SwiperSlide className="md:tw-me-[2px]">
            <img
              src={lux}
              alt="Luxury"
              className="rounded-4"
              style={{ width: "330px", height: "240px" }}
            />
            <div>
              <h4
                className="tw-mt-[-60px] tw-text-white tw-font-bold tw-ml-[155px]"
                style={{ fontSize: "20px" }}
              >
                Luxury
              </h4>
              <p
                className="tw-text-white tw-font-medium tw-ml-[57px]"
                style={{ fontSize: "13px" }}
              >
                Premium housing for the lifestyle-conscious
              </p>
            </div>
          </SwiperSlide>

          {/* Slide 4 */}
          <SwiperSlide className="md:tw-me-[2px]">
            <img
              src={aroom}
              alt="Affordable Homes"
              className="rounded-4"
              style={{ width: "330px", height: "240px" }}
            />
            <div>
              <h4
                className="tw-mt-[-60px] tw-text-white tw-font-bold tw-ml-[105px]"
                style={{ fontSize: "20px" }}
              >
                Affordable Homes
              </h4>
              <p
                className="tw-text-white tw-font-medium tw-ml-[125px]"
                style={{ fontSize: "13px" }}
              >
                Pocket-friendly homes
              </p>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </>
  );
};

export default HomeSlide;
