<template>
  <div v-if="isShowProps" class="row_nw_ce_ce config_container">
    <div class="config_wraper">
      <div v-for="scitem in editorConfig.currentParentComp.styles" :key="scitem.id" class="col_nw_ce_ce config_ic_box">
        <component :is="scitem.tag" :vdata="scitem"></component>
        <LineGap></LineGap>
      </div>
      <div v-if="editorConfig.currentParentComp.text" class="col_nw_ce_ce config_ic_box">
        <TextInput></TextInput>
        <LineGap></LineGap>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, reactive, computed, watch, onUnmounted } from "vue";
  import { useRoute } from "vue-router";
  import LineGap from "@/components/css/LineGap.vue";

  import { useEditorConfigStore, globalEditor } from "@/stores/editorConfig";

  const { editorConfig, setEditorCurrentShape, setEditorRefreshShape, setEditorCurrentParentComp } =
    useEditorConfigStore();

  const isShowProps = computed(() => {
    if (editorConfig.currentParentComp) {
      console.log("panel", editorConfig.currentParentComp);
      return true;
    } else {
      return false;
    }
  });
</script>

<style scoped lang="scss">
  .config_container {
    position: fixed;
    bottom: 3rem;
    right: 0;
    z-index: 10;
    width: 30rem;
    height: calc(100vh - 7rem);
    background-color: rgba(26, 30, 39, 1);
    border-radius: 0.75rem 0 0 0.75rem;
  }

  .config_wraper {
    width: 28rem;
    height: calc(100% - 2rem);
    color: white;
    font-size: 1rem;
    overflow-y: scroll;
    overflow-x: hidden;
  }

  .config_wraper::-webkit-scrollbar {
    display: none;
  }

  .config_ic_box {
    width: 100%;
    height: auto;
  }
</style>
