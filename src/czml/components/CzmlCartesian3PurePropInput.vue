<template>
  <div v-if="isEnable" class="col_nw_fs_fs props_container" @mouseleave="setIsShowArrow(false)">
    <div class="col_nw_fs_fs props_box">
      <div class="row_nw_fs_ce props_lbox">
        <label class="row_nw_fs_ce props_ch_label">{{ currentProp.labelZh }}</label>
        <label class="row_nw_fs_fe props_ogi_label">{{ currentProp.labelEn }}</label>
      </div>

      <div class="col_nw_fs_ce props_input_box">
        <div class="row_nw_fs_ce props_qtinput_line1">
          <div class="row_nw_fs_ce props_qtinput_itemlabelleft">X:</div>
          <div class="row_nw_fs_ce props_qtinput_itembox">
            <el-input v-model="pureValue[0]" placeholder="Please input" />
          </div>
          <div class="row_nw_fs_ce props_qtinput_itemlabelright">Y:</div>
          <div class="row_nw_fs_ce props_qtinput_itembox">
            <el-input v-model="pureValue[1]" placeholder="Please input" />
          </div>
        </div>

        <div class="row_nw_fs_ce props_qtinput_line2">
          <div class="row_nw_fs_ce props_qtinput_itemlabelleft">Z:</div>
          <div class="row_nw_fs_ce props_qtinput_itembox">
            <el-input v-model="pureValue[2]" placeholder="Please input" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, reactive, onMounted, computed, watch, nextTick } from "vue";
  import { useEditorConfigStore, globalEditor } from "@/stores/editorConfig";
  import { cloneDeep } from "es-toolkit";

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
  const pureValue = ref([0, 0, 0]);

  const isShowArrow = ref(false);
  function setIsShowArrow(isShow: boolean) {
    isShowArrow.value = isShow;
  }

  function init() {
    if (props.vdata && props.vdata.id && props.vdata.name) {
      isEnable.value = true;
      currentProp.value = props.vdata;
      pureValue.value = cloneDeep(currentProp.value.value);
    } else {
      isEnable.value = false;
      currentProp.value = {};
      pureValue.value = [0, 0, 0];
    }

    console.log("czml_cartendian3_pure", currentProp.value);
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

  .props_box {
    width: 100%;
    height: auto;
  }

  .props_lbox {
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
    margin-left: 0.25rem;
  }

  .props_ogi_label {
    width: max-content;
    height: 1rem;
    color: rgba(200, 200, 200, 1);
    font-size: var(--czml-fs-pp-en);
    font-weight: 400;
  }

  .props_input_box {
    position: relative;
    width: 100%;
    height: auto;
    background-color: rgba(0, 0, 0, 1);
    border-radius: 0.5rem;
    padding: 1rem;
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
    width: 1.5rem;
    height: 100%;
    color: rgba(255, 255, 255, 1);
    font-size: 1rem;
    font-weight: bold;
    margin-right: 0.5rem;
  }

  .props_qtinput_itemlabelright {
    width: 1.5rem;
    height: 100%;
    color: rgba(255, 255, 255, 1);
    font-size: 1rem;
    font-weight: bold;
    margin-right: 0.5rem;
    margin-left: 1rem;
  }

  .props_qtinput_itembox {
    width: calc(50% - 2.25rem);
    height: 100%;
  }
</style>
