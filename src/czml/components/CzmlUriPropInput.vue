<template>
  <div v-if="isEnable" class="col_nw_fs_fs props_container">
    <div class="row_nw_fs_ce props_title_box">
      <label class="row_nw_fs_ce props_ch_label">{{ props.vdata.labelZh }}</label>
      <label class="row_nw_fs_fe props_ogi_label">{{ props.vdata.labelEn }}</label>
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
      <span class="row_nw_fs_ce props_input_stitle">Uri:</span>
      <div class="row_nw_ce_ce props_input_sbox" :class="{ props_input_sbox_act: isPureFocus }">
        <input
          class="props_input"
          v-model="currentProp.value"
          @focus="setIsPureFoucus(true)"
          @blur="setIsPureFoucus(false)"
        />
      </div>
    </div>
    <div v-else-if="currentProp.valueType == 'Intervals'" class="col_nw_fs_fs props_it_box">
      <div v-for="(inval, index) in intervalsVales" :key="inval.startTime" class="col_nw_fs_fs props_it_itembox">
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
        </div>

        <div class="row_nw_fs_ce props_it_tbox">
          <span class="row_nw_fs_ce props_it_tlabel">endTime:</span>
          <div class="row_nw_fs_ce props_it_tinputbox">
            <el-date-picker v-model="inval.endTime" type="datetime" placeholder="Select end datetime" />
          </div>
        </div>

        <div class="row_nw_fs_ce props_it_input_box">
          <span class="row_nw_fs_ce props_it_tlabel">Uri:</span>
          <div class="row_nw_ce_ce props_input_sbox" :class="{ props_input_sbox_act: focusIndex == index }">
            <input class="props_input" v-model="inval.value" @focus="setIsFoucus(index)" @blur="setIsFoucus(-999)" />
          </div>
        </div>
      </div>

      <div class="row_nw_fe_ce props_it_actbox">
        <el-icon
          :color="intervalsVales.length >= 2 ? 'rgba(15, 55, 175, 1)' : '#f56c6c'"
          size="1.5rem"
          class="row_nw_ce_ce props_it_acticon"
          :class="{ props_it_dis_action: intervalsVales.length <= 1 }"
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
  import { ref, reactive, onMounted, computed, watch, nextTick } from "vue";
  import { useEditorConfigStore, globalEditor } from "@/stores/editorConfig";
  import RjRadioTabInput from "@/components/form/RjRadioTabInput.vue";
  import { defaultTimeFormatStr } from "@/czml/schema/properties/commondata";
  import { cloneDeep } from "es-toolkit";
  import { isArray } from "es-toolkit/compat";
  import dayjs from "dayjs";

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
  const currentProp = ref({});
  const isEnable = ref(false);
  const intervalsVales = ref([]);
  const focusIndex = ref(-999);
  const isPureFocus = ref(false);

  function valueTypesOptionChangedHd(value: string) {
    if (currentProp.value) {
      currentProp.value.valueType = value;
    }
  }

  // 暂未用上
  function pureValueChangeHd(event) {
    console.log("pureValueChangeHd", event, currentProp.value.value);
    if (currentProp.value) {
      currentProp.value.value = event.target.checked;
    }
  }

  function init() {
    if (props.vdata && props.vdata.id && props.vdata.name) {
      console.log("uri_props", props.vdata);
      isEnable.value = true;
      currentProp.value = props.vdata;
    } else {
      isEnable.value = false;
      currentProp.value = {};
    }
  }

  const pushIntervalValue = () => {
    if (isArray(intervalsVales.value)) {
      const last = intervalsVales.value.length - 1;
      console.log("last", last);
      intervalsVales.value.push({
        startTime: intervalsVales.value[last].endTime,
        endTime: dayjs().format(defaultTimeFormatStr),
        boolean: true,
      });
    }
  };

  const popIntervalValue = () => {
    if (isArray(intervalsVales.value)) {
      if (intervalsVales.value.length >= 2) {
        intervalsVales.value.pop();
      }
    }
  };

  function setIsFoucus(index: number) {
    focusIndex.value = index;
  }

  function setIsPureFoucus(isFos: boolean) {
    isPureFocus.value = isFos;
  }
  onMounted(() => {
    init();
  });

  watch(
    () => currentProp.value.valueType,
    () => {
      nextTick(() => {
        console.log("currentProp.valueType", currentProp.value);
        if (currentProp.value && currentProp.value.valueType == "Intervals") {
          intervalsVales.value = cloneDeep(currentProp.value.value);
        } else {
          intervalsVales.value = [];
        }
      });
    },
    {
      immediate: false,
      deep: false,
    },
  );

  watch(
    intervalsVales,
    () => {
      if (currentProp.value && currentProp.value.valueType == "Intervals") {
        console.log("intervalsVales", intervalsVales.value);
        currentProp.value.value = intervalsVales.value;
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

  .props_input_box {
    position: relative;
    width: 100%;
    height: 4rem;
    background-color: rgba(0, 0, 0, 1);
    border-radius: 0 0 0.5rem 0.5rem;
    padding: 0.5rem 0.5rem 0 0.5rem;
  }

  .props_input_stitle {
    width: 4rem;
    height: 100%;
    color: rgba(255, 255, 255, 1);
    font-size: 0.875rem;
  }

  .props_input_sbox {
    position: relative;
    width: calc(100% - 4rem);
    height: 2rem;
    margin-left: 0.125rem;
    outline: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 0.25rem;
  }

  .props_input_sbox_act {
    outline: 1px solid rgba(15, 55, 175, 1);
  }

  .props_input_sbox_disabled {
    outline: 1px solid rgba(15, 55, 175, 0.5);
    cursor: not-allowed;
  }

  .props_input {
    align-self: flex-start;
    width: 100%;
    height: 2rem;
    padding: 0.5rem 0.5rem;
    color: rgba(255, 255, 255, 1);
    font-size: 0.875rem;
    background-color: transparent;
    font-weight: 400;
    border: none;
    line-height: 1.75rem;
    -moz-appearance: textfield;
    resize: none;
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

  .props_it_box {
    position: relative;
    width: 100%;
    height: auto;
    margin-bottom: 0.25rem;
    background-color: rgba(0, 0, 0, 1);
    padding: 1rem 0.5rem 0.5rem 0.5rem;
    border-radius: 0.5rem;
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
</style>
