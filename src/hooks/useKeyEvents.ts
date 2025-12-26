import { onMounted, onUnmounted, reactive } from "vue";
import globalUseVar from "@/utils/common/globalUseVar";

const boardKeyInfo = reactive({
  keyDown: {},
});

const handleKeyDown = (e) => {
  // ESC 键退出全屏
  // if (e.key === 'Escape' && isFullscreen.value) {
  //   e.preventDefault()
  //   // exitFullscreen()
  //   return
  // }

  e.preventDefault();
  boardKeyInfo.keyDown = e;
};

// 键盘释放事件处理
const handleKeyUp = () => {
  boardKeyInfo.keyDown = null;
};

export function useWindowKeyEvents() {
  onMounted(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
  });

  onUnmounted(() => {
    window.removeEventListener("keydown", handleKeyDown);
    window.removeEventListener("keyup", handleKeyUp);
  });

  return {
    boardKeyInfo,
  };
}

const disContextmenuHd = (e) => {
  e.preventDefault();
  e.stopPropagation();
  return false;
};

export function useWindowContexMenu() {
  onMounted(() => {
    document.addEventListener("contextmenu", disContextmenuHd);
  });

  onUnmounted(() => {
    window.removeEventListener("contextmenu", disContextmenuHd);
  });

  return {
    boardKeyInfo,
  };
}
