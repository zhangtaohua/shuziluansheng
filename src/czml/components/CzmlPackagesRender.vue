<template>
  <div v-if="isEnable" class="col_nw_fs_fs czml_props_container">
    <div v-for="packet in currentPackets.packets" :key="packet.id" class="col_nw_fs_ce config_czml_box">
      <div class="row_nw_fs_ce czml_packet_tbox">
        <div class="row_nw_fs_ce wh_auto_100p">
          <img src="@/assets/images/icons/packetsetting.svg" alt="icon" class="czml_packet_icon" />
          <label class="row_nw_fs_ce czml_ch_label">{{ packet.labelZh }}</label>
          <label class="row_nw_fs_ce czml_ogi_label">{{ packet.labelEn }}</label>
        </div>
        <div class="row_nw_ce_ce czml_packet_downarrow"></div>
      </div>
      <div class="czml_packet_topgap"></div>
      <div v-for="czmlProp in packet.properties" :key="czmlProp.id" class="col_nw_ce_ce czml_packet_box">
        <component :is="czmlProp.tag" :vdata="czmlProp"></component>
        <LineGap v-if="!czmlProp.isCombinedProperty"></LineGap>
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
  const currentPackets = ref({});
  const isEnable = ref(false);

  function init() {
    if (props.vdata && props.vdata.id && props.vdata.name) {
      isEnable.value = true;
      currentPackets.value = props.vdata;
    } else {
      isEnable.value = false;
      currentPackets.value = {};
    }

    console.log("clock_currentPackets", currentPackets.value);
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
    height: 2.5rem;
    margin-right: 0.75rem;
  }

  .czml_ch_label {
    width: max-content;
    height: 100%;
    color: rgba(255, 255, 255, 1);
    font-size: var(--czml-fs-p-zh);
    font-weight: bold;
    margin-right: 0.75rem;
  }

  .czml_ogi_label {
    width: max-content;
    height: 100%;
    color: rgba(230, 230, 230, 1);
    font-size: var(--czml-fs-p-en);
    font-weight: bold;
    margin-top: 0.25rem;
    margin-right: 0.875rem;
  }

  .czml_packet_downarrow {
    width: 0px;
    height: 0px;
    border-right: 0.875rem solid transparent;
    border-top: 0.875rem solid rgba(255, 255, 255, 1);
    border-left: 0.875rem solid transparent;
    cursor: pointer;
    transition: all 0.5s;
    margin-top: 0.375rem;
  }

  .czml_packet_downarrow_disabled {
    border-top: 0.875rem solid rgba(255, 255, 255, 0.5);
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
</style>
