import { RightCircleOutlined, LeftCircleOutlined } from "@ant-design/icons";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import ReactPlayer from "react-player";
import { Image } from "antd";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./index.scss";

function SimpleSlider(props) {
  return (
    <div className="left-swiper">
      <Swiper
        modules={[Navigation, Pagination]}
        // navigation={{
        //   nextEl: ".swiper-button-next",
        //   prevEl: ".swiper-button-prev",
        // }}
        navigation
        pagination={{ clickable: true }}
        spaceBetween={50}
        slidesPerView={1}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
      >
        {/* 轮播图 */}
        {props.imgs.map((item, index) => {
          return (
            // <Image.PreviewGroup
            //   key={"swiper" + index}
            // // preview={{
            // //   rootClassName:"imgs-preview"
            // // } }
            //   items={props.imgs}
            // >
              <SwiperSlide key={"swiper" + index}>
                <Image
                  className="left-img"
                  rootClassName="swiper-img-preview"
                  // width={200}
                  src={item}
                />

                {/* <img className="left-img" src={item} alt="图片" /> */}
              </SwiperSlide>
            // </Image.PreviewGroup>
          );
        })}

        {/* 视频播放 */}
        {/* <SwiperSlide className="video-player">
          <ReactPlayer
            url="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
            controls
          />
        </SwiperSlide> */}

        {/* <LeftCircleOutlined className="swiper-button-prev" />
        <RightCircleOutlined className="swiper-button-next" /> */}
      </Swiper>
    </div>
  );
}
export default SimpleSlider;
