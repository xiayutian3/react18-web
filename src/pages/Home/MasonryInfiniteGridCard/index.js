import { useEffect, useState, useRef ,useReducer} from "react";
import { MasonryInfiniteGrid } from "@egjs/react-infinitegrid";
import {
  HeartOutlined,
} from "@ant-design/icons";
import ModalDetail from "../ModalDetail";
import avatar from "@/assets/avatar.webp";

import "./index.scss";

const MasonryInfiniteGridCard = (props) => {
  // // 强制更新
  // const [ignored, forceUpdate] = useReducer(x => x + 1, 0);
  // function forceUpdateFn() {
  //     forceUpdate();
  // }
  // useEffect(()=>{
  //   forceUpdateFn()
  // },[])

  const { loadMoreData, cartList,scrollContainer } = props;

  //设置弹框部分 点击查看图片详情
  const [open, setOpen] = useState(false);
  const [cartItem, setCartItem] = useState({});
  const [cartItemComments, setCartItemComments] = useState([]);
  const selectCart = (item) => {
    setOpen(true);
    setCartItem(item);
    setCartItemComments(item.comments);
  };
  const closeModal = () => {
    setOpen(false);
  };

  // 滑动加载更多评论内容
  const loadMoreCommentData = () => {
    // console.log("滑动加载更多评论内容");
    const comments = [
      {
        auth: "小王",
        avatar: avatar,
        createDate: "06-30",
        content: "谁买这玩意",
        location: "赛博坦星球",
        like: 200,
        childCommentsTotal: 3,
        childComments: [
          {
            auth: "小王",
            avatar: avatar,
            createDate: "06-30",
            content: "谁买这玩意",
            location: "赛博坦星球",
            like: 200,
            childCommentsTotal: 0,
            childComments: [],
          },
        ],
      },
      {
        auth: "小王",
        avatar: avatar,
        createDate: "06-30",
        content: "谁买这玩意",
        location: "赛博坦星球",
        like: 200,
        childCommentsTotal: 3,
        childComments: [
          {
            auth: "小王",
            avatar: avatar,
            createDate: "06-30",
            content: "谁买这玩意",
            location: "赛博坦星球",
            like: 200,
            childCommentsTotal: 0,
            childComments: [],
          },
        ],
      },
      {
        auth: "小王",
        avatar: avatar,
        createDate: "06-30",
        content: "谁买这玩意",
        location: "赛博坦星球",
        like: 200,
        childCommentsTotal: 3,
        childComments: [
          {
            auth: "小王",
            avatar: avatar,
            createDate: "06-30",
            content: "谁买这玩意",
            location: "赛博坦星球",
            like: 200,
            childCommentsTotal: 0,
            childComments: [],
          },
        ],
      },
    ];
    setCartItemComments((oldList) => {
      return [...oldList, ...comments];
    });
  };


  return (
    <div className="cardcontent">
      <MasonryInfiniteGrid
        // scrollContainer=".cardcontent"
        scrollContainer={scrollContainer}
        threshold={150}
        className="container"
        loading={<div className="loading">Loading...</div>}
        placeholder={<div className="card-placeholder"></div>}
        align={"justify"}
        gap={5}
        onRequestAppend={(e) => {
          console.log('加载card')
            loadMoreData(e);
        }}
        // onRenderComplete={(e) => {
        //   console.log(e);
        // }}
      >
        {cartList &&
          cartList.map((item, index) => {
            return (
              <div
                className="item"
                key={item.key}
                data-grid-groupkey={item.groupKey}
              >
                <div className="card" onClick={() => selectCart(item)}>
                  <div className="poster-wrap">
                    <img className="poster" src={item.poster} alt="图片" />
                  </div>

                  <div className="title">{item.title}</div>
                </div>
                <div className="info">
                  <div className="msg">
                    <div className="info-auth">
                      <img className="avatar" src={item.avatar} alt="图片" />
                      <div className="name">{item.auth}</div>
                    </div>
                    <div className="like">
                      <HeartOutlined />
                      <span className="num">{item.like}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </MasonryInfiniteGrid>

      {/* //弹窗显示的东西 */}
      <ModalDetail 
      open={open}
      cartItem={cartItem}
      cartItemComments={cartItemComments}
      closeModal={closeModal}
      loadMoreCommentData={loadMoreCommentData}/>
    </div>
  );
};

export default MasonryInfiniteGridCard;
