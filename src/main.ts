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
// import "default-passive-events";

import editorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";
import jsonWorker from "monaco-editor/esm/vs/language/json/json.worker?worker";
import cssWorker from "monaco-editor/esm/vs/language/css/css.worker?worker";
import htmlWorker from "monaco-editor/esm/vs/language/html/html.worker?worker";
import tsWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker";

// 一定会用公共组件
// 渲染控制
import CommonWorkspace from "@/views/editor/components/CommonWorkspace.vue";
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
import CzmlBooleanPurePropInput from "@/czml/components/CzmlBooleanPurePropInput.vue";
import CzmlBooleanIntervalPropInput from "@/czml/components/CzmlBooleanIntervalPropInput.vue";

import CzmlBoundingRectanglePropInput from "@/czml/components/CzmlBoundingRectanglePropInput.vue";

import CzmlCartesian2ListPropInput from "@/czml/components/CzmlCartesian2ListPropInput.vue";
import CzmlCartesian2NFPropInput from "@/czml/components/CzmlCartesian2NFPropInput.vue";
import CzmlCartesian2PropInput from "@/czml/components/CzmlCartesian2PropInput.vue";

import CzmlCartesian3ListPropInput from "@/czml/components/CzmlCartesian3ListPropInput.vue";
import CzmlCartesian3PropInput from "@/czml/components/CzmlCartesian3PropInput.vue";
import CzmlCartesian3PurePropInput from "@/czml/components/CzmlCartesian3PurePropInput.vue";
import CzmlCartesian3PxListPropInput from "@/czml/components/CzmlCartesian3PxListPropInput.vue";
import CzmlCartesian3PxPropInput from "@/czml/components/CzmlCartesian3PxPropInput.vue";
import CzmlCartesian3VelocityPropInput from "@/czml/components/CzmlCartesian3VelocityPropInput.vue";

import CzmlCartesian4ListPropInput from "@/czml/components/CzmlCartesian4ListPropInput.vue";
import CzmlCartesian4NFScalerPropInput from "@/czml/components/CzmlCartesian4NFScalerPropInput.vue";
import CzmlCartesian4PropInput from "@/czml/components/CzmlCartesian4PropInput.vue";

import CzmlCartographicRectanglePropInput from "@/czml/components/CzmlCartographicRectanglePropInput.vue";

import CzmlColorPropInput from "@/czml/components/CzmlColorPropInput.vue";

import CzmlCombinePropInput from "@/czml/components/CzmlCombinePropInput.vue";
import CzmlCombineSmPropInput from "@/czml/components/CzmlCombineSmPropInput.vue";
import CzmlCombineSelectSmPropInput from "./czml/components/CzmlCombineSelectSmPropInput.vue";
import CzmlCustomPropertiesPropInput from "@/czml/components/CzmlCustomPropertiesPropInput.vue";

import CzmlEntityRender from "@/czml/components/CzmlEntityRender.vue";
import CzmlInterpolationPropInput from "@/czml/components/CzmlInterpolationPropInput.vue";

import CzmlMaterialPropInput from "@/czml/components/CzmlMaterialPropInput.vue";

import CzmlNumberFixedCntPropInput from "@/czml/components/CzmlNumberFixedCntPropInput.vue";

import CzmlNumberListPropInput from "@/czml/components/CzmlNumberListPropInput.vue";
import CzmlNumberPropInput from "@/czml/components/CzmlNumberPropInput.vue";
import CzmlNumberSliderPurePropInput from "@/czml/components/CzmlNumberSliderPurePropInput.vue";

import CzmlOptionsPurePropInput from "@/czml/components/CzmlOptionsPurePropInput.vue";
import CzmlPackagesRender from "@/czml/components/CzmlPackagesRender.vue";

import CzmlPositionPropInput from "@/czml/components/CzmlPositionPropInput.vue";
import CzmlQuaternionInterpolationPropInput from "@/czml/components/CzmlQuaternionInterpolationPropInput.vue";
import CzmlQuaternionPropInput from "@/czml/components/CzmlQuaternionPropInput.vue";

import CzmlReferencesPropInput from "@/czml/components/CzmlReferencesPropInput.vue";

import CzmlSphericalListPropInput from "@/czml/components/CzmlSphericalListPropInput.vue";
import CzmlSphericalPropInput from "@/czml/components/CzmlSphericalPropInput.vue";

import CzmlStringPropInput from "@/czml/components/CzmlStringPropInput.vue";

import CzmlTextPropInput from "@/czml/components/CzmlTextPropInput.vue";

import CzmlTimeCollectionPropInput from "./czml/components/CzmlTimeCollectionPropInput.vue";
import CzmlTimeIntervalPropInput from "./czml/components/CzmlTimeIntervalPropInput.vue";
import CzmlTimePurePropInput from "./czml/components/CzmlTimePurePropInput.vue";

import CzmlUnitSphericalListPropInput from "@/czml/components/CzmlUnitSphericalListPropInput.vue";
import CzmlUnitSphericalPropInput from "@/czml/components/CzmlUnitSphericalPropInput.vue";

import CzmlUriPropInput from "@/czml/components/CzmlUriPropInput.vue";

import App from "./App.vue";
import router from "./router";

self.MonacoEnvironment = {
  getWorker(_, label) {
    if (label === "json") {
      return new jsonWorker();
    }
    if (label === "css" || label === "scss" || label === "less") {
      return new cssWorker();
    }
    if (label === "html" || label === "handlebars" || label === "razor") {
      return new htmlWorker();
    }
    if (label === "typescript" || label === "javascript") {
      return new tsWorker();
    }
    return new editorWorker();
  },
};

const app = createApp(App);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.use(createPinia());
app.use(router);

app.mount("#app");

app.component("CommonWorkspace", CommonWorkspace);
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
app.component("CzmlBooleanPurePropInput", CzmlBooleanPurePropInput);
app.component("CzmlBooleanIntervalPropInput", CzmlBooleanIntervalPropInput);

app.component("CzmlBoundingRectanglePropInput", CzmlBoundingRectanglePropInput);

app.component("CzmlCartesian2ListPropInput", CzmlCartesian2ListPropInput);
app.component("CzmlCartesian2NFPropInput", CzmlCartesian2NFPropInput);
app.component("CzmlCartesian2PropInput", CzmlCartesian2PropInput);

app.component("CzmlCartesian3ListPropInput", CzmlCartesian3ListPropInput);
app.component("CzmlCartesian3PropInput", CzmlCartesian3PropInput);
app.component("CzmlCartesian3PurePropInput", CzmlCartesian3PurePropInput);
app.component("CzmlCartesian3PxListPropInput", CzmlCartesian3PxListPropInput);
app.component("CzmlCartesian3PxPropInput", CzmlCartesian3PxPropInput);
app.component("CzmlCartesian3VelocityPropInput", CzmlCartesian3VelocityPropInput);

app.component("CzmlCartesian4ListPropInput", CzmlCartesian4ListPropInput);
app.component("CzmlCartesian4NFScalerPropInput", CzmlCartesian4NFScalerPropInput);
app.component("CzmlCartesian4PropInput", CzmlCartesian4PropInput);

app.component("CzmlCartographicRectanglePropInput", CzmlCartographicRectanglePropInput);

app.component("CzmlColorPropInput", CzmlColorPropInput);

app.component("CzmlCombinePropInput", CzmlCombinePropInput);
app.component("CzmlCombineSmPropInput", CzmlCombineSmPropInput);
app.component("CzmlCombineSelectSmPropInput", CzmlCombineSelectSmPropInput);

app.component("CzmlCustomPropertiesPropInput", CzmlCustomPropertiesPropInput);
app.component("CzmlEntityRender", CzmlEntityRender);

app.component("CzmlInterpolationPropInput", CzmlInterpolationPropInput);

app.component("CzmlMaterialPropInput", CzmlMaterialPropInput);

app.component("CzmlNumberFixedCntPropInput", CzmlNumberFixedCntPropInput);
app.component("CzmlNumberListPropInput", CzmlNumberListPropInput);
app.component("CzmlNumberPropInput", CzmlNumberPropInput);
app.component("CzmlNumberSliderPurePropInput", CzmlNumberSliderPurePropInput);

app.component("CzmlOptionsPurePropInput", CzmlOptionsPurePropInput);

app.component("CzmlPackagesRender", CzmlPackagesRender);
app.component("CzmlPositionPropInput", CzmlPositionPropInput);
app.component("CzmlQuaternionInterpolationPropInput", CzmlQuaternionInterpolationPropInput);
app.component("CzmlQuaternionPropInput", CzmlQuaternionPropInput);

app.component("CzmlReferencesPropInput", CzmlReferencesPropInput);

app.component("CzmlSphericalListPropInput", CzmlSphericalListPropInput);
app.component("CzmlSphericalPropInput", CzmlSphericalPropInput);

app.component("CzmlStringPropInput", CzmlStringPropInput);

app.component("CzmlTextPropInput", CzmlTextPropInput);

app.component("CzmlTimeCollectionPropInput", CzmlTimeCollectionPropInput);
app.component("CzmlTimeIntervalPropInput", CzmlTimeIntervalPropInput);
app.component("CzmlTimePurePropInput", CzmlTimePurePropInput);

app.component("CzmlUnitSphericalListPropInput", CzmlUnitSphericalListPropInput);
app.component("CzmlUnitSphericalPropInput", CzmlUnitSphericalPropInput);
app.component("CzmlUriPropInput", CzmlUriPropInput);
