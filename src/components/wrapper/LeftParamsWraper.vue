<template>
  <div class="row_nw_ce_ce left_container" :class="{ left_samllcontainer: !isExpanded }" :style="leftStyle">
    <Teleport v-if="isResize" to="body">
      <div
        class="left_mousemask"
        @mouseup="handleRisizeMouseupHd"
        @mousemove="handleRisizeMousemoveHd"
        @mouseout="handleRisizeMouseoutHd"
      ></div>
    </Teleport>
    <div
      class="left_slider"
      :class="{ row_nw_ce_ce: !isExpanded, left_smallslider: !isExpanded }"
      @mouseup="handleRisizeMouseupHd"
      @mousedown="handleRisizeMousedownHd"
    >
      <div v-if="!isExpanded" class="row_nw_ce_ce left_slider_dec">
        <div class="row_nw_ce_ce left_sider_img">
          <img class="left_sider_show" src="@/assets/images/editor/shouqi.png" alt="dec" />
        </div>
      </div>
    </div>

    <div v-show="isExpanded" class="col_nw_fs_fs left_wrapper">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { reactive, ref, nextTick } from "vue";

  // 以下是用于拖拽功能的，暂时可以不用修改。
  const isExpanded = ref(true);
  const isResize = ref(false);
  const leftStyle = reactive({
    width: "30rem",
    transition: null,
  });

  const offset = 5;
  let moveX = 0;
  let time = 0;
  function handleRisizeMousedownHd(event) {
    isResize.value = true;
    moveX = event.clientX;
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
      const clientX = event.clientX;
      if (Math.abs(clientX - moveX) > offset) {
        if (clientX > 120) {
          leftStyle.width = clientX + "px";
          leftStyle.transition = null;
          if (clientX > 760) {
            leftStyle.width = "760px";
          }
        } else {
          if (clientX > 10) {
            leftStyle.width = "120px";
            isExpanded.value = true;
          } else {
            leftStyle.width = "1rem";
            leftStyle.transition = "width 0.5s";
            isExpanded.value = false;
          }
        }
      }
    }
  }

  function handleRisizeClickHd() {
    if (isExpanded.value) {
      leftStyle.transition = "width 0.5s";
      nextTick(() => {
        leftStyle.width = "1rem";
        isExpanded.value = false;
      });
    } else {
      leftStyle.width = "30rem";
      isExpanded.value = true;

      setTimeout(() => {
        leftStyle.transition = null;
      }, 550);
    }
  }

  function handleRisizeMouseoutHd(event) {
    handleRisizeMousemoveHd(event);
    handleRisizeMouseupHd();
  }
</script>

<style scoped>
  .left_container {
    position: fixed;
    width: auto;
    height: calc(100% - 3rem);
    background-color: transparent;
    margin: 0;
    padding: 0;
    left: 0;
    top: 3rem;
    border-top-right-radius: 0.5rem;
    border-bottom-right-radius: 0.5rem;
    z-index: 40;
  }

  .left_samllcontainer {
    position: fixed;
    width: 1rem;
    height: calc(100% - 3rem);
    background-color: transparent;
    overflow: hidden;
    margin: 0;
    padding: 0;
    left: 0;
    top: 3rem;
    z-index: 40;
  }

  .left_mousemask {
    position: fixed;
    width: 100vw;
    height: 100vh;
    background-color: transparent;
    top: 0;
    right: 0;
    z-index: 99999;
    cursor: e-resize;
  }

  .left_slider {
    position: absolute;
    width: 0.625rem;
    height: 100%;
    background-color: transparent;
    top: 0;
    right: -0.3125rem;
    z-index: 42;
    cursor: e-resize;
  }

  .left_smallslider {
    position: absolute;
    width: 1rem;
    height: 100%;
    background-color: transparent;
    top: 0;
    right: 0;
    z-index: 41;
    cursor: e-resize;
  }

  .left_slider_dec {
    width: 100%;
    height: 100%;
  }

  .left_sider_img {
    width: 100%;
    height: 100%;
  }

  .left_sider_show {
    width: 100%;
    height: 100%;
    transform: rotate(180deg);
  }

  .left_wrapper {
    width: 100%;
    height: 100%;
  }
</style>
