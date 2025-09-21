<template>
  <div class="col_nw_fs_fs props_container">
    <div class="row_nw_sb_ce props_box">
      <div class="row_nw_fs_ce wh_auto_100p">
        <label class="row_nw_fs_ce props_ch_label">宽度</label>
        <label class="row_nw_fs_fe props_ogi_label">Width</label>
      </div>
    </div>
    <div class="row_nw_fs_fs prop_input_wraper">
      <div
          v-for="(item, index) in radioOptions.options"
          :key="'radio_' + index"
          class="row_nw_fs_ce radio_content"
        >
          <input
            :id="item.id"
            v-model="currentValue"
            class="radio_input"
            type="radio"
            :name="radioOptions.name"
            :value="item.value"
            @change="onChange"
          />
          <label :for="item.id" class="radio_label"
            ><span class="radio_span" :class="{ radio_span_checked: item.value === currentValue }"></span>
            {{ item.title }}</label
          >
        </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from "vue";

const emit = defineEmits(["onInput"]);

const props = defineProps({
  titleLabel: {
    type: String,
    default: "图案类型",
  },
  isRefresh: {
    type: Number,
    default: 0,
  },
  radioOptions: {
    type: Object,
    default() {
      return {
        name: "imagingMode",
        options: [
          { id: "pattern", value: "pattern", title: "图案" },
          { id: "icons", value: "icons", title: "icons" },
        ],
      };
    },
  },
  initValue: {
    type: String,
    default: "pattern",
  },
});

const currentValue = ref(props.initValue);

watch(
  () => props.isRefresh,
  () => {
    init();
  },
);

onMounted(() => {
  init();
});

function init() {
  currentValue.value = props.initValue;
}

function onChange() {
  emit("onInput", currentValue.value);
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
  height: 2rem;
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

.prop_input_wraper {
  width: 100%;
  height: auto;
  min-height: 2rem;
  flex-wrap: wrap;
  background-color: transparent;
  text-align: center;
}

.radio_content {
  width: auto;
  min-width: 4.375rem;
  height: 2rem;
  margin: 0 0.625rem 0 0.5rem;
  color: #94a7c0;
  font-size: .875rem;
  text-align: center;
  background-color: transparent;
  cursor: pointer;
}

.radio_input {
  display: none;
  cursor: pointer;
}

.radio_label {
  color: #f0f1f5;
  font-weight: normal;
  font-size: .875rem;
  cursor: pointer;
}

.radio_span {
  display: inline-block;
  width: 1rem;
  height: 1rem;
  margin: -0.125rem .3125rem 0 0;
  vertical-align: middle;
  border: .0625rem solid #666;
  border-radius: 50%;
  cursor: pointer;
  transition: 0.2s;
}

.radio_label:hover .radio_span {
  transform: scale(1.2);
  cursor: pointer;
}

.radio_span_checked {
  background: linear-gradient(to right, #aaa, #666);
  box-shadow: 0 0 0 .125rem white inset;
  cursor: pointer;
}

.radio_label_checked {
  color: #666;
  cursor: pointer;
}
</style>
