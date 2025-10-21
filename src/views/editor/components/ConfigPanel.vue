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
      <div
        v-for="scitem in editorConfig.currentParentComp.properties"
        :key="scitem.id"
        class="col_nw_fs_ce config_czml_box"
      >
        <div class="row_nw_fs_ce czml_packet_tbox">
          <div class="row_nw_fs_ce wh_auto_100p">
            <img src="@/assets/images/icons/packetsetting.svg" alt="icon" class="czml_packet_icon" />
            <label class="row_nw_fs_ce czml_ch_label">{{ scitem.labelZh }}</label>
            <label class="row_nw_fs_fe czml_ogi_label">{{ scitem.labelEn }}</label>
          </div>
          <div class="row_nw_ce_ce czml_packet_downarrow"></div>
        </div>
        <div class="czml_packet_topgap"></div>
        <div v-for="czmlProp in scitem.properties" :key="czmlProp.id" class="col_nw_ce_ce czml_packet_box">
          <div v-if="czmlProp.isEntity" class="col_nw_fs_ce czml_entity_box">
            <div class="row_nw_fs_ce czml_entity_tbox">
              <div class="row_nw_fs_ce wh_auto_100p">
                <img src="@/assets/images/icons/entity.svg" alt="icon" class="czml_entity_icon" />
                <label class="row_nw_fs_ce czml_entitych_label">{{ czmlProp.labelZh }}</label>
                <label class="row_nw_fs_fe czml_entityogi_label">{{ czmlProp.labelEn }}</label>
              </div>
              <div class="row_nw_ce_ce czml_entity_downarrow"></div>
            </div>
            <div class="czml_entity_topgap"></div>
            <div
              v-for="entityProp in czmlProp.properties"
              :key="entityProp.id"
              class="col_nw_ce_ce czml_entity_propbox"
            >
              <component :is="entityProp.tag" :vdata="entityProp"></component>
              <LineGap></LineGap>
            </div>
          </div>

          <!-- 不是entity 直接是 packet 的 props -->
          <div v-else class="col_nw_ce_ce czml_packet_propbox">
            <component :is="czmlProp.tag" :vdata="czmlProp"></component>
            <LineGap></LineGap>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, reactive, computed, watch, onUnmounted } from "vue";
  import { useRoute } from "vue-router";
  import LineGap from "@/h5/components/LineGap.vue";

  import { useEditorConfigStore, globalEditor } from "@/stores/editorConfig";

  const { editorConfig, setEditorCurrentShape, setEditorRefreshShape, setEditorCurrentParentComp } =
    useEditorConfigStore();

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

  .config_czml_box {
    position: relative;
    width: 36rem;
    height: auto;
    border: 1px solid rgba(255, 255, 255, 0.5);
    margin-bottom: 3rem;
    margin-top: 2rem;
    border-radius: 0.5rem;
  }

  .czml_packet_tbox {
    position: absolute;
    width: max-content;
    height: 3rem;
    top: -1.5rem;
    left: 0.5rem;
    background-color: rgba(26, 30, 39, 1);
    padding: 0rem 1rem;
  }

  .czml_packet_icon {
    width: auto;
    height: 2rem;
    margin-right: 0.5rem;
  }

  .czml_ch_label {
    width: max-content;
    height: 100%;
    color: rgba(255, 255, 255, 1);
    font-size: 1.5rem;
    font-weight: bold;
    margin-right: 0.75rem;
  }

  .czml_ogi_label {
    width: max-content;
    height: 1.25rem;
    color: rgba(230, 230, 230, 1);
    font-size: 1rem;
    font-weight: bold;
    margin-right: 0.75rem;
  }

  .czml_packet_downarrow {
    width: 0px;
    height: 0px;
    border-right: 0.75rem solid transparent;
    border-top: 0.75rem solid rgba(255, 255, 255, 1);
    border-left: 0.75rem solid transparent;
    cursor: pointer;
    transition: all 0.5s;
    margin-top: 0.375rem;
  }

  .czml_packet_downarrow_disabled {
    border-top: 0.75rem solid rgba(255, 255, 255, 0.5);
    cursor: not-allowed;
  }

  .czml_packet_arrowup_show {
    transform: rotate(180deg);
  }

  .czml_packet_arrowdown_show {
    transform: rotate(0deg);
  }

  .czml_packet_topgap {
    width: 100%;
    height: 2rem;
  }

  .czml_packet_box {
    width: calc(100% - 2rem);
    height: auto;
  }

  .czml_packet_propbox {
    width: 100%;
    height: auto;
  }

  .czml_entity_box {
    position: relative;
    width: 100%;
    height: auto;
    border: 1px solid rgba(255, 255, 255, 0.5);
    margin-bottom: 3rem;
    margin-top: 2rem;
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
    height: 1.5rem;
    margin-right: 0.5rem;
  }

  .czml_entitych_label {
    width: max-content;
    height: 100%;
    color: rgba(255, 255, 255, 1);
    font-size: 1.25rem;
    font-weight: bold;
    margin-right: 0.75rem;
  }

  .czml_entityogi_label {
    width: max-content;
    height: 1rem;
    color: rgba(230, 230, 230, 1);
    font-size: 1rem;
    font-weight: bold;
    margin-right: 0.5rem;
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
    height: 1.75rem;
  }

  .czml_entity_propbox {
    width: calc(100% - 2rem);
    height: auto;
  }
</style>
