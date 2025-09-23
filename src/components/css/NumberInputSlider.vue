<template>
  <div class="col_nw_fs_fs props_container" @mouseleave="setIsShowArrow(false)">
    <div class="row_nw_fs_ce props_box">
      <div class="row_nw_fs_ce wh_auto_100p">
        <label class="row_nw_fs_ce props_ch_label">{{ props.vdata.labelZh }}</label>
        <label class="row_nw_fs_fe props_ogi_label">{{ props.vdata.labelEn }}</label>
      </div>
    </div>

    <div class="row_nw_sb_ce props_input_nbox">
      <div class="row_nw_fs_ce wh_auto_100p">
        <div
          class="row_nw_fs_ce props_input_box"
          :class="{ props_input_box_act: isShowArrow }"
          @mouseover="setIsShowArrow(true)"
        >
          <input
            type="number"
            v-model="state.value"
            :min="state.min"
            :max="state.max"
            :step="state.step"
            class="row_nw_fs_fs props_input"
            placeholder="0"
            @focus="setIsShowArrow(true)"
            @blur="onBlur"
          />
          <div v-show="isShowArrow" class="props_input_uparrow" @click="plusNumber"></div>
          <div v-show="isShowArrow" class="props_input_downarrow" @click="reduceNuber"></div>
        </div>
        <div v-show="state.unit == 'px'" class="row_nw_fs_ce props_input_rem">{{ rem }}</div>
      </div>

      <div class="row_nw_fs_ce prop_input_wraper">
        <div v-for="(item, index) in unitOptions" :key="'radio_' + index" class="row_nw_fs_ce radio_content">
          <input
            :id="item.id"
            v-model="state.unit"
            class="radio_input"
            type="radio"
            name="cssUnit"
            :value="item.value"
            @change="updateMinMax"
          />
          <label
            :for="item.id"
            class="row_nw_fs_ce radio_label"
            :class="{ radio_label_checked: item.value === state.unit }"
          >
            <span class="radio_span" :class="{ radio_span_checked: item.value === state.unit }"></span>
            {{ item.title }}
          </label>
        </div>
      </div>
    </div>
    <div class="row_nw_ce_ce props_input_sbox" @mouseover="setIsShowArrow(true)">
      <div class="props_input_slider_after"></div>
      <div class="props_input_slider_outbefore">
        <div class="props_input_slider_before" :style="sliderBStyle"></div>
      </div>
      <input
        type="range"
        v-model="state.value"
        :min="state.min"
        :max="state.max"
        :step="state.step"
        class="props_input_slider"
        @change="sliderChangeHd"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, reactive, onMounted, computed, watch, nextTick } from "vue";

  const emit = defineEmits(["onChange"]);

  const props = defineProps({
    vdata: {
      type: Object,
      default() {
        return {
          labelZh: "预览",
          labelEn: "Enable Preview",
          name: "",
          value: "",
          // min: 0,
          // max: 5000,
          // step: 1,
        };
      },
    },
  });

  const rem = computed(() => {
    return (state.value / 16).toFixed(3) + "rem";
  });

  const unitOptions = [
    { id: "px", value: "px", title: "px" },
    { id: "percent", value: "percent", title: "%" },
    { id: "vw", value: "vw", title: "vw" },
    { id: "vh", value: "vh", title: "vh" },
  ];

  const state = reactive({
    name: "",
    value: 0,
    min: 0,
    max: 5000,
    step: 1,
    unit: "px",
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

  function updateMinMax() {
    if (props.vdata.min === undefined) {
      state.min = 0;
    } else {
      state.min = +props.vdata.min;
    }

    if (props.vdata.max === undefined) {
      if (state.unit === "px") {
        state.max = 5000;
      } else {
        state.max = 300;
      }
      if (state.value > state.max) {
        state.value = state.max;
      }
    } else {
      state.max = +props.vdata.max;
    }

    if (props.vdata.step === undefined) {
      state.step = 1;
    } else {
      state.step = +props.vdata.step;
    }
  }

  function init() {
    if (props.vdata && props.vdata.name) {
      state.name = props.vdata.name;
      state.value = props.vdata.value;

      if (props.vdata.unit === undefined) {
        state.unit = "px";
      } else {
        state.unit = props.vdata.unit;
      }
      updateMinMax();
    }
  }

  onMounted(() => {
    init();
  });

  function plusNumber() {
    const oldValue = state.value;
    let newValue = state.value + state.step;
    if (newValue > state.max) {
      newValue = state.max;
    }
    if (oldValue === newValue) {
      return;
    }
    state.value = newValue;
  }

  function reduceNuber() {
    const oldValue = state.value;
    let newValue = state.value - state.step;
    if (newValue < state.min) {
      newValue = state.min;
    }
    if (oldValue === newValue) {
      return;
    }
    state.value = newValue;
  }

  function onBlur() {
    isShowArrow.value = false;
  }

  function sliderChangeHd() {
    state.value = +state.value;
  }

  watch(
    state,
    () => {
      console.log("onChange", {
        name: state.name,
        value: +state.value,
        remValue: state.value / 16,
        unit: state.unit,
      });
    },
    {
      immediate: false,
      deep: false,
    },
  );
</script>

<style scoped>
  .props_container {
    width: 100%;
    height: auto;
    background-color: transparent;
  }

  .props_box {
    width: 100%;
    height: 1.5rem;
  }

  .props_ch_label {
    width: max-content;
    height: 100%;
    color: rgba(255, 255, 255, 1);
    font-size: 0.875rem;
    font-weight: 500;
    margin-right: 0.5rem;
    margin-left: 0.25rem;
  }

  .props_ogi_label {
    width: max-content;
    height: 1rem;
    color: rgba(230, 230, 230, 1);
    font-size: 0.75rem;
    font-weight: 400;
  }

  .props_input_nbox {
    width: 100%;
    height: 2.5rem;
  }

  .props_input_box {
    position: relative;
    width: 7.5rem;
    height: 100%;
    background-color: rgba(0, 0, 0, 1);
    border-radius: 2rem;
    margin-right: 0.5rem;
    margin-left: 0.125rem;
  }

  .props_input_box_act {
    outline: 1px solid rgba(15, 55, 175, 1);
  }

  .props_input {
    align-self: flex-end;
    width: 5.5rem;
    height: 100%;
    padding: 0 0.5rem;
    color: rgba(255, 255, 255, 1);
    font-size: 0.875rem;
    background-color: transparent;
    font-weight: 600;
    border: none;
    -moz-appearance: textfield;
    margin-left: 0.25rem;
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
    right: 0.375rem;
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
    right: 0.375rem;
    width: 0px;
    height: 0px;
    border-right: 0.5rem solid transparent;
    border-top: 0.5rem solid rgba(255, 255, 255, 1);
    border-left: 0.5rem solid transparent;
    cursor: pointer;
  }

  .props_input_rem {
    width: max-content;
    height: 100%;
    color: rgba(255, 255, 255, 0.8);
    font-size: 0.75rem;
    font-weight: 400;
    margin-right: 0.5rem;
  }

  .prop_input_wraper {
    width: max-content;
    height: 100%;
    min-height: 2rem;
    flex-wrap: wrap;
    background-color: transparent;
    align-self: flex-end;
  }

  .radio_content {
    width: auto;
    height: 2rem;
    margin: 0 0.625rem 0 0.25rem;
    background-color: transparent;
    cursor: pointer;
  }

  .radio_input {
    display: none;
  }

  .radio_label {
    color: rgba(255, 255, 255, 0.8);
    font-weight: 400;
    font-size: 0.875rem;
    cursor: pointer;
  }

  .radio_span {
    width: 1rem;
    height: 1rem;
    margin: 0 0.375rem 0 0;
    border: 1px solid rgba(255, 255, 255, 0.5);
    border-radius: 50%;
    cursor: pointer;
    transition: 0.2s;
  }

  .radio_label:hover .radio_span {
    transform: scale(1.2);
    border: 1px solid rgba(255, 255, 255, 0.8);
    cursor: pointer;
  }

  .radio_span_checked {
    background: rgba(15, 55, 175, 1);
    box-shadow: 0 0 0 0.125rem rgba(255, 255, 255, 1) inset;
    border: none;
    cursor: pointer;
  }

  .radio_label_checked {
    color: rgba(255, 255, 255, 1);
    font-weight: 500;
    font-size: 0.875rem;
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
    width: calc(100% - 1.5rem);
    height: 0.75rem;
    background-color: transparent;
    border-radius: 1rem 0 0 1rem;
    z-index: 2;
  }

  .props_input_slider_before {
    width: 0%;
    height: 100%;
    background-color: rgba(15, 55, 175, 1);
    border-radius: 1rem 0 0 1rem;
  }

  .props_input_slider_after {
    position: absolute;
    top: 50%;
    left: 0.5rem;
    transform: translateY(-50%);
    width: calc(100% - 1rem);
    height: 0.75rem;
    border-radius: 1rem;
    background-color: rgba(122, 125, 129, 1);
    z-index: 1;
  }

  .props_input_slider {
    -webkit-appearance: none;
    appearance: none;
    width: calc(100% - 1rem);
    height: 100%;
    cursor: pointer;
    /* outline: 1px solid purple !important; */
    outline: none;
    padding: initial;
    border: initial;
    z-index: 3;
  }

  /* Track: webkit browsers */
  .props_input_slider::-webkit-slider-runnable-track {
    height: 0.875rem;
    background: rgba(0, 0, 0, 0);
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
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 1);
    /*  slider progress trick  */
    /* x 偏移量 | y 偏移量 | 阴影模糊半径 | 阴影扩散半径 | 阴影颜色 */
    /* box-shadow: -125rem -125rem 0 125rem rgba(255, 255, 0, 1); */
    transition: 0.2s;
    /* 點選放大時候的漸變時間 */
    cursor: grabbing;
    position: relative;
    bottom: 0.0625rem;
  }

  .props_input_slider:active::-webkit-slider-thumb {
    transform: scale(1.2);
    transition: 0.2s;
  }
</style>
