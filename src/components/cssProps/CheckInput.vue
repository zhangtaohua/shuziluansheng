<template>
  <div class="row_nw_fs_ce props_container">
    <div class="row_nw_fs_ce props_input_box">
      <input type="checkbox" v-model="state.value" class="row_nw_fs_fs props_input" @change="onChange" />
    </div>
    <div class="row_nw_fs_ce wh_auto_100p">
      <label class="row_nw_fs_ce props_ch_label">{{ props.vdata.labelZh }}</label>
      <label class="row_nw_fs_fe props_ogi_label">{{ props.vdata.labelEn }}</label>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, reactive, onMounted, computed } from "vue";

  const emit = defineEmits(["onInput", "onBlur", "onChange"]);

  const props = defineProps({
    vdata: {
      type: Object,
      default() {
        return {
          labelZh: "预览",
          labelEn: "Enable Preview",
          name: "",
          value: "",
        };
      },
    },
  });

  const state = reactive({
    name: "",
    value: false,
  });

  function init() {
    if (props.vdata && props.vdata.name) {
      state.name = props.vdata.name;
      state.value = props.vdata.value;
    }
  }

  onMounted(() => {
    init();
  });

  function onChange() {
    emit("onChange", {
      name: state.name,
      values: state.value,
    });
  }
</script>

<style scoped>
  .props_container {
    width: 100%;
    height: 2rem;
    background-color: transparent;
  }

  .props_input_box {
    position: relative;
    width: 3rem;
    height: 100%;
    /* background-color: rgba(0, 0, 0, 1); */
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
</style>
