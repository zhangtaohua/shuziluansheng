<template>
  <div class="col_nw_fs_fs props_container">
    <div class="row_nw_sb_ce props_box">
      <div class="row_nw_fs_ce wh_auto_100p">
        <label class="row_nw_fs_ce props_ch_label">宽度</label>
        <label class="row_nw_fs_ce props_ogi_label">Width</label>
      </div>
      <div class="row_nw_fs_ce props_input_box" @mouseover="setIsShowArrow(true)" @mouseleave="setIsShowArrow(false)">
        <input
          v-model="state.value"
          class="row_nw_fs_fs props_input"
          type="number"
          min="0"
          max="100"
          step="1"
          placeholder="0"
          @focus="setIsShowArrow(true)"
          @input="onInput"
          @blur="onBlur"
        />
        <div v-show="isShowArrow" class="props_input_uparrow"></div>
        <div v-show="isShowArrow" class="props_input_downarrow"></div>
      </div>
    </div>
    <input type="range" min="0" max="50" value="0" class="props_input_slider" step="1" />
  </div>
</template>

<script setup lang="ts">
  import { ref, reactive, onMounted } from "vue";

  const emit = defineEmits(["onInput", "onBlur", "onChange"]);
  const props = defineProps({
    label: {
      type: String,
      default: "宽度",
    },
    initValue: {
      type: Object,
      default() {
        return {};
      },
    },
  });

  const state = reactive({
    name: "",
    value: "",
  });

  const isShowArrow = ref(false);

  function setIsShowArrow(isShow: boolean) {
    isShowArrow.value = isShow;
  }

  function init() {
    if (props.initValue && props.initValue.name) {
      state.name = props.initValue.name;
      state.value = props.initValue.value;
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

<style lang="scss" scoped>
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
    margin-right: 1rem;
  }

  .props_ogi_label {
    width: max-content;
    height: 100%;
    color: rgba(255, 255, 255, 1);
    font-size: 0.875rem;
    font-weight: 400;
  }

  .props_input_box {
    position: relative;
    width: 8rem;
    height: 100%;
    background-color: rgba(0, 0, 0, 1);
    border-radius: 0.25rem;
  }

  .props_input {
    align-self: flex-end;
    width: 6.5rem;
    height: 100%;
    padding: 0 0.5rem;
    color: rgba(255, 255, 255, 1);
    font-size: 0.875rem;
    background-color: transparent;
    border: none;
    outline: 1px solid red !important;
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

  // .props_input::-webkit-textfield-decoration-container {
  //   background-color: red;
  // }

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

  .props_input_slider {
    -webkit-appearance: none;
    appearance: none;
    width: 100%;
    height: 1.5rem;
    cursor: pointer;
    outline: none;
    overflow: hidden;
    border-radius: 16px;
    appearance: auto;
    color: light-dark(rgb(16, 16, 16), rgb(255, 255, 255));
    padding: initial;
    border: initial;
    outline: 1px solid red !important;
    margin-top: 0.5rem;
  }

  /* Track: webkit browsers */
  .props_input_slider::-webkit-slider-runnable-track {
    height: 12px;
    background: #444444;
    border-radius: 16px;
  }

  .props_input_slider::-moz-range-track {
    height: 12px;
    background: #ccc;
    border-radius: 16px;
  }

  /* Thumb: webkit */
  .props_input_slider::-webkit-slider-thumb {
    /* removing default appearance */
    -webkit-appearance: none;
    appearance: none;
    /* creating a custom design */
    height: 12px;
    width: 12px;
    background-color: #fff;
    border-radius: 50%;
    border: 2px solid #222;
    /*  slider progress trick  */
    box-shadow: -407px 0 0 400px #222;
  }

  /* Thumb: Firefox */
  .props_input_slider::-moz-range-thumb {
    height: 15px;
    width: 15px;
    background-color: #fff;
    border-radius: 50%;
    border: 1px solid #f50;
    /*  slider progress trick  */
    box-shadow: -407px 0 0 400px #f50;
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
