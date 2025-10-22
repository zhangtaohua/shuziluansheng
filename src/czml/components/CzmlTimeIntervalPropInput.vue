<template>
  <div v-if="isEnable" class="col_nw_fs_fs props_container">
    <div class="row_nw_fs_ce props_title_box">
      <label class="row_nw_fs_ce props_ch_label">{{ props.vdata.labelZh }}</label>
      <label class="row_nw_fs_fe props_ogi_label">{{ props.vdata.labelEn }}</label>
    </div>

    <div class="col_nw_fs_fs props_it_box">
      <div class="col_nw_fs_fs props_it_itembox">
        <div class="row_nw_fs_ce props_it_tbox">
          <span class="row_nw_fs_ce props_it_tlabel">startTime:</span>
          <div class="row_nw_fs_ce props_it_tinputbox">
            <el-date-picker
              v-model="currentProp.startTime"
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
            <el-date-picker v-model="currentProp.endTime" type="datetime" placeholder="Select end datetime" />
          </div>
        </div>
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

  //  这个props 就是相当于 new czmlShowProp()的值
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

  onMounted(() => {
    init();
  });
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
</style>
