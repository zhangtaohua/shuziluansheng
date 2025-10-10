<template>
  <div
    class="row_nw_sb_ce prop_color_box"
    :class="{ prop_color_box_act: isActive, props_input_box_disabled: props.disabled }"
  >
    <input
      type="text"
      v-model="state.color"
      class="row_nw_fs_center prop_color_input"
      :disabled="props.disabled"
      @focus="setIsInputFoucsHd(true)"
      @blur="setIsInputFoucsHd(false)"
    />

    <div
      class="row_nw_sb_ce prop_color_btn"
      :class="{ prop_color_btn_disabled: props.disabled }"
      @click="setIsShowColorPP(!isShowColorPP)"
    >
      <div class="prop_show_color" :style="{ background: state.color }"></div>
      <img src="@/assets/images/icons/colors.svg" alt="color" class="prop_color_btnshow" />
    </div>
    <div v-if="isShowColorPP" class="row_nw_ce_ce prop_color_popup" @mouseenter="clearDisTime" @mouseleave="hiddenOp">
      <Vue3ColorPicker
        v-model="state.color"
        theme="dark"
        :mode="props.colorMode"
        :showColorList="true"
        :showEyeDrop="true"
        type="RGBA"
        @onCancel="closeColorPP"
        @onSave="saveColorPP"
        @update:model-value="updateHandle"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, reactive, onMounted, computed } from "vue";
  // import { ColorPicker } from "vue3-colorpicker";
  // import "vue3-colorpicker/style.css";
  import { Vue3ColorPicker } from "@cyhnkckali/vue3-color-picker";
  import chroma from "chroma-js";

  const emit = defineEmits(["onChange"]);

  const props = defineProps({
    colorMode: {
      type: String,
      default: "solid", // solid | gradient
    },
    color: {
      type: String,
      default: "rgba(255, 0, 0, 0.9)",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  });

  const isShowColorPP = ref(false);
  const isInputFocus = ref(false);

  const isActive = computed(() => {
    if (isShowColorPP.value) {
      return true;
    }
    if (isInputFocus.value) {
      return true;
    }
    return false;
  });

  const state = reactive({
    color: "rgba(255, 0, 0, 0.5)",
  });

  function init() {
    if (props.color) {
      state.color = props.color;
    }
  }

  function setIsInputFoucsHd(isShow: boolean) {
    if (props.disabled) {
      return null;
    }
    isInputFocus.value = isShow;
    //  如果是线性的判断不准确
    // TODO
    // if (!chroma.valid(state.color)) {
    //   init();
    // }
    if (!isShow) {
      emit("onChange", state.color);
    }
  }

  function setIsShowColorPP(isShow: boolean) {
    if (props.disabled) {
      return null;
    }
    isShowColorPP.value = isShow;
  }

  function closeColorPP(color) {
    isShowColorPP.value = false;
    // state.color = color;
  }

  function saveColorPP(color) {
    isShowColorPP.value = false;
    // state.color = color;
  }

  let disTime = null;
  function clearDisTime() {
    if (disTime) {
      clearTimeout(disTime);
      disTime = null;
    }
  }

  function hiddenOp() {
    clearDisTime();
    disTime = setTimeout(() => {
      isShowColorPP.value = false;
    }, 3000);
  }

  onMounted(() => {
    init();
  });

  function updateHandle(newColor: any) {
    state.color = newColor;
    emit("onChange", state.color);
  }
</script>

<style scoped>
  .prop_color_box {
    position: relative;
    width: calc(100% - 0.25rem);
    height: 2.5rem;
    background-color: rgba(0, 0, 0, 1);
    border-radius: 2.5rem;
    margin-left: 0.125rem;
  }

  .prop_color_box_act {
    outline: 1px solid rgba(15, 55, 175, 1);
  }

  .props_input_box_disabled {
    background-color: rgba(0, 0, 0, 0.3);
    cursor: not-allowed;
  }

  .props_input_box_disabled:hover {
    outline: none;
  }

  .prop_color_input {
    width: calc(100% - 5rem);
    height: 100%;
    padding: 0 0.5rem;
    background-color: transparent;
    border: none;
    color: rgba(255, 255, 255, 1);
    font-size: 1rem;
    font-weight: 400;
    /* outline: 1px solid red !important; */
    outline: none;
    margin-left: 0.125rem;
  }

  .prop_color_input:disabled {
    cursor: not-allowed;
  }

  .prop_color_btn {
    width: 4.5rem;
    height: 100%;
    cursor: pointer;
  }

  .prop_color_btn_disabled {
    cursor: not-allowed;
  }

  .prop_show_color {
    width: 2rem;
    height: 2rem;
  }

  .prop_color_btnshow {
    width: 2rem;
    height: 2rem;
  }

  .prop_color_popup {
    position: absolute;
    width: max-content;
    height: auto;
    top: 3rem;
    right: 0rem;
    z-index: 2;
    touch-action: none !important;
    border-radius: 0.5rem;
    border: 1px solid rgba(15, 55, 175, 1);
  }
</style>
