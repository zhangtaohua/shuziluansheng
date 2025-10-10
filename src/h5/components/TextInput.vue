<template>
  <div v-if="isEnable" class="col_nw_fs_fs props_container">
    <div class="row_nw_sb_ce props_box">
      <div class="row_nw_fs_ce props_lbox">
        <label class="row_nw_fs_ce props_ch_label">文本</label>
        <label class="row_nw_fs_fe props_ogi_label">Text</label>
      </div>
    </div>

    <div class="row_nw_ce_ce props_input_sbox"
    :class="{ props_input_sbox_act: isFoucus }">
      <textarea :id="currentComp.id" :name="currentComp.id" class="props_input"
      v-model="currentText" rows="5"
      @focus="setIsFoucus(true)"
      @blur="() => {setIsFoucus(false); textChangeHd()}"
      @input="textChangeHd"
      >
    </textarea>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, reactive, onMounted, computed, watch, nextTick } from "vue";
  import { useEditorConfigStore, globalEditor } from "@/stores/editorConfig";

  const { editorConfig, setEditorRefreshShape } = useEditorConfigStore();
  const currentText = ref("");
  let currentComp =  null;
  const isEnable = ref(false);
  const isFoucus = ref(false);

  function init() {
    if(editorConfig.currentParentComp && editorConfig.currentParentComp.text) {
      isEnable.value = true;
      currentText.value = editorConfig.currentParentComp.text;
      currentComp = editorConfig.currentParentComp;
    } else {
      isEnable.value = false;
      currentText.value = "";
      currentComp = null;
    }
  }

  onMounted(() => {
    init();
  });

  function textChangeHd() {
    if (isEnable.value && editorConfig.currentParentComp) {
      editorConfig.currentParentComp.text = currentText.value;
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

  .props_lbox {
    width: max-content;
    height: 100%;
  }

  .props_ch_label {
    width: max-content;
    height: 100%;
    color: rgba(255, 255, 255, 1);
    font-size: 1rem;
    font-weight: 500;
    margin-right: 0.5rem;
    margin-left: 0.25rem;
  }

  .props_ogi_label {
    width: max-content;
    height: 1rem;
    color: rgba(200, 200, 200, 1);
    font-size: 0.875rem;
    font-weight: 400;
  }

  .props_input_sbox {
    position: relative;
    width: calc(100% - 0.25rem);
    margin-left: 0.125rem;
    height: auto;
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
    height: auto;
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
