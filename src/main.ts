import "./assets/style/normalize.css";
import "./assets/style/base.css";
import "./assets/style/index.css";
import "./assets/style/flex.css";
import "./assets/style/general.css";
import "./assets/style/echart.css";
import "./assets/style/map.css";
import "@cyhnkckali/vue3-color-picker/dist/style.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import "default-passive-events";

// 渲染控制
import CommonDiv from "@/views/editor/components/CommonDiv.vue";
import CommonDivText from "@/views/editor/components/CommonDivText.vue";

// 属性设置
import NumberInputSlider from "@/components/css/NumberInputSlider.vue";
import RadioSingleInput from "@/components/css/RadioSingleInput.vue";
import ColorInput from "@/components/css/ColorInput.vue";
import ColorOptionsInput from "@/components/css/ColorOptionsInput.vue";
import CheckInput from "@/components/css/CheckInput.vue";
import OptionsInput from "@/components/css/OptionsInput.vue";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount("#app");

app.component("CommonDiv", CommonDiv);
app.component("CommonDivText", CommonDivText);

app.component("NumberInputSlider", NumberInputSlider);
app.component("RadioSingleInput", RadioSingleInput);
app.component("ColorInput", ColorInput);
app.component("ColorOptionsInput", ColorOptionsInput);
app.component("CheckInput", CheckInput);
app.component("OptionsInput", OptionsInput);
