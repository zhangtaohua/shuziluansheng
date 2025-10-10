<template>
  <div v-if="props.vNodeData.isStart" :id="id" class="col_nw_center_center panel_container">
    <div v-if="props.vNodeData.drawType == MAP_DRAW_TEXT" class="col_nw_center_center panel_wrapper">
      <div v-if="props.vNodeData.status == 'tipStart'" class="row_nw_fs_center tip_title">点击开始</div>
      <div v-else-if="props.vNodeData.status == 'tipNext'" class="row_nw_fs_center tip_title">编辑文字</div>
    </div>
    <div v-else-if="props.vNodeData.drawType == MAP_DRAW_POINT" class="col_nw_center_center panel_wrapper">
      <div v-if="props.vNodeData.status == 'tipStart'" class="row_nw_fs_center tip_title">点击开始</div>
      <div v-else-if="props.vNodeData.status == 'tipNext'" class="row_nw_fs_center tip_title">绘制完成</div>
    </div>
    <div v-else-if="props.vNodeData.drawType == MAP_DRAW_SQUARE || props.vNodeData.drawType == MAP_DRAW_RECTANGLE
      || props.vNodeData.drawType == MAP_DRAW_GEOMETRY_CIRCLE
    " class="col_nw_center_center panel_wrapper">
      <div v-if="props.vNodeData.status == 'tipStart'" class="row_nw_fs_center tip_title">点击开始</div>
      <div v-else-if="props.vNodeData.status == 'tipNext'" class="row_nw_fs_center tip_title">点击完成</div>
    </div>
    <div v-else-if="props.vNodeData.drawType == MAP_DRAW_POLYGON || props.vNodeData.drawType == MAP_MEASURE_AREA
    " class="col_nw_center_center panel_wrapper">
      <div v-if="props.vNodeData.status == 'tipStart'" class="row_nw_fs_center tip_title">点击开始</div>
      <div v-else-if="props.vNodeData.status == 'tipNext' || props.vNodeData.status == 'tipEnd'"
        class="row_nw_fs_center tip_title">点击绘制下一点</div>
      <div v-if="props.vNodeData.status == 'tipEnd'" class="row_nw_fs_center tip_title">右击完成</div>
    </div>
    <div v-else-if="props.vNodeData.drawType == MAP_DRAW_LINE || props.vNodeData.drawType == MAP_MEASURE_DISTANCE
    " class="col_nw_center_center panel_wrapper">
      <div v-if="props.vNodeData.status == 'tipStart'" class="row_nw_fs_center tip_title">点击开始</div>
      <div v-else-if="props.vNodeData.status == 'tipNext' || props.vNodeData.status == 'tipEnd'"
        class="row_nw_fs_center tip_title">点击绘制下一点</div>
      <div v-if="props.vNodeData.status == 'tipEnd'" class="row_nw_fs_center tip_title">右击完成</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineComponent } from "vue";
import {
  MAP_DRAW_TEXT,
  MAP_DRAW_POINT,
  MAP_DRAW_SQUARE,
  MAP_DRAW_RECTANGLE,
  MAP_DRAW_POLYGON,
  MAP_DRAW_LINE,
  MAP_DRAW_CIRCLE,
  MAP_DRAW_GEOMETRY_CIRCLE,
  MAP_DRAW_GEODESIC_CIRCLE,
  MAP_MEASURE_DISTANCE,
  MAP_MEASURE_AREA,
  MAP_DRAW_CLEAR,
  popupType
} from "@/utils/map/geoConstant";

const props = defineProps({
  id: {
    type: String,
    default: "dc001",
  },
  customT: {
    type: Function,
    default: (name: string) => name,
  },
  destory: {
    type: Function,
    default: () => { },
  },
  vNodeData: {
    type: Object,
    default() {
      return {
        isStart: false,
        drawType: "",
        status: "tipStart",  // "tipStart", "tipNext", "tipEnd"
      };
    },
  },
})
</script>

<style scoped lang="scss">
.panel_container {
  position: absolute;
  z-index: 2;
  width: max-content;
  height: auto;
  border-radius: 0.25rem;
  background-color: rgba(54, 60, 69, 1);
  transform: translateX(calc(50% + 1.25rem)) translateY(calc(100% + 1.25rem));
}

.panel_wrapper {
  width: max-content;
  height: auto;
  background-color: rgba(54, 60, 69, 1);
}

.tip_title {
  width: 100%;
  height: 1.5rem;
  color: rgba(255, 255, 255, 1);
  font-size: 0.875rem;
  padding: 0 0.75rem;
  font-family: "Source Han Sans SC VF", "Source Han Sans SC VF";
  cursor: pointer;
}
</style>
