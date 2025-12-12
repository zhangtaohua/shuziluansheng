<template>
  <div v-if="isEnable" class="col_nw_fs_fs props_container">
    <div class="row_nw_sb_ce props_title_box">
      <el-tooltip placement="top" effect="dark">
        <template #content>
          <div class="col_nw_fs_ce props_title_tipbox">
            <p v-if="currentProp.descriptionZh" class="props_ch_tiplabel">
              {{ currentProp.descriptionZh }}
            </p>
            <p class="props_ogi_tiplabel">
              {{ currentProp.description }}
            </p>
          </div>
        </template>
        <div class="row_nw_fs_ce wh_auto_100p">
          <label class="row_nw_fs_ce props_ch_label">{{ currentProp.labelZh }}</label>
          <label class="row_nw_fs_fe props_ogi_label">{{ currentProp.labelEn }}</label>
        </div>
      </el-tooltip>

      <div class="row_nw_fs_ce props_timecol_isusedbox">
        <RjBooleanSwitchInput v-model="currentProp.isUsed"></RjBooleanSwitchInput>
      </div>
    </div>

    <div class="col_nw_fs_fs props_radiobox">
      <div class="row_nw_fs_ce props_radiobox_title">
        <label class="row_nw_fs_ce props_radioch_label">角度单位: 弧度</label>
        <label class="row_nw_fs_fe props_radioogi_label">angles in radians</label>
      </div>
    </div>

    <div class="col_nw_fs_fs props_it_box">
      <div class="col_nw_fs_fs props_it_wrapper" :class="{ props_it_samllwrapper: isFoldIntervals }">
        <div class="col_nw_fs_fs props_it_inwrapper">
          <div v-for="(inval, index) in intervalsValues" :key="id + index" class="col_nw_fs_fs props_it_itembox">
            <div class="row_nw_fs_ce props_qtinput_linetime">
              <div class="row_nw_fs_ce props_qtinput_linetimeindex">SN:{{ index + 1 }}</div>
            </div>

            <div class="row_nw_fs_ce props_qtinput_line1">
              <div class="row_nw_fs_ce props_qtinput_itemlabelleft">Clock:</div>
              <div class="row_nw_fs_ce props_qtinput_itembox">
                <el-input v-model="inval[0]" placeholder="Please input" type="number" />
              </div>
              <div class="row_nw_fs_ce props_qtinput_itemlabelright">Cone:</div>
              <div class="row_nw_fs_ce props_qtinput_itembox">
                <el-input v-model="inval[1]" placeholder="Please input" type="number" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col_nw_fs_fs props_it_secondsactbox">
        <div class="row_nw_fs_ce props_it_secondssetbox">
          <div class="row_nw_fs_ce props_it_secondssetbox_lable">一次增加数量 count:</div>
          <el-input v-model="currentProp.secondsOnceAddCount" placeholder="Please input" type="number" min="1" />
        </div>
      </div>

      <div class="row_nw_fe_ce props_it_actbox">
        <el-tag type="info">{{ "Total: " + intervalsValues.length }}</el-tag>

        <el-icon
          v-if="isFoldIntervals"
          color="rgba(15, 55, 175, 1)"
          size="1.5rem"
          class="row_nw_ce_ce props_it_acticon"
          @click="setIsFoldIntervals(false)"
        >
          <CaretBottom />
        </el-icon>
        <el-icon
          v-else
          color="rgba(15, 55, 175, 1)"
          size="1.5rem"
          class="row_nw_ce_ce props_it_acticon"
          @click="setIsFoldIntervals(true)"
        >
          <CaretTop />
        </el-icon>

        <el-icon color="#f56c6c" size="1.25rem" class="row_nw_ce_ce props_it_acticon" @click="clearintervalsValues">
          <DeleteFilled />
        </el-icon>

        <el-icon
          :color="intervalsValues.length >= 2 ? 'rgba(15, 55, 175, 1)' : '#f56c6c'"
          size="1.5rem"
          class="row_nw_ce_ce props_it_acticon"
          :class="{ props_it_dis_action: intervalsValues.length <= 1 }"
          @click="popSecondsIntervalValue"
        >
          <RemoveFilled />
        </el-icon>
        <el-icon
          color="rgba(15, 55, 175, 1)"
          size="1.5rem"
          class="row_nw_ce_ce props_it_acticon2"
          @click="pushSecondsIntervalValue"
        >
          <CirclePlusFilled />
        </el-icon>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  // 说明： 这个主要用于设置 没有时间类型的 cartesian2  list 的值, 可能有一个元素,也可能有多个

  import { ref, onMounted, watch } from "vue";
  import RjBooleanSwitchInput from "@/components/form/RjBooleanSwitchInput.vue";

  import { cloneDeep } from "es-toolkit";
  import { isArray } from "es-toolkit/compat";
  import { nanoid } from "@/utils/common/nanoid";

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

  const id = nanoid(10);
  const currentProp = ref({});
  const isEnable = ref(false);
  const intervalsValues = ref([[0, 0]]);
  const isFoldIntervals = ref(false);

  function clearintervalsValues() {
    intervalsValues.value = [[0, 0]];
  }

  function setIsFoldIntervals(isFold: boolean) {
    isFoldIntervals.value = isFold;
  }

  const popSecondsIntervalValue = () => {
    if (isArray(intervalsValues.value)) {
      const { secondsOnceAddCount } = currentProp.value;
      for (let i = 0; i < +secondsOnceAddCount; i++) {
        if (intervalsValues.value.length >= 2) {
          intervalsValues.value.pop();
        }
      }
    }
  };

  const pushSecondsIntervalValue = () => {
    if (isArray(intervalsValues.value)) {
      const { secondsOnceAddCount } = currentProp.value;
      for (let i = 0; i < +secondsOnceAddCount; i++) {
        intervalsValues.value.push([0, 0]);
      }
    }
  };

  function init() {
    if (props.vdata && props.vdata.id && props.vdata.name) {
      isEnable.value = true;
      currentProp.value = props.vdata;
      intervalsValues.value = cloneDeep(currentProp.value.value);
    } else {
      isEnable.value = false;
      currentProp.value = {};
      intervalsValues.value = [[0, 0]];
    }
  }

  onMounted(() => {
    init();
  });

  watch(
    intervalsValues,
    () => {
      if (currentProp.value) {
        currentProp.value.value = intervalsValues.value;
      }
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

  .props_title_tipbox {
    width: auto;
    max-width: 30rem;
    height: auto;
  }

  .props_ch_tiplabel {
    width: 100%;
    height: 100%;
    color: rgba(0, 0, 0, 1);
    font-size: var(--czml-fs-tipvalue);
    font-weight: 500;
    margin-bottom: 0.25rem;
    line-height: 1rem;
    word-wrap: break-word;
    word-break: break-all;
  }

  .props_ogi_tiplabel {
    width: 100%;
    height: 100%;
    color: rgba(0, 0, 0, 1);
    font-size: var(--czml-fs-tipvalue);
    font-weight: 400;
    line-height: 1rem;
    word-wrap: break-word;
    word-break: break-all;
  }

  .props_title_box {
    width: 100%;
    height: 2rem;
    margin-bottom: 0.5rem;
  }

  .props_ch_label {
    width: max-content;
    height: 100%;
    color: rgba(255, 255, 255, 1);
    font-size: var(--czml-fs-pp-zh);
    font-weight: 500;
    margin-right: 0.5rem;
  }

  .props_ogi_label {
    width: max-content;
    height: 1rem;
    color: rgba(230, 230, 230, 1);
    font-size: var(--czml-fs-pp-en);
    font-weight: 400;
    margin-top: 0.25rem;
  }

  .props_map_actbox {
    position: relative;
    width: 100%;
    height: auto;
    background-color: rgba(0, 0, 0, 1);
    border-radius: 0.5rem;
    padding: 1rem;
    margin-top: 1rem;
    margin-bottom: 1rem;
  }

  .props_map_actitem {
    width: 1.5rem;
    height: 1.5rem;
    margin-right: 0.75rem;
    cursor: pointer;
  }

  .props_map_actitem_show {
    width: 100%;
    height: 100%;
  }

  .props_radiobox {
    width: 100%;
    height: auto;
  }

  .props_radiobox_title {
    width: 100%;
    height: auto;
    margin-bottom: 0.75rem;
  }

  .props_radioch_label {
    width: max-content;
    height: 100%;
    color: rgba(255, 255, 255, 1);
    font-size: 0.875rem;
    font-weight: 500;
    margin-right: 0.5rem;
  }

  .props_radioogi_label {
    width: max-content;
    height: 1rem;
    color: rgba(230, 230, 230, 1);
    font-size: 0.75rem;
    font-weight: 400;
    margin-top: 0.25rem;
  }

  .props_radioinbox {
    width: 100%;
    height: auto;
  }

  .props_qtinput_line1 {
    width: 100%;
    height: 2rem;
    margin-bottom: 0.5rem;
  }

  .props_qtinput_line2 {
    width: 100%;
    height: 2rem;
  }

  .props_qtinput_itemlabelleft {
    width: 5.75rem;
    height: 100%;
    color: rgba(255, 255, 255, 1);
    font-size: var(--czml-fs-sl-label);
    font-weight: bold;
    margin-right: 0.5rem;
  }

  .props_qtinput_itemlabelright {
    width: 5.75rem;
    height: 100%;
    color: rgba(255, 255, 255, 1);
    font-size: var(--czml-fs-sl-label);
    font-weight: bold;
    margin-right: 0.5rem;
    margin-left: 1rem;
  }

  .props_qtinput_itembox {
    width: calc(50% - 6.5rem);
    height: 100%;
  }

  .props_it_box {
    position: relative;
    width: 100%;
    height: auto;
    margin-bottom: 0.25rem;
    background-color: rgba(0, 0, 0, 1);
    padding: 1rem;
    border-radius: 0.5rem;
  }

  .props_it_wrapper {
    position: relative;
    width: calc(100% + 1rem);
    height: auto;
    max-height: 56rem;
    transition: all 0.3s;
    overflow-y: scroll;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
    box-shadow: 0 0.25rem 0.5rem -0.375rem rgba(255, 255, 255, 0.5);
  }

  .props_it_wrapper::-webkit-scrollbar {
    width: 0px; /*  设置纵轴（y轴）轴滚动条 */
    height: 0px; /*  设置横轴（x轴）轴滚动条 */
  }
  /* 滚动条滑块（里面小方块） */
  .props_it_wrapper::-webkit-scrollbar-thumb {
    border-radius: 10px;
    box-shadow: inset 0 0 5px rgba(255, 100, 102, 0.2);
    background: rgba(99, 100, 102, 1);
  }
  /* 滚动条轨道 */
  .props_it_wrapper::-webkit-scrollbar-track {
    border-radius: 0;
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: rgba(0, 0, 0, 0);
  }
  /* hover时显色 */
  .props_it_wrapper:hover::-webkit-scrollbar {
    width: 0.5rem;
    height: 0.5rem;
  }

  .props_it_inwrapper {
    width: calc(100% - 1rem);
    height: auto;
  }

  .props_it_wrapper:hover .props_it_inwrapper {
    width: calc(100% - 0.5rem);
  }

  .props_it_samllwrapper {
    height: 8.75rem;
    overflow-y: scroll;
  }

  .props_it_itembox {
    width: 100%;
    height: auto;
    margin-bottom: 0.75rem;
  }

  .props_qtinput_linetime {
    width: 100%;
    height: 2rem;
    margin-bottom: 0.5rem;
  }

  .props_qtinput_linetimeindex {
    width: calc(50% - 0.25rem);
    height: 100%;
    color: rgba(230, 230, 230, 1);
    font-size: 0.75rem;
    font-weight: 400;
    margin-left: 1rem;
  }

  .props_it_tbox {
    width: 100%;
    height: 2rem;
    margin-bottom: 0.25rem;
  }

  .props_it_tlabel {
    width: 4rem;
    height: 100%;
    color: rgba(255, 255, 255, 1);
    font-size: 0.875rem;
    font-weight: 500;
    margin-right: 0.5rem;
  }

  .props_it_tinputbox {
    width: max-content;
    height: 2rem;
  }

  .props_it_input_box {
    position: relative;
    width: 100%;
    height: 2rem;
    /* background-color: rgba(0, 0, 0, 1); */
  }

  .props_it_secondsactbox {
    width: 100%;
    height: auto;
    margin-top: 0.875rem;
    margin-bottom: 0.5rem;
  }

  .props_it_secondssetbox {
    width: 100%;
    height: 2rem;
    margin-top: 0.25rem;
    margin-bottom: 0.25rem;
  }

  .props_it_secondssetbox_lable {
    width: 15.5rem;
    height: 100%;
    color: rgba(255, 255, 255, 1);
    font-size: var(--czml-fs-label);
  }

  .props_it_actbox {
    width: 100%;
    height: 2rem;
    margin-top: 0.5rem;
  }

  .props_it_acticon {
    width: 1.5rem;
    height: 1.5rem;
    cursor: pointer;
    margin-right: 1rem;
  }

  .props_it_dis_action {
    cursor: not-allowed;
  }

  .props_it_acticon2 {
    width: 1.5rem;
    height: 1.5rem;
    cursor: pointer;
  }

  :deep(.props_it_actbox .el-tag) {
    margin-right: 0.75rem;
  }
</style>
