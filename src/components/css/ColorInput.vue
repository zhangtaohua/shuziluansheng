<template>
  <div class="col_nw_fs_fs props_container">
    <div class="row_nw_sb_ce props_box">
      <div class="row_nw_fs_ce wh_auto_100p">
        <label class="row_nw_fs_ce props_ch_label">{{ props.vdata.labelZh }}</label>
        <label class="row_nw_fs_fe props_ogi_label">{{ props.vdata.labelEn }}</label>
      </div>
    </div>
    <div class="row_nw_sb_ce prop_color_box" :class="{ prop_color_box_act: isActive }">
      <input
        type="text"
        v-model="state.color"
        class="row_nw_fs_center prop_color_input"
        @focus="setIsInputFoucsHd(true)"
        @blur="setIsInputFoucsHd(false)"
      />

      <div class="row_nw_sb_ce prop_color_btn" @click="setIsShowColorPP(!isShowColorPP)">
        <div class="prop_show_color" :style="{ background: state.color }"></div>
        <img src="@/assets/images/icons/colors.svg" alt="color" class="prop_color_btnshow" />
      </div>
      <div v-if="isShowColorPP" class="row_nw_ce_ce prop_color_popup" @mouseenter="clearDisTime" @mouseleave="hiddenOp">
        <Vue3ColorPicker
          v-model="state.color"
          :mode="props.colorMode"
          :showColorList="true"
          :showEyeDrop="true"
          type="RGBA"
          :showButtons="true"
          @onCancel="closeColorPP"
          @onSave="saveColorPP"
          @update:model-value="updateHandle"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, reactive, onMounted, computed } from "vue";
  // import { ColorPicker } from "vue3-colorpicker";
  // import "vue3-colorpicker/style.css";
  import { Vue3ColorPicker } from "@cyhnkckali/vue3-color-picker";
  const emit = defineEmits(["onChange"]);

  const props = defineProps({
    colorMode: {
      type: String,
      default: "solid", // solid | gradient
    },
    vdata: {
      type: Object,
      default() {
        return {
          labelZh: "背景颜色",
          labelEn: "background-color",
          name: "",
          color: "rgba(255, 0, 0, 0.9)",
          oldColor: "",
        };
      },
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
    name: "",
    color: "rgba(255, 0, 0, 0.9)",
  });

  function init() {
    if (props.vdata) {
      state.name = props.vdata.name;
      state.color = props.vdata.color;
    }
  }

  function setIsInputFoucsHd(isShow: boolean) {
    isInputFocus.value = isShow;
  }

  function setIsShowColorPP(isShow: boolean) {
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
    console.log("onChange", newColor, { name: state.name, value: state.color });
  }
</script>

<style scoped>
  .props_container {
    width: 100%;
    height: auto;
    background-color: transparent;
    touch-action: none !important;
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

  .prop_color_btn {
    width: 4.5rem;
    height: 100%;
    cursor: pointer;
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
  }
</style>
