"use client";
import { useState } from "react";
import { Layout } from "@/_components/shared/ui/layout";
import Image from "next/image";
import { convertHttpToHttps } from "@/_helpers/convertHttpToHttps";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from "swiper/react";

const DisplayPost = ({ media_url, id, media_type }) => {
  switch (media_type) {
    case "CAROUSEL_ALBUM":
    case "IMAGE": {
      return (
        <Image
          src={convertHttpToHttps(media_url ?? "")}
          alt={`Alesari Instagram post`}
          key={`post-${id}`}
          width={0}
          height={500}
          sizes={`100vw`}
          quality={100}
          className={`aspect-square h-[360px] w-full object-cover transition-all duration-500 hover:scale-110 hover:opacity-80`}
        />
      );
    }

    case "VIDEO": {
      return (
        <>
          <video
            key={`post-${id}`}
            className={`aspect-square h-[360px] w-full object-cover transition-all duration-500 hover:scale-110 hover:opacity-80`}
            autoPlay
            loop
            muted
            playsInline
            controls={false}
          >
            <source src={convertHttpToHttps(media_url)} type="video/mp4" />
            <source
              src={convertHttpToHttps(media_url.replace(".mp4", ".webm"))}
              type="video/webm"
            />
            Your browser does not support the video tag.
          </video>
        </>
      );
    }
    default:
      break;
  }
};

export const InstagramPosts = () => {
  const { data: posts } = useQuery({
    queryKey: ["instagram-posts"],
    queryFn: async () => {
      return await fetch("/api/instagram").then((res) => res.json());
    },
  });

  const [swiper, setSwiper] = useState(null);

  const handleNext = (swiper) => {
    if (swiper) {
      swiper.slideNext();
    }
  };

  const handlePrev = (swiper) => {
    if (swiper) {
      swiper.slidePrev();
    }
  };

  if (posts) {
    const { data } = posts;

    return (
      <Layout>
        <div className={``}>
          <h2 className={`mx-auto mb-5 text-center font-sans text-[2rem]`}>
            Alesari daily
          </h2>
          <div className="relative">
            <div
              tabIndex={0}
              onClick={() => handlePrev(swiper)}
              className={`absolute inset-0 -left-[1.65rem] -top-[3.438rem] z-[5] my-auto h-fit w-fit cursor-pointer rounded-full bg-[#bbbbbb7a] px-[1.55rem] py-[1.075rem] focus:outline-0 focus:ring-2 focus:ring-primary max-sm:hidden`}
            >
              <Image
                src={`/icons/chevron.png`}
                alt={`Alesari recommended`}
                className={`select-none`}
                width={12}
                height={20}
              />
            </div>
            <Swiper
              rewind
              onInit={(swiper) => setSwiper(swiper)}
              spaceBetween={20}
              slidesPerView={1.3}
              breakpoints={{
                640: {
                  slidesPerView: 2.3,
                },
                768: {
                  slidesPerView: 3.3,
                },
                1280: {
                  slidesPerView: 4,
                },
              }}
            >
              {(data ?? [])
                ?.slice(0, 7)
                ?.map(({ caption, id, media_url, permalink, media_type }) => {
                  return (
                    <SwiperSlide
                      key={`post-${id}`}
                      className={`!h-auto overflow-hidden `}
                    >
                      <Link
                        href={`${permalink}`}
                        target={`_blank`}
                        className={`w-full overflow-hidden `}
                      >
                        <div
                          className={`group relative flex flex-col gap-3 overflow-hidden`}
                        >
                          <DisplayPost
                            media_type={media_type}
                            id={id}
                            media_url={media_url}
                          />
                        </div>
                        {caption && (
                          <p
                            className={`mt-3.5 line-clamp-2 pb-1 pt-0 font-sans font-bold`}
                          >
                            {caption}
                          </p>
                        )}
                      </Link>
                    </SwiperSlide>
                  );
                })}
            </Swiper>
            <div
              tabIndex={0}
              onClick={() => handleNext(swiper)}
              className={`absolute inset-0 -right-[1.65rem] -top-[3.438rem] z-[5] my-auto ml-auto h-fit w-fit cursor-pointer rounded-full border border-transparent bg-[#bbbbbb7a] px-[1.55rem] py-[1.075rem] focus:outline-0 focus:ring-2 focus:ring-primary max-sm:hidden`}
            >
              <Image
                src={`/icons/chevron.png`}
                alt={`Alesari recommended`}
                width={12}
                height={20}
                className={`rotate-180 select-none`}
              />
            </div>
          </div>
        </div>
      </Layout>
    );
  }
};
