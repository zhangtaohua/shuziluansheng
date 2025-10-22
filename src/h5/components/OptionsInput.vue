<template>
  <div v-if="isEnable" class="col_nw_fs_fs props_container">
    <div
      v-if="isShowOp && currentStyle.options && currentStyle.options.length"
      class="row_nw_fs_ce props_options_mask"
      @click="setIsShowOptions(false)"
    ></div>
    <div class="row_nw_fs_ce props_box">
      <div class="row_nw_fs_ce wh_auto_100p">
        <label class="row_nw_fs_ce props_ch_label">{{ currentStyle.labelZh }}</label>
        <label class="row_nw_fs_fe props_ogi_label">{{ currentStyle.labelEn }}</label>
      </div>
    </div>
    <div class="row_nw_ce_ce props_optionsbox">
      <div
        class="row_nw_sb_ce props_labelboxs"
        :class="{ props_labelboxs_disabled: !currentStyle.isEnable }"
        @click="toggleIsShowOptions"
      >
        <div class="row_nw_fs_ce props_labelinboxs" :class="{ props_labelinboxs_disabled: !currentStyle.isEnable }">
          {{ currentStyle.value ? currentStyle.value : "请选择" }}
        </div>
        <div class="row_nw_ce_ce props_labeldown">
          <div
            class="props_input_downarrow"
            :class="{
              props_input_downarrow_disabled: !currentStyle.isEnable,
              props_labeldownup_show: isShowOp,
              props_labeldown_show: !isShowOp,
            }"
          ></div>
        </div>

        <div
          v-if="isShowOp && currentStyle.options && currentStyle.options.length"
          class="col_nw_fs_ce props_biglabelopts"
          @mouseenter="clearDisTime"
          @mouseleave="hiddenOp"
        >
          <div
            v-for="opt in currentStyle.options"
            :key="opt.value"
            class="row_nw_fs_ce props_label_bigitem"
            :class="{ props_label_bigitem_act: currentStyle.value == opt.value }"
            @click.stop.prevent="setOptions(opt)"
          >
            {{ opt.value }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, reactive, onMounted, computed } from "vue";
  import { useEditorConfigStore, globalEditor } from "@/stores/editorConfig";

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

  const { editorConfig, setEditorRefreshShape } = useEditorConfigStore();
  let id = "";
  let name = "";
  let currentStyle = {};
  const isEnable = ref(false);

  const isShowOp = ref(false);

  function init() {
    if (props.vdata && props.vdata.id && props.vdata.name) {
      const styles = editorConfig.currentParentComp.styles;
      id = props.vdata.id;
      name = props.vdata.name;
      if (styles[name] && styles[name].id === id) {
        isEnable.value = true;
        currentStyle = styles[name];
      } else {
        isEnable.value = false;
        currentStyle = null;
      }
    }
  }

  onMounted(() => {
    init();
  });

  function toggleIsShowOptions() {
    if (currentStyle && currentStyle.isEnable) {
      isShowOp.value = !isShowOp.value;
    }
  }

  function setIsShowOptions(isShow) {
    if (currentStyle && currentStyle.isEnable) {
      isShowOp.value = isShow;
    }
  }

  function setOptions(opt: any) {
    currentStyle.value = opt.value;
    isShowOp.value = false;
    setEditorRefreshShape();
  }

  let disTime = null;
  function clearDisTime() {
    if (disTime) {
      clearTimeout(disTime);
      disTime = null;
    }
  }

  function hiddenOp() {
    clearDisTime();
    disTime = setTimeout(() => {
      isShowOp.value = false;
    }, 3000);
  }
</script>

<style scoped>
  .props_container {
    width: 100%;
    height: auto;
    background-color: transparent;
  }

  .props_options_mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 3;
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

  .props_optionsbox {
    width: 100%;
    height: 2.5rem;
  }

  .props_labelboxs {
    position: relative;
    width: calc(100% - 0.5rem);
    height: 100%;
    background-color: rgba(0, 0, 0, 1);
    flex-shrink: 0;
    border-radius: 2rem;
    cursor: pointer;
  }

  .props_labelboxs:hover {
    outline: 1px solid rgba(15, 55, 175, 1);
  }

  .props_labelboxs_active {
    outline: 1px solid rgba(15, 55, 175, 1);
  }

  .props_labelboxs_disabled {
    background-color: rgba(0, 0, 0, 0.3);
    cursor: not-allowed;
  }

  .props_labelboxs_disabled:hover {
    outline: none;
  }

  .props_labelinboxs {
    width: calc(100% - 2rem);
    height: 100%;
    border-radius: 2rem;
    font-weight: 400;
    font-size: 0.875rem;
    color: rgba(255, 255, 255, 1);
    padding-left: 0.75rem;
  }

  .props_labelinboxs_disabled {
    color: rgba(255, 255, 255, 0.8);
  }

  .props_labeldown {
    width: 1rem;
    height: 100%;
    margin-right: 0.5rem;
  }

  .props_input_downarrow {
    width: 0px;
    height: 0px;
    border-right: 0.5rem solid transparent;
    border-top: 0.5rem solid rgba(255, 255, 255, 1);
    border-left: 0.5rem solid transparent;
    cursor: pointer;
    transition: all 0.5s;
  }

  .props_input_downarrow_disabled {
    border-top: 0.5rem solid rgba(255, 255, 255, 0.5);
    cursor: not-allowed;
  }

  .props_labeldownup_show {
    transform: rotate(180deg);
  }

  .props_labeldown_show {
    transform: rotate(0deg);
  }

  .props_biglabelopts {
    position: absolute;
    width: 100%;
    height: auto;
    top: 2.75rem;
    background: rgba(0, 0, 0, 1);
    border-radius: 0.5rem;
    z-index: 102;
    padding: 0.5rem 0;
  }

  .props_biglabelopts::-webkit-scrollbar {
    display: none;
  }

  .props_label_bigitem {
    width: 100%;
    height: 2rem;
    flex-shrink: 0;
    font-weight: 400;
    font-size: 0.875rem;
    color: rgba(255, 255, 255, 0.8);
    padding-left: 0.5rem;
    cursor: pointer;
  }

  .props_label_bigitem:hover {
    color: rgba(255, 255, 255, 1);
    background-color: rgba(15, 55, 175, 1);
  }

  .props_label_bigitem_act {
    color: rgba(255, 255, 255, 1);
    background-color: rgba(15, 55, 175, 0.8);
  }
</style>
