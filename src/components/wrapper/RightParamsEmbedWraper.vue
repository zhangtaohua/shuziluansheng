<template>
  <div class="row_nw_ce_ce rparams_container" :class="{ rparams_samllcontainer: !isExpanded }" :style="leftStyle">
    <Teleport v-if="isResize" to="body">
      <div
        class="rparams_mousemask"
        @mouseup="handleRisizeMouseupHd"
        @mousemove="handleRisizeMousemoveHd"
        @mouseout="handleRisizeMouseoutHd"
      ></div>
    </Teleport>
    <div
      class="rparams_slider"
      :class="{ row_nw_ce_ce: !isExpanded, rparams_smallslider: !isExpanded }"
      @mouseup="handleRisizeMouseupHd"
      @mousedown="handleRisizeMousedownHd"
    >
      <div v-if="!isExpanded" class="row_nw_ce_ce rparams_slider_dec">
        <div class="row_nw_ce_ce rparams_sider_img">
          <img class="rparams_sider_show" src="@/assets/images/editor/shouqi.png" alt="dec" />
        </div>
      </div>
    </div>

    <div v-if="isExpanded" class="row_nw_ce_ce rparams_wrapper">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, reactive, nextTick } from "vue";

  // const vueInstance = getCurrentInstance();
  const isExpanded = ref(true);
  const isResize = ref(false);
  // const defaultWidth = "40rem";
  const defaultMinWidth = "1rem";

  const props = defineProps({
    vdata: {
      type: Object,
      default() {
        return {
          width: "40rem",
          ctlWidth: 280,
          ctlMaxWidth: 760,
          ctlMinWidth: 10,
        };
      },
    },
  });

  const leftStyle = reactive({
    width: props.vdata.width,
    transition: null,
  });

  const offset = 5;
  let moveX = 0;
  let time = 0;
  function handleRisizeMousedownHd(event) {
    isResize.value = true;
    const clientXTemp = event.clientX;
    const bodyClientWidth = document.body.clientWidth;
    moveX = Math.abs(bodyClientWidth - clientXTemp);
    time = Date.now();
  }

  function handleRisizeMouseupHd() {
    isResize.value = false;
    time = Math.abs(Date.now() - time);
    if (time > 2 && time < 200) {
      handleRisizeClickHd();
    }
  }

  function handleRisizeMousemoveHd(event) {
    if (isResize.value) {
      const clientXTemp = event.clientX;
      const bodyClientWidth = document.body.clientWidth;
      const clientX = Math.abs(bodyClientWidth - clientXTemp);

      // console.log("body", bodyClientWidth, clientXTemp, clientX)
      const { ctlWidth, ctlMaxWidth, ctlMinWidth } = props.vdata;

      if (Math.abs(clientX - moveX) > offset) {
        if (clientX > ctlWidth) {
          leftStyle.width = clientX + "px";
          leftStyle.transition = null;
          if (clientX > ctlMaxWidth) {
            leftStyle.width = ctlMaxWidth + "px";
          }
        } else {
          if (clientX > ctlMinWidth) {
            leftStyle.width = ctlWidth + "px";
            isExpanded.value = true;
          } else {
            leftStyle.width = defaultMinWidth;
            leftStyle.transition = "width 0.5s";
            isExpanded.value = false;
          }
        }
      }
    }
  }

  function handleRisizeClickHd() {
    console.log("click");
    if (isExpanded.value) {
      leftStyle.transition = "width 0.5s";
      nextTick(() => {
        leftStyle.width = defaultMinWidth;
        isExpanded.value = false;
      });
    } else {
      leftStyle.width = props.vdata.width;
      isExpanded.value = true;

      setTimeout(() => {
        leftStyle.transition = null;
      }, 550);
    }
  }

  const unExpandClickHd = () => {
    if (isExpanded.value) {
      leftStyle.transition = "width 0.5s";
      nextTick(() => {
        leftStyle.width = defaultMinWidth;
        isExpanded.value = false;
      });
    }
  };

  function handleRisizeMouseoutHd(event) {
    handleRisizeMousemoveHd(event);
    handleRisizeMouseupHd();
  }

  defineExpose({
    unExpandClickHd,
  });
</script>

<style scoped>
  .rparams_container {
    position: relative;
    width: 40rem;
    height: calc(100vh - 3rem);
    background-color: transparent;
    border-top-left-radius: 0.5rem;
    border-bottom-left-radius: 0.5rem;
  }

  .rparams_samllcontainer {
    width: 1rem;
    height: calc(100vh - 3rem);
    background-color: transparent;
    overflow: hidden;
  }

  .rparams_mousemask {
    position: fixed;
    width: 100vw;
    height: 100vh;
    background-color: transparent;
    top: 0;
    right: 0;
    z-index: 99999;
    cursor: e-resize;
  }

  .rparams_slider {
    position: absolute;
    width: 0.625rem;
    height: 100%;
    background-color: transparent;
    top: 0;
    left: -0.3125rem;
    z-index: 42;
    cursor: e-resize;
  }

  .rparams_smallslider {
    position: absolute;
    width: 1rem;
    height: 100%;
    background-color: transparent;
    top: 0;
    left: 0;
    z-index: 41;
    cursor: e-resize;
  }

  .rparams_slider_dec {
    width: 100%;
    height: 100%;
  }

  .rparams_sider_img {
    width: 100%;
    height: 100%;
  }

  .rparams_sider_show {
    width: 100%;
    height: 100%;
  }

  .rparams_wrapper {
    width: 100%;
    height: 100%;
  }

  /*
:deep(.el-button--primary) {
  --el-button-bg-color: rgb(18, 66, 245);
  --el-button-border-color: #409eff;
  --el-button-hover-bg-color: #79bbff;
  --el-button-hover-border-color: #79bbff;
} */
</style>
