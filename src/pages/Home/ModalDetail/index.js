import { useEffect, useState, useRef } from "react";
import {
  HeartOutlined,
  MessageOutlined,
  StarOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import { Modal, Button, Input, FloatButton } from "antd";
import ReactInfiniteScroll from "react-infinite-scroller";
import EmojiComponent from "../Emoji";
import SimpleSlider from "../Slider";

import "./index.scss";

const ModalDetail = (props) => {
  const { open, cartItem, cartItemComments, closeModal, loadMoreCommentData } =
    props;

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

  return (
    <Modal
      open={open}
      // onOk={() => setOpen(false)}
      // onCancel={() => setOpen(false)}
      onOk={() => closeModal()}
      onCancel={() => closeModal()}
      footer={null}
      closeIcon={true}
      width={1100}
      style={{ top: 20 }}
      destroyOnClose
      wrapClassName="card-info-modal"
    >
      <div className="modal-content">
        <div className="back-wrap">
          <div className="back" onClick={() => closeModal()}>
            <ArrowLeftOutlined />
          </div>
          <div className="info">
            <div className="user-msg">
              <img className="avatar" src={cartItem.avatar} alt="图片" />
              <span className="name">{cartItem.auth}</span>
            </div>
            <Button type="primary" danger shape="round">
              关注
            </Button>
          </div>
        </div>

        <div className="left">
          <SimpleSlider imgs={cartItem.imgs}></SimpleSlider>
          {/* <img className="left-img" src={cartItem.poster} alt="图片" /> */}
        </div>
        <div className="right">
          <div className="info">
            <div className="user-msg">
              <img className="avatar" src={cartItem.avatar} alt="图片" />
              <span className="name">{cartItem.auth}</span>
            </div>
            <Button type="primary" danger shape="round">
              关注
            </Button>
          </div>

          <div className="note-scroller" id="notescroller">
            <ReactInfiniteScroll
              loadMore={loadMoreCommentData}
              hasMore={cartItemComments.length < 15}
              loader={
                <div className="loader" key={0}>
                  Loading ...
                </div>
              }
              useWindow={false}
            >
              <div className="title">{cartItem.title}</div>
              <div className="content">{cartItem.content}</div>
              <div className="desc">
                {cartItem.desc &&
                  cartItem.desc.map((item, index) => {
                    return (
                      <span className="tag" key={index + "tag"}>
                        #{item}
                      </span>
                    );
                  })}
              </div>
              <div className="date">
                {cartItem.createDate} {cartItem.localtion}
              </div>
              <div className="comment">
                <div className="total">共 {cartItem.commentsTotal} 条评论</div>
                <div className="comment-item">
                  {cartItemComments &&
                    cartItemComments.map((item, index) => {
                      return (
                        <div className="downline" key={"user1" + index}>
                          <div className="user1">
                            <div className="user-info">
                              <img
                                className="user1-img"
                                src={item.avatar}
                                alt="图片"
                              />
                              <span className="user1-name">{item.auth}</span>
                            </div>
                            <div className="user1-comment">{item.content}</div>
                            <div className="user1-date">
                              <span className="user1-time">
                                {item.createDate} {item.location}
                              </span>
                              <div className="user1-icon">
                                <div className="like-icon">
                                  <HeartOutlined /> {item.like}
                                </div>
                                <div className="talk-icon">
                                  <MessageOutlined /> {item.childCommentsTotal}
                                </div>
                              </div>
                            </div>
                          </div>
                          {item.childComments &&
                            item.childComments.map((childItem, childIndex) => {
                              return (
                                <div
                                  className="user1 user2"
                                  key={"user2" + childIndex}
                                >
                                  <div className="user-info">
                                    <img
                                      className="user1-img"
                                      src={childItem.avatar}
                                      alt="图片"
                                    />
                                    <span className="user1-name">
                                      {childItem.auth}
                                    </span>
                                  </div>
                                  <div className="user1-comment">
                                    {childItem.content}
                                  </div>
                                  <div className="user1-date">
                                    <span className="user1-time">
                                      {childItem.createDate}{" "}
                                      {childItem.location}
                                    </span>
                                    <div className="user1-icon">
                                      <div className="like-icon">
                                        <HeartOutlined /> {childItem.like}
                                      </div>
                                      <div className="talk-icon">
                                        <MessageOutlined />{" "}
                                        {childItem.childCommentsTotal}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                        </div>
                      );
                    })}
                </div>
              </div>
            </ReactInfiniteScroll>
          </div>

          <div className="publish">
            <div className="icons">
              <span className="pub-icons">
                <HeartOutlined className="pub-icon" /> {cartItem.like}
              </span>
              <span className="pub-icons">
                <StarOutlined className="pub-icon" /> {cartItem.collect}
              </span>
              <span className="pub-icons">
                <MessageOutlined className="pub-icon" />{" "}
                {cartItem.commentsTotal}
              </span>
            </div>
            <div className="input-wrap">
              <div className="input">
                <Input
                  ref={commentContentRef}
                  value={commentContent}
                  onChange={onCommentChange}
                  placeholder="说点神社么吗🤧"
                  bordered={false}
                />
                {/* <SmileOutlined /> */}
                <EmojiComponent insertEmoji={insertEmoji}></EmojiComponent>
              </div>
              <Button type="primary" shape="round">
                发送
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ModalDetail;
