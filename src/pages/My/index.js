
import { useEffect, useState, useRef } from "react";
import { Tabs,Empty  } from 'antd';
import StickyBox from 'react-sticky-box';
import MasonryInfiniteGridCard from '@/pages/Home/MasonryInfiniteGridCard'
import FloatButtonComponent from '@/pages/Home/FloatButton'
import mockList from "@/pages/Home/mockCardList";
import cloneDeep from "lodash/cloneDeep";
import "./index.scss";

const My = () => {
  // 笔记
  const [note, setNote] = useState([]);
  // 点赞
  const [like, setLike] = useState([]);
  // 收藏
  const [collect, setCollect] = useState([]);


  // 滑动加载更多(个人中心卡片)
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

  const contentCopmonents = (tag) => {
    // scrollContainer=".cardcontent"
    let component 
    let cardComponent = <MasonryInfiniteGridCard loadMoreData={loadMoreData} cartList={cartList} reloadData={reloadData} scrollContainer=".layout-content" />
    switch(tag){
      case "like":
        component = like.length>0?cardComponent:<Empty/>
        break;
      case "collect":
        component = collect.length>0?cardComponent:<Empty/>
        break;
      default:
        component = note.length===0?cardComponent:<Empty/>
        break;
    }
     return component
  }

  const tabArr = [
    {
      label: `笔记`,
      key: '1',
      // children: contentCopmonents(), 
    },
    {
      label: `点赞`,
      key: '2',
      // children: contentCopmonents(),
    },
    {
      label: `收藏`,
      key: '3',
      // children: contentCopmonents(),
    },
  ]
  // 面板切换事件
  //请求url
  const [currentUrl,setCurrentUrl] = useState('')
   //当前选中的标签
  const [currentKey,setCurrentKey] =  useState('')
  const onTabChange = (activeKey) => {
    console.log('activeKey: ', activeKey);
    setCurrentKey(activeKey)
    let url
    switch (activeKey) {
      case '1':
        url = "http://1"
        break;
      case '2':
        url = "http://2"
          break;
      default:
        url = "http://3"
        break;
    }
    setCurrentUrl(url)
  }

  //实现实现吸顶效果
  const renderTabBar = (props, DefaultTabBar) => (
    <StickyBox
      // offsetTop={-16}
      // offsetBottom={20}
      style={{
        zIndex: 99,
        width: 'calc(100% + 20px)'
      }}
    >
      <DefaultTabBar
        {...props}
        className="sticky-tabs-nav"
      />
    </StickyBox>
  )

  //空组件和卡片内容组件切换思路（不需要tab的item中的children）
  // 1.单独领出来放在下边
  // 2.3个请求，分别请求
  // 3.有数据设置数据为一个公共变量，
  // 4.有就显示card，无就空组件

  return (
    <div className="my-wrap">
      <div className="user">
        <div className="my-user-info">
          <div className="avatar">
            <div className="avatar-wrapper">
              <img
                src="https://sns-avatar-qc.xhscdn.com/avatar/645b7ea002c16c941e0bcb05.jpg?imageView2/2/w/540/format/webp|imageMogr2/strip"
                className="user-image"
                alt="头像"
              />
            </div>
          </div>
          <div className="info-part">
            <div className="info-wrap">
              <div className="basic-info">
                <div className="avatar" style={{display:"none"}}>
                  <div className="avatar-wrapper">
                    <img
                      src="https://sns-avatar-qc.xhscdn.com/avatar/645b7ea002c16c941e0bcb05.jpg?imageView2/2/w/540/format/webp|imageMogr2/strip"
                      className="user-image"
                      alt="头像"
                    />
                  </div>
                </div>
                <div className="user-basic">
                  <div className="user-nickname">
                    <div className="user-name">yeeyee</div>
                  </div>
                  <div className="user-content">
                    <span className="user-redId">小红书号：5582870844</span>
                    <span className="user-IP"> IP属地：广东</span>
                  </div>
                </div>
              </div>
              <div className="normal-user-desc user-desc">还没有简介</div>
              <div className="normal-data-info data-info">
                <div className="user-interactions">
                  <div>
                    <span className="count">0</span>
                    <span className="shows">关注</span>
                  </div>
                  <div>
                    <span className="count">0</span>
                    <span className="shows">粉丝</span>
                  </div>
                  <div>
                    <span className="count">0</span>
                    <span className="shows">获赞与收藏</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="follow" style={{display:"none"}}>
              <div className="reds-alert">
                <div className="reds-alert-mask"></div>
                <div className="reds-alert-wrapper">
                  <div className="reds-alert-footer">
                    <button className="reds-button-new reds-alert-footer__left extraLarge text reds-alert-footer__left">
                      <span className="reds-button-new-box">
                        <span className="reds-button-new-text">取消</span>
                      </span>
                    </button>
                    <button className="reds-button-new reds-alert-footer__right extraLarge text reds-alert-footer__right">
                      <span className="reds-button-new-box">
                        <span className="reds-button-new-text">确认</span>
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="phone-user-desc user-desc">还没有简介</div>
        <div className="phone-data-info data-info">
          <div className="user-interactions">
            <div>
              <span className="count">0</span>
              <span className="shows">关注</span>
            </div>
            <div>
              <span className="count">0</span>
              <span className="shows">粉丝</span>
            </div>
            <div>
              <span className="count">0</span>
              <span className="shows">获赞与收藏</span>
            </div>
          </div>
        </div>
      </div>
      <div className="dy-tab-wrap">
        <Tabs
          defaultActiveKey={1}
          renderTabBar={renderTabBar}
          centered
          items={tabArr}
          onChange={onTabChange}
        />
      </div>
     
      <MasonryInfiniteGridCard loadMoreData={loadMoreData} cartList={cartList} reloadData={reloadData} scrollContainer=".layout-content" />
      <FloatButtonComponent classNameContainer="layout-content" reloadData={reloadData} />
    </div>
  );
};

export default My;
