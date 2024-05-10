import { createApp } from 'vue';
import './app.less';
import { setupStore } from './stores';
import { setupRouter } from './router';
import './assets/styles/index.less';

const App = createApp({
  onShow() {},
  // 入口组件不需要实现 render 方法，即使实现了也会被 taro 所覆盖
});

const setupApp = () => {
  setupStore(App);
  setupRouter(App);
};

setupApp();

export default App;
