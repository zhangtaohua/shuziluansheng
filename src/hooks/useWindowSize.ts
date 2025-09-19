import { onMounted, onUnmounted, reactive } from "vue";
import globalUseVar from "@/utils/common/globalUseVar";

// 320px - 480px：移动设备
// 481px - 768px：iPad、平板电脑
// 769px - 1024px：小屏幕、笔记本电脑
// 1025px - 1200px：台式机、大屏幕
// 1201px 及以上：超大屏幕、电视
// Bootstrap 576, 768, 992, 1200, 1400
export const screenBreakPoint = {
  xs: 576, // mobile
  sm: 768, // ipad
  md: 992, // notebook
  lg: 1200, // pc
  xl: 1400, // super screen
};

export const mediaBpType = {
  xs: "xs", // mobile
  sm: "sm", // ipad
  md: "md", // notebook
  lg: "lg", // pc
  xl: "xl", // super screen
  xxl: "xxl", // super screen
};

const windowSize = reactive({
  width: 1920,
  height: 1080,
  devicePixelRatio: 1,
  isMounted: false,
  baseFontSize: 16,
  baseWindowWidth: 1920,
  windowWidth: window.innerWidth,
  windowHeight: window.innerHeight,
  fontSizeStr: document.documentElement.style.fontSize,
  fontSize: parseFloat(document.documentElement.style.fontSize),
  media: mediaBpType.lg,
  isThresholdFontSize: false,
});

export const remToPx = (rem: number) => {
  return rem * windowSize.fontSize;
};

export const pxToRem = (px: number) => {
  return px / windowSize.fontSize;
};

const onResize = () => {
  let dpr = window.devicePixelRatio;
  if (isNaN(dpr)) {
    dpr = 1;
  }
  windowSize.devicePixelRatio = dpr;
  // document.documentElement.setAttribute('data-dpr', dpr <= 2 ? '2' : '3')

  windowSize.width = document.body.clientWidth;
  windowSize.height = document.body.clientHeight;
  windowSize.windowWidth = document.body.clientWidth;
  windowSize.windowHeight = document.body.clientHeight;

  let fontSize = Math.floor(windowSize.baseFontSize * (windowSize.width / windowSize.baseWindowWidth));
  if (fontSize < 8) {
    fontSize = 8;
  }

  if (windowSize.isThresholdFontSize && fontSize > 16) {
    fontSize = 16;
  }

  const fontSizeStr = fontSize + "px";

  document.documentElement.style.fontSize = fontSizeStr;

  windowSize.fontSizeStr = fontSizeStr;
  windowSize.fontSize = fontSize;

  if (windowSize.windowWidth < screenBreakPoint.xs) {
    windowSize.media = mediaBpType.xs;
  } else if (windowSize.windowWidth >= screenBreakPoint.xs && windowSize.windowWidth < screenBreakPoint.sm) {
    windowSize.media = mediaBpType.sm;
  } else if (windowSize.windowWidth >= screenBreakPoint.sm && windowSize.windowWidth < screenBreakPoint.md) {
    windowSize.media = mediaBpType.md;
  } else if (windowSize.windowWidth >= screenBreakPoint.md && windowSize.windowWidth < screenBreakPoint.lg) {
    windowSize.media = mediaBpType.lg;
  } else if (windowSize.windowWidth >= screenBreakPoint.xl) {
    windowSize.media = mediaBpType.xl;
  }

  globalUseVar.media = windowSize.media;
};

const setWindowFontsize = (baseFontSize: number = 16) => {
  windowSize.baseFontSize = baseFontSize;
  windowSize.fontSizeStr = baseFontSize + "px";
  // document.documentElement.style.fontSize = baseFontSize + "px";
  onResize();
};

const setIsHoldWindowFontsize = (isHold: boolean) => {
  windowSize.isThresholdFontSize = isHold;
  onResize();
};

const setBaseWindowWidth = (width = 1920) => {
  windowSize.baseWindowWidth = width;
  onResize();
};

const setWindowFontsizeBase = (baseFontSize: number = 16, baseWidth: number = 1920) => {
  windowSize.baseFontSize = baseFontSize;
  windowSize.fontSizeStr = baseFontSize + "px";
  windowSize.baseWindowWidth = baseWidth;
  onResize();
};

const addWindowResizeEvent = () => {
  if (!windowSize.isMounted && window) {
    onResize();
    window.addEventListener("resize", onResize);
    windowSize.isMounted = true;
  }
};

const removeWindowResizeEvent = () => {
  windowSize.isMounted = false;
  if (window) {
    window.removeEventListener("resize", onResize);
  }
};

export function useWindowResize() {
  onMounted(() => {
    addWindowResizeEvent();
  });

  onUnmounted(() => {
    removeWindowResizeEvent();
  });

  return {
    windowSize,
    setWindowFontsize,
    setIsHoldWindowFontsize,
    setBaseWindowWidth,
    setWindowFontsizeBase,
    addWindowResizeEvent,
    removeWindowResizeEvent,
    remToPx,
    pxToRem,
  };
}
