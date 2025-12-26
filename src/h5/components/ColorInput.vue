<template>
  <div v-if="isEnable" class="col_nw_fs_fs props_container">
    <div class="row_nw_sb_ce props_box">
      <div class="row_nw_fs_ce wh_auto_100p">
        <label class="row_nw_fs_ce props_ch_label">{{ currentStyle.labelZh }}</label>
        <label class="row_nw_fs_fe props_ogi_label">{{ currentStyle.labelEn }}</label>
      </div>
    </div>
    <ColorInputBase
      :color="currentStyle.value"
      :disabled="!currentStyle.isEnable"
      @onChange="updateColorHd"
    ></ColorInputBase>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted } from "vue";
  import ColorInputBase from "./ColorInputBase.vue";

  import { useEditorComponentstore } from "@/stores/editorConfig";

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

  const { editorComponents, setEditorRefreshTransToCompFlag } = useEditorComponentstore();
  let currentStyle = {};
  const isEnable = ref(false);

  function init() {
    if (props.vdata && props.vdata.id && props.vdata.name) {
      isEnable.value = true;
      currentStyle = props.vdata;
    } else {
      isEnable.value = false;
      currentStyle = null;
    }
  }

  onMounted(() => {
    init();
  });

  function updateColorHd(color) {
    currentStyle.value = color;
    setEditorRefreshTransToCompFlag();
  }
</script>

<style scoped>
  .props_container {
    width: 100%;
    height: auto;
    background-color: transparent;
    touch-action: none !important;
  }

  .props_box {
    width: 100%;
    height: 2.5rem;
  }

  .props_ch_label {
    width: max-content;
    height: 100%;
    color: rgba(255, 255, 255, 1);
    font-size: var(--czml-fs-pp-zh);
    font-weight: 500;
    margin-right: 0.5rem;
    margin-left: 0.25rem;
  }

  .props_ogi_label {
    width: max-content;
    height: 1rem;
    color: rgba(230, 230, 230, 1);
    font-size: var(--czml-fs-pp-en);
    font-weight: 400;
  }
</style>
