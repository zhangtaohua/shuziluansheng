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
        <label class="row_nw_fs_ce props_radioch_label">数值类型</label>
        <label class="row_nw_fs_fe props_radioogi_label">value type</label>
      </div>

      <div class="row_nw_fs_ce props_radioinbox">
        <RjRadioTabInput
          :name="currentProp.id"
          :options="currentProp.valueTypesOptions"
          :initValue="currentProp.valueType"
          @onChange="valueTypesOptionChangedHd"
        ></RjRadioTabInput>
      </div>
    </div>

    <div v-if="currentProp.valueType == 'PureValue'" class="row_nw_fs_ce props_input_box">
      <input
        type="checkbox"
        class="row_nw_fs_fs props_input"
        :checked="currentProp.value"
        :disabled="!currentProp.isEnable"
        @change="pureValueChangeHd"
      />
      <div class="row_nw_fs_ce wh_auto_100p">
        <label class="row_nw_fs_ce props_inch_label">使能显示</label>
        <label class="row_nw_fs_fe props_inogi_label">Enable Show</label>
      </div>
    </div>
    <div v-else-if="currentProp.valueType == 'Intervals'" class="col_nw_fs_fs props_it_box">
      <div class="col_nw_fs_fs props_it_wrapper" :class="{ props_it_samllwrapper: isFoldIntervals }">
        <div class="col_nw_fs_fs props_it_inwrapper">
          <div v-for="(inval, index) in intervalsValues" :key="id + index" class="col_nw_fs_fs props_it_itembox">
            <div class="row_nw_fs_ce props_it_tbox">
              <span class="row_nw_fs_ce props_it_tlabel">startTime:</span>
              <div class="row_nw_fs_ce props_it_tinputbox">
                <el-date-picker
                  v-model="inval.startTime"
                  type="datetime"
                  placeholder="Select start datetime"
                  :format="defaultTimeFormatStr"
                  :value-format="defaultTimeFormatStr"
                />
              </div>

              <div class="row_nw_fs_ce props_qtinput_linetimeindex">SN:{{ index + 1 }}</div>
            </div>

            <div class="row_nw_fs_ce props_it_tbox">
              <span class="row_nw_fs_ce props_it_tlabel">endTime:</span>
              <div class="row_nw_fs_ce props_it_tinputbox">
                <el-date-picker v-model="inval.endTime" type="datetime" placeholder="Select end datetime" />
              </div>
            </div>

            <div class="row_nw_fs_ce props_it_input_box">
              <input type="checkbox" v-model="inval.value" class="row_nw_fs_fs props_input" />
              <div class="row_nw_fs_ce wh_auto_100p">
                <label class="row_nw_fs_ce props_inch_label">使能显示</label>
                <label class="row_nw_fs_fe props_inogi_label">Enable Show</label>
              </div>
            </div>
          </div>
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
          @click="popIntervalValue"
        >
          <RemoveFilled />
        </el-icon>
        <el-icon
          color="rgba(15, 55, 175, 1)"
          size="1.5rem"
          class="row_nw_ce_ce props_it_acticon2"
          @click="pushIntervalValue"
        >
          <CirclePlusFilled />
        </el-icon>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  // 说明： 这个主要用于设置像 show 这样的属性，是否显示，还是按时间段显示

  import { ref, onMounted, watch, nextTick } from "vue";
  import RjRadioTabInput from "@/components/form/RjRadioTabInput.vue";
  import RjBooleanSwitchInput from "@/components/form/RjBooleanSwitchInput.vue";

  import { defaultTimeFormatStr } from "@/czml/schema/properties/commondata";
  import { cloneDeep } from "es-toolkit";
  import { isArray } from "es-toolkit/compat";
  import dayjs from "dayjs";
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
  const intervalsValues = ref([
    {
      startTime: dayjs().format(defaultTimeFormatStr),
      endTime: dayjs().format(defaultTimeFormatStr),
      value: true,
    },
  ]);
  const isFoldIntervals = ref(false);

  function clearintervalsValues() {
    intervalsValues.value = [
      {
        startTime: dayjs().format(defaultTimeFormatStr),
        endTime: dayjs().format(defaultTimeFormatStr),
        value: true,
      },
    ];
  }

  function setIsFoldIntervals(isFold: boolean) {
    isFoldIntervals.value = isFold;
  }

  function valueTypesOptionChangedHd(value: string) {
    if (currentProp.value) {
      currentProp.value.valueType = value;
    }
  }

  function pureValueChangeHd(event) {
    console.log("pureValueChangeHd", event, currentProp.value.value);
    if (currentProp.value) {
      currentProp.value.value = event.target.checked;
    }
  }

  function init() {
    if (props.vdata && props.vdata.id && props.vdata.name) {
      console.log("show_props", props.vdata);
      isEnable.value = true;
      currentProp.value = props.vdata;
    } else {
      isEnable.value = false;
      currentProp.value = {};
    }
  }

  const pushIntervalValue = () => {
    if (isArray(intervalsValues.value)) {
      const last = intervalsValues.value.length - 1;
      // console.log("last", last);
      intervalsValues.value.push({
        startTime: intervalsValues.value[last].endTime,
        endTime: dayjs().format(defaultTimeFormatStr),
        value: true,
      });
    }
  };

  const popIntervalValue = () => {
    if (isArray(intervalsValues.value)) {
      if (intervalsValues.value.length >= 2) {
        intervalsValues.value.pop();
      }
    }
  };

  onMounted(() => {
    init();
  });

  watch(
    () => currentProp.value.valueType,
    () => {
      nextTick(() => {
        console.log("currentProp.valueType", currentProp.value);
        if (currentProp.value && currentProp.value.valueType == "Intervals") {
          intervalsValues.value = cloneDeep(currentProp.value.value);
        } else {
          intervalsValues.value = [];
        }
      });
    },
    {
      immediate: false,
      deep: false,
    },
  );

  watch(
    intervalsValues,
    () => {
      if (currentProp.value && currentProp.value.valueType == "Intervals") {
        console.log("intervalsValues", intervalsValues.value);
        currentProp.value.value = intervalsValues.value;
      }
    },
    {
      immediate: false,
      deep: true,
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
    font-size: var(--czml-fs-ppl-zh);
    font-weight: 400;
    margin-right: 0.5rem;
  }

  .props_radioogi_label {
    width: max-content;
    height: 1rem;
    color: rgba(230, 230, 230, 1);
    font-size: var(--czml-fs-ppl-en);
    font-weight: 400;
    margin-top: 0.25rem;
  }

  .props_radioinbox {
    width: 100%;
    height: auto;
  }

  .props_input_box {
    position: relative;
    width: 100%;
    height: 3.5rem;
    background-color: rgba(0, 0, 0, 1);
    padding-top: 0.75rem;
    border-radius: 0 0 0.5rem 0.5rem;
  }

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
    margin: 0 0.25rem;
    background: none;
    box-shadow: none;
  }

  input[type="checkbox"]:focus {
    box-shadow: none;
  }

  input[type="checkbox"]:after {
    content: "";
    font-size: 0.5rem;
    font-weight: 400;
    line-height: 1.125rem;
    width: 2.25rem;
    height: 1.125rem;
    display: inline-block;
    background-color: rgba(122, 125, 129, 1);
    border-radius: 4.5rem;
    box-shadow: 0 0 0.75rem rgb(0 0 0 / 15%) inset;
  }

  input[type="checkbox"]:before {
    content: "";
    width: 0.875rem;
    height: 0.875rem;
    display: block;
    position: absolute;
    top: 0.125rem;
    left: 0.125rem;
    margin: 0;
    border-radius: 50%;
    background-color: #ffffff;
  }

  input[type="checkbox"]:checked:before {
    left: 1.25rem;
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
    background-color: rgba(15, 55, 175, 1);
  }

  input[type="checkbox"]:disabled {
    cursor: not-allowed;
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

  .props_inch_label {
    width: max-content;
    height: 100%;
    color: rgba(255, 255, 255, 1);
    font-size: var(--czml-fs-pp-zh);
    font-weight: 500;
    margin-right: 0.5rem;
  }

  .props_inogi_label {
    width: max-content;
    height: 1rem;
    color: rgba(230, 230, 230, 1);
    font-size: var(--czml-fs-pp-en);
    font-weight: 400;
    margin-top: 0.25rem;
  }

  .props_it_box {
    position: relative;
    width: 100%;
    height: auto;
    margin-bottom: 0.25rem;
    background-color: rgba(0, 0, 0, 1);
    padding: 1rem 0.5rem 0.5rem 0.5rem;
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

  .props_it_tbox {
    width: 100%;
    height: 2rem;
    margin-bottom: 0.25rem;
  }

  .props_it_tlabel {
    width: 4rem;
    height: 100%;
    color: rgba(255, 255, 255, 1);
    font-size: var(--czml-fs-label);
    font-weight: 500;
    margin-right: 0.5rem;
  }

  .props_it_tinputbox {
    width: calc(100% - 14rem);
    height: 2rem;
  }

  .props_it_input_box {
    position: relative;
    width: 100%;
    height: 2rem;
    /* background-color: rgba(0, 0, 0, 1); */
  }

  :deep(.props_it_tinputbox .el-input) {
    width: 100%;
  }

  .props_qtinput_linetimeindex {
    width: 8rem;
    height: 100%;
    color: rgba(230, 230, 230, 1);
    font-size: 0.75rem;
    font-weight: 400;
    margin-left: 1rem;
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
