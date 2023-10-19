import { useEffect, useState, useRef } from "react";
import { Tabs, Empty } from "antd";
import StickyBox from "react-sticky-box";
import CommentComp from "./Comment";

import "./index.scss";

const Notification = () => {
  // 评论和@
  const [comments, seComments] = useState([]);
  // 赞和收藏
  const [like, setLike] = useState([]);
  // 新增关注
  const [concern, setConcern] = useState([]);

  const tabArr = [
    {
      label: `评论和@`,
      key: "1",
      // children: contentCopmonents(),
    },
    {
      label: `赞和收藏`,
      key: "2",
      // children: contentCopmonents(),
    },
    {
      label: `新增关注`,
      key: "3",
      // children: contentCopmonents(),
    },
  ];

  // 面板切换事件
  //请求url
  const [currentUrl, setCurrentUrl] = useState("");
  //当前选中的标签
  const [currentKey, setCurrentKey] = useState("");
  const onTabChange = (activeKey) => {
    console.log("activeKey: ", activeKey);
    setCurrentKey(activeKey);
    let url;
    switch (activeKey) {
      case "1":
        url = "http://1";
        break;
      case "2":
        url = "http://2";
        break;
      default:
        url = "http://3";
        break;
    }
    setCurrentUrl(url);
  };

  //实现实现吸顶效果
  const renderTabBar = (props, DefaultTabBar) => (
    <StickyBox
      offsetTop={-16}
      // offsetBottom={20}
      style={{
        zIndex: 99,
        width: "calc(100% + 20px)",
      }}
    >
      <DefaultTabBar {...props} className="sticky-tabs-nav" />
    </StickyBox>
  );

  return (
    <div className="notification-wrap">
      <div className="tab-wrap">
        <div className="dy-tab-wrap">
          <Tabs
            defaultActiveKey={1}
            renderTabBar={renderTabBar}
            items={tabArr}
            onChange={onTabChange}
          />
        </div>
        <CommentComp/>
      </div>
    </div>
  );
};
export default Notification;
