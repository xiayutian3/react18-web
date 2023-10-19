import { useEffect, useState, useRef } from "react";
import {
  SyncOutlined,
} from "@ant-design/icons";
import {  FloatButton } from "antd";

import './index.scss'

const FloatButtonComponent = (props) => {
  const {classNameContainer,reloadData} = props

  return (
    <FloatButton.Group
    className="floatbutton-wrap"
    shape="circle"
    style={{
      right: 40,
    }}
  >
    <FloatButton.BackTop
      target={() => document.getElementsByClassName(classNameContainer)[0]}
      visibilityHeight={20}
    />
    <FloatButton icon={<SyncOutlined />} onClick={()=>reloadData()} />
  </FloatButton.Group>
  )

}

export default FloatButtonComponent