<template>
  <div v-if="isEnable" class="col_nw_fs_fs props_container">
    <div class="row_nw_fs_ce props_title_box">
      <label class="row_nw_fs_ce props_ch_label">{{ props.vdata.labelZh }}</label>
      <label class="row_nw_fs_fe props_ogi_label">{{ props.vdata.labelEn }}</label>
    </div>

    <div class="row_nw_fs_ce props_radiobox">
      <RjRadioInput
        :name="currentProp.id"
        :options="currentProp.valueTypesOptions"
        @onChange="valueTypesOptionChangedHd"
      ></RjRadioInput>
    </div>

    <div v-if="currentProp.valueType == 'PureValue'" class="row_nw_fs_ce props_input_box">
      <input type="checkbox" v-model="currentProp.value" class="row_nw_fs_fs props_input" />
      <div class="row_nw_fs_ce wh_auto_100p">
        <label class="row_nw_fs_ce props_inch_label">使能显示</label>
        <label class="row_nw_fs_fe props_inogi_label">Enable Show</label>
      </div>
    </div>
    <div v-else-if="currentProp.valueType == 'Intervals'" class="row_nw_fs_ce props_it_box">
      <div>设置间隔值</div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, reactive, onMounted, computed } from "vue";
  import { useEditorConfigStore, globalEditor } from "@/stores/editorConfig";
  import RjRadioInput from "@/components/form/RjRadioInput.vue";

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

  const { editorConfig, setEditorRefreshShape } = useEditorConfigStore();
  let id = "";
  let name = "";
  let currentProp = {};
  const isEnable = ref(false);

  function valueTypesOptionChangedHd(value: string) {
    if (currentProp) {
      currentProp.valueType = value;
    }
  }

  function init() {
    if (props.vdata && props.vdata.id && props.vdata.name) {
      const properties = editorConfig.currentParentComp.properties;
      id = props.vdata.id;
      name = props.vdata.name;
      if (properties[name] && properties[name].id === id) {
        isEnable.value = true;
        currentProp = properties[name];
      } else {
        isEnable.value = false;
        currentProp = null;
      }
      console.log("show input", id, name, currentProp);
    }
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

  .props_title_box {
    width: 100%;
    height: 2rem;
    margin-bottom: 0.5rem;
  }

  .props_ch_label {
    width: max-content;
    height: 100%;
    color: rgba(255, 255, 255, 1);
    font-size: 1rem;
    font-weight: 500;
    margin-right: 0.5rem;
  }

  .props_ogi_label {
    width: max-content;
    height: 1rem;
    color: rgba(230, 230, 230, 1);
    font-size: 0.75rem;
    font-weight: 400;
    margin-top: 0.25rem;
  }

  .props_radiobox {
    width: 100%;
    height: auto;
    margin-bottom: 0.75rem;
  }

  .props_input_box {
    position: relative;
    width: 3rem;
    height: 100%;
    /* background-color: rgba(0, 0, 0, 1); */
    margin-left: 0.125rem;
  }

  input[type="checkbox"] {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    -webkit-tap-highlight-color: transparent;
    width: auto;
    height: auto;
    vertical-align: middle;
    position: relative;
    border: 0;
    outline: 0;
    cursor: pointer;
    margin: 0 0.25rem;
    background: none;
    box-shadow: none;
  }

  input[type="checkbox"]:focus {
    box-shadow: none;
  }

  input[type="checkbox"]:after {
    content: "";
    font-size: 0.5rem;
    font-weight: 400;
    line-height: 1.125rem;
    width: 2.25rem;
    height: 1.125rem;
    display: inline-block;
    background-color: rgba(122, 125, 129, 1);
    border-radius: 4.5rem;
    box-shadow: 0 0 0.75rem rgb(0 0 0 / 15%) inset;
  }

  input[type="checkbox"]:before {
    content: "";
    width: 0.875rem;
    height: 0.875rem;
    display: block;
    position: absolute;
    top: 0.125rem;
    left: 0.125rem;
    margin: 0;
    border-radius: 50%;
    background-color: #ffffff;
  }

  input[type="checkbox"]:checked:before {
    left: 1.25rem;
    margin: 0;
    background-color: #ffffff;
  }

  input[type="checkbox"],
  input[type="checkbox"]:before,
  input[type="checkbox"]:after,
  input[type="checkbox"]:checked:before,
  input[type="checkbox"]:checked:after {
    transition: ease 0.15s;
  }

  input[type="checkbox"]:checked:after {
    background-color: rgba(15, 55, 175, 1);
  }

  .has-cube-spin-animation {
    animation: spin 10s infinite linear;
    display: block;
  }

  @keyframes spin {
    from {
      transform: rotateX(0deg) rotateY(-45deg);
    }

    to {
      transform: rotateX(0deg) rotateY(-405deg);
    }
  }

  .props_inch_label {
    width: max-content;
    height: 100%;
    color: rgba(255, 255, 255, 1);
    font-size: 1rem;
    font-weight: 500;
    margin-right: 0.5rem;
  }

  .props_inogi_label {
    width: max-content;
    height: 1rem;
    color: rgba(230, 230, 230, 1);
    font-size: 0.75rem;
    font-weight: 400;
    margin-top: 0.25rem;
  }
</style>
