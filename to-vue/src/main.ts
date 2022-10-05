import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import FancyList from "@/base/FancyList.vue";
import BaseDialog from "@/base/BaseDialog.vue";
import { createPinia } from "pinia";

const pinia = createPinia();
const app = createApp(App);

app.component("BaseDialog", BaseDialog);
app.component("FancyList", FancyList);

app.use(pinia);
app.use(router).mount("#app");
