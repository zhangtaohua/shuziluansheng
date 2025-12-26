<template>
  <div ref="divWrapperRef" class="row_nw_ce_ce dw_container" :style="containerStyle" @click.stop.prevent>
    <Teleport v-if="isActive && isShowCtlMask" to="body">
      <div
        class="dw_mask"
        :style="maskStyle"
        @mousemove="maskCtlMouseMoveHandle"
        @mouseout="maskCtlMouseOutHandle"
        @mouseup="maskCtlMouseUpHandle"
        @click.stop.prevent
      ></div>
    </Teleport>

    <Teleport v-if="isCalcShowAlignAxis" to="#editor_workspace_id">
      <div class="dw_ctl_hline" :style="alignAxisXStyle"></div>
      <div class="row_nw_ce_ce dw_ctl_hlabelbox" :style="alignAxisHLabelStyle">
        <div class="row_nw_ce_ce dw_ctl_hlabel">{{ calcBbox.leftShow }}</div>
      </div>
      <div class="dw_ctl_vline" :style="alignAxisYStyle"></div>
      <div class="row_nw_ce_ce dw_ctl_vlabelbox" :style="alignAxisVLabelStyle">
        <div class="row_nw_ce_ce dw_ctl_vlabel">{{ calcBbox.topShow }}</div>
      </div>
    </Teleport>

    <Teleport v-if="isCalcShowBoundingBox" to="#editor_workspace_id">
      <div class="dw_ctl_bbox" :style="bboxStyle"></div>
    </Teleport>

    <Teleport v-if="isCalcShowRestrictRect" to="#editor_workspace_id">
      <div class="dw_ctl_limit_rect" :style="restrictRectStyle"></div>
    </Teleport>

    <div v-if="isActive" class="dw_ctl_rotate">
      <div class="dw_ctl_rotateline"></div>
      <div class="dw_ctl_rotatebtn">
        <el-tooltip effect="dark" content="拖拽旋转,双击恢复" placement="top" :auto-close="1500" size="small">
          <el-button
            type="success"
            icon="RefreshLeft"
            circle
            size="small"
            :class="{ dw_ctl_locked: isLocked }"
            @mousedown="ctlMouseDownHandle($event, 'rotate')"
            @mousemove="ctlMouseMoveHandle($event, 'rotate')"
            @mouseup="ctlMouseUpHandle($event, 'rotate')"
          />
        </el-tooltip>
      </div>
    </div>
    <div v-if="isActive" class="row_nw_ce_ce dw_ctl_action">
      <div class="row_nw_ce_ce dw_ctl_actionbtn">
        <el-tooltip effect="dark" content="拖拽移动" placement="top" :auto-close="1500" size="small">
          <el-button
            type="success"
            icon="Rank"
            circle
            size="small"
            :class="{ dw_ctl_locked: isLocked }"
            @mousedown="ctlMouseDownHandle($event, 'pan')"
            @mousemove="ctlMouseMoveHandle($event, 'pan')"
            @mouseup="ctlMouseUpHandle($event, 'pan')"
          />
        </el-tooltip>
      </div>

      <div class="row_nw_ce_ce dw_ctl_actionbtn">
        <el-tooltip v-if="isLocked" effect="dark" content="解锁" placement="top" :auto-close="1500" size="small">
          <el-button type="success" icon="Unlock" circle size="small" @click="setDomLocked(false)" />
        </el-tooltip>
        <el-tooltip v-else effect="dark" content="锁定" placement="top" :auto-close="1500" size="small">
          <el-button type="success" icon="Lock" circle size="small" @click="setDomLocked(true)" />
        </el-tooltip>
      </div>

      <div class="row_nw_ce_ce dw_ctl_actionbtn">
        <el-popconfirm title="Are you sure to delete this?" @confirm="confirmDeleteCompHd">
          <template #reference>
            <el-button type="danger" icon="Delete" circle size="small" />
          </template>
          <template #actions="{ confirm, cancel }">
            <el-button size="small" @click="cancel">No</el-button>
            <el-button type="danger" size="small" @click="confirm">Yes?!</el-button>
          </template>
        </el-popconfirm>
      </div>
    </div>

    <div v-if="isActive && isShowContextMenu" class="row_nw_ce_ce dw_cm_wrapper" :style="contextmenuStyle">
      <div class="col_nw_fs_ce dw_cm_box">
        <div v-for="menu in contextMenus" :key="menu.id" class="row_nw_fs_ce dw_cm_item" @click="() => menu.action()">
          <div v-if="menu.icon" class="row_nw_ce_ce ce dw_cm_itemicon">
            <!--  -->
          </div>
          <div class="row_nw_ce_ce ce dw_cm_itemlabel">{{ menu.labelZh }}</div>
        </div>
      </div>
    </div>

    <div
      v-if="isActive"
      class="dw_ctl_lt"
      :class="{ dw_ctl_locked: isLocked }"
      @mousedown="ctlMouseDownHandle($event, 'lt')"
      @mousemove="ctlMouseMoveHandle($event, 'lt')"
      @mouseup="ctlMouseUpHandle($event, 'lt')"
    ></div>
    <div
      v-if="isActive"
      class="dw_ctl_lm"
      :class="{ dw_ctl_locked: isLocked }"
      @mousedown="ctlMouseDownHandle($event, 'lm')"
      @mousemove="ctlMouseMoveHandle($event, 'lm')"
      @mouseup="ctlMouseUpHandle($event, 'lm')"
    ></div>
    <div
      v-if="isActive"
      class="dw_ctl_lb"
      :class="{ dw_ctl_locked: isLocked }"
      @mousedown="ctlMouseDownHandle($event, 'lb')"
      @mousemove="ctlMouseMoveHandle($event, 'lb')"
      @mouseup="ctlMouseUpHandle($event, 'lb')"
    ></div>
    <div
      v-if="isActive"
      class="dw_ctl_rt"
      :class="{ dw_ctl_locked: isLocked }"
      @mousedown="ctlMouseDownHandle($event, 'rt')"
      @mousemove="ctlMouseMoveHandle($event, 'rt')"
      @mouseup="ctlMouseUpHandle($event, 'rt')"
    ></div>
    <div
      v-if="isActive"
      class="dw_ctl_rm"
      :class="{ dw_ctl_locked: isLocked }"
      @mousedown="ctlMouseDownHandle($event, 'rm')"
      @mousemove="ctlMouseMoveHandle($event, 'rm')"
      @mouseup="ctlMouseUpHandle($event, 'rm')"
    ></div>
    <div
      v-if="isActive"
      class="dw_ctl_rb"
      :class="{ dw_ctl_locked: isLocked }"
      @mousedown="ctlMouseDownHandle($event, 'rb')"
      @mousemove="ctlMouseMoveHandle($event, 'rb')"
      @mouseup="ctlMouseUpHandle($event, 'rb')"
    ></div>
    <div
      v-if="isActive"
      class="dw_ctl_mt"
      :class="{ dw_ctl_locked: isLocked }"
      @mousedown="ctlMouseDownHandle($event, 'mt')"
      @mousemove="ctlMouseMoveHandle($event, 'mt')"
      @mouseup="ctlMouseUpHandle($event, 'mt')"
    ></div>
    <div
      v-if="isActive"
      class="dw_ctl_mb"
      :class="{ dw_ctl_locked: isLocked }"
      @mousedown="ctlMouseDownHandle($event, 'mb')"
      @mousemove="ctlMouseMoveHandle($event, 'mb')"
      @mouseup="ctlMouseUpHandle($event, 'mb')"
    ></div>
    <div class="row_nw_ce_ce dw_ctx_wraper" @mousedown="ctlBodyMouseDownHandle($event, 'pan')">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, reactive, watch, onMounted, computed, nextTick, onUnmounted } from "vue";

  import { useEditorComponentstore, globalEditor } from "@/stores/editorConfig";
  import { CssHeightOptions } from "@/h5/cssData/NamePixel";

  const { editorComponents, setEditorCurrentComp, removeEditorComponents } = useEditorComponentstore();

  const props = defineProps({
    vNodeData: {
      type: Object,
      default() {
        return null;
      },
    },
  });

  const currentModifyComp = ref(null);

  const ctlCursor = {
    rotate: "grabbing",
    pan: "grabbing",
    // rotate: "grab",
    lt: "nw-resize",
    lm: "w-resize",
    lb: "sw-resize",
    rt: "ne-resize",
    rm: "e-resize",
    rb: "se-resize",
    mt: "n-resize",
    mb: "n-resize",
  };

  const isActive = computed(() => {
    if (props.vNodeData && editorComponents.currentComp && props.vNodeData.id == editorComponents.currentComp.id) {
      return true;
    } else {
      return false;
    }
  });

  const divWrapperRef = ref(null);
  const isShowContextMenu = ref(false);

  const isShowCtlMask = ref(false);

  const isShowAlignAxis = ref(false);
  const isShowBoundingBox = ref(false);

  const isShowRestrictRect = ref(false);
  const isLocked = ref(false);

  const isCalcShowAlignAxis = computed(() => {
    return isShowCtlMask.value && isShowAlignAxis.value && isActive.value;
  });

  const isCalcShowBoundingBox = computed(() => {
    return isShowCtlMask.value && isShowBoundingBox.value && isActive.value;
  });

  const isCalcShowRestrictRect = computed(() => {
    return isShowCtlMask.value && isShowRestrictRect.value && isActive.value;
  });

  let currentDirection = "";
  let oldX = -1;
  let oldY = -1;
  const isSnapToGrid = true;

  const restrictRect = {
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  };

  const restrictRectStyle = reactive({
    top: "0px",
    left: "0px",
    width: "0px",
    height: "0px",
  });

  const maskStyle = reactive({
    cursor: "grab",
  });

  const calcContainer = reactive({
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    rotate: 0,
    zIndex: 1,
  });

  const containerStyle = computed(() => {
    return {
      width: `${calcContainer.right - calcContainer.left}px`,
      height: `${calcContainer.bottom - calcContainer.top}px`,
      top: `${calcContainer.top}px`,
      left: `${calcContainer.left}px`,
      transform: `rotate(${calcContainer.rotate}deg)`,
      zIndex: calcContainer.zIndex,
      // transform: "rotateZ(0)",
    };
  });

  // 这是为了给 bbox 计算用的
  const calcBbox = reactive({
    topShow: `${calcContainer.top - 2}px`,
    leftShow: `${calcContainer.left - 2}px`,
    top: calcContainer.top,
    left: calcContainer.left,
    bottom: calcContainer.bottom,
    right: calcContainer.right,
  });

  const bboxStyle = reactive({
    width: `${calcContainer.right - calcContainer.left + 4}px`,
    height: `${calcContainer.bottom - calcContainer.top + 4}px`,
    top: `${calcContainer.top - 2}px`,
    left: `${calcContainer.left - 2}px`,
  });

  const alignAxisXStyle = reactive({
    top: "50px",
  });

  const alignAxisYStyle = reactive({
    left: "50px",
  });

  const alignAxisHLabelStyle = reactive({
    top: "50px",
    left: "3rem",
  });

  const alignAxisVLabelStyle = reactive({
    top: "50px",
    left: "50px",
  });

  const contextmenuStyle = reactive({
    top: "50px",
    left: "50px",
  });

  const contextMenus = ref([
    {
      id: "uplayer",
      labelZh: "上一层",
      labelEn: "up layer",
      icon: "",
      action: () => {
        isShowContextMenu.value = false;
        if (props.vNodeData.styles) {
          const styles = props.vNodeData.styles;
          const zIndex = styles.zIndex;
          if (zIndex) {
            zIndex.value = zIndex.value + 1;
            if (zIndex.value > zIndex.max) {
              zIndex.value = zIndex.max;
            }
          }
        }
      },
    },
    {
      id: "downlayer",
      labelZh: "下一层",
      labelEn: "down layer",
      icon: "",
      action: () => {
        isShowContextMenu.value = false;
        if (props.vNodeData.styles) {
          const styles = props.vNodeData.styles;
          const zIndex = styles.zIndex;
          if (zIndex) {
            zIndex.value = zIndex.value - 1;
            if (zIndex.value > zIndex.min) {
              zIndex.value = zIndex.min;
            }
          }
        }
      },
    },
  ]);
  const initCalcContainer = () => {
    const styles = props.vNodeData.styles;

    currentModifyComp.value = props.vNodeData;
    isLocked.value = props.vNodeData.isLocked;

    calcContainer.top = +styles.top.value;
    calcContainer.left = +styles.left.value;
    calcContainer.bottom = +styles.top.value + +styles.height.value;
    calcContainer.right = styles.left.value + +styles.width.value;

    calcContainer.rotate = +styles.rotate.value;
    calcContainer.zIndex = +styles.zIndex.value;

    nextTick(() => {
      reCalcLimitRect();
      isShowAlignAxis.value = true;
      isShowBoundingBox.value = true;
    });
  };

  const updateRestrictRect = () => {
    const vNodeData = props.vNodeData;
    const styles = props.vNodeData.styles;
    if (vNodeData.isUseRestrictRect) {
      isShowRestrictRect.value = true;
      if (
        vNodeData.restrictRect.left == 0 &&
        vNodeData.restrictRect.right == 0 &&
        vNodeData.restrictRect.top == 0 &&
        vNodeData.restrictRect.bottom == 0
      ) {
        isShowRestrictRect.value = false;
      } else {
        isShowRestrictRect.value = true;
        restrictRect.left = vNodeData.restrictRect.left;
        restrictRect.right = vNodeData.restrictRect.right;
        restrictRect.top = vNodeData.restrictRect.top;
        restrictRect.bottom = vNodeData.restrictRect.bottom;

        restrictRectStyle.left = vNodeData.restrictRect.left + "px";
        restrictRectStyle.width = vNodeData.restrictRect.right - vNodeData.restrictRect.left + "px";
        restrictRectStyle.top = vNodeData.restrictRect.top + "px";
        restrictRectStyle.height = vNodeData.restrictRect.bottom - vNodeData.restrictRect.top + "px";
      }
    } else {
      isShowRestrictRect.value = false;
    }
  };

  const updateBboxAlignStyle = () => {
    const relativeDom = document.getElementById("editor_workspace_id");
    if (divWrapperRef.value && relativeDom) {
      const rect = divWrapperRef.value.getBoundingClientRect();
      const relativeRect = relativeDom.getBoundingClientRect();

      // 获取滚动偏移
      // const scrollX = window.scrollX || document.documentElement.scrollLeft;
      // const scrollY = window.scrollY || document.documentElement.scrollTop;
      // console.log("relativeRect", rect, relativeRect);

      if (rect) {
        const axisTop = rect.top - relativeRect.top - 2;
        const axisLeft = rect.left - relativeRect.left - 2;

        bboxStyle.width = `${rect.width + 4}px`;
        bboxStyle.height = `${rect.height + 4}px`;
        bboxStyle.top = `${axisTop}px`;
        bboxStyle.left = `${axisLeft}px`;

        calcBbox.topShow = `${(rect.top - relativeRect.top).toFixed(0)}px`;
        calcBbox.leftShow = `${(rect.left - relativeRect.left).toFixed(0)}px`;

        calcBbox.top = rect.top - relativeRect.top;
        calcBbox.left = rect.left - relativeRect.left;

        calcBbox.bottom = calcBbox.top + rect.height;
        calcBbox.right = calcBbox.left + rect.width;

        alignAxisXStyle.top = `${axisTop}px`;

        alignAxisYStyle.left = `${axisLeft}px`;

        alignAxisHLabelStyle.top = `${axisTop}px`;
        alignAxisHLabelStyle.left = `${axisLeft}px`;

        alignAxisVLabelStyle.top = `${axisTop}px`;
        alignAxisVLabelStyle.left = `${axisLeft}px`;
      }
    } else {
      bboxStyle.width = `${calcContainer.right - calcContainer.left + 4}px`;
      bboxStyle.height = `${calcContainer.bottom - calcContainer.top + 4}px`;
      bboxStyle.top = `${calcContainer.top - 2}px`;
      bboxStyle.left = `${calcContainer.left - 2}px`;

      calcBbox.topShow = `${calcContainer.top - 2}px`;
      calcBbox.leftShow = `${calcContainer.left - 2}px`;

      calcBbox.top = calcContainer.top;
      calcBbox.left = calcContainer.left;

      calcBbox.bottom = calcContainer.bottom;
      calcBbox.right = calcContainer.right;
    }
  };

  function confirmDeleteCompHd() {
    console.log("confirmDeleteCompHd");
    if (currentModifyComp.value) {
      removeEditorComponents(currentModifyComp.value);
      setEditorCurrentComp(editorComponents.workSpace);
    }
  }

  function reCalcLimitRect() {
    nextTick(() => {
      const relativeDom = document.getElementById("editor_workspace_id");
      if (divWrapperRef.value && relativeDom) {
        const rect = divWrapperRef.value.getBoundingClientRect();
        const relativeRect = relativeDom.getBoundingClientRect();

        if (rect && relativeRect) {
          const top = rect.top - relativeRect.top;
          const left = rect.left - relativeRect.left;
          const bottom = top + rect.height;
          const right = left + rect.width;

          let newTop = 0;
          let newLeft = 0;
          let newBottom = 0;
          let newRight = 0;

          if (restrictRect.top && top < restrictRect.top) {
            newTop = restrictRect.top - top;
          }

          if (restrictRect.left && left < restrictRect.left) {
            newLeft = restrictRect.left - left;
          }

          if (restrictRect.bottom && bottom > restrictRect.bottom) {
            newBottom = bottom - restrictRect.bottom;
          }

          if (restrictRect.right && right > restrictRect.right) {
            newRight = right - restrictRect.right;
          }

          // console.log("reCalcLimitRect", calcContainer.top, newTop, newLeft, newBottom, newRight);

          calcContainer.top = calcContainer.top + newTop;
          calcContainer.left = calcContainer.left + newLeft;
          calcContainer.bottom = calcContainer.bottom - newBottom;
          calcContainer.right = calcContainer.right - newRight;
          // console.log("reCalcLimitRect2", calcContainer.top);
        }
      }
    });
  }

  watch(
    calcContainer,
    () => {
      if (currentModifyComp.value) {
        currentModifyComp.value.styles.top.value = calcContainer.top;
        currentModifyComp.value.styles.left.value = calcContainer.left;
        currentModifyComp.value.styles.width.value = calcContainer.right - calcContainer.left;
        currentModifyComp.value.styles.height.value = calcContainer.bottom - calcContainer.top;
        currentModifyComp.value.styles.rotate.value = calcContainer.rotate;
        currentModifyComp.value.styles.zIndex.value = calcContainer.zIndex;
        const childComps = currentModifyComp.value.children;
        const workSpace = globalEditor.workSpace;
        if (childComps) {
          const ckeys = Object.keys(childComps);
          for (let i = 0; i < ckeys.length; i++) {
            const ckey = ckeys[i];
            const cComp = childComps[ckey];
            if (cComp) {
              cComp.restrictRect.top = calcContainer.top + workSpace.top;
              cComp.restrictRect.left = calcContainer.left + workSpace.left;
              cComp.restrictRect.right = calcContainer.right + workSpace.left;
              cComp.restrictRect.bottom = calcContainer.bottom + workSpace.top;
            }
          }
        }
      }

      nextTick(() => {
        updateBboxAlignStyle();
      });
    },
    {
      immediate: true,
      deep: true,
    },
  );

  watch(
    isActive,
    () => {
      if (isActive.value) {
        updateRestrictRect();
        updateBboxAlignStyle();
      }
    },
    {
      immediate: false,
      deep: true,
    },
  );

  watch(
    () => props.vNodeData.isUseRestrictRect,
    () => {
      updateRestrictRect();
    },
    {
      immediate: false,
      deep: true,
    },
  );

  watch(
    () => editorComponents.refreshTransToCompFlag,
    () => {
      if (isActive.value) {
        initCalcContainer();
        updateBboxAlignStyle();
      }
    },
    {
      immediate: false,
      deep: false,
    },
  );

  let isKeyCanPan = false;
  let isKeyCanRotate = false;
  const handleKeyDown = (e) => {
    // ESC 键退出全屏
    // if (e.key === 'Escape' && isFullscreen.value) {
    //   e.preventDefault()
    //   // exitFullscreen()
    //   return
    // }

    if (e.code === "Space" && !isKeyCanPan) {
      e.preventDefault();
      isKeyCanPan = true;
    }

    if (e.code === "KeyR" && !isKeyCanRotate) {
      e.preventDefault();
      isKeyCanRotate = true;
    }
  };

  // 键盘释放事件处理
  const handleKeyUp = (e) => {
    if (e.code === "Space" && isKeyCanPan) {
      e.preventDefault();
      isKeyCanPan = false;
    }

    if (e.code === "KeyR" && isKeyCanRotate) {
      e.preventDefault();
      isKeyCanRotate = false;
    }

    if (e.code === "KeyL") {
      isLocked.value = !isLocked.value;
      if (currentModifyComp.value) {
        currentModifyComp.value.isLocked = isLocked.value;
      }
    }
  };

  const contextmenuHd = (e) => {
    // console.log("menu", e);
    if (e.button == 2) {
      e.preventDefault();
      e.stopPropagation();
      contextmenuStyle.left = e.offsetX + "px";
      contextmenuStyle.top = e.offsetY + "px";
      isShowContextMenu.value = true;
      return false;
    } else {
      isShowContextMenu.value = false;
      e.stopPropagation();
      return false;
    }
  };

  onMounted(() => {
    initCalcContainer();
    updateRestrictRect();
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
  });

  onUnmounted(() => {
    window.removeEventListener("keydown", handleKeyDown);
    window.removeEventListener("keyup", handleKeyUp);
  });

  function getPosXY(pos, gap = 16) {
    const pp = pos / gap;
    const min = Math.floor(pp) * gap;
    const max = Math.ceil(pp) * gap;
    const offsetMin = pos - min;
    const offsetMax = max - pos;
    if (offsetMin < offsetMax) {
      return min;
    } else {
      return max;
    }
  }

  function setDomLocked(isLock = false) {
    isLocked.value = isLock;
    if (currentModifyComp.value) {
      currentModifyComp.value.isLocked = isLock;
    }
  }

  function resetCtlParams() {
    isShowCtlMask.value = false;
    maskStyle.cursor = "none";
    currentDirection = "";
    oldX = -1;
    oldY = -1;
  }

  function calcRotateStyle(x: number, y: number) {
    const centerX = (calcContainer.right - calcContainer.left) / 2 + calcContainer.left;
    const centerY = (calcContainer.bottom - calcContainer.top) / 2 + calcContainer.top;

    const oldDeg = Math.atan2(oldY - centerY, oldX - centerX);
    const newDeg = Math.atan2(y - centerY, x - centerX);
    const offsetDeg = newDeg - oldDeg;
    oldX = x;
    oldY = y;
    // console.log("tan", (oldDeg / Math.PI) * 180, (newDeg / Math.PI) * 180, (offsetDeg / Math.PI) * 180);

    calcContainer.rotate = calcContainer.rotate + (offsetDeg / Math.PI) * 180;
  }

  function calcStyle(x: number, y: number, direction: string, limit = 12) {
    if (direction == "rotate") {
      calcRotateStyle(x, y);
    } else {
      const offsetX = x - oldX;
      const offsetY = y - oldY;
      oldX = x;
      oldY = y;

      if (direction == "lt") {
        let top = calcContainer.top + offsetY;
        if (top >= calcContainer.bottom - limit) {
          top = calcContainer.bottom - limit;
        }

        let left = calcContainer.left + offsetX;
        if (left >= calcContainer.right - limit) {
          left = calcContainer.right - limit;
        }

        calcContainer.top = top;
        calcContainer.left = left;
      } else if (direction == "lm") {
        let left = calcContainer.left + offsetX;
        if (left >= calcContainer.right - limit) {
          left = calcContainer.right - limit;
        }

        calcContainer.left = left;
      } else if (direction == "lb") {
        let bottom = calcContainer.bottom + offsetY;
        if (bottom <= calcContainer.top + limit) {
          bottom = calcContainer.top + limit;
        }

        let left = calcContainer.left + offsetX;
        if (left >= calcContainer.right - limit) {
          left = calcContainer.right - limit;
        }

        calcContainer.bottom = bottom;
        calcContainer.left = left;
      } else if (direction == "rt") {
        let top = calcContainer.top + offsetY;
        if (top >= calcContainer.bottom - limit) {
          top = calcContainer.bottom - limit;
        }

        let right = calcContainer.right + offsetX;
        if (right <= calcContainer.left + limit) {
          right = calcContainer.left + limit;
        }

        calcContainer.top = top;
        calcContainer.right = right;
      } else if (direction == "rm") {
        let right = calcContainer.right + offsetX;
        if (right <= calcContainer.left + limit) {
          right = calcContainer.left + limit;
        }

        calcContainer.right = right;
      } else if (direction == "rb") {
        let bottom = calcContainer.bottom + offsetY;
        if (bottom <= calcContainer.top + limit) {
          bottom = calcContainer.top + limit;
        }

        let right = calcContainer.right + offsetX;
        if (right <= calcContainer.left + limit) {
          right = calcContainer.left + limit;
        }

        calcContainer.bottom = bottom;
        calcContainer.right = right;
      } else if (direction == "mt") {
        let top = calcContainer.top + offsetY;
        if (top >= calcContainer.bottom - limit) {
          top = calcContainer.bottom - limit;
        }

        calcContainer.top = top;
      } else if (direction == "mb") {
        let bottom = calcContainer.bottom + offsetY;
        if (bottom <= calcContainer.top + limit) {
          bottom = calcContainer.top + limit;
        }

        calcContainer.bottom = bottom;
      } else if (direction == "pan") {
        let top = offsetY;
        let bottom = offsetY;

        let left = offsetX;
        let right = offsetX;

        if (isShowRestrictRect.value) {
          if (offsetY < 0 && restrictRect.top && calcBbox.top > restrictRect.top) {
            top = Math.max(offsetY, restrictRect.top - calcBbox.top);
            bottom = top;
          } else if (offsetY < 0 && restrictRect.top && calcBbox.top <= restrictRect.top) {
            top = 0;
            bottom = 0;
          }

          if (offsetY > 0 && restrictRect.bottom && calcBbox.bottom < restrictRect.bottom) {
            bottom = Math.min(offsetY, restrictRect.bottom - calcBbox.bottom);
            top = bottom;
          } else if (offsetY > 0 && restrictRect.bottom && calcBbox.bottom >= restrictRect.bottom) {
            top = 0;
            bottom = 0;
          }

          if (offsetX < 0 && restrictRect.left && calcBbox.left > restrictRect.left) {
            left = Math.max(offsetX, restrictRect.left - calcBbox.left);
            right = left;
          } else if (offsetX < 0 && restrictRect.left && calcBbox.left <= restrictRect.left) {
            left = 0;
            right = 0;
          }

          if (offsetX > 0 && restrictRect.right && calcBbox.right < restrictRect.right) {
            right = Math.min(offsetX, restrictRect.right - calcBbox.right);
            left = right;
          } else if (offsetX > 0 && restrictRect.right && calcBbox.right >= restrictRect.right) {
            left = 0;
            right = 0;
          }

          // console.log("offsetY", offsetY, offsetX, left, right, top, bottom);
        }

        calcContainer.top = calcContainer.top + top;
        calcContainer.bottom = calcContainer.bottom + bottom;
        calcContainer.left = calcContainer.left + left;
        calcContainer.right = calcContainer.right + right;
      }
    }

    if (direction != "pan" && isShowRestrictRect.value) {
      // if (calcContainer.rotate != 0) {
      reCalcLimitRect();
      // }
    }
  }

  let dblclickDownTimer: number | null = null;
  let isCheckDblClick = false;
  let dblclickCnt = 0;

  function ctlMouseDownHandle(event: MouseEvent, direction = "lt") {
    if (isLocked.value) {
      return;
    }

    if (!isCheckDblClick && !dblclickDownTimer) {
      isCheckDblClick = true;
    }

    if (isCheckDblClick) {
      dblclickDownTimer = setTimeout(() => {
        dblclickCnt = 0;
        isCheckDblClick = false;
        dblclickDownTimer = null;
      }, 500);

      dblclickCnt = dblclickCnt + 1;
      if (dblclickCnt >= 2) {
        clearTimeout(dblclickDownTimer);
        dblclickCnt = 0;
        isCheckDblClick = false;
        calcContainer.rotate = 0;
      }
    }

    isShowCtlMask.value = true;
    currentDirection = direction;
    maskStyle.cursor = ctlCursor[direction];
    if (isSnapToGrid) {
      oldX = getPosXY(event.clientX);
      oldY = getPosXY(event.clientY);
    } else {
      oldX = event.clientX;
      oldY = event.clientY;
    }

    // console.log("down direc", direction, event);
  }

  function ctlMouseMoveHandle(event, direction = "lt") {
    if (isShowCtlMask.value) {
      // console.log("move direc", direction, event);
      let clientX = event.clientX;
      let clientY = event.clientY;
      if (isSnapToGrid) {
        clientX = getPosXY(event.clientX);
        clientY = getPosXY(event.clientY);
      }
      calcStyle(clientX, clientY, direction);
    }
  }

  function ctlMouseUpHandle(event, direction = "lt") {
    resetCtlParams();
  }

  function maskCtlMouseMoveHandle(event) {
    if (isShowCtlMask.value) {
      // console.log("mask move", event);
      let clientX = event.clientX;
      let clientY = event.clientY;
      if (isSnapToGrid) {
        clientX = getPosXY(event.clientX);
        clientY = getPosXY(event.clientY);
      }

      calcStyle(clientX, clientY, currentDirection);
    }
  }

  function maskCtlMouseOutHandle(event) {
    resetCtlParams();
  }

  function maskCtlMouseUpHandle(event) {
    resetCtlParams();
  }

  function ctlBodyMouseDownHandle(event: MouseEvent, direction = "pan") {
    if (isKeyCanPan) {
      direction = "pan";
      ctlMouseDownHandle(event, direction);
    } else if (isKeyCanRotate) {
      direction = "rotate";
      ctlMouseDownHandle(event, direction);
    } else {
      contextmenuHd(event);
    }
  }
</script>

<style scoped>
  .dw_container {
    --ctl-size: 0.75rem;
    --ctl-color: rgba(40, 245, 12, 0.959);

    position: absolute;
    background-color: rgba(255, 255, 255, 1);
    z-index: 3;
    transform: rotate(90deg);
  }

  .dw_mask {
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0px;
    left: 0px;
    background: rgba(255, 255, 255, 0.01);
    z-index: 9999999;
  }

  .dw_ctl_rotate {
    position: absolute;
    width: 1.5rem;
    height: 2.5rem;
    top: -2.5rem;
    left: 50%;
    transform: translateX(-50%);
    z-index: 3;
  }

  .dw_ctl_rotateline {
    position: absolute;
    width: 0.125rem;
    height: 1rem;
    top: 1.5rem;
    left: 0.75rem;
    transform: translateX(-50%);
    background-color: var(--ctl-color);
    z-index: 3;
  }

  .dw_ctl_rotatebtn {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 1.5rem;
    height: 1.5rem;
    cursor: grab;
    z-index: 3;
    background-color: var(--ctl-color);
    border-radius: 50%;
  }

  .dw_ctl_action {
    position: absolute;
    width: max-content;
    height: 2rem;
    top: -2rem;
    right: 0;
    z-index: 3;
  }

  .dw_ctl_limit_rect {
    position: absolute;
    background-color: transparent;
    outline: 1px solid #ff6464;
    z-index: 10;
    box-shadow:
      0 0 2px #ff6464,
      /* 内层柔光 */ 0 0 6px #ff6464,
      /* 中层光晕 */ 0 0 8px #ff6464; /* 外层强光 */
  }

  .dw_ctl_actionbtn {
    width: 1.5rem;
    height: 1.5rem;
    margin-left: 0.5rem;
  }

  .dw_cm_wrapper {
    position: fixed;
    width: max-content;
    height: auto;
    z-index: 10;
    background-color: rgba(255, 255, 255, 1);
    border-radius: 0.5rem;
    padding: 1rem 0rem;
  }

  .dw_cm_box {
    width: max-content;
    height: auto;
  }

  .dw_cm_item {
    width: max-content;
    height: 2rem;
    padding: 0rem 0.75rem;
  }

  .dw_cm_item:hover {
    background: pink;
  }

  .dw_cm_itemicon {
    width: 1.5rem;
    height: 100%;
    margin-right: 0.5rem;
  }

  .dw_cm_itemlabel {
    width: max-content;
    height: 100%;
    font-size: 0.875rem;
    color: rgba(0, 0, 0, 1);
  }

  .dw_ctl_lt {
    position: absolute;
    width: var(--ctl-size);
    height: var(--ctl-size);
    top: -0.0625rem;
    left: -0.0625rem;
    border-left: 0.125rem solid var(--ctl-color);
    border-top: 0.125rem solid var(--ctl-color);
    cursor: nw-resize;
    z-index: 3;
  }

  .dw_ctl_lm {
    position: absolute;
    width: var(--ctl-size);
    height: var(--ctl-size);
    top: 50%;
    left: -0.0625rem;
    border-left: 0.125rem solid var(--ctl-color);
    transform: translateY(-50%);
    cursor: w-resize;
    z-index: 3;
  }

  .dw_ctl_lb {
    position: absolute;
    width: var(--ctl-size);
    height: var(--ctl-size);
    bottom: -0.0625rem;
    left: -0.0625rem;
    border-left: 0.125rem solid var(--ctl-color);
    border-bottom: 0.125rem solid var(--ctl-color);
    cursor: sw-resize;
    z-index: 3;
  }

  .dw_ctl_rt {
    position: absolute;
    width: var(--ctl-size);
    height: var(--ctl-size);
    top: -0.0625rem;
    right: -0.0625rem;
    border-right: 0.125rem solid var(--ctl-color);
    border-top: 0.125rem solid var(--ctl-color);
    cursor: ne-resize;
    z-index: 3;
  }

  .dw_ctl_rm {
    position: absolute;
    width: var(--ctl-size);
    height: var(--ctl-size);
    top: 50%;
    right: -0.0625rem;
    border-right: 0.125rem solid var(--ctl-color);
    transform: translateY(-50%);
    cursor: e-resize;
    z-index: 3;
  }

  .dw_ctl_rb {
    position: absolute;
    width: var(--ctl-size);
    height: var(--ctl-size);
    bottom: -0.0625rem;
    right: -0.0625rem;
    border-right: 0.125rem solid var(--ctl-color);
    border-bottom: 0.125rem solid var(--ctl-color);
    cursor: se-resize;
    z-index: 3;
  }

  .dw_ctl_mt {
    position: absolute;
    width: var(--ctl-size);
    height: var(--ctl-size);
    top: -0.0625rem;
    left: 50%;
    border-top: 0.125rem solid var(--ctl-color);
    transform: translateX(-50%);
    cursor: n-resize;
    z-index: 3;
  }

  .dw_ctl_mb {
    position: absolute;
    width: var(--ctl-size);
    height: var(--ctl-size);
    bottom: -0.0625rem;
    left: 50%;
    border-bottom: 0.125rem solid var(--ctl-color);
    transform: translateX(-50%);
    cursor: n-resize;
    z-index: 3;
  }

  .dw_ctl_locked {
    cursor: not-allowed !important;
  }

  .dw_ctl_bbox {
    position: absolute;
    border: 1px dashed pink;
    z-index: 10;
  }

  .dw_ctx_wraper {
    width: 100%;
    height: 100%;
    z-index: 2;
    background-color: transparent;
  }

  .dw_ctl_hline {
    position: absolute;
    width: 100%;
    height: 0;
    left: 0px;
    border-top: 1px dashed pink;
    z-index: 10;
  }

  .dw_ctl_vline {
    position: absolute;
    width: 0;
    height: 100%;
    top: 0px;
    border-left: 1px dashed pink;
    z-index: 10;
  }

  .dw_ctl_hlabelbox {
    position: absolute;
    width: max-content;
    height: 1.25rem;
    top: 3rem;
    left: 3rem;
    border: 1px solid pink;
    background-color: pink;
    padding: 0.25rem;
    z-index: 10;
    border-radius: 0.25rem;
    transform: translateY(-50%) translateX(calc(-100% - 0.875rem));
  }

  .dw_ctl_vlabelbox {
    position: absolute;
    width: max-content;
    height: 1.25rem;
    top: 3rem;
    left: 3rem;
    border: 1px solid pink;
    background-color: pink;
    padding: 0.25rem;
    z-index: 10;
    border-radius: 0.25rem;
    transform: translateX(-50%) translateY(calc(-100% - 2.25rem)) rotate(-90deg);
  }

  .dw_ctl_hlabel {
    width: max-content;
    height: 100%;
    color: rgba(255, 255, 255, 1);
    font-size: var(--czml-fs-tipvalue);
    font-weight: 400;
  }

  .dw_ctl_vlabel {
    width: max-content;
    height: 100%;
    color: rgba(255, 255, 255, 1);
    font-size: var(--czml-fs-tipvalue);
    font-weight: 400;
  }
</style>
