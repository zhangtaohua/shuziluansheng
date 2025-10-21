<template>
  <div v-if="isEnable" class="col_nw_fs_fs props_container" @mouseleave="setIsShowArrow(false)">
    <div class="row_nw_sb_ce props_box">
      <div class="row_nw_fs_ce props_lbox">
        <label class="row_nw_fs_ce props_ch_label">{{ currentProp.labelZh }}</label>
        <label class="row_nw_fs_fe props_ogi_label">{{ currentProp.labelEn }}</label>
      </div>

      <div class="row_nw_fs_ce props_input_nbox">
        <div
          class="row_nw_fs_ce props_input_box"
          :class="{ props_input_box_act: isShowArrow, props_input_box_disabled: !currentProp.isEnable }"
          @mouseover="setIsShowArrow(true)"
        >
          <input
            type="number"
            v-model="currentProp.value"
            :min="currentProp.min"
            :max="currentProp.max"
            :step="currentProp.step"
            class="row_nw_fs_fs props_input"
            @focus="setIsShowArrow(true)"
            @blur="onBlur"
            :disabled="!currentProp.isEnable"
          />
          <div v-show="isShowArrow && currentProp.isEnable" class="props_input_uparrow" @click="plusNumber"></div>
          <div v-show="isShowArrow && currentProp.isEnable" class="props_input_downarrow" @click="reduceNuber"></div>
        </div>
      </div>
    </div>

    <div class="row_nw_ce_ce props_input_sbox" @mouseover="setIsShowArrow(true)">
      <div class="props_input_slider_after"></div>
      <div class="props_input_slider_outbefore">
        <div
          class="props_input_slider_before"
          :class="{ props_input_slider_before_disabled: !currentProp.isEnable }"
          :style="sliderBStyle"
        ></div>
      </div>
      <input
        type="range"
        v-model="currentProp.value"
        :min="currentProp.min"
        :max="currentProp.max"
        :step="currentProp.step"
        class="props_input_slider"
        @change="sliderChangeHd"
        :disabled="!currentProp.isEnable"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, reactive, onMounted, computed, watch, nextTick } from "vue";
  import { useEditorConfigStore, globalEditor } from "@/stores/editorConfig";

  const props = defineProps({
    vdata: {
      type: Object,
      default() {
        return {
          id: "",
          name: "",
        };
      },
    },
  });

  const { editorConfig, setEditorRefreshShape } = useEditorConfigStore();
  const id = "";
  const name = "";
  const currentProp = ref({});
  const isEnable = ref(false);

  const sliderBStyle = computed(() => {
    if (currentProp.value) {
      const per =
        ((currentProp.value.value - currentProp.value.min) / (currentProp.value.max - currentProp.value.min)) * 100;
      if (per >= 0 && per <= 100) {
        return {
          width: per + "%",
        };
      } else {
        return {
          width: "0%",
        };
      }
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
    if (props.vdata && props.vdata.id && props.vdata.name) {
      isEnable.value = true;
      currentProp.value = props.vdata;
    } else {
      isEnable.value = false;
      currentProp.value = {};
    }

    console.log("czml_number_slide", currentProp.value);
  }

  onMounted(() => {
    init();
  });

  function plusNumber() {
    if (currentProp.value && currentProp.value.isEnable) {
      const oldValue = currentProp.value.value;
      let newValue = +(currentProp.value.value + currentProp.value.step).toFixed(1);
      if (newValue > currentProp.value.max) {
        newValue = currentProp.value.max;
      }
      if (oldValue === newValue) {
        return;
      }
      currentProp.value.value = newValue;
    }
  }

  function reduceNuber() {
    if (currentProp.value && currentProp.value.isEnable) {
      const oldValue = currentProp.value.value;
      let newValue = +(currentProp.value.value - currentProp.value.step).toFixed(1);
      if (newValue < currentProp.value.min) {
        newValue = currentProp.value.min;
      }
      if (oldValue === newValue) {
        return;
      }
      currentProp.value.value = newValue;
    }
  }

  function onBlur() {
    isShowArrow.value = false;
  }

  function sliderChangeHd() {
    if (currentProp.value && currentProp.value.isEnable) {
      currentProp.value.value = +currentProp.value.value;
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
    height: 2.5rem;
  }

  .props_lbox {
    width: max-content;
    height: 100%;
  }

  .props_ch_label {
    width: max-content;
    height: 100%;
    color: rgba(255, 255, 255, 1);
    font-size: 1rem;
    font-weight: 500;
    margin-right: 0.5rem;
    margin-left: 0.25rem;
  }

  .props_ogi_label {
    width: max-content;
    height: 1rem;
    color: rgba(200, 200, 200, 1);
    font-size: 0.875rem;
    font-weight: 400;
  }

  .props_input_nbox {
    width: max-content;
    height: 2.5rem;
  }

  .props_input_box {
    position: relative;
    width: 7.5rem;
    height: calc(100% - 0.25rem);
    background-color: rgba(0, 0, 0, 1);
    border-radius: 2rem;
    margin-right: 0.5rem;
    margin-left: 0.125rem;
  }

  .props_input_box_act {
    outline: 1px solid rgba(15, 55, 175, 1);
  }

  .props_input_box_disabled {
    outline: 1px solid rgba(15, 55, 175, 0.5);
    cursor: not-allowed;
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

  .props_input:disabled {
    cursor: not-allowed;
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
    color: rgba(200, 200, 200, 1);
    font-size: 0.875rem;
    font-weight: 400;
    margin-right: 0.5rem;
    padding-top: 0.5rem;
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

  .props_input_slider_before_disabled {
    background-color: rgba(15, 55, 175, 0.5);
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

  .props_input_slider:disabled {
    cursor: not-allowed;
  }
</style>
