// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "./index.scss";

const MenuSlider = (props) => {
  let { navItems, navSelect, handleClickNav } = props;

  return (
    <Swiper
      className="menu-slider"
      // spaceBetween={50}
      slidesPerView={"auto"}
      // onSlideChange={() => console.log("slide change")}
      // onSwiper={(swiper) => console.log(swiper)}
    >
      {navItems.map((navItem, index) => {
        return (
          <SwiperSlide key={"nav" + index}>
            <div
              className={index === navSelect ? "nav-item active" : "nav-item "}
              onClick={() => handleClickNav(index)}
            >
              {navItem.name}
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};
export default MenuSlider;
