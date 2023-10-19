import { useEffect, useState, useRef } from "react";
import "./index.scss";
import mockList from "./mockCardList";
import cloneDeep from "lodash/cloneDeep";
import MenuSlider from "./MenuSlider";
import MasonryInfiniteGridCard from './MasonryInfiniteGridCard'
import FloatButtonComponent from './FloatButton'

import { MasonryInfiniteGrid } from "@egjs/react-infinitegrid";
import {
  HeartOutlined,
} from "@ant-design/icons";

const navItems = [
  {
    name: "推荐",
    search: "1",
  },
  {
    name: "穿搭",
    search: "2",
  },
  {
    name: "美食",
    search: "3",
  },
  {
    name: "推荐2",
    search: "4",
  },
  {
    name: "穿搭2",
    search: "5",
  },
  {
    name: "美食2",
    search: "6",
  },
];

const Home = () => {

  //标签选中tab
  let [navSelect, setNavSelect] = useState(1);
  const handleClickNav = (index) => {
    setNavSelect(index);
  };

  // 滑动加载更多(首页卡片)
  const [loading, setLoading] = useState(false);
  const [cartList, setCartList] = useState([]);
  const loadMoreData = async (e) => {
    if (loading) {
      return;
    }

    setLoading(true);
    // 模拟加载更所数据
    new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, 1000);
    }).then((res) => {
      //创建虚拟列表必备
      const count = 10;
      let nextGroupKey;
      // console.log('e',e)
      if (e) {
        nextGroupKey = (+e.groupKey || 0) + 1;
      } else {
        nextGroupKey = 1;
      }
      // console.log('nextGroupKey: ', nextGroupKey);
      e.wait();
      e.currentTarget.appendPlaceholders(5, nextGroupKey);
      const nextKey = nextGroupKey * count;
      // console.log('nextKey: ', nextKey);

      let tempDadta = mockList.map((item, index) => {
        item.groupKey = nextGroupKey;
        item.key = nextKey + index;
        return item;
      });
      tempDadta = cloneDeep(tempDadta);
      setTimeout(() => {
        e.ready();
        setCartList([...cartList, ...tempDadta]);
        setLoading(false);
      }, 1000);
    });
  };

  //刷新
  const reloadData = () => {
    setCartList([])
  }



  return (
    <div className="pv-home" id="scrollableDivaa">
      <div className="nav">
        <MenuSlider
          navItems={navItems}
          navSelect={navSelect}
          handleClickNav={handleClickNav}
        />
      </div>
      <MasonryInfiniteGridCard loadMoreData={loadMoreData} cartList={cartList} reloadData={reloadData} scrollContainer=".cardcontent"/>
      <FloatButtonComponent classNameContainer="cardcontent" reloadData={reloadData} />
    </div>
  );
};

export default Home;
