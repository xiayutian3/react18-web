// https://github.com/remix-run/react-router/issues/8264
/**
 * 解决在react组件外部，路由跳转问题
 * 比如说在 （http中的状态码判断）token过期，需要重新跳回登录页，进行登录
 */
import { createBrowserHistory } from 'history'
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom'
const history = createBrowserHistory()

export {
  HistoryRouter,
  history
}