<template>
  <div v-if="isEnable" class="col_nw_fs_fs props_container">
    <div class="row_nw_sb_ce props_box">
      <div class="row_nw_sb_ce props_title_box">
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
          <div class="row_nw_fs_ce wh_auto_100p">
            <label class="row_nw_fs_ce props_ch_label">{{ currentProp.labelZh }}</label>
            <label class="row_nw_fs_fe props_ogi_label">{{ currentProp.labelEn }}</label>
          </div>
        </el-tooltip>

        <div v-if="currentProp.isShowUsed" class="row_nw_fs_ce props_timecol_isusedbox">
          <RjBooleanSwitchInput v-model="currentProp.isUsed"></RjBooleanSwitchInput>
        </div>
      </div>
    </div>

    <div
      class="row_nw_ce_ce props_input_sbox"
      :class="{ props_input_sbox_act: isFoucus, props_input_box_disabled: !currentProp.isEnable }"
    >
      <input
        :id="currentProp.id"
        :name="currentProp.id"
        class="props_input"
        v-model="currentText"
        :disabled="!currentProp.isEnable"
        @focus="setIsFoucus(true)"
        @blur="
          () => {
            setIsFoucus(false);
            textChangeHd();
          }
        "
        @input="textChangeHd"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, reactive, onMounted, computed, watch, nextTick } from "vue";
  import RjBooleanSwitchInput from "@/components/form/RjBooleanSwitchInput.vue";

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
  const id = "";
  const name = "";
  const currentProp = ref({});
  const currentText = ref("");
  const isEnable = ref(false);
  const isFoucus = ref(false);

  function init() {
    console.log("text props", props.vdata);
    if (props.vdata && props.vdata.id && props.vdata.name) {
      isEnable.value = true;
      currentProp.value = props.vdata;
      currentText.value = currentProp.value.value;
    } else {
      isEnable.value = false;
      currentText.value = "";
      currentProp.value = {};
    }
    console.log("text input", id, name, currentProp);
  }

  onMounted(() => {
    init();
  });

  function textChangeHd() {
    if (isEnable.value && currentProp.value) {
      currentProp.value.value = currentText.value;
    }
  }

  function setIsFoucus(isFos: boolean) {
    isFoucus.value = isFos;
  }
</script>

<style scoped>
  .props_container {
    width: 100%;
    height: auto;
    background-color: transparent;
  }

  .props_box {
    width: 100%;
    height: 2.5rem;
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

  .props_title_box {
    width: 100%;
    height: 100%;
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
    color: rgba(200, 200, 200, 1);
    font-size: var(--czml-fs-pp-en);
    font-weight: 400;
  }

  .props_input_sbox {
    position: relative;
    width: calc(100% - 0.25rem);
    margin-left: 0.125rem;
    height: 2.5rem;
    background-color: rgba(0, 0, 0, 1);
    border-radius: 0.5rem;
  }

  .props_input_sbox_act {
    outline: 1px solid rgba(15, 55, 175, 1);
  }

  .props_input_sbox_disabled {
    outline: 1px solid rgba(15, 55, 175, 0.5);
    cursor: not-allowed;
  }

  .props_input {
    align-self: flex-start;
    width: 100%;
    height: 2.5rem;
    padding: 0.5rem 0.5rem;
    color: rgba(255, 255, 255, 1);
    font-size: 0.875rem;
    background-color: transparent;
    font-weight: 400;
    border: none;
    line-height: 1.75rem;
    -moz-appearance: textfield;
    resize: none;
  }

  .props_input:disabled {
    cursor: not-allowed;
  }

  .props_input::placeholder {
    display: flex;
    flex-direction: row;
    place-items: center flex-start;
    padding: 0;
    color: rgba(255, 255, 255, 0.8);
    font-size: 0.875rem;
  }
</style>
