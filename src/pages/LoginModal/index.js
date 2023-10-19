import { useEffect, useState,useRef } from "react";
import { Modal, Input, Checkbox, Form, message, Button } from "antd";
import { observer } from "mobx-react-lite";
// 导入mobx loginStore
import { useStore } from "@/store";
// 导入useNavigate函数
import { useNavigate } from "react-router-dom";
import logo from "@/assets/logo.png";
import "./index.scss";

const LoginModal = (props) => {
  // const [modal2Open, setModal2Open] = useState(false);
  const formRef = useRef(null);
  useEffect(() => {
    // setModal2Open(props.modalShow);
    return () => {
      formRef.current?.resetFields();
    }
  }, [props.modalShow]);
  let { modalShow, setModalShow } = props;
  const [agreements, setAgreements] = useState(false);
  const onChange = (e) => {
    setAgreements(e.target.checked);
  };

  //登录判断(默认是登陆状态)
  const [loginFlag, setLoginFlag] = useState(true);
  const changeLoginFlag = () => {
    setLoginFlag(!loginFlag);
  };

  // 执行函数
  const navigate = useNavigate();
  const { loginStore } = useStore();

  // 点击登录按钮时触发 参数values即是表单输入数据
  const onFinish = async (values) => {
    console.log("agreements: ", agreements);
    if (!agreements) {
      return message.error("请勾选协议");
    }
    const { mobile, password, confirm} = values;
    if (loginFlag) {
      try {
        await loginStore.login({ mobile, password });
        navigate("/", { replace: true });
      } catch (e) {
        message.error(e.response?.data?.message || "登录失败");
      }
    }else {
      await loginStore.register({ mobile, password });
    }
  
  };

  return (
    <Modal
      wrapClassName="login-modal"
      title=""
      centered
      width={800}
      footer={null}
      open={modalShow}
      onOk={() => setModalShow(false)}
      onCancel={() => setModalShow(false)}
    >
      <div className="login-inner">
        <div className="left">
          <img src={logo} alt="二维码" />
        </div>
        <div className="right">
          <div className="title">{loginFlag ? "帐号登录" : "注册账号"}</div>
          <Form validateTrigger={["onBlur", "onChange"]} ref={formRef} onFinish={onFinish}>
            <Form.Item
              name="mobile"
              rules={[{ required: true, message: "请输入用户名" }]}
            >
              <div className="user">
                <Input
                  placeholder="请输入用户名"
                  size="large"
                  bordered={false}
                  allowClear
                />
              </div>
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "请输入密码",
                },
              ]}
            >
              <div className="password">
                <Input.Password
                  placeholder="请输入密码"
                  size="large"
                  bordered={false}
                  allowClear
                />
              </div>
            </Form.Item>
            {loginFlag ? (
              ""
            ) : (
              <Form.Item
                name="confirm"
                dependencies={["password"]}
                rules={[
                  {
                    required: true,
                    message: "请输入确认密码",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error("输入密码不一致"));
                    },
                  }),
                ]}
              >
                <div className="password">
                  <Input.Password
                    placeholder="请输入确认密码"
                    size="large"
                    bordered={false}
                    allowClear
                  />
                </div>
              </Form.Item>
            )}

            <Form.Item>
              <button className="submit" type="submit">
                {" "}
                {loginFlag ? "登录" : "注册"}{" "}
              </button>
            </Form.Item>
          </Form>

          <div className="agreements">
            <span className="agree-icon">
              <Checkbox onChange={onChange}></Checkbox>
            </span>
            <label> 我已阅读并同意</label>
            <a
              className="links"
              target="_blank"
              href="https://agree.xiaohongshu.com/h5/terms/ZXXY20220331001/-1"
              rel="noreferrer"
            >
              《用户协议》
            </a>
            <a
              className="links"
              target="_blank"
              href="https://agree.xiaohongshu.com/h5/terms/ZXXY20220509001/-1"
              rel="noreferrer"
            >
              《隐私政策》
            </a>
            <br />
            <a
              className="links"
              target="_blank"
              href="https://oa.xiaohongshu.com/h5/terms/ZXXY20220516001/-1"
              style={{ marginLeft: "25px" }}
              rel="noreferrer"
            >
              《儿童/青少年个人信息保护规则》
            </a>
          </div>
          <div className="oauth-tip">
            <span className="oauth-tip-line">或</span>
          </div>
          <div className="login-common" onClick={changeLoginFlag}>
            {loginFlag ? "新用户注册" : "去登录"}
          </div>
        </div>
      </div>
    </Modal>
  );
};
export default observer(LoginModal);
