import { useState } from "react";
import { SmileOutlined } from "@ant-design/icons";
import './index.scss'

const EmojiComponent = (props) => {
  const [isShow, setIsShow] = useState(false);
  const emojiList = [
    { id: 1, emoji: "😀" },
    { id: 2, emoji: "😂" },
    { id: 3, emoji: "🥂" },
    { id: 4, emoji: "🤩" },
    { id: 5, emoji: "👿" },
    { id: 6, emoji: "😛" },
    { id: 7, emoji: "🤫" },
    { id: 8, emoji: "😑" },
    { id: 9, emoji: "🙄" },
    { id: 10, emoji: "🤐" },
    { id: 11, emoji: "🤑" },
    { id: 12, emoji: "🤗" },
    { id: 13, emoji: "😏" },
    { id: 14, emoji: "🥃" },
    { id: 15, emoji: "😒" },
    { id: 16, emoji: "😪" },
    { id: 17, emoji: "😴" },
    { id: 18, emoji: "🤤" },
    { id: 19, emoji: "🤧" },
    { id: 20, emoji: "🥶" },
  ];

  const changeLayer = () => {
    setIsShow(!isShow);
  };

  const handleOk = (emoji) => {
    // this.setState({
    //   txt: this.state.txt.concat(emoji),
    // });
    setIsShow(!isShow);
    props.insertEmoji(emoji)

  };
  return (
    <div className="pv-emoji" onClick={() => changeLayer()}>
      <SmileOutlined />
      <div className={isShow ? "layer" : "layer layer-none"}>
        {emojiList.map((item) => (
          <span key={item.id} onClick={() => handleOk(item.emoji)}>
            {item.emoji}
          </span>
        ))}
      </div>
    </div>
  );
};
export default EmojiComponent;
