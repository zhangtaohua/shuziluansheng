<template>
  <div class="col_nw_fs_fs props_container">
    <div class="row_nw_sb_ce props_box">
      <div class="row_nw_fs_ce wh_auto_100p">
        <label class="row_nw_fs_ce props_ch_label">宽度</label>
        <label class="row_nw_fs_fe props_ogi_label">Width</label>
      </div>
    </div>
    <div class="row_nw_sb_ce prop_color_box">
      <input type="text" v-model="state.color" class="row_nw_fs_center prop_color_input" />

      <div class="row_nw_sb_ce prop_color_btn" @click="setIsShowColorPP(!isShowColorPP)">
        <div class="prop_show_color" :style="{borderColor: state.color}"></div>
        <img src="@/assets/images/icons/colors.svg" alt="color" class="prop_color_btnshow" />
      </div>
      <div v-if="colorMode === 'solid' && isShowColorPP" class="row_nw_ce_ce prop_color_popup">
        <Vue3ColorPicker v-model="state.color" mode="solid" :showColorList="true" :showEyeDrop="true" type="RGBA" :showButtons="true"
        @onCancel="closeColorPP" @onSave="setIsShowColorPP(false)" />
      </div>
      <div v-else-if="colorMode === 'gradient' && isShowColorPP" class="row_nw_ce_ce prop_color_popup">
        <Vue3ColorPicker v-model="state.color" mode="gradient" :showColorList="true" :showEyeDrop="true" type="RGBA" :showButtons="true"
        @onCancel="closeColorPP" @onSave="setIsShowColorPP(false)" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
// import { ColorPicker } from "vue3-colorpicker";
// import "vue3-colorpicker/style.css";
import {Vue3ColorPicker} from '@cyhnkckali/vue3-color-picker';
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
        name: "",
        color: "rgba(255, 0, 0, 0.9)",
      };
    },
  },
});

const isShowColorPP = ref(false);

const state = reactive({
  name: "",
  color: "rgba(255, 0, 0, 0.9)",
  oldColor: "rgba(255, 0, 0, 0.9)",
});


function init() {
  if (props.vdata) {
    state.name = props.vdata.name;
    state.color = props.vdata.color;
    state.oldColor = props.vdata.color;
  }
}

function setIsShowColorPP(isShow: boolean) {
  isShowColorPP.value = isShow;
  if (isShow) {
    state.oldColor = state.color;
  }
}

function closeColorPP() {
  isShowColorPP.value = false;
  state.color = state.oldColor;
}

onMounted(() => {
  init();
});

function updateHandle(newColor: any) {
  state.color = newColor;
  emit("onChange", { name: state.name, value: state.color });
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

.prop_color_box {
  position: relative;
  width: 100%;
  height: 2.5rem;
  background-color: rgba(0, 0, 0, 1);
  border-radius: 2.5rem;
}

.prop_color_input {
  width: calc(100% - 6rem);
  height: 100%;
  padding: 0 0.5rem;
  background-color: transparent;
  border: none;
  color: rgba(255, 255, 255, 1);
  font-size: 1rem;
  font-weight: 400;
  outline: none;
}

.prop_color_btn {
  width: 6rem;
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
  left: 0rem;
  z-index: 2;
}


</style>
