import { useState } from "react";
import {
  HomeOutlined,
  EditOutlined,
  BellOutlined,
  RedditOutlined
} from "@ant-design/icons";
import { Layout } from "antd";
import { useNavigate,useLocation } from'react-router-dom'

import "./index.scss";


const { Footer } = Layout;

const FooterComponent = () => {
  const navigate = useNavigate()
  
  //底部footer路由跳转
  const footerList = [
    {
      id: 1,
      component: <HomeOutlined />,
    },
    {
      id: 2,
      component: <EditOutlined />,
    },
    {
      id: 3,
      component: <BellOutlined />,
    },
    {
      id: 4,
      component: <RedditOutlined />,
    },
  ];

  // 这里是当前浏览器上的路径地址
  const location = useLocation();
  const selectedKey = location.pathname;
  const [activeNav,setActiveNav] = useState(()=>{
    let selected
    switch (selectedKey) {
      case '/':
        selected = 1
        break;
      case '/love':
        selected = 2
        break;
      case 'notification':
        selected = 3
        break;
      default:
        selected = 4
        break;
    }
    return selected;
  })
 
  const footerNavigation = (id) => {
    setActiveNav(id)
    switch (id) {
      case 1:
        navigate("/");
        break;
      case 2:
        navigate("/publish");
        break;
      case 3:
        navigate("/notification");
        break;
      default:
        navigate("/my");
        break;
    }
  };
  return (
    <Footer className="pv-footer">
      {footerList.map((item) => {
        return (
          <span
            key={item.id}
            className={activeNav===item.id? 'act':''}
            onClick={() => {
              footerNavigation(item.id);
            }}
          >
            {item.component}
          </span>
        );
      })}
    </Footer>
  );
};

export default FooterComponent;
