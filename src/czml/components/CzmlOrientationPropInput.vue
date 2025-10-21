<template>
  <div v-if="isEnable" class="col_nw_fs_fs props_container">
    <div class="row_nw_fs_ce props_title_box">
      <label class="row_nw_fs_ce props_ch_label">{{ props.vdata.labelZh }}</label>
      <label class="row_nw_fs_fe props_ogi_label">{{ props.vdata.labelEn }}</label>
    </div>

    <div v-if="currentProp && currentProp.properties" class="col_nw_fs_fs props_children_box">
      <div v-for="childProp in currentProp.properties" :key="childProp.id" class="col_nw_ce_ce props_ic_box">
        <component :is="childProp.tag" :vdata="childProp"></component>
        <div class="props_ic_gap"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  // 由 CzmlClockPropInput.vue 复制而来的
  import { ref, reactive, onMounted, computed, watch, nextTick } from "vue";
  import { useEditorConfigStore, globalEditor } from "@/stores/editorConfig";
  import { cloneDeep } from "es-toolkit";
  import { isArray } from "es-toolkit/compat";
  import dayjs from "dayjs";

  //  这个props 就是相当于 new czmlShowProp()的值
  const props = defineProps({
    vdata: {
      type: Object,
      default() {
        return {
          id: "",
          name: "",
        };
      },
    },
  });

  const { editorConfig } = useEditorConfigStore();
  const id = "";
  const name = "";
  const currentProp = ref({});
  const isEnable = ref(false);

  function init() {
    if (props.vdata && props.vdata.id && props.vdata.name) {
      isEnable.value = true;
      currentProp.value = props.vdata;
    } else {
      isEnable.value = false;
      currentProp.value = {};
    }

    console.log("orientation_currentProp", currentProp.value);
  }

  onMounted(() => {
    init();
  });
</script>

<style scoped>
  .props_container {
    width: 100%;
    height: auto;
    background-color: transparent;
  }

  .props_title_box {
    width: 100%;
    height: 2rem;
    margin-bottom: 0.5rem;
  }

  .props_ch_label {
    width: max-content;
    height: 100%;
    color: rgba(255, 255, 255, 1);
    font-size: 1.25rem;
    font-weight: bold;
    margin-right: 0.5rem;
  }

  .props_ogi_label {
    width: max-content;
    height: 1.25rem;
    color: rgba(230, 230, 230, 1);
    font-size: 0.875rem;
    font-weight: 500;
    margin-top: 0.25rem;
  }

  .props_children_box {
    width: 100%;
    height: auto;
  }

  .props_ic_box {
    width: 100%;
    height: auto;
  }

  .props_ic_gap {
    width: 100%;
    height: 0.75rem;
  }
</style>
