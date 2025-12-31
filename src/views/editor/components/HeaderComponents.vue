<template>
  <div class="row_nw_fs_ce hc_container">
    <!-- 为了实际设置参数分离到别的文件 -->
    <HeaderEmptyComponents ref="compsOptionsRef"></HeaderEmptyComponents>

    <div v-for="comp in currentComps" :key="comp.id" class="row_nw_fs_ce hc_iwrapper" @click="addCompHd(comp)">
      <div v-if="comp.icon" class="row_nw_fs_ce hc_iconbox">
        <component :is="comp.icon"></component>
      </div>

      <div class="row_nw_fs_ce hc_ilabel">{{ comp.labelZh }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, watch, onMounted } from "vue";

  import { useEditorComponentstore } from "@/stores/editorConfig";

  import HeaderEmptyComponents from "./HeaderEmptyComponents.vue";

  const { editorComponents } = useEditorComponentstore();

  const compsOptionsRef = ref(null);

  const currentComps = ref([]);

  const workSpaceComponents = ref([]);
  const blankComponents = ref([]);
  const cesiumComponents = ref([]);

  onMounted(() => {
    blankComponents.value = [compsOptionsRef.value.workSpaceOptions];

    workSpaceComponents.value = [
      compsOptionsRef.value.divOptions,
      compsOptionsRef.value.divImageOptions,
      compsOptionsRef.value.divTextOptions,
      compsOptionsRef.value.divCesiumOptions,
    ];

    cesiumComponents.value = [compsOptionsRef.value.cesiumCzmlOptions];
    currentComps.value = blankComponents.value;
  });

  watch(
    editorComponents,
    () => {
      if (editorComponents.workSpace) {
        if (editorComponents.currentComp) {
          const currentComp = editorComponents.currentComp;
          if (currentComp.type == "workspace") {
            currentComps.value = workSpaceComponents.value;
          } else if (currentComp.type == "cesium") {
            currentComps.value = cesiumComponents.value;
          }
        } else {
          currentComps.value = workSpaceComponents.value;
        }
      } else {
        currentComps.value = blankComponents.value;
      }
    },
    {
      immediate: true,
      deep: false,
    },
  );

  const addCompHd = (item) => {
    if (item.action) {
      item.action();
    }
  };
</script>

<style scoped>
  .hc_container {
    width: max-content;
    min-width: 2rem;
    height: 100%;
  }

  .hc_iwrapper {
    width: max-content;
    height: 100%;
    margin-right: 0.875rem;
    cursor: pointer;
  }

  .hc_ilabel {
    width: max-content;
    height: 100%;
    font-size: 1rem;
    color: rgba(255, 255, 255, 1);
  }
</style>
