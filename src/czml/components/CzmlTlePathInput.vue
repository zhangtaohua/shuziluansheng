<template>
  <div class="col_nw_fs_fs tle_container">
    <div class="row_nw_sb_ce tle_tbox">
      <div class="row_nw_fs_ce tle_title">
        <label class="row_nw_fs_ce tle_ch_label">使用Tle生成路径</label>
        <label class="row_nw_fs_fe tle_ogi_label">use Tle to generate path</label>
      </div>

      <div class="row_nw_ce_ce tle_action_box">
        <el-button type="primary" size="small" @click="generatePath" :disabled="!tle1 || !tle2">生成</el-button>
      </div>
    </div>

    <div class="col_nw_fs_fs tle_it_box">
      <div class="row_nw_fs_ce tle_line1">
        <div class="row_nw_fs_ce tle_line_label">tle1:</div>
        <el-input v-model="tle1" placeholder="Please input" type="text" />
      </div>
      <div class="row_nw_fs_ce tle_line1">
        <div class="row_nw_fs_ce tle_line_label">tle2:</div>
        <el-input v-model="tle2" placeholder="Please input" type="text" />
      </div>

      <div class="row_nw_fs_ce tle_line1">
        <div class="row_nw_fs_ce tle_line_label">count:</div>
        <el-input v-model="count" placeholder="Please input" type="number" />
      </div>

      <div class="row_nw_fs_ce tle_line1">
        <div class="row_nw_fs_ce tle_line_label">startTime:</div>
        <div class="row_nw_fs_ce tle_line_datebox">
          <el-date-picker
            v-model="startTime"
            type="datetime"
            placeholder="Select start datetime"
            :format="defaultTimeFormatStr"
            :value-format="defaultTimeFormatStr"
          />
        </div>
      </div>

      <div class="row_nw_fs_ce tle_line2">
        <div class="row_nw_fs_ce tle_line_label">endTime:</div>
        <div class="row_nw_fs_ce tle_line_datebox">
          <el-date-picker
            v-model="endTime"
            type="datetime"
            placeholder="Select start datetime"
            :format="defaultTimeFormatStr"
            :value-format="defaultTimeFormatStr"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from "vue";
  import SatelliteOrbit from "@/utils/map/satellite/orbit";
  import dayjs from "dayjs";
  import { defaultTimeFormatStr } from "@/czml/schema/values/commondata.ts";

  const emit = defineEmits(["generatePath"]);
  const tle1 = ref("54216U 22143A   26014.81534950  .00011697  00000-0  14132-3 0  9996");
  const tle2 = ref("54216  41.4652 175.6948 0011406 285.7845  74.1736 15.60511354158646");
  const count = ref(64);

  const startTime = ref(dayjs().format(defaultTimeFormatStr));
  const endTime = ref(dayjs().add(1, "day").format(defaultTimeFormatStr));

  function generatePath() {
    if (tle1.value && tle2.value) {
      const orbitIns = new SatelliteOrbit(tle1.value, tle2.value);
      const seconds = dayjs(endTime.value).diff(dayjs(startTime.value), "second");
      const timeInterval = seconds / count.value;
      console.log("timeInterval", seconds, timeInterval);
      // const lnglatDatas = orbitIns.getOrbitDatasEciWithTime(startTime.value, endTime.value, timeInterval * 1000);
      const lnglatDatas = orbitIns.getOrbitDatas(startTime.value, endTime.value, timeInterval * 1000);

      emit("generatePath", {
        tle1: tle1.value,
        tle2: tle2.value,
        count: count.value,
        startTime: startTime.value,
        endTime: endTime.value,
        timeInterval,
        lnglatDatas,
      });
    }
  }
</script>

<style scoped>
  .tle_container {
    width: 100%;
    height: auto;
    background-color: rgba(0, 0, 0, 1);
    margin-bottom: 0.875rem;
    padding: 0.75rem;
    border-radius: 0.5rem;
  }

  .tle_tbox {
    width: 100%;
    height: 2rem;
  }

  .tle_title {
    width: max-content;
    height: auto;
    margin-bottom: 0.75rem;
  }

  .tle_ch_label {
    width: max-content;
    height: 100%;
    color: rgba(255, 255, 255, 1);
    font-size: 0.875rem;
    font-weight: 500;
    margin-right: 0.5rem;
  }

  .tle_ogi_label {
    width: max-content;
    height: 1rem;
    color: rgba(230, 230, 230, 1);
    font-size: 0.75rem;
    font-weight: 400;
    margin-top: 0.25rem;
  }

  .tle_action_box {
    width: max-content;
    height: 100%;
  }

  .tle_it_box {
    width: 100%;
    height: auto;
    margin-top: 0.5rem;
  }

  .tle_line1 {
    width: 100%;
    height: 2rem;
    margin-bottom: 0.5rem;
  }

  .tle_line2 {
    width: 100%;
    height: 2rem;
  }

  .tle_line_label {
    width: 5rem;
    height: 100%;
    color: rgba(255, 255, 255, 1);
    font-size: var(--czml-fs-sl-label);
    font-weight: 400;
    margin-right: 0.5rem;
    flex-shrink: 0;
  }

  .tle_line_datebox {
    width: calc(100% - 5.5rem);
    height: 100%;
    flex-shrink: 0;
  }

  :deep(.tle_line_datebox .el-input) {
    width: 100%;
  }
</style>
