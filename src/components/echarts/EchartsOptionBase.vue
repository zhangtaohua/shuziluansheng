<template>
  <div v-show="isShowEcharts" class="row_nw_center_center wh_100p_100p">
    <div :id="echartsId" class="row_nw_center_center wh_100p_100p"></div>
  </div>

  <div v-show="!isShowEcharts" class="wh_100p_100p"><EchartsErrorNoData /></div>
</template>

<script setup lang="ts">
  import { onMounted, ref, watch, nextTick, onUnmounted } from "vue";
  import EchartsErrorNoData from "./EchartsErrorNoData.vue";
  import * as echarts from "echarts";

  import { useWindowResize } from "@/hooks/useWindowSize";

  const props = defineProps({
    echartsId: {
      type: String,
      default: "rj",
    },
    echartsOptions: {
      type: Object,
      default() {
        return {
          isHasData: false,
          options: {},
          events: [],
        };
      },
    },
  });

  const echartsId = props.echartsId;

  const isShowEcharts = ref(true);
  const echartsHandler: any = {};
  const { windowSize } = useWindowResize();
  let isMounted = false;
  let interTimer: any = null;

  onMounted(() => {
    // updateEchartsOptions({});
    isMounted = true;
  });

  onUnmounted(() => {
    destroyEcharts();
  });

  watch(
    () => windowSize,
    () => {
      resizeEcharts();
    },
    {
      immediate: false,
      deep: true,
    },
  );

  watch(
    () => props.echartsOptions,
    () => {
      if (interTimer) {
        clearInterval(interTimer);
        interTimer = null;
      }
      interTimer = setInterval(() => {
        if (isMounted) {
          handleEchartOptionData(props.echartsOptions);
          clearInterval(interTimer);
          interTimer = null;
        }
      }, 100);
    },
    {
      immediate: true,
      deep: true,
    },
  );

  function handleEchartOptionData(echartsOptions: any) {
    // console.log("画图", echartsOptions);
    const echartOption = echartsOptions;
    if (echartOption.isHasData) {
      isShowEcharts.value = true;
    } else {
      isShowEcharts.value = false;
    }
    nextTick(() => {
      updateEchartsOptions(echartOption.options);
    });
  }

  function initEcharts() {
    echartsHandler.dom = document.getElementById(echartsId);
    if (echartsHandler.dom) {
      echartsHandler.dom.removeAttribute("_echarts_instance_");
      echartsHandler.handler = echarts.init(echartsHandler.dom);
      echartsHandler.width = echartsHandler.dom.clientWidth;
      if (props.echartsOptions.events) {
        props.echartsOptions.events.forEach((eve) => {
          const eventName = eve.eventName;
          const query = eve.query;
          const blank = eve.blank;
          const callback = eve.callback;
          if (query) {
            if (blank) {
              echartsHandler.handler.getZr().on(eventName, query, callback);
            } else {
              echartsHandler.handler.on(eventName, query, callback);
            }
          } else {
            if (blank) {
              echartsHandler.handler.getZr().on(eventName, callback);
            } else {
              echartsHandler.handler.on(eventName, callback);
            }
          }
        });
      }
    }
  }

  function updateEchartsOptions(optionsNew: any) {
    initEcharts();
    if (echartsHandler.handler) {
      echartsHandler.handler.setOption(optionsNew);
    }
  }

  function resizeEcharts() {
    if (echartsHandler.handler) {
      echartsHandler.handler.resize();
    }
  }

  function destroyEcharts() {
    if (echartsHandler.handler) {
      echartsHandler.handler.dispose();
    }
  }

  defineExpose({
    echartsHandler: echartsHandler.handler,
    echartsIns: echartsHandler,
  });
</script>

<style lang="scss" scoped></style>
