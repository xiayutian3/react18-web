// 登录模块
import { makeAutoObservable } from "mobx";
import { http, setToken, getToken, clearToken } from "@/utils";

class LoginStore {
  // 这里哦！！
  token = getToken() || "fhkdsfndlfkdf-554613215sdfsf";
  constructor() {
    makeAutoObservable(this);
  }
  // 登录
  login = async ({ mobile, password}) => {
    try {
      const res = await http.post(
        "/authorizations",
        {
          mobile,
          password,
        }
      );
      this.token = res.data.token;
      // 还有这里哦！！
      setToken(res.data.token);
    } catch (error) {
      console.log("error: ", error);
    }
  };
  // 退出登录
  loginOut = () => {
    this.token = "";
    clearToken();
  };
  //注册
  register = async ({ mobile,  password }) => {
    try {
      const res = await http.post(
        "/register",
        {
          mobile,
          password,
        }
      );
      console.log('res: ', res);
    } catch (error) {
      
    }
  }
}
export default LoginStore;
