import "./assets/style/normalize.css";
import "./assets/style/base.css";
import "./assets/style/index.css";
import "./assets/style/flex.css";
import "./assets/style/general.css";
import "./assets/style/echart.css";
import "./assets/style/map.css";
import "@cyhnkckali/vue3-color-picker/dist/style.css";
import "element-plus/theme-chalk/dark/css-vars.css";
import "./assets/style/elvars.css";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";

import { createApp } from "vue";
import { createPinia } from "pinia";
import "default-passive-events";

// 渲染控制
import CommonDiv from "@/views/editor/components/CommonDiv.vue";
import CommonDivText from "@/views/editor/components/CommonDivText.vue";
import CommonDivImage from "@/views/editor/components/CommonDivImage.vue";
import CommonDivCesium from "@/views/editor/components/CommonDivCesium.vue";

// 属性设置
import NumberInputSlider from "@/h5/components/NumberInputSlider.vue";
import RadioSingleInput from "@/h5/components/RadioSingleInput.vue";
import ColorInput from "@/h5/components/ColorInput.vue";
import ColorOptionsInput from "@/h5/components/ColorOptionsInput.vue";
import CheckInput from "@/h5/components/CheckInput.vue";
import OptionsInput from "@/h5/components/OptionsInput.vue";
import TextInput from "@/h5/components/TextInput.vue";

// 以下是 czml 相关的
import CzmlShowPropInput from "@/czml/components/CzmlShowPropInput.vue";
import CzmlStringPorpInput from "@/czml/components/CzmlStringPropInput.vue";
import CzmlTextPropInput from "@/czml/components/CzmlTextPropInput.vue";
import CzmlUriPropInput from "@/czml/components/CzmlUriPropInput.vue";
import CzmlPureOptionsInput from "@/czml/components/CzmlPureOptionsInput.vue";
import CzmlPositionPropInput from "@/czml/components/CzmlPositionPropInput.vue";
import CzmlCartesian3Input from "@/czml/components/CzmlCartesian3Input.vue";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.use(createPinia());
app.use(router);

app.mount("#app");

app.component("CommonDiv", CommonDiv);
app.component("CommonDivText", CommonDivText);
app.component("CommonDivImage", CommonDivImage);
app.component("CommonDivCesium", CommonDivCesium);

app.component("NumberInputSlider", NumberInputSlider);
app.component("RadioSingleInput", RadioSingleInput);
app.component("ColorInput", ColorInput);
app.component("ColorOptionsInput", ColorOptionsInput);
app.component("CheckInput", CheckInput);
app.component("OptionsInput", OptionsInput);
app.component("TextInput", TextInput);

// czml 组件注册
app.component("CzmlShowPropInput", CzmlShowPropInput);
app.component("CzmlStringPorpInput", CzmlStringPorpInput);
app.component("CzmlTextPropInput", CzmlTextPropInput);
app.component("CzmlUriPropInput", CzmlUriPropInput);
app.component("CzmlPureOptionsInput", CzmlPureOptionsInput);
app.component("CzmlPositionPropInput", CzmlPositionPropInput);
app.component("CzmlCartesian3Input", CzmlCartesian3Input);
