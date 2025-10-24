<template>
  <div v-if="isEnable" class="col_nw_fs_fs props_container">
    <div class="col_nw_fs_fs props_box">
      <div class="row_nw_fs_ce props_lbox">
        <label class="row_nw_fs_ce props_ch_label">{{ currentProp.labelZh }}</label>
        <label class="row_nw_fs_fe props_ogi_label">{{ currentProp.labelEn }}</label>
      </div>

      <div class="row_nw_fs_ce props_map_actbox">
        <div
          v-for="mapTool in mapTools"
          :key="mapTool.id"
          class="row_nw_ce_ce props_map_actitem"
          @click="setMapDrawActionHd(mapTool)"
        >
          <el-tooltip :content="mapTool.tipEn" placement="bottom">
            <img class="props_map_actitem_show" :src="mapTool.image" alt="pic" />
          </el-tooltip>
        </div>
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
  import { useCzmlMapDataConfigStore, globalCzmlMapData, MapDrawPointAction } from "@/stores/czmlMapDataConfig";
  import { cloneDeep } from "es-toolkit";
  import { nanoid } from "@/utils/common/nanoid";
  import {
    CZMLCARTESIAN3TYPE,
    CZMLCARTESIAN3DEGREESTYPE,
    CZMLCARTESIAN3RADIANSTYPE,
  } from "@/czml/schema/properties/commondata";

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

  const dataKeyId = nanoid(10);

  const mapTools = ref([
    {
      ...MapDrawPointAction,
      id: dataKeyId,
    },
  ]);

  const { editorConfig, setEditorRefreshShape } = useEditorConfigStore();
  const { czmlMapDataConfig, setCzmlMapCurrentAction, setCzmlMapCurrentData } = useCzmlMapDataConfigStore();
  const id = "";
  const name = "";
  const currentProp = ref({});
  const isEnable = ref(false);
  const pureValue = ref([0, 0, 0]);

  function setMapDrawActionHd(act: any) {
    setCzmlMapCurrentAction(act);
  }

  watch(
    () => czmlMapDataConfig.currentDataRefresh,
    () => {
      if (czmlMapDataConfig.currentDataRefresh) {
        console.log("解析获取值");
        if (czmlMapDataConfig.currentDataId == dataKeyId) {
          // 解析获取值
          const data = globalCzmlMapData.drawData;
          const { cartesian, id, degrees, radians } = data;
          if (currentProp.value.valueType == CZMLCARTESIAN3TYPE) {
            pureValue.value = cartesian;
          } else if (currentProp.value.valueType == CZMLCARTESIAN3DEGREESTYPE) {
            pureValue.value = degrees;
          } else if (currentProp.value.valueType == CZMLCARTESIAN3RADIANSTYPE) {
            pureValue.value = radians;
          }
          console.log("解析获取值", data);
        }
      }
    },
    {
      deep: false,
      immediate: false,
    },
  );

  watch(
    pureValue,
    () => {
      if (currentProp.value) {
        console.log("pureValue", pureValue.value);
        currentProp.value.value = pureValue.value;
      }
    },
    {
      immediate: false,
      deep: false,
    },
  );

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
    font-size: var(--czml-fs-sl-label);
    font-weight: bold;
    margin-right: 0.5rem;
  }

  .props_qtinput_itemlabelright {
    width: 1.5rem;
    height: 100%;
    color: rgba(255, 255, 255, 1);
    font-size: var(--czml-fs-sl-label);
    font-weight: bold;
    margin-right: 0.5rem;
    margin-left: 1rem;
  }

  .props_qtinput_itembox {
    width: calc(50% - 2.25rem);
    height: 100%;
  }
</style>
