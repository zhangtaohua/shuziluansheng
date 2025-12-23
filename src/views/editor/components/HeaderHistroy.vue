<template>
  <div class="row_nw_fs_ce hh_container">
    <div class="row_nw_ce_ce hh_undobox" @click="changeHd('undo')">
      <el-tooltip effect="dark" content="撤销" placement="bottom">
        <el-icon class="hsscale_pmicon"><RefreshLeft /></el-icon>
      </el-tooltip>
    </div>

    <div class="row_nw_ce_ce hh_redobox" @click="changeHd('redo')">
      <el-tooltip effect="dark" content="重做" placement="bottom">
        <el-icon class="hsscale_pmicon"><RefreshRight /></el-icon>
      </el-tooltip>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, reactive, computed, watch, onUnmounted } from "vue";

  import { useEditorConfigStore, globalEditor } from "@/stores/editorConfig";

  function changeHd(action: string) {}
</script>

<style scoped>
  .hh_container {
    width: max-content;
    height: 2rem;
  }

  .hh_undobox {
    width: 2rem;
    height: 2rem;
    margin-right: 0.5rem;
    background: rgba(55, 55, 55, 1);
    border-radius: 0.25rem;
    color: rgba(255, 255, 255, 1);
    cursor: pointer;
  }

  .hh_redobox {
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
