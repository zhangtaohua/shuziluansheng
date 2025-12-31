<template>
  <div class="row_nw_ce_ce rparams_in_container">
    <div class="col_nw_fs_fs rparams_in_wrapper">
      <div class="col_nw_fs_fs rparams_in_header">
        <div class="row_nw_sb_ce rparams_in_header_tbox">
          <div class="row_nw_fs_ce rparams_in_header_title">参数配置</div>
          <div class="row_nw_fs_ce rparams_in_header_cimg">
            <el-icon class="rparams_in_header_cicon" size="1.25rem" @click="unExpandClickHd">
              <CircleClose />
            </el-icon>
          </div>
        </div>
      </div>

      <div class="grave_gap"></div>

      <div class="col_nw_fs_ce rparams_in_body">
        <div class="col_nw_fs_fs rparams_in_body_wraper">
          <div class="row_nw_fe_ce rparams_in_body_actions">
            <el-tooltip
              v-if="currentComp.isLocked"
              effect="dark"
              content="解锁"
              placement="top"
              :auto-close="1500"
              size="small"
            >
              <el-button type="success" icon="Unlock" circle size="small" @click="setDomLocked(false)" />
            </el-tooltip>
            <el-tooltip v-else effect="dark" content="锁定" placement="top" :auto-close="1500" size="small">
              <el-button type="success" icon="Lock" circle size="small" @click="setDomLocked(true)" />
            </el-tooltip>
          </div>
        </div>

        <div class="col_nw_fs_fs rparams_in_body_wraper">
          <div v-for="styleTag in currentComp.styles" :key="styleTag.id" class="col_nw_fs_fs rparams_in_body_item">
            <div class="row_nw_fs_ce rparams_in_body_labelzh">
              {{ styleTag.labelZh }}
            </div>
            <component v-for="prop in styleTag.properties" :key="prop.id" :is="prop.tag" :vdata="prop"></component>

            <div class="grave_gap"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, watch } from "vue";

  import { globalEditor, useEditorConfigStore, useEditorComponentstore } from "@/stores/editorConfig";

  const { editorComponents } = useEditorComponentstore();

  const currentComp = ref(null);
  const emits = defineEmits(["unExpand"]);

  watch(
    () => editorComponents.currentComp,
    () => {
      if (editorComponents.currentComp) {
        currentComp.value = editorComponents.currentComp;
      } else {
        currentComp.value = null;
      }
    },
    {
      immediate: true,
      deep: true,
    },
  );

  function setDomLocked(isLocked: boolean) {
    if (currentComp.value) {
      currentComp.value.isLocked = isLocked;
    }
  }

  function unExpandClickHd() {
    emits("unExpand");
  }
</script>

<style scoped>
  .rparams_in_container {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 1);
    overflow: hidden;
    border-top-left-radius: 0.75rem;
    border-bottom-left-radius: 0.75rem;
    border-left: 1px solid rgba(255, 255, 255, 0.2);
    border-top: 1px solid rgba(255, 255, 255, 0.2);
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    box-shadow: -0.25rem 0 0.25rem rgba(255, 255, 255, 0.2);
  }

  .rparams_in_wrapper {
    width: calc(100% - 1.5rem);
    height: calc(100% - 3rem);
  }

  .rparams_in_header {
    width: 100%;
    height: auto;
  }

  .rparams_in_header_tbox {
    width: 100%;
    height: 2rem;
  }

  .rparams_in_header_title {
    width: max-content;
    height: 100%;
    color: rgba(255, 255, 255, 1);
    font-size: 1.25rem;
    flex-shrink: 0;
    font-weight: 700;
  }

  .rparams_in_header_cimg {
    width: 1.25rem;
    height: 2rem;
  }

  .rparams_in_header_cicon {
    font-size: 1.25rem;
    color: rgba(255, 255, 255, 1);
    cursor: pointer;
  }

  .rparams_in_header_tabbox {
    width: 100%;
    height: 2rem;
    margin-top: 0.5rem;
  }

  .grave_gap {
    width: 100%;
    border: 0;
    border-bottom: 0.125rem groove rgba(125, 125, 125, 1);
    margin-top: 1rem;
    margin-bottom: 1rem;
  }

  .rparams_in_body {
    width: 100%;
    height: auto;
    flex-grow: 1;
    overflow-y: scroll;
    container-name: rparamsBody;
    container-type: inline-size;
  }

  .rparams_in_body::-webkit-scrollbar {
    display: none;
    width: 0px;
  }

  .rparams_in_body_wraper {
    width: 100%;
    height: auto;
    margin-bottom: 1rem;
    background-color: rgba(25, 25, 25, 1);
    padding: 1rem 0.25rem 1rem 0.5rem;
    border-radius: 0.25rem;
  }

  .rparams_in_body_actions {
    width: 100%;
    height: 2rem;
  }

  .rparams_in_body_item {
    width: 100%;
    height: auto;
  }

  .rparams_in_body_labelzh {
    width: max-content;
    height: 2rem;
    color: rgba(255, 255, 255, 1);
    font-size: var(--czml-fs-pp-zh);
    font-weight: bold;
    padding-left: 0.25rem;
    margin-bottom: 0.25rem;
  }

  @container rparamsBody (max-width: 280px) {
  }
</style>
