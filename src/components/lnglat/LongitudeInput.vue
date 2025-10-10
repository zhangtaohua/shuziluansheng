<template>
  <!-- 通用经度输入组件 -->
  <div class="row_nw_fs_center label_input_containner">
    <div v-if="isWidthGap" class="wgap_30"></div>
    <div class="row_nw_fs_center label_box" :style="titleStyle">
      <!-- <div class="label_necessary row_nw_center_center">{{ isNecessary? necessaryLabel : "" }}</div> -->
      <div v-if="isNecessary" class="label_necessary row_nw_center_center">{{ necessaryLabel }}</div>
      <div class="label_title row_nw_fe_center">{{ titleLabel }}</div>
    </div>
    <div class="row_nw_fs_center input_box" :style="inputWidthStyle">
      <LongitudeBaseInput />
    </div>
  </div>
</template>

<script setup lang="ts">
import LongitudeBaseInput from "./LongitudeBaseInput.vue";
</script>

<style scoped>
.label_input_containner {
  width: 100%;
  height: 33px;
}

.wgap_30 {
  width: 1.875rem;
  height: 100%;
}

.label_box {
  width: 90px;
  height: 33px;
}

.label_necessary {
  width: 14px;
  height: 33px;
  color: #ff3939;
  font-size: 14px;
  line-height: 33px;
}

.label_title {
  width: auto;
  height: 33px;
  color: #f0f1f5;
  font-size: 14px;
}

.input_box {
  width: 200px;
  background-color: transparent;
}
</style>
