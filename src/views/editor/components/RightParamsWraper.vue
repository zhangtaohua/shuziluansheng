<template>
  <div
    v-if="isEnable"
    class="row_nw_fe_fs rparams_container"
    :class="{ rparams_samllcontainer: !isExpanded }"
    :style="leftStyle"
  >
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

    <div v-if="isExpanded" class="col_nw_fs_fs rparams_wrapper">
      <div class="row_nw_ce_ce rparams_header">
        <slot name="header"></slot>
      </div>

      <div class="col_nw_fs_fs rparams_body">
        <div class="col_nw_fs_fs rparams_body_wraper">
          <slot></slot>
        </div>
      </div>

      <div class="row_nw_ce_ce rparams_footer">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, reactive, computed, onMounted, watch, nextTick, getCurrentInstance } from "vue";

  const vueInstance = getCurrentInstance();

  const isEnable = ref(true);

  const isExpanded = ref(true);
  const isResize = ref(false);
  const leftStyle = reactive({
    width: "22.5rem",
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
      if (Math.abs(clientX - moveX) > offset) {
        if (clientX > 280) {
          leftStyle.width = clientX + "px";
          leftStyle.transition = null;
          if (clientX > 760) {
            leftStyle.width = "760px";
          }
        } else {
          if (clientX > 10) {
            leftStyle.width = "280px";
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
    console.log("click");
    if (isExpanded.value) {
      leftStyle.transition = "width 0.5s";
      nextTick(() => {
        leftStyle.width = "1rem";
        isExpanded.value = false;
      });
    } else {
      leftStyle.width = "22.5rem";
      isExpanded.value = true;

      setTimeout(() => {
        leftStyle.transition = null;
      }, 550);
    }
  }

  function unExpandClickHd() {
    if (isExpanded.value) {
      leftStyle.transition = "width 0.5s";
      nextTick(() => {
        leftStyle.width = "1rem";
        isExpanded.value = false;
      });
    }
  }

  function handleRisizeMouseoutHd(event) {
    handleRisizeMousemoveHd(event);
    handleRisizeMouseupHd();
  }
</script>

<style scoped>
  .rparams_container {
    position: fixed;
    width: 22.5rem;
    height: calc(100vh - 3rem);
    background-color: red;
    overflow: hidden;
    margin: 0;
    padding: 0;
    right: 0;
    top: 3rem;
    border-top-left-radius: 0.25rem;
    border-bottom-left-radius: 0.25rem;
    z-index: 11;
  }

  .rparams_samllcontainer {
    width: 1rem;
    height: calc(100vh - 3rem);
    background-color: var(--rj-app-bg-color);
    overflow: hidden;
    margin: 0;
    padding: 0;
    right: 0;
    top: 3rem;
    border-top-left-radius: 0.25rem;
    border-bottom-left-radius: 0.25rem;
    z-index: 11;
  }

  .rparams_mousemask {
    position: fixed;
    width: 100vw;
    height: 100vh;
    background-color: transparent;
    top: 0;
    right: 0;
    z-index: 20;
    cursor: e-resize;
  }

  .rparams_slider {
    position: absolute;
    width: 0.25rem;
    height: 100%;
    background-color: blue;
    top: 0;
    left: 0;
    z-index: 13;
    cursor: e-resize;
  }

  .rparams_smallslider {
    position: absolute;
    width: 1rem;
    height: 100%;
    background-color: transparent;
    top: 0;
    left: 0;
    z-index: 12;
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
    width: calc(100% - 2rem);
    height: calc(100% - 2rem);
    margin-right: 1rem;
    margin-top: 1rem;
  }

  .rparams_header {
    width: 100%;
    height: auto;
  }

  .grave_gap {
    width: 100%;
    border: 0;
    border-bottom: 0.125rem groove var(--rj-app-gap-color);
    margin-top: 1rem;
    margin-bottom: 1rem;
  }

  .rparams_body {
    width: 100%;
    /* height: calc(100% - 9.25rem); */
    height: calc(100% - 4.25rem);
    overflow-y: scroll;
    container-name: rparamsBody;
    container-type: inline-size;
  }

  .rparams_body_wraper {
    width: calc(100% - 1rem);
    height: auto;
    margin-bottom: 1.25rem;
    background-color: var(--rj-app-panel-color);
    padding: 1rem 0.25rem 1rem 0.5rem;
    border-radius: var(--rj-app-panel-radius);
  }

  @container rparamsBody (max-width: 280px) {
  }

  .rparams_footer {
    width: 100%;
    height: auto;
  }

  /*
:deep(.el-button--primary) {
  --el-button-bg-color: rgb(18, 66, 245);
  --el-button-border-color: #409eff;
  --el-button-hover-bg-color: #79bbff;
  --el-button-hover-border-color: #79bbff;
} */
</style>
