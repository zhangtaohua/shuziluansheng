<template>
  <div class="row_nw_fs_fs props_container">
    <div
      v-for="(item, index) in options"
      :key="'radio_tab_' + item.id"
      class="row_nw_fs_ce radio_tab_content"
      :class="{ radio_tab_content_checked: item.value === currentValue }"
      @click="onChange(item)"
    >
      <label class="row_nw_fs_ce radio_tab_label" :class="{ radio_tab_label_checked: item.value === currentValue }">
        <span class="row_nw_fs_ce radio_tab_span_zh">{{ item.labelZh }}</span>
        <span class="row_nw_fs_ce radio_tab_span_en">{{ item.labelEn }}</span>
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

  function onChange(item: any) {
    currentValue.value = item.value;
    emit("onChange", currentValue.value);
  }
</script>

<style scoped>
  .props_container {
    width: 100%;
    height: auto;
    background-color: transparent;
  }

  .radio_tab_content {
    width: auto;
    height: 2.5rem;
    background-color: transparent;
    cursor: pointer;
    margin-right: 0.5rem;
    padding: 0 0.5rem;
  }

  .radio_tab_content_checked {
    background-color: rgba(0, 0, 0, 1);
    border-radius: 0.5rem 0.5rem 0 0;
  }

  .radio_tab_label {
    color: rgba(255, 255, 255, 0.75);
    font-weight: 400;
    font-size: 0.875rem;
    cursor: pointer;
  }

  .radio_tab_label_checked {
    color: rgba(255, 255, 255, 1);
    font-weight: 500;
    font-size: 0.875rem;
    cursor: pointer;
  }

  .radio_tab_span_zh {
    width: max-content;
    height: 100%;
    font-size: 0.875rem;
    font-weight: 500;
    margin-right: 0.5rem;
  }

  .radio_tab_span_en {
    width: max-content;
    height: 100%;
    font-size: 0.75rem;
    font-weight: 400;
    padding-top: 0.25rem;
  }
</style>
