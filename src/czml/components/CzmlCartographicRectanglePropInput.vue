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

    <div v-if="!currentProp.isFixedXyzUnitType" class="col_nw_fs_fs props_radiobox_pp">
      <div class="row_nw_fs_ce props_radiobox_title">
        <label class="row_nw_fs_ce props_radioch_label">单位</label>
        <label class="row_nw_fs_fe props_radioogi_label">Unit</label>
      </div>
      <div class="row_nw_fs_ce props_radioinbox">
        <RjRadioInput
          :name="'rectunit_' + currentProp.id"
          :options="currentProp.xyzUnitTypeOptions"
          :initValue="currentProp.xyzUnitType"
          @onChange="unitTypesOptionChangedHd"
        ></RjRadioInput>
      </div>
    </div>

    <div class="col_nw_fs_fs props_radiobox">
      <div class="row_nw_fs_ce props_radiobox_title">
        <label class="row_nw_fs_ce props_radioch_label">值是否含有时间标记</label>
        <label class="row_nw_fs_fe props_radioogi_label">is with time-tagged</label>
      </div>
      <div class="row_nw_fs_ce props_radioinbox">
        <RjRadioTabInput
          :name="'time_' + currentProp.id"
          :options="currentProp.timeTypeOptions"
          :initValue="currentProp.timeType"
          :isRefresh="refreshTimeTypeFlag"
          @onChange="timeTypesOptionChangedHd"
        ></RjRadioTabInput>
      </div>
    </div>

    <div v-if="currentProp.timeType == CZMLPUREVALUE" class="col_nw_fs_fs props_it_box">
      <div class="col_nw_fs_fs props_it_wrapper" :class="{ props_it_samllwrapper: isFoldIntervals }">
        <div class="col_nw_fs_fs props_it_inwrapper">
          <div class="col_nw_fs_fs props_it_itembox">
            <div class="row_nw_fs_ce props_qtinput_line1">
              <div class="row_nw_fs_ce props_qtinput_itemlabelleft">WLng(L):</div>
              <div class="row_nw_fs_ce props_qtinput_itembox">
                <el-input v-model="pureValueShow[0]" placeholder="Please input" type="number" />
              </div>
              <div class="row_nw_fs_ce props_qtinput_itemlabelright">SLat(B):</div>
              <div class="row_nw_fs_ce props_qtinput_itembox">
                <el-input v-model="pureValueShow[1]" placeholder="Please input" type="number" />
              </div>
            </div>

            <div class="row_nw_fs_ce props_qtinput_line2">
              <div class="row_nw_fs_ce props_qtinput_itemlabelleft">ELng(R):</div>
              <div class="row_nw_fs_ce props_qtinput_itembox">
                <el-input v-model="pureValueShow[2]" placeholder="Please input" type="number" />
              </div>
              <div class="row_nw_fs_ce props_qtinput_itemlabelright">NLat(T):</div>
              <div class="row_nw_fs_ce props_qtinput_itembox">
                <el-input v-model="pureValueShow[2]" placeholder="Please input" type="number" />
              </div>
            </div>
          </div>
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
    <div v-else-if="currentProp.timeType == CZMLTIMESECONDS" class="col_nw_fs_fs props_it_box">
      <div class="col_nw_fs_fs props_it_wrapper">
        <div class="col_nw_fs_fs props_it_inwrapper">
          <div v-for="(inval, index) in intervalsValuesShow" :key="id + index" class="col_nw_fs_fs props_it_itembox">
            <div class="row_nw_fs_ce props_qtinput_linetime">
              <div class="row_nw_fs_ce props_qtinput_linetimelabel">秒 seconds:</div>
              <div class="row_nw_fs_ce props_qtinput_linetimeinputbox">
                <el-input v-model="inval[0]" placeholder="Please input" type="number" />
              </div>

              <div class="row_nw_fs_ce props_qtinput_linetimeindex">SN:{{ index + 1 }}</div>
            </div>
            <div class="row_nw_fs_ce props_qtinput_line1">
              <div class="row_nw_fs_ce props_qtinput_itemlabelleft">WLng(L):</div>
              <div class="row_nw_fs_ce props_qtinput_itembox">
                <el-input v-model="inval[1]" placeholder="Please input" type="number" />
              </div>
              <div class="row_nw_fs_ce props_qtinput_itemlabelright">SLat(B):</div>
              <div class="row_nw_fs_ce props_qtinput_itembox">
                <el-input v-model="inval[2]" placeholder="Please input" type="number" />
              </div>
            </div>

            <div class="row_nw_fs_ce props_qtinput_line2">
              <div class="row_nw_fs_ce props_qtinput_itemlabelleft">ELng(R):</div>
              <div class="row_nw_fs_ce props_qtinput_itembox">
                <el-input v-model="inval[3]" placeholder="Please input" type="number" />
              </div>
              <div class="row_nw_fs_ce props_qtinput_itemlabelright">NLat(T):</div>
              <div class="row_nw_fs_ce props_qtinput_itembox">
                <el-input v-model="inval[4]" placeholder="Please input" type="number" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col_nw_fs_fs props_it_secondsactbox">
        <div class="row_nw_fs_ce props_it_secondssetbox">
          <div class="row_nw_fs_ce props_it_secondssetbox_lable">开始秒数 start seconds:</div>
          <el-input v-model="currentProp.secondsStart" placeholder="Please input" type="number" min="0" />
        </div>
        <div class="row_nw_fs_ce props_it_secondssetbox">
          <div class="row_nw_fs_ce props_it_secondssetbox_lable">秒数步长 step:</div>
          <el-input v-model="currentProp.secondsStep" placeholder="Please input" type="number" min="0" />
        </div>

        <div class="row_nw_fs_ce props_it_secondssetbox">
          <div class="row_nw_fs_ce props_it_secondssetbox_lable">一次增加数量 count:</div>
          <el-input v-model="currentProp.secondsOnceAddCount" placeholder="Please input" type="number" min="1" />
        </div>
      </div>

      <div class="row_nw_fe_ce props_it_actbox">
        <el-tag type="info">{{ "Total: " + intervalsValuesShow.length }}</el-tag>

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

        <el-icon
          v-if="intervalsIsViewDataPath"
          color="rgba(15, 55, 175, 1)"
          size="1.5rem"
          class="row_nw_ce_ce props_it_acticon"
          @click="setIsViewPath(false, 'seconds')"
        >
          <Hide />
        </el-icon>
        <el-icon
          v-else
          color="rgba(15, 55, 175, 1)"
          size="1.5rem"
          class="row_nw_ce_ce props_it_acticon"
          @click="setIsViewPath(true, 'seconds')"
        >
          <View />
        </el-icon>

        <el-icon color="#f56c6c" size="1.25rem" class="row_nw_ce_ce props_it_acticon" @click="clearintervalsValues">
          <DeleteFilled />
        </el-icon>

        <el-icon
          :color="intervalsValuesShow.length >= 2 ? 'rgba(15, 55, 175, 1)' : '#f56c6c'"
          size="1.5rem"
          class="row_nw_ce_ce props_it_acticon"
          :class="{ props_it_dis_action: intervalsValuesShow.length <= 1 }"
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

    <div v-else-if="currentProp.timeType == CZMLTIMESTRING" class="col_nw_fs_fs props_it_box">
      <div class="col_nw_fs_fs props_it_wrapper" :class="{ props_it_samllwrapper: isFoldTimestrIntervals }">
        <div class="col_nw_fs_fs props_it_inwrapper">
          <div
            v-for="(inval, index2) in timestrIntervalsValuesShow"
            :key="id + '_str_' + index2"
            class="col_nw_fs_fs props_it_itembox"
          >
            <div class="row_nw_fs_ce props_qtinput_linetime">
              <div class="row_nw_fs_ce props_qtinput_linetimelabel">时间串 time:</div>
              <div class="row_nw_fs_ce props_qtinput_linetimeinputbox">
                <el-date-picker
                  v-model="inval[0]"
                  type="datetime"
                  placeholder="Select start datetime"
                  :format="defaultTimeFormatStr"
                  :value-format="defaultTimeFormatStr"
                />
              </div>
              <div class="row_nw_fs_ce props_qtinput_linetimeindex">SN:{{ index2 + 1 }}</div>
            </div>
            <div class="row_nw_fs_ce props_qtinput_line1">
              <div class="row_nw_fs_ce props_qtinput_itemlabelleft">WLng(L):</div>
              <div class="row_nw_fs_ce props_qtinput_itembox">
                <el-input v-model="inval[1]" placeholder="Please input" type="number" />
              </div>
              <div class="row_nw_fs_ce props_qtinput_itemlabelright">SLat(B):</div>
              <div class="row_nw_fs_ce props_qtinput_itembox">
                <el-input v-model="inval[2]" placeholder="Please input" type="number" />
              </div>
            </div>

            <div class="row_nw_fs_ce props_qtinput_line2">
              <div class="row_nw_fs_ce props_qtinput_itemlabelleft">ELng(R):</div>
              <div class="row_nw_fs_ce props_qtinput_itembox">
                <el-input v-model="inval[3]" placeholder="Please input" type="number" />
              </div>
              <div class="row_nw_fs_ce props_qtinput_itemlabelright">NLat(T):</div>
              <div class="row_nw_fs_ce props_qtinput_itembox">
                <el-input v-model="inval[4]" placeholder="Please input" type="number" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row_nw_fe_ce props_it_actbox">
        <el-tag type="info">{{ "Total: " + timestrIntervalsValuesShow.length }}</el-tag>
        <el-icon
          v-if="isFoldTimestrIntervals"
          color="rgba(15, 55, 175, 1)"
          size="1.5rem"
          class="row_nw_ce_ce props_it_acticon"
          @click="setIsFoldTimestrIntervals(false)"
        >
          <CaretBottom />
        </el-icon>
        <el-icon
          v-else
          color="rgba(15, 55, 175, 1)"
          size="1.5rem"
          class="row_nw_ce_ce props_it_acticon"
          @click="setIsFoldTimestrIntervals(true)"
        >
          <CaretTop />
        </el-icon>

        <el-icon
          v-if="timestrIsViewDataPath"
          color="rgba(15, 55, 175, 1)"
          size="1.5rem"
          class="row_nw_ce_ce props_it_acticon"
          @click="setIsViewPath(false, 'timeString')"
        >
          <Hide />
        </el-icon>
        <el-icon
          v-else
          color="rgba(15, 55, 175, 1)"
          size="1.5rem"
          class="row_nw_ce_ce props_it_acticon"
          @click="setIsViewPath(true, 'timeString')"
        >
          <View />
        </el-icon>

        <el-icon color="#f56c6c" size="1.25rem" class="row_nw_ce_ce props_it_acticon" @click="clearTimesIntervals">
          <DeleteFilled />
        </el-icon>

        <el-icon
          :color="timestrIntervalsValuesShow.length >= 2 ? 'rgba(15, 55, 175, 1)' : '#f56c6c'"
          size="1.5rem"
          class="row_nw_ce_ce props_it_acticon"
          :class="{ props_it_dis_action: timestrIntervalsValuesShow.length <= 1 }"
          @click="popTimestringIntervalValue"
        >
          <RemoveFilled />
        </el-icon>
        <el-icon
          color="rgba(15, 55, 175, 1)"
          size="1.5rem"
          class="row_nw_ce_ce props_it_acticon2"
          @click="pushTimestringIntervalValue"
        >
          <CirclePlusFilled />
        </el-icon>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  // 说明： 这个主要用于设置 有时间类型的 cartesian 3 的值

  import { ref, reactive, onMounted, computed, watch, nextTick } from "vue";
  import { useEditorConfigStore, globalEditor } from "@/stores/editorConfig";
  import RjRadioTabInput from "@/components/form/RjRadioTabInput.vue";
  import RjRadioInput from "@/components/form/RjRadioInput.vue";
  import RjBooleanSwitchInput from "@/components/form/RjBooleanSwitchInput.vue";
  import LineGap from "@/h5/components/LineGap.vue";

  import { nanoid } from "@/utils/common/nanoid";
  import {
    cartesian3ToWgs84,
    cartesian3ToDegrees,
    cartesian3ToRadians,
    Wgs84DegreesToCartesian3,
    Wgs84RadiansToCartesian3,
  } from "@/utils/map/cesium/csTools";

  import { getExtentFromRectCoords } from "@/utils/map/geoCommon";

  import {
    useCzmlMapDataConfigStore,
    globalCzmlMapData,
    MapDrawPointAction,
    MapDrawLineAction,
    MapDrawSmoothLineAction,
    MapDrawBezierLineAction,
    MapDrawRectangleAction,
    MapDrawPolygonAction,
    MapDrawCircleAction,
  } from "@/stores/czmlMapDataConfig";

  import { cloneDeep } from "es-toolkit";
  import { isArray } from "es-toolkit/compat";
  import dayjs from "dayjs";
  import {
    CZMLPUREVALUE,
    CZMLTIMESECONDS,
    CZMLTIMESTRING,
    CZMLVALUESNOTINTERPOLATE,
    CZMLVALUESWITHINTERPOLATE,
    defaultTimeFormatStr,
    CZMLCARTESIAN3METERTYPE,
    CZMLCARTESIAN3DEGREESTYPE,
    CZMLCARTESIAN3RADIANSTYPE,
  } from "@/czml/schema/values/commondata.ts";

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
  const {
    czmlMapDataConfig,
    setCzmlMapCurrentAction,
    setCzmlMapCurrentData,
    setCzmlMapViewDrawData,
    setCzmlIsViewDrawDataPath,
  } = useCzmlMapDataConfigStore();

  const id = nanoid(10);
  const currentProp = ref({});
  const isEnable = ref(false);
  const pureValue = ref([0, 0, 0, 0]);
  const intervalsValues = ref([[0, 0, 0, 0, 0]]);
  const isFoldIntervals = ref(false);
  const xyzUnitType = ref("");

  const timestrIntervalsValues = ref([[dayjs().format(defaultTimeFormatStr), 0, 0, 0, 0]]);
  const isFoldTimestrIntervals = ref(false);

  const pureValueShow = ref([0, 0, 0, 0]);
  const intervalsValuesShow = ref([[0, 0, 0, 0, 0]]);
  const timestrIntervalsValuesShow = ref([[dayjs().format(defaultTimeFormatStr), 0, 0, 0, 0]]);

  const pureValueIsViewDataPath = ref(true);
  const intervalsIsViewDataPath = ref(true);
  const timestrIsViewDataPath = ref(true);

  const refreshTimeTypeFlag = ref(0);

  const rectDataKeyId = nanoid(10);

  const mapTools = ref([
    {
      ...MapDrawRectangleAction,
      id: rectDataKeyId,
    },
  ]);

  function clearintervalsValues() {
    intervalsValues.value = [[0, 0, 0, 0, 0]];
  }

  function clearTimesIntervals() {
    timestrIntervalsValues.value = [[dayjs().format(defaultTimeFormatStr), 0, 0, 0, 0]];
  }

  function setIsViewPath(isView: boolean, which: string) {
    if (which == "pure") {
      pureValueIsViewDataPath.value = isView;
      if (isView) {
        const coord = pureValue.value;
        const coordinates = [];
        coordinates.push(Wgs84DegreesToCartesian3(coord[0], coord[1], 0));
        coordinates.push(Wgs84DegreesToCartesian3(coord[2], coord[1], 0));
        coordinates.push(Wgs84DegreesToCartesian3(coord[2], coord[3], 0));
        coordinates.push(Wgs84DegreesToCartesian3(coord[0], coord[3], 0));
        coordinates.push(Wgs84DegreesToCartesian3(coord[0], coord[1], 0));
        setCzmlMapViewDrawData({
          type: "polyline",
          data: coordinates,
        });
      } else {
        setCzmlMapViewDrawData(null);
      }
    } else if (which == "seconds") {
      intervalsIsViewDataPath.value = isView;
      if (isView) {
        const allCoordinates = [];

        for (let i = 0; i < intervalsValues.value.length; i++) {
          const coord = intervalsValues.value[i];
          const coordinates = [];
          coordinates.push(Wgs84DegreesToCartesian3(coord[1], coord[2], 0));
          coordinates.push(Wgs84DegreesToCartesian3(coord[3], coord[2], 0));
          coordinates.push(Wgs84DegreesToCartesian3(coord[3], coord[4], 0));
          coordinates.push(Wgs84DegreesToCartesian3(coord[1], coord[4], 0));
          coordinates.push(Wgs84DegreesToCartesian3(coord[1], coord[2], 0));
          allCoordinates.push(coordinates);
        }
        setCzmlMapViewDrawData({
          type: "mutilpolylines",
          data: allCoordinates,
        });
      } else {
        setCzmlMapViewDrawData(null);
      }
    } else if (which == "timeString") {
      timestrIsViewDataPath.value = isView;
      if (isView) {
        const allCoordinates = [];
        for (let i = 0; i < timestrIntervalsValues.value.length; i++) {
          const coord = timestrIntervalsValues.value[i];
          const coordinates = [];
          coordinates.push(Wgs84DegreesToCartesian3(coord[1], coord[2], 0));
          coordinates.push(Wgs84DegreesToCartesian3(coord[3], coord[2], 0));
          coordinates.push(Wgs84DegreesToCartesian3(coord[3], coord[4], 0));
          coordinates.push(Wgs84DegreesToCartesian3(coord[1], coord[4], 0));
          coordinates.push(Wgs84DegreesToCartesian3(coord[1], coord[2], 0));
          allCoordinates.push(coordinates);
        }
        setCzmlMapViewDrawData({
          type: "mutilpolylines",
          data: allCoordinates,
        });
      } else {
        setCzmlMapViewDrawData(null);
      }
    }

    setCzmlIsViewDrawDataPath(isView);
  }

  function setIsFoldIntervals(isFold: boolean) {
    isFoldIntervals.value = isFold;
  }

  function setIsFoldTimestrIntervals(isFold: boolean) {
    isFoldTimestrIntervals.value = isFold;
  }

  function setMapDrawActionHd(act: any) {
    setCzmlMapCurrentAction(act);
  }

  function timeTypesOptionChangedHd(value: string) {
    if (currentProp.value) {
      currentProp.value.timeType = value;
    }
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
      const length = intervalsValues.value.length;
      const { secondsStart, secondsStep, secondsOnceAddCount } = currentProp.value;
      const last = length - 1;
      if (length == 1) {
        intervalsValues.value[0][0] = +secondsStart;
      }

      const lastItem = intervalsValues.value[last];
      const secondsStepNumber = +secondsStep;
      let nextSeconds = +lastItem[0];

      for (let i = 0; i < +secondsOnceAddCount; i++) {
        nextSeconds = nextSeconds + secondsStepNumber;
        intervalsValues.value.push([nextSeconds, 0, 0, 0, 0]);
      }
    }
  };

  const popTimestringIntervalValue = () => {
    if (isArray(timestrIntervalsValues.value)) {
      if (timestrIntervalsValues.value.length >= 2) {
        timestrIntervalsValues.value.pop();
      }
    }
  };

  const pushTimestringIntervalValue = () => {
    if (isArray(timestrIntervalsValues.value)) {
      timestrIntervalsValues.value.push([dayjs().format(defaultTimeFormatStr), 0, 0, 0, 0]);
    }
  };

  function init() {
    if (props.vdata && props.vdata.id && props.vdata.name) {
      console.log("unit_rect_props", props.vdata);
      isEnable.value = true;
      currentProp.value = props.vdata;
      xyzUnitType.value = currentProp.value.xyzUnitType;
      if (currentProp.value.timeType == CZMLPUREVALUE) {
        pureValue.value = cloneDeep(currentProp.value.value);
      } else if (currentProp.value.timeType == CZMLTIMESECONDS) {
        intervalsValues.value = cloneDeep(currentProp.value.value);
      } else if (currentProp.value.timeType == CZMLTIMESTRING) {
        timestrIntervalsValues.value = cloneDeep(currentProp.value.value);
      }
    } else {
      isEnable.value = false;
      currentProp.value = {};
      pureValue.value = [0, 0, 0, 0];
      intervalsValues.value = [[0, 0, 0, 0, 0]];
      timestrIntervalsValues.value = [[dayjs().format(defaultTimeFormatStr), 0, 0, 0, 0]];
    }
  }

  function unitTypesOptionChangedHd(value: string) {
    if (currentProp.value) {
      console.log("rect unitTypesOptionChangedHd", value);
      currentProp.value.xyzUnitType = value;
      xyzUnitType.value = value;
    }
  }

  watch(
    [xyzUnitType, pureValue],
    () => {
      if (xyzUnitType.value == CZMLCARTESIAN3METERTYPE) {
        pureValueShow.value = pureValue.value;
      } else if (xyzUnitType.value == CZMLCARTESIAN3DEGREESTYPE) {
        pureValueShow.value = pureValue.value;
      } else if (xyzUnitType.value == CZMLCARTESIAN3RADIANSTYPE) {
        pureValueShow.value = [
          Cesium.Math.toRadians(pureValue.value[0]),
          Cesium.Math.toRadians(pureValue.value[1]),
          Cesium.Math.toRadians(pureValue.value[2]),
          Cesium.Math.toRadians(pureValue.value[3]),
        ];
      }
    },
    {
      immediate: false,
      deep: true,
    },
  );

  watch(
    [xyzUnitType, intervalsValues],
    () => {
      if (xyzUnitType.value == CZMLCARTESIAN3METERTYPE) {
        intervalsValuesShow.value = intervalsValues.value;
      } else if (xyzUnitType.value == CZMLCARTESIAN3DEGREESTYPE) {
        intervalsValuesShow.value = intervalsValues.value;
      } else if (xyzUnitType.value == CZMLCARTESIAN3RADIANSTYPE) {
        const positions = [];
        for (let i = 0; i < intervalsValues.value.length; i++) {
          const vtemp = intervalsValues.value[i];
          positions.push([
            vtemp[0],
            Cesium.Math.toRadians(vtemp[1]),
            Cesium.Math.toRadians(vtemp[2]),
            Cesium.Math.toRadians(vtemp[3]),
            Cesium.Math.toRadians(vtemp[4]),
          ]);
        }
        intervalsValuesShow.value = positions;
      }
    },
    {
      immediate: false,
      deep: true,
    },
  );

  watch(
    [xyzUnitType, timestrIntervalsValues],
    () => {
      if (xyzUnitType.value == CZMLCARTESIAN3METERTYPE) {
        timestrIntervalsValuesShow.value = timestrIntervalsValues.value;
      } else if (xyzUnitType.value == CZMLCARTESIAN3DEGREESTYPE) {
        timestrIntervalsValuesShow.value = timestrIntervalsValues.value;
      } else if (xyzUnitType.value == CZMLCARTESIAN3RADIANSTYPE) {
        const positions = [];
        for (let i = 0; i < timestrIntervalsValues.value.length; i++) {
          const vtemp = timestrIntervalsValues.value[i];
          positions.push([
            vtemp[0],
            Cesium.Math.toRadians(vtemp[1]),
            Cesium.Math.toRadians(vtemp[2]),
            Cesium.Math.toRadians(vtemp[3]),
            Cesium.Math.toRadians(vtemp[4]),
          ]);
        }
        timestrIntervalsValuesShow.value = positions;
      }
    },
    {
      immediate: false,
      deep: true,
    },
  );

  watch(
    () => czmlMapDataConfig.currentDataRefresh,
    () => {
      if (czmlMapDataConfig.currentDataRefresh) {
        if (czmlMapDataConfig.currentDataId == rectDataKeyId) {
          console.log("解析获取值", globalCzmlMapData.drawData);
          const data = globalCzmlMapData.drawData;
          const coordinates = data.coordinates;
          setCzmlMapViewDrawData({
            type: "polyline",
            data: coordinates,
          });

          let extent = null;
          const positions = [];
          if (coordinates && isArray(coordinates) && coordinates.length) {
            for (let i = 0; i < coordinates.length; i++) {
              const cart = cartesian3ToDegrees(coordinates[i]);
              console.log("rect cart", cart);

              positions.push([cart.longitude, cart.latitude]);
            }
            extent = getExtentFromRectCoords([positions]);
          }

          console.log("rect positions", positions, extent, currentProp.value.timeType);
          if (extent) {
            if (currentProp.value.timeType == CZMLPUREVALUE) {
              pureValue.value[0] = extent[0];
              pureValue.value[1] = extent[1];
              pureValue.value[2] = extent[2];
              pureValue.value[3] = extent[3];
            } else if (currentProp.value.timeType == CZMLTIMESECONDS) {
              if (isArray(intervalsValues.value)) {
                const length = intervalsValues.value.length;
                const last = length - 1;
                const { secondsStart, secondsStep, secondsOnceAddCount } = currentProp.value;
                if (
                  length == 1 &&
                  intervalsValues.value[0][1] == 0 &&
                  intervalsValues.value[0][2] == 0 &&
                  intervalsValues.value[0][3] == 0 &&
                  intervalsValues.value[0][4] == 0
                ) {
                  intervalsValues.value[0][0] = +secondsStart;
                  intervalsValues.value[0][1] = extent[0];
                  intervalsValues.value[0][2] = extent[1];
                  intervalsValues.value[0][3] = extent[2];
                  intervalsValues.value[0][4] = extent[3];
                } else {
                  const lastItem = intervalsValues.value[last];
                  const secondsStepNumber = +secondsStep;
                  const nextSeconds = +lastItem[0] + secondsStepNumber;
                  intervalsValues.value.push([nextSeconds, extent[0], extent[1], extent[2], extent[3]]);
                }
              }
            } else if (currentProp.value.timeType == CZMLTIMESTRING) {
              if (isArray(timestrIntervalsValues.value)) {
                const length = timestrIntervalsValues.value.length;
                const last = length - 1;
                const { secondsStart, secondsStep, secondsOnceAddCount } = currentProp.value;
                if (
                  length == 1 &&
                  timestrIntervalsValues.value[0][1] == 0 &&
                  timestrIntervalsValues.value[0][2] == 0 &&
                  timestrIntervalsValues.value[0][3] == 0 &&
                  timestrIntervalsValues.value[0][4] == 0
                ) {
                  timestrIntervalsValues.value[0][1] = extent[0];
                  timestrIntervalsValues.value[0][2] = extent[1];
                  timestrIntervalsValues.value[0][3] = extent[2];
                  timestrIntervalsValues.value[0][4] = extent[3];
                } else {
                  intervalsValues.value.push([
                    dayjs().format(defaultTimeFormatStr),
                    extent[0],
                    extent[1],
                    extent[2],
                    extent[3],
                  ]);
                }
              }
            }
          }
        }
      }
    },
    {
      deep: false,
      immediate: false,
    },
  );

  onMounted(() => {
    init();
  });

  watch(
    () => currentProp.value.timeType,
    () => {
      nextTick(() => {
        console.log("currentProp.valueType", currentProp.value);
        if (currentProp.value.timeType == CZMLPUREVALUE) {
          pureValue.value = cloneDeep(currentProp.value.value);
        } else if (currentProp.value.timeType == CZMLTIMESECONDS) {
          intervalsValues.value = cloneDeep(currentProp.value.value);
        } else if (currentProp.value.timeType == CZMLTIMESTRING) {
          timestrIntervalsValues.value = cloneDeep(currentProp.value.value);
        } else {
          pureValue.value = [0, 0, 0, 0];
          intervalsValues.value = [[0, 0, 0, 0, 0]];
          timestrIntervalsValues.value = [[dayjs().format(defaultTimeFormatStr), 0, 0, 0, 0]];
        }
      });
    },
    {
      immediate: false,
      deep: false,
    },
  );

  watch(
    pureValue,
    () => {
      if (currentProp.value && currentProp.value.timeType == CZMLPUREVALUE) {
        console.log("pureValue", pureValue.value);
        currentProp.value.value = pureValue.value;
      }
    },
    {
      immediate: false,
      deep: false,
    },
  );

  watch(
    intervalsValues,
    () => {
      if (currentProp.value && currentProp.value.timeType == CZMLTIMESECONDS) {
        console.log("intervalsValues", intervalsValues.value);
        currentProp.value.value = intervalsValues.value;
      }
    },
    {
      immediate: false,
      deep: false,
    },
  );

  watch(
    timestrIntervalsValues,
    () => {
      if (currentProp.value && currentProp.value.timeType == CZMLTIMESTRING) {
        console.log("timestrIntervalsValues", timestrIntervalsValues.value);
        currentProp.value.value = timestrIntervalsValues.value;
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

  .props_radiobox_pp {
    width: 100%;
    height: auto;
    margin-bottom: 0.875rem;
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
    width: 4.75rem;
    height: 100%;
    color: rgba(255, 255, 255, 1);
    font-size: var(--czml-fs-sl-label);
    font-weight: bold;
    margin-right: 0.5rem;
    flex-shrink: 0;
  }

  .props_qtinput_itemlabelright {
    width: 4.75rem;
    height: 100%;
    color: rgba(255, 255, 255, 1);
    font-size: var(--czml-fs-sl-label);
    font-weight: bold;
    margin-right: 0.5rem;
    margin-left: 1rem;
    flex-shrink: 0;
  }

  .props_qtinput_itembox {
    width: calc(50% - 5.5rem);
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

  .props_qtinput_linetimelabel {
    width: 7rem;
    height: 100%;
    color: rgba(255, 255, 255, 1);
    font-size: 1rem;
    font-weight: bold;
  }

  .props_qtinput_linetimeinputbox {
    width: calc(100% - 16rem);
    height: 100%;
  }

  :deep(.props_qtinput_linetimeinputbox .el-input) {
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
