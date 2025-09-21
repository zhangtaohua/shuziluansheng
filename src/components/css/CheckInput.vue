<template>
  <div class="col_nw_fs_fs props_container">
    <div class="row_nw_sb_ce props_box">
      <div class="row_nw_fs_ce wh_auto_100p">
        <label class="row_nw_fs_ce props_ch_label">宽度</label>
        <label class="row_nw_fs_fe props_ogi_label">Width</label>
      </div>
      <div class="row_nw_fs_ce props_input_box" @mouseover="setIsShowArrow(true)" @mouseleave="setIsShowArrow(false)">
        <input type="number"  v-model="state.value"  :min="state.min" :max="state.max" :step="state.step"
          class="row_nw_fs_fs props_input"
          placeholder="0" @focus="setIsShowArrow(true)" @input="onInput" @blur="onBlur" @change="onChange" />
        <div v-show="isShowArrow" class="props_input_uparrow" @click="plusNumber"></div>
        <div v-show="isShowArrow" class="props_input_downarrow" @click="reduceNuber"></div>
      </div>
    </div>
    <div class="row_nw_ce_ce props_input_sbox">
      <div class="props_input_slider_after"></div>
      <div class="props_input_slider_outbefore">
        <div class="props_input_slider_before" :style="sliderBStyle"></div>
      </div>
      <input type="range" v-model="state.value" :min="state.min" :max="state.max" :step="state.step"
       class="props_input_slider"  />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, computed } from "vue";

const emit = defineEmits(["onInput", "onBlur", "onChange"]);

const props = defineProps({
  vdata: {
    type: Object,
    default() {
      return {
        name: "",
        value: "",
      };
    },
  },
});

const state = reactive({
  name: "",
  value: 0,
  min: 0,
  max: 100,
  step: 2,
});

const sliderBStyle = computed(() => {
  const per = ((state.value - state.min) / (state.max - state.min)) * 100;
  if (per >= 0 && per <= 100) {
    return {
      width: per + "%",
    };
  } else {
    return {
      width: "0%",
    };
  }
});



const isShowArrow = ref(false);
function setIsShowArrow(isShow: boolean) {
  isShowArrow.value = isShow;
}

function init() {
  if (props.vdata && props.vdata.name) {
    state.name = props.vdata.name;
    state.value = props.vdata.value;
  }
}

onMounted(() => {
  init();
});

function onInput() {
  if (state.name && state.value) {
    emit("onInput", {
      name: state.name,
      values: state.value,
    });
  }
}

function plusNumber() {
  const oldValue = state.value;
  let newValue = state.value + state.step;
  if(newValue > state.max) {
    newValue = state.max;
  }
  if(oldValue === newValue) {
    return;
  }
  state.value = newValue;
  onInput();
  onChange();
}

function reduceNuber() {
  const oldValue = state.value;
  let newValue = state.value - state.step;
  if(newValue < state.min) {
    newValue = state.min;
  }
  if(oldValue === newValue) {
    return;
  }
  state.value = newValue;
  onInput();
  onChange();
}

function onChange() {
  if (state.name && state.value) {
    emit("onChange", {
      name: state.name,
      values: state.value,
    });
  }
}

function onBlur() {
  isShowArrow.value = false;
  if (state.name && state.value) {
    emit("onBlur", {
      name: state.name,
      values: state.value,
    });
  }
}
</script>

<style scoped>
.props_container {
  width: 100%;
  height: auto;
  background-color: transparent;
}

.props_box {
  width: 100%;
  height: 2rem;
}

.props_ch_label {
  width: max-content;
  height: 100%;
  color: rgba(255, 255, 255, 1);
  font-size: 1rem;
  font-weight: 500;
  margin-right: 0.5rem;
}

.props_ogi_label {
  width: max-content;
  height: 1rem;
  color: rgba(230, 230, 230, 1);
  font-size: 0.75rem;
  font-weight: 400;
  margin-top: 0.25rem;
}

.props_input_box {
  position: relative;
  width: 7rem;
  height: 100%;
  background-color: rgba(0, 0, 0, 1);
  border-radius: 0.25rem;
}

.props_input {
  align-self: flex-end;
  width: 5.5rem;
  height: 100%;
  padding: 0 0.5rem;
  color: rgba(255, 255, 255, 1);
  font-size: 0.875rem;
  background-color: transparent;
  border: none;
  -moz-appearance: textfield;
}

.props_input::placeholder {
  display: flex;
  flex-direction: row;
  place-items: center flex-start;
  padding: 0;
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.875rem;
}

 /* .props_input::-webkit-textfield-decoration-container {
   background-color: red;
} */

.props_input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}

.props_input::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.props_input_uparrow {
  position: absolute;
  top: 0.25rem;
  right: 0.125rem;
  width: 0px;
  height: 0px;
  border-right: 0.5rem solid transparent;
  border-bottom: 0.5rem solid rgba(255, 255, 255, 1);
  border-left: 0.5rem solid transparent;
  cursor: pointer;
}

.props_input_downarrow {
  position: absolute;
  bottom: 0.25rem;
  right: 0.125rem;
  width: 0px;
  height: 0px;
  border-right: 0.5rem solid transparent;
  border-top: 0.5rem solid rgba(255, 255, 255, 1);
  border-left: 0.5rem solid transparent;
  cursor: pointer;
}

.props_input_sbox {
  position: relative;
  width: 100%;
  height: 2rem;
  margin-top: 0.5rem;
  background-color: transparent;
}

.props_input_slider_outbefore {
  position: absolute;
  top: 50%;
  left: 0.5rem;
  transform: translateY(-50%);
  width: calc(100% - 1rem);
  height: 0.75rem;
  background-color: transparent;
  border-radius: 1rem;
  z-index: 2;
}

.props_input_slider_before {
  width: 0%;
  height: 100%;
  background-color: rgba(255, 44, 255, 1);
  border-radius: 1rem;
}

.props_input_slider_after{
  position: absolute;
  top: 50%;
  left: 0.5rem;
  transform: translateY(-50%);
  width: calc(100% - 1rem);
  height: 0.75rem;
  border-radius: 1rem;
  background-color: rgba(255, 255, 44, 1);
  z-index: 1;
}

.props_input_slider {
  position: relative;
  -webkit-appearance: none;
  appearance: none;
  width: calc(100% - 0.5rem);
  height: 100%;
  cursor: pointer;
  outline: none;
  overflow: hidden;
  padding: initial;
  border: initial;
  z-index: 3;
}

/* Track: webkit browsers */
.props_input_slider::-webkit-slider-runnable-track {
  height: 0.875rem;
  background: rgba(44, 44, 44, 0);
  border-radius: 1rem;
}

/* Thumb: webkit */
.props_input_slider::-webkit-slider-thumb {
  /* removing default appearance */
  -webkit-appearance: none;
  appearance: none;
  /* creating a custom design */
  height: 1rem;
  width: 1rem;
  background-color: rgba(255, 44, 44, 1);
  border-radius: 50%;
  border: 1px solid rgba(255, 44, 44, 1);
  /*  slider progress trick  */
  /* x 偏移量 | y 偏移量 | 阴影模糊半径 | 阴影扩散半径 | 阴影颜色 */
  /* box-shadow: -125rem -125rem 0 125rem rgba(255, 255, 0, 1); */
  transition: .2s;
  /* 點選放大時候的漸變時間 */
  cursor: grabbing;
}

.props_input_slider:active::-webkit-slider-thumb {
  transform: scale(1.2);
  transition: .2s;
}


/**
 * Checkbox Toggle UI
 */
input[type="checkbox"] {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;

  -webkit-tap-highlight-color: transparent;

  width: auto;
  height: auto;
  vertical-align: middle;
  position: relative;
  border: 0;
  outline: 0;
  cursor: pointer;
  margin: 0 4px;
  background: none;
  box-shadow: none;
}

input[type="checkbox"]:focus {
  box-shadow: none;
}

input[type="checkbox"]:after {
  content: "";
  font-size: 8px;
  font-weight: 400;
  line-height: 18px;
  width: 36px;
  height: 18px;
  display: inline-block;
  background-color: #a7aaad;
  border-radius: 72px;
  box-shadow: 0 0 12px rgb(0 0 0 / 15%) inset;
}

input[type="checkbox"]:before {
  content: "";
  width: 14px;
  height: 14px;
  display: block;
  position: absolute;
  top: 2px;
  left: 2px;
  margin: 0;
  border-radius: 50%;
  background-color: #ffffff;
}

input[type="checkbox"]:checked:before {
  left: 20px;
  margin: 0;
  background-color: #ffffff;
}

input[type="checkbox"],
input[type="checkbox"]:before,
input[type="checkbox"]:after,
input[type="checkbox"]:checked:before,
input[type="checkbox"]:checked:after {
  transition: ease 0.15s;
}

input[type="checkbox"]:checked:after {
  background-color: var(--color-primary);
}

.has-cube-spin-animation {
  animation: spin 10s infinite linear;
  display: block;
}

@keyframes spin {
  from {
    transform: rotateX(0deg) rotateY(-45deg);
  }

  to {
    transform: rotateX(0deg) rotateY(-405deg);
  }
}
</style>
