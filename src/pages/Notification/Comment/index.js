import { useEffect, useState, useRef } from "react";
import { MessageOutlined, HeartOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";
import EmojiComponent from "@/pages/Home/Emoji";
import ModalDetail from "@/pages/Home/ModalDetail";
import avatar from "@/assets/avatar.webp";
import mockList from "@/pages/Home/mockCardList";

import "./index.scss";

const CommentComp = () => {
  //模拟的数据项（一个）
  const cardItem = mockList[0];

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

  //获取光标位置插入表情
  const commentContentRef = useRef(null);
  const [commentContent, setCommentContent] = useState("");
  const onCommentChange = (event) => {
    // console.log("commentContentvalue: ", event);
    setCommentContent(event.target.value);
  };
  const insertEmoji = (emoji) => {
    var textareaStart = commentContentRef.current.input.selectionStart;
    const before = commentContent.substring(0, textareaStart);
    const after = commentContent.substring(textareaStart);
    setCommentContent(`${before}${emoji}${after}`);
  };


  //点击回复按钮
  const [inputWrapShow,setInputWrapShow] = useState(false)
  const handleLike = () => {
    console.log(123)
  }
  const handleReply = () => {
    setInputWrapShow(true)
  }
  const sendReply = () => {
    console.log(123)
    closeReply()
  }
  const closeReply = () => {
    setInputWrapShow(false)
  }

  //模态框的交互
  const handleOk = () => {
    console.log('handleOk: ', handleOk);
  }
  const handleCancle = () => {
    console.log('handleCancle: ', handleCancle);
  }

  return (
    <div className="comment-wrap">
      <div className="container">
        <a
          href="/user/profile/6239d6b600000000100069b9?channelType=web_engagement_notification_page&amp;channelTabId=mentions"
          className="user-avatar"
          target="_blank"
        >
          <img
            className="avatar-item"
            src="https://sns-avatar-qc.xhscdn.com/avatar/1040g2jo30ojmva84ii805ohpqqr40qdp4knob48?imageView2/2/w/120/format/jpg|imageMogr2/strip"
            alt="图片"
          />
        </a>
        <div className="main">
          <div className="info">
            <div className="user-info">
              <a
                href="/user/profile/6239d6b600000000100069b9?channelType=web_engagement_notification_page&amp;channelTabId=mentions"
                className=""
                target="_blank"
              >
                山是山
              </a>
              <span className="user-tag">作者</span>
            </div>
            <div className="interaction-hint">
              <span>回复了我的评论</span>
              <span className="interaction-time">08-19</span>
            </div>
            <div className="interaction-content">
              深圳湾日出剧场，现在去不知道草地还绿不绿了
            </div>
            <div className="quote-info">这里是？</div>
            <div className="actions">
              <div className="action-reply" onClick={()=>handleReply()}>
                <MessageOutlined />
                <div className="action-text">回复</div>
              </div>
              <div className="action-like" onClick={()=>{handleLike()}}>
                <span className="like-wrapper like-active">
                  <span
                    className="like-lottie"
                    style={{ width: "20px", height: "20px" }}
                  ></span>
                  <HeartOutlined />
                  <span className="count">1</span>
                </span>
              </div>
              <div className="reds-alert" style={{ display: "none" }}>
                <div className="reds-alert-mask"></div>
                {/* , display: 'none' */}
                <div
                  className="reds-alert-wrapper has-content slot-content"
                  style={{ width: "320px" }}
                >
                  <div className="reds-alert-title"> 取消评论</div>
                  <div className="reds-alert-content">
                    <div className="reds-dialog__message">
                      将会清空已经输入的内容
                    </div>
                  </div>
                  <div className="reds-alert-footer vertical">
                    <div className="foot-btns">
                      <div className="foot-btn" onClick={()=>handleOk()}>确认</div>
                      <div className="foot-btn" onClick={()=>handleCancle()}>返回</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {inputWrapShow && <div className="input-wrap">
              <div className="input">
                <Input
                  ref={commentContentRef}
                  value={commentContent}
                  onChange={onCommentChange}
                  placeholder="说点神社么吗🤧"
                  bordered={false}
                />
                <EmojiComponent insertEmoji={insertEmoji}></EmojiComponent>
              </div>
              <Button type="primary" shape="round" onClick={()=>sendReply()}>
                发送
              </Button>
              <Button shape="round" onClick={()=>closeReply()}>
                取消
              </Button>
            </div>}
            
          </div>
          <div className="extra" onClick={() => selectCart(cardItem)}>
            <img
              src="http://ci.xiaohongshu.com/1040g00830n6004lklm0g5ohpqqr40qdpkc02ttg?imageView2/2/w/1080/format/jpg"
              className="extra-image"
              alt="图片"
            />
          </div>
        </div>
      </div>
      <div className="end-container"> - THE END - </div>
      {/* //弹窗显示的东西 */}
      <ModalDetail
        open={open}
        cartItem={cartItem}
        cartItemComments={cartItemComments}
        closeModal={closeModal}
        loadMoreCommentData={loadMoreCommentData}
      />
    </div>
  );
};
export default CommentComp;
