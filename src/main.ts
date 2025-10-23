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

// 一定会用公共组件

// 渲染控制
import CommonDiv from "@/views/editor/components/CommonDiv.vue";
import CommonDivText from "@/views/editor/components/CommonDivText.vue";
import CommonDivImage from "@/views/editor/components/CommonDivImage.vue";
import CommonDivCesium from "@/views/editor/components/CommonDivCesium.vue";

// h5属性设置
import NumberInputSlider from "@/h5/components/NumberInputSlider.vue";
import RadioSingleInput from "@/h5/components/RadioSingleInput.vue";
import ColorInput from "@/h5/components/ColorInput.vue";
import ColorOptionsInput from "@/h5/components/ColorOptionsInput.vue";
import CheckInput from "@/h5/components/CheckInput.vue";
import OptionsInput from "@/h5/components/OptionsInput.vue";
import TextInput from "@/h5/components/TextInput.vue";

// 以下是 czml 相关的
import CzmlBooleanPropInput from "@/czml/components/CzmlBooleanPropInput.vue";
import CzmlBooleanIntervalPropInput from "@/czml/components/CzmlBooleanIntervalPropInput.vue";

import CzmlCartesian3PropInput from "@/czml/components/CzmlCartesian3PropInput.vue";
import CzmlCartesian3PurePropInput from "@/czml/components/CzmlCartesian3PurePropInput.vue";
import CzmlCombinePropInput from "@/czml/components/CzmlCombinePropInput.vue";
import CzmlCustomPropertiesPropInput from "@/czml/components/CzmlCustomPropertiesPropInput.vue";

import CzmlEntityRender from "@/czml/components/CzmlEntityRender.vue";
import CzmlInterpolationPropInput from "@/czml/components/CzmlInterpolationPropInput.vue";

import CzmlNumberSliderPropInput from "@/czml/components/CzmlNumberSliderPropInput.vue";

import CzmlOptionsPurePropInput from "@/czml/components/CzmlOptionsPurePropInput.vue";
import CzmlPackagesRender from "@/czml/components/CzmlPackagesRender.vue";

import CzmlPositionPropInput from "@/czml/components/CzmlPositionPropInput.vue";
import CzmlQuaternionInterpolationPropInput from "@/czml/components/CzmlQuaternionInterpolationPropInput.vue";
import CzmlQuaternionPropInput from "@/czml/components/CzmlQuaternionPropInput.vue";

import CzmlStringPropInput from "@/czml/components/CzmlStringPropInput.vue";

import CzmlTextPropInput from "@/czml/components/CzmlTextPropInput.vue";

import CzmlTimeCollectionPropInput from "./czml/components/CzmlTimeCollectionPropInput.vue";
import CzmlTimeIntervalPropInput from "./czml/components/CzmlTimeIntervalPropInput.vue";
import CzmlTimePurePropInput from "./czml/components/CzmlTimePurePropInput.vue";

import CzmlUriPropInput from "@/czml/components/CzmlUriPropInput.vue";

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
app.component("CzmlBooleanPropInput", CzmlBooleanPropInput);
app.component("CzmlBooleanIntervalPropInput", CzmlBooleanIntervalPropInput);

app.component("CzmlCartesian3PropInput", CzmlCartesian3PropInput);
app.component("CzmlCartesian3PurePropInput", CzmlCartesian3PurePropInput);
app.component("CzmlCombinePropInput", CzmlCombinePropInput);
app.component("CzmlCustomPropertiesPropInput", CzmlCustomPropertiesPropInput);
app.component("CzmlEntityRender", CzmlEntityRender);

app.component("CzmlInterpolationPropInput", CzmlInterpolationPropInput);

app.component("CzmlNumberSliderPropInput", CzmlNumberSliderPropInput);

app.component("CzmlOptionsPurePropInput", CzmlOptionsPurePropInput);

app.component("CzmlPackagesRender", CzmlPackagesRender);
app.component("CzmlPositionPropInput", CzmlPositionPropInput);
app.component("CzmlQuaternionInterpolationPropInput", CzmlQuaternionInterpolationPropInput);
app.component("CzmlQuaternionPropInput", CzmlQuaternionPropInput);

app.component("CzmlStringPropInput", CzmlStringPropInput);

app.component("CzmlTextPropInput", CzmlTextPropInput);

app.component("CzmlTimeCollectionPropInput", CzmlTimeCollectionPropInput);
app.component("CzmlTimeIntervalPropInput", CzmlTimeIntervalPropInput);
app.component("CzmlTimePurePropInput", CzmlTimePurePropInput);

app.component("CzmlUriPropInput", CzmlUriPropInput);
