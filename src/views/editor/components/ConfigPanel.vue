<template>
  <div v-if="isShowProps" class="row_nw_ce_ce config_container">
    <div
      v-if="editorConfig.currentParentComp && editorConfig.currentParentComp.componentType == 'html'"
      class="config_wraper"
    >
      <div v-for="scitem in editorConfig.currentParentComp.styles" :key="scitem.id" class="col_nw_ce_ce config_h5_box">
        <component :is="scitem.tag" :vdata="scitem"></component>
        <LineGap></LineGap>
      </div>
      <div v-if="editorConfig.currentParentComp.text" class="col_nw_ce_ce config_h5_box">
        <TextInput></TextInput>
        <LineGap></LineGap>
      </div>
    </div>

    <div
      v-if="editorConfig.currentParentComp && editorConfig.currentParentComp.componentType == 'czml'"
      class="config_wraper"
    >
      <CzmlPackagesRender :vdata="editorConfig.currentParentComp"></CzmlPackagesRender>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, reactive, computed, watch, onUnmounted } from "vue";
  import LineGap from "@/h5/components/LineGap.vue";

  import { useEditorConfigStore, globalEditor } from "@/stores/editorConfig";

  const { editorConfig } = useEditorConfigStore();

  const isShowProps = computed(() => {
    if (editorConfig.currentParentComp) {
      console.log("configPanel", editorConfig.currentParentComp);
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
    width: auto;
    min-width: 30rem;
    height: calc(100vh - 7rem);
    background-color: rgba(26, 30, 39, 1);
    border-radius: 0.75rem 0 0 0.75rem;
    padding: 0rem 1rem 0rem 1rem;
  }

  .config_wraper {
    width: auto;
    height: calc(100% - 2rem);
    color: white;
    font-size: 1rem;
    overflow-y: scroll;
    overflow-x: hidden;
  }

  .config_wraper::-webkit-scrollbar {
    display: none;
  }

  .config_h5_box {
    width: 28rem;
    height: auto;
  }
</style>
