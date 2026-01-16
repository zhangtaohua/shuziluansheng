<template>
  <div class="row_nw_ce_ce rparams_container" :class="{ rparams_samllcontainer: !isExpanded }">
    <div
      class="rparams_slider"
      :class="{ row_nw_ce_ce: !isExpanded, rparams_smallslider: !isExpanded }"
      @click="handleRisizeClickHd"
    >
      <div v-if="!isExpanded" class="row_nw_ce_ce rparams_slider_dec">
        <div class="row_nw_ce_ce rparams_sider_img">
          <img class="rparams_sider_show" src="@/assets/images/editor/shouqi.png" alt="dec" />
        </div>
      </div>
    </div>

    <div v-show="isExpanded" class="row_nw_ce_ce rparams_wrapper">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from "vue";

  const isExpanded = ref(true);

  function handleRisizeClickHd() {
    if (isExpanded.value) {
      isExpanded.value = false;
    } else {
      isExpanded.value = true;
    }
  }

  const unExpandClickHd = () => {
    if (isExpanded.value) {
      isExpanded.value = false;
    }
  };

  defineExpose({
    unExpandClickHd,
  });
</script>

<style scoped>
  .rparams_container {
    position: relative;
    width: 55vw;
    height: 100vh;
    background-color: transparent;
    border-top-left-radius: 0.5rem;
    border-bottom-left-radius: 0.5rem;
    transition: width 0.5s;
  }

  .rparams_samllcontainer {
    width: 1rem;
    height: 100vh;
    background-color: transparent;
    overflow: hidden;
  }

  .rparams_slider {
    position: absolute;
    width: 0.625rem;
    height: 100%;
    background-color: transparent;
    top: 0;
    left: -0.3125rem;
    z-index: 42;
    cursor: pointer;
  }

  .rparams_smallslider {
    position: absolute;
    width: 1rem;
    height: 100%;
    background-color: transparent;
    top: 0;
    left: 0;
    z-index: 41;
    cursor: pointer;
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
