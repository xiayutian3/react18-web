// 导入路由
import { BrowserRouter, Route, Routes } from "react-router-dom";

// 路由鉴权-高阶组件
import { AuthRoute } from "@/components/AuthRoute";

import "./App.css";

// 导入页面组件
// import Login from "./pages/Login";
// 导入必要组件
import { lazy, Suspense } from "react";

// 解决在非组件外使用router跳转问题
import { HistoryRouter, history } from "./utils/history";
// 按需导入路由组件
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Layout = lazy(() => import("./pages/Layout"));
const Home = lazy(() => import("./pages/Home"));
// const Article = lazy(() => import("./pages/Article"));
const Publish = lazy(() => import("./pages/Publish"));
const My = lazy(() => import("./pages/My"));
const Notification = lazy(() => import("@/pages/Notification"));

// 配置路由规则
function App() {
  return (
    <HistoryRouter history={history}>
      <Suspense
        fallback={
          <div
            style={{
              textAlign: "center",
              marginTop: 200,
            }}
          >
            loading...
          </div>
        }
      >
        <div className="App">
          <Routes>
            {/* 需要鉴权的路由 */}
            <Route
              path="/"
              element={
                <AuthRoute>
                  <Layout />
                </AuthRoute>
              }
            >
              <Route index element={<Home />} />
              {/* <Route path="article" element={<Article />} /> */}
              <Route path="publish" element={<Publish />} />
              <Route path="notification" element={<Notification />} />
              <Route path="my" element={<My />} />
            </Route>
            {/* 不需要鉴权的路由 */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </Suspense>
    </HistoryRouter>
  );
}

export default App;
