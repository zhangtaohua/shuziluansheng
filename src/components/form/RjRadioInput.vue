<template>
  <div class="row_nw_fs_fs props_container">
    <div v-for="(item, index) in options" :key="'radio_' + index" class="row_nw_fs_ce radio_content">
      <input
        :id="item.id"
        v-model="currentValue"
        class="radio_input"
        type="radio"
        :name="name"
        :value="item.value"
        @change="onChange"
      />
      <label
        :for="item.id"
        class="row_nw_fs_ce radio_label"
        :class="{ radio_label_checked: item.value === currentValue }"
      >
        <span class="radio_span" :class="{ radio_span_checked: item.value === currentValue }"></span>
        <span class="radio_span_zh">{{ item.labelZh }}</span>
        <span class="radio_span_en">{{ item.labelEn }}</span>
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, watch, onMounted } from "vue";

  const emit = defineEmits(["onChange"]);

  const props = defineProps({
    titleLabel: {
      type: String,
      default: "图案类型",
    },
    isRefresh: {
      type: Number,
      default: 0,
    },
    name: {
      type: String,
      default: "name",
    },
    options: {
      type: Array,
      default() {
        return [
          { id: "PureValue", value: "PureValue", label: "纯数值", labelZh: "纯数值", labelEn: "pure value" },
          { id: "Intervals", value: "Intervals", label: "间隔值", labelZh: "间隔值", labelEn: "intervals" },
        ];
      },
    },
    initValue: {
      type: String,
      default: "PureValue",
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
    emit("onChange", currentValue.value);
  }
</script>

<style scoped>
  .props_container {
    width: 100%;
    height: 2rem;
    background-color: transparent;
  }

  .radio_content {
    width: auto;
    height: 100%;
    margin: 0 0.625rem 0 0.25rem;
    background-color: transparent;
    cursor: pointer;
  }

  .radio_input {
    display: none;
  }

  .radio_label {
    color: rgba(255, 255, 255, 0.8);
    font-weight: 400;
    font-size: 0.875rem;
    cursor: pointer;
  }

  .radio_span {
    width: 1rem;
    height: 1rem;
    margin: 0 0.375rem 0 0;
    border: 1px solid rgba(255, 255, 255, 0.5);
    border-radius: 50%;
    cursor: pointer;
    transition: 0.2s;
  }

  .radio_label:hover .radio_span {
    transform: scale(1.2);
    border: 1px solid rgba(255, 255, 255, 0.8);
    cursor: pointer;
  }

  .radio_span_checked {
    background: rgba(15, 55, 175, 1);
    box-shadow: 0 0 0 0.125rem rgba(255, 255, 255, 1) inset;
    border: none;
    cursor: pointer;
  }

  .radio_label_checked {
    color: rgba(255, 255, 255, 1);
    font-weight: 500;
    font-size: 0.875rem;
    cursor: pointer;
  }

  .radio_span_zh {
    width: max-content;
    height: 100%;
    color: rgba(255, 255, 255, 1);
    font-size: 0.875rem;
    font-weight: 500;
    margin-right: 0.5rem;
    margin-left: 0.25rem;
  }

  .radio_span_en {
    width: max-content;
    height: 1rem;
    color: rgba(230, 230, 230, 1);
    font-size: 0.75rem;
    font-weight: 400;
  }
</style>
