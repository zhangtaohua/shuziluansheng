<template>
  <div
    :class="{
      [divClassNames]: true,
      active_container: isActive,
    }"
    :style="divStyles"
    ref="divRef"
    @dblclick.stop.prevent="setEditorCurrentShapeHd"
    @click.stop.prevent="setEditorCurrentParentCompHd"
  >
    <span ref="spanRef" style="width: 100%; height: auto"
    >{{ props.vNodeData.text }}</span>
  </div>
</template>

<script setup lang="ts">
  import { ref, reactive, computed, watch, onMounted, nextTick } from "vue";
  import { useEditorConfigStore, globalEditor } from "@/stores/editorConfig";

  const { editorConfig, setEditorCurrentShape, setEditorRefreshShape, setEditorCurrentParentComp } =
    useEditorConfigStore();

  const props = defineProps({
    vNodeData: {
      type: Object,
      default() {
        return null;
      },
    },
  });

  const divRef = ref(null);
  const spanRef = ref(null);
  let adjustingWhState = "idle";
  let adjustingTimeout: any = null;
  let hasAdjustedWh = false;

  const divClassNames = computed(() => {
    if (props.vNodeData.classNames) {
      return Object.keys(props.vNodeData.classNames).join(" ");
    } else {
      return "";
    }
  });


  // const spanStyle = computed(() => {
  //   if (props.vNodeData.styles) {
  //     let style = {};
  //     const values = Object.values(props.vNodeData.styles);
  //     values.forEach((prop: any) => {
  //       if(prop.name == "text-ellipse-lines") {
  //         const lines = prop.value;
  //         console.log("lines", lines);
  //         if(lines == 0) {
  //           style = {};
  //         } else if(lines == 1) {
  //           style = {
  //             "overflow": "hidden",
  //             "text-overflow": "ellipsis",
  //             "white-space": "nowrap",
  //           }
  //         } else if (lines >= 2) {
  //           style = {
  //             "display": "-webkit-box",
  //             "-webkit-box-orient": "vertical",
  //             "-webkit-line-clamp": lines,
  //             "overflow": "hidden",
  //           }
  //         }
  //       }
  //     });
  //     return style;
  //   } else {
  //     return {};
  //   }
  // });

  const divStyles = computed(() => {
    if (props.vNodeData.styles) {
      const style = {};
      const values = Object.values(props.vNodeData.styles);
      values.forEach((prop: any) => {
        if(prop.name != "text-ellipse-lines") {
          style[prop.getStyleName()] = prop.getStyleValue();
        } else {
          const lines = prop.value;
          if(lines == 0) {
            style["overflow"] = null;
            style["text-overflow"] = null;
            style["white-space"] = null;
          } else if(lines == 1) {
            style["overflow"] = "hidden";
            style["text-overflow"] = "ellipsis";
            style["white-space"] = "nowrap";

          } else if (lines >= 2) {
            style["display"] = "-webkit-box";
            style["-webkit-box-orient"] = "vertical";
            style["-webkit-line-clamp"] = lines;
            style["overflow"] = "hidden";
          }
        }
      });

      if(props.vNodeData.styles && props.vNodeData.styles["background-clip-text"]) {
        const prop = props.vNodeData.styles["background-clip-text"];
        if(prop.value) {
            style["color"] = "transparent";
            style["-webkit-background-clip"] = "text";
            style["background-clip"] = "text";
            style["text-shadow"] = null;
          } else {
            style["-webkit-background-clip"] = null;
            style["background-clip"] = null;
          }
      }
      return style;
    } else {
      return {};
    }
  });


  const isActive = computed(() => {
    if (props.vNodeData && editorConfig.currentParentComp && props.vNodeData.id == editorConfig.currentParentComp.id) {
      return true;
    } else {
      return false;
    }
  });

  function setEditorCurrentShapeHd() {
    if (props.vNodeData) {
      setEditorCurrentShape(props.vNodeData);
      setEditorRefreshShape();
    }
  }

  function setEditorCurrentParentCompHd() {
    if (props.vNodeData) {
      setEditorCurrentParentComp(props.vNodeData);
    }
  }

  // function textChangeHd(event) {
  //   console.log("textChangeHd", event);
  //   // if (editorConfig.currentParentComp) {
  //   // }
  // }

  function updateWidthHeight( isAdjustingWidth = true, isAdjustingHeight = true) {
    if (divRef.value) {
      // const { width, height } = divRef.value.getBoundingClientRect();
      // const { clientWidth, clientHeight } = divRef.value;

      const { width: spanWidth, height: spanHeight } = spanRef.value.getBoundingClientRect();
      // const realWidth = Math.max(Math.ceil(width), clientWidth, Math.ceil(spanWidth));
      // const realHeight = Math.max(Math.ceil(height), clientHeight, Math.ceil(spanHeight));
      const realWidth = Math.ceil(spanWidth);
      const realHeight = Math.ceil(spanHeight);
      const styles = props.vNodeData.styles;
      if(isAdjustingWidth) {
        styles.width.value = realWidth;
      }

      if(isAdjustingHeight) {
        styles.height.value = realHeight;
      }
    }
  }

  onMounted(() => {
    if(adjustingWhState == "idle" || adjustingWhState == "initboth") {
        adjustingWhState = "initboth";
        updateWidthHeight();

        if(adjustingTimeout) {
          clearTimeout(adjustingTimeout);
          adjustingTimeout = null;
        }

        adjustingTimeout = setTimeout(() => {
          adjustingWhState = "idle";
        }, 300);
      }
  });


  watch(
    [() => props.vNodeData.styles["font-size"].value,
    () => props.vNodeData.styles["line-height"].value
  ],
    () => {
      nextTick(() => {
        if(adjustingWhState == "idle" || adjustingWhState == "both") {
        adjustingWhState = "both";
        updateWidthHeight();

        if(adjustingTimeout) {
          clearTimeout(adjustingTimeout);
          adjustingTimeout = null;
        }

        adjustingTimeout = setTimeout(() => {
          adjustingWhState = "idle";
        }, 300);
      }
      })
    },
    {
      immediate: false,
      deep: true,
    },
  );

  watch(
    () => props.vNodeData.styles["width"].value,
    () => {
      if(hasAdjustedWh) {
        return;
      }
      if(adjustingWhState == "idle" || adjustingWhState == "width") {
        adjustingWhState = "width";
        updateWidthHeight(false, true);
        if(adjustingTimeout) {
          clearTimeout(adjustingTimeout);
          adjustingTimeout = null;
        }
        adjustingTimeout = setTimeout(() => {
          adjustingWhState = "idle";
        }, 300);
      }
    },
    {
      immediate: false,
      deep: true,
    },
  );

  watch(
    () => props.vNodeData.styles["height"].value,
    () => {
      if(hasAdjustedWh) {
        return;
      }
      if(adjustingWhState == "idle" || adjustingWhState == "height") {
        adjustingWhState = "height";
        updateWidthHeight(true, false);
        if(adjustingTimeout) {
          clearTimeout(adjustingTimeout);
          adjustingTimeout = null;
        }
        adjustingTimeout = setTimeout(() => {
          adjustingWhState = "idle";
        }, 300);
      }
    },
    {
      immediate: false,
      deep: true,
    },
  );

  watch(
    () => props.vNodeData.styles["text-ellipse-lines"].value,
    () => {
      nextTick(() => {
        if(adjustingWhState == "idle" || adjustingWhState == "ellipse") {
          adjustingWhState = "ellipse";
          const lines = props.vNodeData.styles["text-ellipse-lines"].value;
          hasAdjustedWh = true;
          if(lines == 0) {
            props.vNodeData.styles["width"].value = 300;
            props.vNodeData.styles["height"].value = "auto";

            nextTick(() => {
              updateWidthHeight();
            })
          } else if(lines == 1) {
            props.vNodeData.styles["width"].value = 300;
            props.vNodeData.styles["height"].value = props.vNodeData.styles["line-height"].value;

          } else if (lines >= 2) {
            props.vNodeData.styles["width"].value = 300;
            props.vNodeData.styles["height"].value = props.vNodeData.styles["line-height"].value * lines;
          }


          if(adjustingTimeout) {
            clearTimeout(adjustingTimeout);
            adjustingTimeout = null;
          }

          adjustingTimeout = setTimeout(() => {
            adjustingWhState = "idle";
            hasAdjustedWh = false;
          }, 300);
        }
      })
    },
    {
      immediate: false,
      deep: true,
    },
  );

  watch(
    () => editorConfig.refreshShapeToCompFlag,
    () => {
      if (
        editorConfig.currentShapeOptions &&
        editorConfig.currentShapeOptions.transform &&
        editorConfig.currentShapeOptions.id == props.vNodeData.id
      ) {
        const transform = editorConfig.currentShapeOptions.transform;
        const styles = props.vNodeData.styles;
        if (styles.left) {
          styles.left.value = transform.left;
        }

        if (styles.top) {
          styles.top.value = transform.top;
        }

        if (styles.width) {
          styles.width.value = transform.width;
        }

        if (styles.height) {
          styles.height.value = transform.height;
        }
      }
    },
    {
      immediate: false,
      deep: false,
    },
  );
</script>

<style scoped lang="scss">
  .active_container {
    outline: 1px solid rgba(235, 3, 3, 1);
    box-shadow: 0 0 10px rgba(235, 3, 3, 0.5);
  }
</style>
