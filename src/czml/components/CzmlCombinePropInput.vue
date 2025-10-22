<template>
  <div v-if="isEnable" class="col_nw_fs_fs czml_props_container">
    <div class="col_nw_fs_ce czml_combine_box">
      <div class="row_nw_fs_ce czml_combine_tbox">
        <div class="row_nw_fs_ce wh_auto_100p">
          <img src="@/assets/images/icons/e-cube.svg" alt="icon" class="czml_combine_icon" />
          <label class="row_nw_fs_ce czml_entitych_label">{{ currentProp.labelZh }}</label>
          <label class="row_nw_fs_ce czml_entityogi_label">{{ currentProp.labelEn }}</label>
        </div>
        <div class="row_nw_ce_ce czml_combine_downarrow"></div>
      </div>
      <div class="czml_combine_topgap"></div>

      <div v-if="currentProp.properties" class="col_nw_fs_fs czml_combine_propbox">
        <div v-for="childProp in currentProp.properties" :key="childProp.id" class="col_nw_ce_ce props_ic_box">
          <component :is="childProp.tag" :vdata="childProp"></component>
          <div class="props_ic_gap"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
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

    console.log("clock_currentProp", currentProp.value);
  }

  onMounted(() => {
    init();
  });
</script>

<style scoped>
  .czml_props_container {
    width: 100%;
    height: auto;
    background-color: transparent;
  }

  .czml_combine_box {
    position: relative;
    width: 100%;
    height: auto;
    border: 1px solid rgba(255, 255, 255, 0.5);
    margin-bottom: 2rem;
    margin-top: 2rem;
    border-radius: 0.5rem;
  }

  .czml_combine_tbox {
    position: absolute;
    width: max-content;
    height: 2rem;
    top: -1rem;
    left: 0.5rem;
    background-color: rgba(26, 30, 39, 1);
    padding: 0rem 1rem;
  }

  .czml_combine_icon {
    width: auto;
    height: 1.5rem;
    margin-right: 0.75rem;
  }

  .czml_entitych_label {
    width: max-content;
    height: 100%;
    color: rgba(255, 255, 255, 1);
    font-size: var(--czml-fs-c-zh);
    font-weight: bold;
    margin-right: 0.75rem;
  }

  .czml_entityogi_label {
    width: max-content;
    height: 100%;
    color: rgba(230, 230, 230, 1);
    font-size: var(--czml-fs-c-en);
    font-weight: bold;
    margin-top: 0.25rem;
    margin-right: 0.875rem;
  }

  .czml_combine_downarrow {
    width: 0px;
    height: 0px;
    border-right: 0.75rem solid transparent;
    border-top: 0.75rem solid rgba(255, 255, 255, 1);
    border-left: 0.75rem solid transparent;
    cursor: pointer;
    transition: all 0.5s;
    margin-top: 0.375rem;
  }

  .czml_combine_downarrow_disabled {
    border-top: 0.75rem solid rgba(255, 255, 255, 0.5);
    cursor: not-allowed;
  }

  .czml_combine_arrowup_show {
    transform: rotate(180deg);
  }

  .czml_combine_arrowdown_show {
    transform: rotate(0deg);
  }

  .czml_combine_topgap {
    width: 100%;
    height: 2rem;
  }

  .czml_combine_propbox {
    width: calc(100% - 2rem);
    height: auto;
  }

  .props_ic_box {
    width: 100%;
    height: auto;
  }

  .props_ic_gap {
    width: 100%;
    height: 0.875rem;
  }
</style>
