<template>
  <div class="row_nw_fs_ce hscale_container">
    <div class="row_nw_ce_ce hscale_titlebox" @dblclick="resetScaleHd">
      <el-tooltip effect="dark" content="缩放, 双击重置" placement="bottom">
        <!-- <el-icon class="hsscale_scicon"><ScaleToOriginal /></el-icon> -->
        <Scaling class="hsscale_scicon" />
      </el-tooltip>
    </div>

    <div class="row_nw_ce_ce hscale_inbox">
      <div class="row_nw_ce_ce hscale_inminusbox" @click="changeScaleHd('minus')">
        <!-- <el-icon :size="16" color="#FFFFFF"><Minus /></el-icon> -->
        <el-icon class="hsscale_pmicon"><Minus /></el-icon>
      </div>
      <div class="row_nw_ce_ce hscale_inpubbox">
        <input
          type="number"
          v-model="scale"
          :min="min"
          :max="max"
          :step="step"
          class="hscale_input"
          @focus="setIsActive(true)"
          @blur="onChangeHd"
        />
      </div>

      <div class="row_nw_ce_ce hsscale_plusbox" @click="changeScaleHd('plus')">
        <el-icon class="hsscale_pmicon"><Plus /></el-icon>
      </div>
    </div>

    <div class="row_nw_ce_ce hh_fitbox" @click="fitViewHd()">
      <el-tooltip effect="dark" content="自适应" placement="bottom">
        <el-icon class="hsscale_pmicon"><ScaleToOriginal /></el-icon>
      </el-tooltip>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, reactive, computed, watch, onUnmounted } from "vue";

  import { Scaling } from "lucide-vue-next";

  import { useEditorConfigStore, globalEditor } from "@/stores/editorConfig";

  const scale = ref(100);
  const min = 10;
  const max = 200;
  const step = 1;
  const isActive = ref(false);

  function setIsActive(isAct) {
    isActive.value = isAct;
  }

  function onChangeHd() {
    isActive.value = false;
    let value = scale.value;
    if (value <= min) {
      value = min;
    }
    if (value >= max) {
      value = max;
    }
    scale.value = value;
  }

  function changeScaleHd(mp: string) {
    if (mp == "minus") {
      let value = scale.value - step;
      if (value <= min) {
        value = min;
      }
      scale.value = value;
    } else {
      let value = scale.value + step;
      if (value >= max) {
        value = max;
      }
      scale.value = value;
    }
  }

  function resetScaleHd() {
    scale.value = 100;
  }

  function fitViewHd() {}
</script>

<style scoped>
  .hscale_container {
    width: max-content;
    height: 2rem;
    border-radius: 0.25rem;
    margin-right: 1.25rem;
  }

  .hscale_titlebox {
    width: max-content;
    height: 100%;
    color: rgba(255, 255, 255, 1);
    cursor: pointer;
    margin-right: 0.5rem;
  }

  .hsscale_scicon {
    width: 1.25rem;
    height: 1.25rem;
    color: rgba(255, 255, 255, 1);
    cursor: pointer;
    outline: none;
    border: none;
  }

  .hscale_inbox {
    width: max-content;
    height: 100%;
    background: rgba(55, 55, 55, 1);
    padding: 0 0.75rem;
    border-radius: 0.25rem;
    margin-right: 0.5rem;
  }

  .hscale_inminusbox {
    width: 1rem;
    height: 1rem;
    margin-right: 0.5rem;
    color: rgba(255, 255, 255, 1);
    cursor: pointer;
  }

  .hscale_inpubbox {
    width: 3rem;
    height: 100%;
    margin-right: 0.5rem;
  }

  .hscale_input {
    width: 100%;
    height: 100%;
    color: rgba(255, 255, 255, 1);
    font-size: 0.875rem;
    background-color: transparent;
    font-weight: 600;
    border: none;
    -moz-appearance: textfield;
    text-align: center;
  }

  .hscale_input::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }

  .hscale_input::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  .hsscale_plusbox {
    width: max-content;
    height: 100%;
    color: rgba(255, 255, 255, 1);
    cursor: pointer;
  }

  .hh_fitbox {
    width: 2rem;
    height: 2rem;
    background: rgba(55, 55, 55, 1);
    border-radius: 0.25rem;
    color: rgba(255, 255, 255, 1);
    cursor: pointer;
  }

  .hsscale_pmicon {
    font-size: 1.125rem;
    color: rgba(255, 255, 255, 1);
    cursor: pointer;
  }
</style>
