import {
  Layout,
  Menu,
  Dropdown,
  Input,
  Space,
  Switch,
  AutoComplete
} from "antd";
import {
  HomeOutlined,
  EditOutlined,
  MenuOutlined,
  RedditOutlined,
  EllipsisOutlined,
  BellOutlined,
  SearchOutlined
} from "@ant-design/icons";
import "./index.scss";
import { Outlet, Link, useLocation, useNavigate,NavLink  } from "react-router-dom";
import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "@/store";
import LoginModal from "../LoginModal";
import FooterComp from '@/components/Footer'


const { Search } = Input;

const { Header, Sider, Footer } = Layout;
const items = [
  {
    key: "1",
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.antgroup.com"
      >
        1st menu item
      </a>
    ),
  },
  {
    key: "2",
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.aliyun.com"
      >
        2nd menu item
      </a>
    ),
    // disabled: true,
  },
];


const GeekLayout = () => {
  const { userStore, loginStore, channelStore } = useStore();
  // 获取用户数据
  // 初始化的时候只执行一次
  useEffect(() => {
    try {
      userStore.getUserInfo();
      channelStore.loadChannelList();
    } catch {}
  }, [userStore, channelStore]); //userStore不是响应式数据，仅仅是为了解决报错警告问题

  const location = useLocation();
  // 这里是当前浏览器上的路径地址
  const selectedKey = location.pathname;

  const navigate = useNavigate();
  const onLogout = () => {
    loginStore.loginOut();
    navigate("/login");
  };

  //头部搜索框
  const [options, setOptions] = useState([]);
  const [searchTxt, setSearchTxt] = useState('');
  const mockVal = (str, repeat = 1) => ({
    value: str.repeat(repeat),
  });
  const getPanelValue = (searchText) =>
  !searchText ? [] : [mockVal(searchText), mockVal(searchText, 2), mockVal(searchText, 3)];
  const onSearch = (text) => {
    setSearchTxt(text)
    setOptions(getPanelValue(text))
  };
  const onSelect = (value) => console.log(value);
  const searchFn = () => console.log(searchTxt);


  //侧边栏更多按钮
  // 小屏
  let [moreOpenMin,setMoreOpenMin] = useState(false)
  const handleMenuClickMin = (e) => {
    if (e.key !== '2-1') {
      setMoreOpenMin(false);
    }
  };
  const handleOpenChangeMin = (flag) => {
    setMoreOpenMin(flag);
  };
  //大屏
  let [moreOpen,setMoreOpen] = useState(false)
  const handleMenuClick = (e) => {
    if (e.key !== '2-1') {
      setMoreOpen(false);
    }
  };
  const handleOpenChange = (flag) => {
    setMoreOpen(flag);
  };
  const toggleTheme = (cheched) => {
    console.log('cheched: ', cheched);
    // true 白色主题   false 暗黑
    let root = document.documentElement
    if(cheched){
      root.className = "theme-white"
    }else{
      root.className = "theme-black"
    }
  }
  const menuItems = [
    {
      key: "1",
      type: "group",
      label: "访问方式",
      children: [
        {
          key: "1-1",
          label: "添加到小红书桌面",
        },
      ],
    },
    {
      type: "divider",
    },
    {
      key: "2",
      type: "group",
      label: "显示设置",
      children: [
        {
          key: "2-1",
          label: (
            <div className="theme-color">
              <span>深色模式</span>
              <div className="theme-icon">
                <Switch checkedChildren="白色" unCheckedChildren="暗黑" defaultChecked onClick={toggleTheme} />
              </div>
            </div>
          ),
        },
      ],
    },
  ];

  //登录框状态
let [modalShow,setModalShow] = useState(false)
const loginModalShow = ()=> {
  setModalShow(true)
}
//退出登录
const logoutItem = [
  {
    key: "1",
    label: (
      <a
        target="_self"
        rel="noopener noreferrer"
        href="###"
        onClick={(e) => logOut(e) }
      >
        退出登录
      </a>
    ),
  },
]
const logOut = (e)=> {
  e.preventDefault()
  console.log('推出登录')
}



  return (
    <Layout className="pv-layout">
      <Header className="header">
        <div className="logo" onClick={()=>{navigate("/")}}/>
        <div className="search-wrap">
          {/* <Search
            size="large"
            placeholder="探索更多内容"
            allowClear
            onSearch={onSearch}
          /> */}
              <AutoComplete
                size="large"
                options={options}
                style={{ flex : 1 }}
                placeholder="探索更多内容"
                onSearch={ onSearch}
                onSelect={onSelect}
                bordered={false}
                allowClear={true}
              />
              <SearchOutlined className="search-btn" onClick={()=>searchFn()} />
        </div>
        <div className="user-info">
          <div className="user-menu">
            <Dropdown
              overlayClassName="dropdown-user-menu"
              placement="bottom"
              menu={{
                items,
              }}
            >
              <a className="user-menu-item" onClick={(e) => e.preventDefault()}>
                <Space>更多菜单</Space>
              </a>
            </Dropdown>
          </div>
          <div className="user-menu">
            <Dropdown
              overlayClassName="dropdown-user-menu"
              placement="bottom"
              menu={{
                items,
              }}
            >
              <a className="user-menu-item" onClick={(e) => e.preventDefault()}>
                <Space>更多菜单</Space>
              </a>
            </Dropdown>
          </div>
          {/* <span className="user-name">
            {userStore.userInfo.name || "hello"}
          </span>
          <span className="user-logout">
            <Popconfirm
              title="是否确认退出？"
              okText="退出"
              cancelText="取消"
              onConfirm={onLogout}
            >
              <LogoutOutlined /> 退出
            </Popconfirm>
          </span> */}
        </div>
        <div className="min-menu">
        <Dropdown
              overlayClassName="dropdown-more"
              menu={{
                items: menuItems,
                onClick: handleMenuClickMin,
              }}
              trigger={["click"]}
              onOpenChange={handleOpenChangeMin}
              open={moreOpenMin}
            >
              <div className="more-btn">
                <MenuOutlined />
              </div>
            </Dropdown>
        </div>
      </Header>
      <Layout>
        <Sider className="site-layout-background">
          <div className="pv-menu-wrap">
            <Menu
              mode="inline"
              defaultSelectedKeys={[selectedKey]}
              style={{ height: "100%", borderRight: 0 }}
            >
              <Menu.Item icon={<HomeOutlined />} key="/">
                <Link  to="/">发现</Link>
              </Menu.Item>
              <Menu.Item icon={<EditOutlined />} key="/publish">
                <Link to="/publish">发布</Link>
              </Menu.Item>
              <Menu.Item icon={<BellOutlined />} key="/notification">
                <Link to="/notification">通知</Link>
              </Menu.Item>
              <Menu.Item icon={<RedditOutlined />} key="/my" className="my-link">
                <Link to="/my">我</Link> 
                <Dropdown
                  // trigger={['click']}
                  overlayClassName="dropdown-user-menu dropdown-logout"
                  placement="bottom"
                  menu={{
                    items:logoutItem,
                  }}
                >
              <a className="user-menu-item" onClick={(e) => e.preventDefault()}>
                <div className="my-logout" onClick={(e) => e.preventDefault()}><EllipsisOutlined/></div>
              </a>
            </Dropdown>
                
              </Menu.Item>
            </Menu>
            <div className="login-btn" onClick={()=>loginModalShow()}>登录</div>

            <Dropdown
              overlayClassName="dropdown-more"
              menu={{
                items: menuItems,
                onClick: handleMenuClick,
              }}
              trigger={["click"]}
              onOpenChange={handleOpenChange}
              open={moreOpen}
            >
              <div className="more-btn">
                <MenuOutlined />
                <span>更多</span>
              </div>
            </Dropdown>
          </div>
        </Sider>
        <Layout className="layout-content" style={{ padding: '16px 20px 0' }} >
          {/* 二级路由出口 */}
          <Outlet />
          <FooterComp></FooterComp>
        </Layout>
      </Layout>
      <LoginModal modalShow={modalShow} setModalShow ={setModalShow}/>
    </Layout>
  );
};

export default observer(GeekLayout);