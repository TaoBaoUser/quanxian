import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store"; // 确保路径正确
import "./utils/mock"; // 确保导入了 mock.js 文件

createApp(App).use(store).use(router).mount("#app");
