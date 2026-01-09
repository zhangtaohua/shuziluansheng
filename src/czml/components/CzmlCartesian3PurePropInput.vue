<template>
  <div v-if="isEnable" class="col_nw_fs_fs props_container">
    <div class="col_nw_fs_fs props_box">
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

      <div v-if="!currentProp.isFixedXyzUnitType" class="col_nw_fs_fs props_radiobox">
        <div class="row_nw_fs_ce props_radiobox_title">
          <label class="row_nw_fs_ce props_radioch_label">XYZ 单位</label>
          <label class="row_nw_fs_fe props_radioogi_label">XYZ Unit</label>
        </div>
        <div class="row_nw_fs_ce props_radioinbox">
          <RjRadioTabInput
            :name="currentProp.id"
            :options="currentProp.xyzUnitTypeOptions"
            :initValue="currentProp.xyzUnitType"
            @onChange="xyzUnitTypesOptionChangedHd"
          ></RjRadioTabInput>
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

        <div class="row_nw_fe_ce props_it_actbox">
          <el-icon
            v-if="pureValueIsViewDataPath"
            color="rgba(15, 55, 175, 1)"
            size="1.5rem"
            class="row_nw_ce_ce props_it_acticon"
            @click="setIsViewPath(false, 'pure')"
          >
            <Hide />
          </el-icon>
          <el-icon
            v-else
            color="rgba(15, 55, 175, 1)"
            size="1.5rem"
            class="row_nw_ce_ce props_it_acticon"
            @click="setIsViewPath(true, 'pure')"
          >
            <View />
          </el-icon>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  // 说明： 这个只能用来配合输入只有三个值的 Cartesian3
  import { ref, reactive, onMounted, computed, watch, nextTick } from "vue";
  import { useEditorConfigStore, globalEditor } from "@/stores/editorConfig";
  import { useCzmlMapDataConfigStore, globalCzmlMapData, MapDrawPointAction } from "@/stores/czmlMapDataConfig";
  import { cloneDeep } from "es-toolkit";
  import { nanoid } from "@/utils/common/nanoid";
  import {
    CZMLCARTESIAN3METERTYPE,
    CZMLCARTESIAN3DEGREESTYPE,
    CZMLCARTESIAN3RADIANSTYPE,
  } from "@/czml/schema/values/commondata.ts";

  import RjRadioTabInput from "@/components/form/RjRadioTabInput.vue";
  import RjBooleanSwitchInput from "@/components/form/RjBooleanSwitchInput.vue";

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
  const {
    czmlMapDataConfig,
    setCzmlMapCurrentAction,
    setCzmlMapCurrentDrawData,
    setCzmlMapViewDrawData,
    setCzmlIsViewDrawDataPath,
  } = useCzmlMapDataConfigStore();
  const currentProp = ref({});
  const isEnable = ref(false);
  const pureValue = ref([0, 0, 0]);

  const pureValueIsViewDataPath = ref(true);

  function setIsViewPath(isView: boolean, which: string) {
    if (which == "pure") {
      pureValueIsViewDataPath.value = isView;
      if (isView) {
        const coord = pureValue.value;
        setCzmlMapViewDrawData({
          type: "point",
          data: { x: coord[1], y: coord[2], z: coord[3] },
        });
      } else {
        setCzmlMapViewDrawData(null);
      }
    }
    setCzmlIsViewDrawDataPath(isView);
  }

  function setMapDrawActionHd(act: any) {
    setCzmlMapCurrentAction(act);
  }

  function xyzUnitTypesOptionChangedHd(value: string) {
    if (currentProp.value) {
      console.log("xyUnitTypesOptionChangedHd", value);
      currentProp.value.xyzUnitType = value;
      if (currentProp.value.xyzUnitType == CZMLCARTESIAN3METERTYPE) {
        pureValue.value = currentProp.value.allValues.cartesian;
      } else if (currentProp.value.xyzUnitType == CZMLCARTESIAN3DEGREESTYPE) {
        pureValue.value = currentProp.value.allValues.degrees;
      } else if (currentProp.value.xyzUnitType == CZMLCARTESIAN3RADIANSTYPE) {
        pureValue.value = currentProp.value.allValues.radians;
      }
    }
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
          if (currentProp.value.xyzUnitType == CZMLCARTESIAN3METERTYPE) {
            pureValue.value = cartesian;
          } else if (currentProp.value.xyzUnitType == CZMLCARTESIAN3DEGREESTYPE) {
            pureValue.value = degrees;
          } else if (currentProp.value.xyzUnitType == CZMLCARTESIAN3RADIANSTYPE) {
            pureValue.value = radians;
          }
          currentProp.value.allValues = {
            meter: cartesian,
            cartesian: cartesian,
            degrees: degrees,
            radians: radians,
          };
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

  .props_it_actbox {
    width: 100%;
    height: 2rem;
    margin-top: 1rem;
    box-shadow: 0 -0.25rem 0.5rem -0.375rem rgba(255, 255, 255, 0.5);
  }

  .props_it_acticon {
    width: 1.5rem;
    height: 1.5rem;
    cursor: pointer;
    margin-right: 1rem;
  }
</style>
