import "./assets/style/normalize.css";
import "./assets/style/base.css";
import "./assets/style/index.css";
import "./assets/style/flex.css";
import "./assets/style/general.css";
import "./assets/style/echart.css";
import "./assets/style/map.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import "default-passive-events";

import CommonDiv from "@/views/editor/components/CommonDiv.vue";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount("#app");

app.component("CommonDiv", CommonDiv);
