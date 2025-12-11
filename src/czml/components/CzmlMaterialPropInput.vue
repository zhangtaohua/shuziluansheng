<template>
  <div v-if="isEnable" class="col_nw_fs_fs czml_props_container">
    <div class="col_nw_fs_ce czml_combine_box">
      <div class="row_nw_sb_ce czml_combine_tbox">
        <el-tooltip placement="top" effect="dark">
          <template #content>
            <div class="col_nw_fs_ce props_title_tipbox">
              <p v-if="currentProp.descriptionZh" class="props_ch_tiplabel">
                {{ currentProp.descriptionZh }}
              </p>
              <p class="props_ogi_tiplabel">
                {{ currentProp.description }}
              </p>
            </div>
          </template>
          <div class="row_nw_fs_ce czml_combine_lefttbox">
            <img src="@/assets/images/icons/e-cube.svg" alt="icon" class="czml_combine_icon" />
            <label class="row_nw_fs_ce czml_entitych_label">{{ currentProp.labelZh }}</label>
            <label class="row_nw_fs_fe czml_entityogi_label">{{ currentProp.labelEn }}</label>

            <div
              class="row_nw_ce_ce czml_combine_downarrow"
              :class="{ czml_combine_arrowup_show: currentProp.isExpand }"
              @click="() => (currentProp.isExpand = !currentProp.isExpand)"
            ></div>
          </div>
        </el-tooltip>

        <div class="row_nw_fs_ce props_timecol_isusedbox">
          <RjBooleanSwitchInput v-model="currentProp.isUsed"></RjBooleanSwitchInput>
        </div>
      </div>

      <div class="czml_combine_topgap"></div>

      <div class="col_nw_fs_fs czml_props_used_box">
        <div class="row_nw_fs_ce wh_auto_100p" style="margin-bottom: 1rem">
          <div class="row_nw_fs_ce czml_props_used_label">请选择使用的属性</div>
          <div class="row_nw_fs_ce czml_props_used_enlabel">Please select the attribute to use.</div>
        </div>
        <el-select v-model="usedComp" placeholder="Select" @change="usedCompChangedHd">
          <el-option
            v-for="item in currentProp.compUsedOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>

      <div
        v-if="currentProp && currentProp.properties"
        class="col_nw_fs_fs czml_combine_propbox"
        :class="{ czml_combine_bigpropbox: currentProp.isExpand }"
      >
        <div v-for="childProp in currentProp.properties" :key="childProp.id" class="col_nw_ce_ce props_ic_box">
          <div
            v-if="childProp.isUsed"
            v-for="cchildProp in childProp.properties"
            :key="cchildProp.id"
            class="col_nw_ce_ce props_ic_box"
          >
            <component :is="cchildProp.tag" :vdata="cchildProp"></component>
            <div v-if="cchildProp.isUsed" class="props_ic_gap"></div>
          </div>
          <div v-if="childProp.isUsed" class="props_ic_gap"></div>
        </div>
        <div class="props_ic_gap"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, reactive, onMounted, computed, watch, nextTick } from "vue";
  import RjBooleanSwitchInput from "@/components/form/RjBooleanSwitchInput.vue";

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

  const currentProp = ref({});
  const isEnable = ref(false);
  const usedComp = ref("");
  let oldCompKey = "";

  // const componentOptions = computed(() => {
  //   if (currentProp.value.properties) {
  //     const keys = Object.keys(currentProp.value.properties);
  //     if (keys && keys.length) {
  //       const reVal = [];
  //       for (let i = 0; i < keys.length; i++) {
  //         reVal.push({ label: keys[i], value: keys[i] });
  //       }
  //       return reVal;
  //     } else {
  //       return [];
  //     }
  //   } else {
  //     return [];
  //   }
  // });

  function usedCompChangedHd(key) {
    if (currentProp.value.properties) {
      currentProp.value.currentProperty = key;
      currentProp.value.properties[oldCompKey].isUsed = false;
      currentProp.value.properties[key].isUsed = true;
      oldCompKey = key;
    }
  }

  function init() {
    if (props.vdata && props.vdata.id && props.vdata.name) {
      isEnable.value = true;
      currentProp.value = props.vdata;
      usedComp.value = props.vdata.currentProperty;
      oldCompKey = props.vdata.currentProperty;
    } else {
      isEnable.value = false;
      currentProp.value = {};
    }

    console.log("position_currentProp", currentProp.value);
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

  .props_title_tipbox {
    width: auto;
    max-width: 30rem;
    height: auto;
  }

  .props_ch_tiplabel {
    width: 100%;
    height: 100%;
    color: rgba(0, 0, 0, 1);
    font-size: var(--czml-fs-tipvalue);
    font-weight: 500;
    margin-bottom: 0.25rem;
    line-height: 1rem;
    word-wrap: break-word;
    word-break: break-all;
  }

  .props_ogi_tiplabel {
    width: 100%;
    height: 100%;
    color: rgba(0, 0, 0, 1);
    font-size: var(--czml-fs-tipvalue);
    font-weight: 400;
    line-height: 1rem;
    word-wrap: break-word;
    word-break: break-all;
  }

  .czml_combine_tbox {
    position: absolute;
    width: 100%;
    height: 2rem;
    top: -1rem;
    left: 0.5rem;
    background-color: transparent;
    padding: 0rem 0.5rem;
  }

  .czml_combine_lefttbox {
    width: auto;
    height: 100%;
    background-color: rgba(26, 30, 39, 1);
    padding: 0 0.875rem;
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

  .props_timecol_isusedbox {
    width: 10rem;
    height: 100%;
    background-color: rgba(26, 30, 39, 1);
    margin-right: 0.25rem;
    padding: 0 0.875rem 0 1rem;
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

  .czml_props_used_box {
    width: calc(100% - 2rem);
    height: auto;
    margin-bottom: 1rem;
  }

  .czml_props_used_label {
    width: max-content;
    height: 100%;
    color: rgba(255, 255, 255, 1);
    font-size: var(--czml-fs-ppl-zh);
    font-weight: 400;
    margin-right: 0.75rem;
  }

  .czml_props_used_enlabel {
    width: max-content;
    height: 100%;
    color: rgba(255, 255, 255, 1);
    font-size: var(--czml-fs-ppl-en);
    font-weight: 400;
    margin-top: 0.25rem;
  }

  .czml_combine_propbox {
    width: calc(100% - 2rem);
    height: auto;
    max-height: 0px;
    overflow: hidden;
    transition: all 0.5s;
  }

  .czml_combine_bigpropbox {
    width: calc(100% - 2rem);
    height: auto;
    max-height: fit-content;
    overflow: unset;
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
