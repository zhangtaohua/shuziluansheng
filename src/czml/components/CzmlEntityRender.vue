<template>
  <div v-if="isEnable" class="col_nw_fs_fs czml_entity_props_container">
    <div v-if="currentEntity.isEntity" class="col_nw_fs_ce czml_entity_box">
      <div class="row_nw_fs_ce czml_entity_tbox">
        <div class="row_nw_fs_ce wh_auto_100p">
          <img src="@/assets/images/icons/entity.svg" alt="icon" class="czml_entity_icon" />
          <label class="row_nw_fs_ce czml_entitych_label">{{ currentEntity.labelZh }}</label>
          <label class="row_nw_fs_ce czml_entityogi_label">{{ currentEntity.labelEn }}</label>
        </div>
        <div class="row_nw_ce_ce czml_entity_downarrow"></div>
      </div>
      <div class="czml_entity_topgap"></div>
      <div v-for="entityProp in currentEntity.properties" :key="entityProp.id" class="col_nw_ce_ce czml_entity_propbox">
        <component :is="entityProp.tag" :vdata="entityProp"></component>
        <LineGap v-if="!entityProp.isCombinedProperty"></LineGap>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, reactive, onMounted, computed, watch, nextTick } from "vue";
  import { useEditorConfigStore, globalEditor } from "@/stores/editorConfig";
  import LineGap from "@/h5/components/LineGap.vue";

  import { cloneDeep } from "es-toolkit";
  import { isArray } from "es-toolkit/compat";
  import dayjs from "dayjs";

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
  const currentEntity = ref({});
  const isEnable = ref(false);

  function init() {
    if (props.vdata && props.vdata.id && props.vdata.name) {
      isEnable.value = true;
      currentEntity.value = props.vdata;
    } else {
      isEnable.value = false;
      currentEntity.value = {};
    }

    console.log("czml entity render", currentEntity.value);
  }

  onMounted(() => {
    init();
  });
</script>

<style scoped>
  .czml_entity_props_container {
    width: 100%;
    height: auto;
    background-color: transparent;
  }

  .czml_entity_box {
    position: relative;
    width: 100%;
    height: auto;
    border: 1px solid rgba(255, 255, 255, 0.5);
    margin-bottom: 2rem;
    margin-top: 2.5rem;
    border-radius: 0.5rem;
  }

  .czml_entity_tbox {
    position: absolute;
    width: max-content;
    height: 2.5rem;
    top: -1.25rem;
    left: 0.5rem;
    background-color: rgba(26, 30, 39, 1);
    padding: 0rem 1rem;
  }

  .czml_entity_icon {
    width: auto;
    height: 2rem;
    margin-right: 0.75rem;
  }

  .czml_entitych_label {
    width: max-content;
    height: 100%;
    color: rgba(255, 255, 255, 1);
    font-size: var(--czml-fs-e-zh);
    font-weight: bold;
    margin-right: 0.75rem;
  }

  .czml_entityogi_label {
    width: max-content;
    height: 100%;
    color: rgba(230, 230, 230, 1);
    font-size: var(--czml-fs-e-en);
    font-weight: bold;
    margin-top: 0.25rem;
    margin-right: 0.875rem;
  }

  .czml_entity_downarrow {
    width: 0px;
    height: 0px;
    border-right: 0.75rem solid transparent;
    border-top: 0.75rem solid rgba(255, 255, 255, 1);
    border-left: 0.75rem solid transparent;
    cursor: pointer;
    transition: all 0.5s;
    margin-top: 0.375rem;
  }

  .czml_entity_downarrow_disabled {
    border-top: 0.75rem solid rgba(255, 255, 255, 0.5);
    cursor: not-allowed;
  }

  .czml_entity_arrowup_show {
    transform: rotate(180deg);
  }

  .czml_entity_arrowdown_show {
    transform: rotate(0deg);
  }

  .czml_entity_topgap {
    width: 100%;
    height: 2rem;
  }

  .czml_entity_propbox {
    width: calc(100% - 2rem);
    height: auto;
  }
</style>
