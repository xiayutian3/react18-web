import { Card, Form, Input, Button, Checkbox, message } from "antd";
import logo from "@/assets/logo.png";
import "./index.scss";
// 导入mobx loginStore
import { useStore } from "@/store";
// 导入useNavigate函数
import { useNavigate } from "react-router-dom";

const Login = () => {
  // 执行函数
  const navigate = useNavigate();
  const { loginStore } = useStore();

  // 点击登录按钮时触发 参数values即是表单输入数据
  const onFinish = async (values) => {
    const { mobile, code } = values;
    try {
      await loginStore.login({ mobile, code });
      navigate("/", { replace: true });
    } catch (e) {
      message.error(e.response?.data?.message || "登录失败");
    }
  };
  return (
    <div className="login">
      <Card className="login-container">
        <img className="login-logo" src={logo} alt="" />
        {/* 登录表单 */}
        <Form validateTrigger={["onBlur", "onChange"]} onFinish={onFinish}>
          <Form.Item
            name="mobile"
            rules={[
              {
                pattern: /^1[3-9]\d{9}$/,
                message: "手机号码格式不对",
                validateTrigger: "onBlur",
              },
              { required: true, message: "请输入手机号" },
            ]}
          >
            <Input size="large" placeholder="请输入手机号" />
          </Form.Item>
          <Form.Item
            name="code"
            rules={[
              { len: 6, message: "验证码6个字符", validateTrigger: "onBlur" },
              { required: true, message: "请输入验证码" },
            ]}
          >
            <Input size="large" placeholder="请输入验证码" maxLength={6} />
          </Form.Item>
          <Form.Item name="remember" valuePropName="checked">
            <Checkbox className="login-checkbox-label">
              我已阅读并同意「用户协议」和「隐私条款」
            </Checkbox>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" block>
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};
export default Login;
