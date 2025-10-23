<template>
  <div v-if="isEnable" class="col_nw_fs_fs props_container">
    <div class="row_nw_sb_ce props_title_box">
      <div class="row_nw_fs_ce wh_auto_100p">
        <label class="row_nw_fs_ce props_ch_label">{{ currentProp.labelZh }}</label>
        <label class="row_nw_fs_fe props_ogi_label">{{ currentProp.labelEn }}</label>
      </div>

      <div class="row_nw_fs_ce props_timecol_isusedbox">
        <RjBooleanSwitchInput v-model="currentProp.isUsed"></RjBooleanSwitchInput>
      </div>
    </div>
    <div class="col_nw_fs_fs props_it_box">
      <div v-for="inval in intervalsVales" :key="inval.startTime" class="col_nw_fs_fs props_it_itembox">
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
  import RjBooleanSwitchInput from "@/components/form/RjBooleanSwitchInput.vue";
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
  const id = "";
  const name = "";
  const currentProp = ref({});
  const isEnable = ref(false);
  const intervalsVales = ref([]);

  function init() {
    if (props.vdata && props.vdata.id && props.vdata.name) {
      isEnable.value = true;
      currentProp.value = props.vdata;
      intervalsVales.value = cloneDeep(currentProp.value.value);
    } else {
      isEnable.value = false;
      currentProp.value = {};
      intervalsVales.value = [];
    }
  }

  const pushIntervalValue = () => {
    if (isArray(intervalsVales.value)) {
      const last = intervalsVales.value.length - 1;
      console.log("last", last);
      intervalsVales.value.push({
        // startTime: intervalsVales.value[last].endTime,
        startTime: dayjs().format(defaultTimeFormatStr),
        endTime: dayjs().format(defaultTimeFormatStr),
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

  onMounted(() => {
    init();
  });

  watch(
    intervalsVales,
    () => {
      if (currentProp.value) {
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

  .props_timecol_isusedbox {
    width: 10rem;
    height: 100%;
    margin-right: 0.25rem;
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
    margin-bottom: 1rem;
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
