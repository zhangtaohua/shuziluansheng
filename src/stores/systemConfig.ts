import { ref, computed, reactive } from "vue";
import { defineStore } from "pinia";
import Storage from "@/utils/storage/storage";
import screenfull from "screenfull";
import globalUseVar from "@/utils/common/globalUseVar";
// import { useI18n } from "vue-i18n";

import { LANGUAGE_ZH_CN, THEME_LIGHT, MEDIA_XL, LANGUAGE_EN } from "@/common/constant";

export const systemConfigurations = {
  isEng: false,
  language: LANGUAGE_ZH_CN,
  theme: THEME_LIGHT,
  media: MEDIA_XL,
};

const SYSTME_CONFIG_KEY = "SYSTEM_CONFIG_CONFIG";

export const getSystemStore = () => {
  let initSysConfig = Storage.get(SYSTME_CONFIG_KEY);
  if (!initSysConfig) {
    initSysConfig = systemConfigurations;
    Storage.set(SYSTME_CONFIG_KEY, initSysConfig);
  }
  if (typeof initSysConfig === "string") {
    try {
      initSysConfig = JSON.parse(initSysConfig);
    } catch (error) {
      initSysConfig = systemConfigurations;
    }
  }

  return initSysConfig;
};

export const useSystemConfigStore = defineStore("useSystemConfigStore", () => {
  // const { t, locale } = useI18n();

  const initSysConfig = getSystemStore();

  const systemConfig = reactive({
    isEng: initSysConfig.isEng,
    language: initSysConfig.language,
    theme: initSysConfig.theme,
    media: initSysConfig.media,
    isFullView: false,
  });

  // all App only need call once
  function setGlobalUseVar() {
    // globalUseVar.t = t;
    // globalUseVar.i18n = locale;
    // globalUseVar.local = locale;
    // globalUseVar.language = locale.value;
    if (globalUseVar.language == LANGUAGE_EN) {
      globalUseVar.isEng = true;
    } else {
      globalUseVar.isEng = false;
    }
    document.title = "";
  }

  function setSysLanguage(languageStr: string) {
    systemConfig.language = languageStr;
    initSysConfig.language = languageStr;

    Storage.set(SYSTME_CONFIG_KEY, initSysConfig);

    // locale.value = languageStr;
    globalUseVar.language = languageStr;
    if (globalUseVar.language == LANGUAGE_EN) {
      globalUseVar.isEng = true;
    } else {
      globalUseVar.isEng = false;
    }
  }

  function setSysTheme(themeStr: string) {
    systemConfig.theme = themeStr;
    initSysConfig.theme = themeStr;

    Storage.set(SYSTME_CONFIG_KEY, initSysConfig);
  }

  function setSysMedia(mediaStr: string) {
    systemConfig.media = mediaStr;
    initSysConfig.media = mediaStr;

    Storage.set(SYSTME_CONFIG_KEY, initSysConfig);
  }

  function setIsFullView(isFullView: boolean, isReqFull = true) {
    systemConfig.isFullView = isFullView;
    if (isReqFull) {
      if (isFullView) {
        if (screenfull.isEnabled) {
          screenfull.request();
        }
      } else {
        screenfull.exit();
      }
    }
  }

  return {
    systemConfig,
    setGlobalUseVar,
    setSysLanguage,
    setSysTheme,
    setSysMedia,
    setIsFullView,
  };
});
