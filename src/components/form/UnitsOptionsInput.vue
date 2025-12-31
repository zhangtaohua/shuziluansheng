<template>
  <div v-if="state.isEnable" class="col_nw_fs_fs props_container">
    <div
      v-if="isShowOp && props.vdata.options && props.vdata.options.length"
      class="row_nw_fs_ce props_options_mask"
      @click="setIsShowOptions(false)"
    ></div>

    <div class="row_nw_ce_ce props_optionsbox">
      <div class="row_nw_fs_ce props_labelboxs" @click="toggleIsShowOptions">
        <div class="row_nw_fs_ce props_labelinboxs">
          {{ state.value }}
        </div>

        <div
          v-if="isShowOp && props.vdata.options && props.vdata.options.length"
          class="col_nw_fs_ce props_biglabelopts"
          @mouseenter="clearDisTime"
          @mouseleave="hiddenOp"
        >
          <div
            v-for="opt in props.vdata.options"
            :key="opt.value"
            class="row_nw_fs_ce props_label_bigitem"
            :class="{ props_label_bigitem_act: state.value == opt.value }"
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
  import { ref, reactive, onMounted } from "vue";

  const emit = defineEmits(["onChange"]);

  const props = defineProps({
    vdata: {
      type: Object,
      default() {
        return {
          value: "",
          isEnable: true,
          options: [
            { id: "block", value: "block", labelZh: "块", labelEn: "块" },
            { id: "flex", value: "flex", labelZh: "flex", labelEn: "flex" },
            { id: "grid", value: "grid", labelZh: "grid", labelEn: "grid" },
          ],
        };
      },
    },
  });

  const state = reactive({
    value: "",
    isEnable: true,
  });

  const isShowOp = ref(false);

  function init() {
    if (props.vdata) {
      state.value = props.vdata.value;
      state.isEnable = props.vdata.isEnable;
    } else {
      state.value = "";
      state.isEnable = false;
    }
  }

  onMounted(() => {
    init();
  });

  function toggleIsShowOptions() {
    if (state.isEnable) {
      isShowOp.value = !isShowOp.value;
    }
  }

  function setIsShowOptions(isShow) {
    if (state.isEnable) {
      isShowOp.value = isShow;
    }
  }

  function setOptions(opt: any) {
    state.value = opt.value;
    isShowOp.value = false;
    emit("onChange", state.value);
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
    }, 1500);
  }
</script>

<style scoped>
  .props_container {
    width: 100%;
    height: 100%;
    background-color: transparent;
  }

  .props_options_mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 0, 0, 0.5);
    z-index: 3;
  }

  .props_optionsbox {
    width: 100%;
    height: 2.5rem;
  }

  .props_labelboxs {
    position: relative;
    width: 100%;
    height: 100%;
    flex-shrink: 0;
    cursor: pointer;
  }

  .props_labelboxs:hover {
    outline: 1px solid rgba(15, 55, 175, 1);
  }

  .props_labelboxs_active {
    outline: 1px solid rgba(15, 55, 175, 1);
  }

  .props_labelinboxs {
    width: 100%;
    height: 100%;
    border-radius: 2rem;
    font-weight: 400;
    font-size: 0.875rem;
    color: rgba(255, 255, 255, 1);
    padding-left: 0.5rem;
  }

  .props_biglabelopts {
    position: absolute;
    width: 2.5rem;
    height: auto;
    top: 2.75rem;
    right: 0px;
    background: rgba(0, 0, 0, 1);
    border-radius: 0.25rem;
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
