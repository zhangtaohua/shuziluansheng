import { nanoid } from "@/utils/common/nanoid";
import czmlBooleanIntervalProp from "../values/BooleanInterval";
import czmlBooleanPureProp from "../values/BooleanPure";
import czmlCombineProp from "../values/CombinePropert";

import { createReferenceProp } from "./referenceProp";

export function creatBoolenProp(opt = {}, isPure = false) {
  if (isPure) {
    return new czmlCombineProp({
      ...opt,
      properties: {
        boolean: new czmlBooleanPureProp({
          name: "boolean",
          czmlName: "boolean",
          labelZh: "布尔值",
          labelEn: "boolean",
          value: opt.value ?? opt.default ?? true,
          isEnable: true,
          isUsed: true,
          isShowUsed: true,
          $ref: "Values/BooleanValue.json",
          description: "The boolean value.",
        }),
        reference: createReferenceProp({
          $ref: "Values/ReferenceValue.json",
          description: "The boolean specified as a reference to another property.",
        }),
      },
    });
  }
  return new czmlCombineProp({
    ...opt,
    properties: {
      boolean: new czmlBooleanIntervalProp({
        name: "boolean",
        czmlName: "boolean",
        labelZh: "布尔值",
        labelEn: "boolean",
        value: opt.value ?? opt.default ?? true,
        isEnable: true,
        isUsed: true,
        isShowUsed: true,
        $ref: "Values/BooleanValue.json",
        description: "The boolean value.",
      }),
      reference: createReferenceProp({
        $ref: "Values/ReferenceValue.json",
        description: "The boolean specified as a reference to another property.",
      }),
    },
  });
}

export function createBooleanProp(options = {}, isPure = false) {
  if (isPure) {
    return new czmlBooleanPureProp({
      name: "boolean",
      czmlName: "boolean",
      labelZh: "布尔值",
      labelEn: "boolean",
      isEnable: true,
      isUsed: true,
      isShowUsed: true,
      $ref: "Values/BooleanValue.json",
      description: "The boolean value.",
      ...options,
    });
  }

  return new czmlBooleanIntervalProp({
    name: "boolean",
    czmlName: "boolean",
    labelZh: "布尔值",
    labelEn: "boolean",
    isEnable: true,
    isUsed: true,
    isShowUsed: true,
    $ref: "Values/BooleanValue.json",
    description: "The boolean value.",
    ...options,
  });
}

export function createDeleteProp(options = {}) {
  return new czmlBooleanPureProp({
    name: "delete",
    czmlName: "delete",
    labelZh: "删除",
    labelEn: "delete",
    value: false,
    isEnable: true,
    isUsed: false,
    isShowUsed: true,
    description:
      "Whether the client should delete all existing data for this object, identified by ID. If true, all other properties in this packet will be ignored.",
    type: "boolean",
    ...options,
  });
}

export function createShowProp(options = {}, isPure = false) {
  const opt = {
    id: isPure ? "czml_prop_show_pure_" + nanoid(10) : "czml_prop_show_" + nanoid(10),
    name: "show",
    czmlName: "show",
    labelZh: "显示",
    labelEn: "show",
    isEnable: true,
    isUsed: true,
    isShowUsed: true,
    description: "Whether or not the object is shown.",
    descriptionZh: "是否显示对象",
    value: true,
    default: true,
    ...options,
  };
  return creatBoolenProp(opt, isPure);
}

export function createSizeInMetersProp(options = {}, isPure = true) {
  const opt = {
    id: isPure ? "czml_prop_show_pure_" + nanoid(10) : "czml_prop_show_" + nanoid(10),
    name: "sizeInMeters",
    czmlName: "sizeInMeters",
    labelZh: "以米为单位",
    labelEn: "size in meters",
    isEnable: true,
    isUsed: true,
    isShowUsed: true,
    value: false,
    description: "",
    descriptionZh: "",
    ...options,
  };
  return creatBoolenProp(opt, isPure);
}

export function createFillProp(options = {}, isPure = false) {
  const opt = {
    id: isPure ? "czml_prop_fill_pure_" + nanoid(10) : "czml_prop_fill_" + nanoid(10),
    name: "fill",
    czmlName: "fill",
    labelZh: "填充",
    labelEn: "fill",
    isEnable: true,
    isUsed: true,
    isShowUsed: true,
    description: "Whether or not the object is filled.",
    descriptionZh: "是否填充对象",
    ...options,
  };
  return creatBoolenProp(opt, isPure);
}

export function createOutlineProp(options = {}, isPure = false) {
  const opt = {
    id: isPure ? "czml_prop_outline_pure_" + nanoid(10) : "czml_prop_outline_" + nanoid(10),
    name: "outline",
    czmlName: "outline",
    labelZh: "轮廓线",
    labelEn: "outline",
    isEnable: true,
    isUsed: true,
    isShowUsed: true,
    description: "Whether or not the object is outlined.",
    descriptionZh: "是否对象的轮廓线",
    ...options,
  };
  return creatBoolenProp(opt, isPure);
}

export function createShowIntersectionProp(options = {}, isPure = false) {
  const opt = {
    id: isPure ? "czml_prop_showIntersection_pure_" + nanoid(10) : "czml_prop_showIntersection_" + nanoid(10),
    name: "showIntersection",
    czmlName: "showIntersection",
    labelZh: "交叉点",
    labelEn: "show intersection",
    isEnable: true,
    isUsed: true,
    isShowUsed: true,
    description: "Whether or not the intersection of the sensor with the Earth is shown.",
    descriptionZh: "",
    ...options,
  };
  return creatBoolenProp(opt, isPure);
}

export function createShowLateralSurfacesProp(options = {}, isPure = false) {
  const opt = {
    id: isPure ? "czml_prop_showLateralSurfaces_pure_" + nanoid(10) : "czml_prop_showLateralSurfaces_" + nanoid(10),
    name: "showLateralSurfaces",
    czmlName: "showLateralSurfaces",
    labelZh: "显示侧面",
    labelEn: "show lateral surfaces",
    isEnable: true,
    isUsed: true,
    isShowUsed: true,
    description: "Whether or not the object is shown.",
    descriptionZh: "是否显示对象",
    ...options,
  };
  return creatBoolenProp(opt, isPure);
}

export function createShowEllipsoidSurfacesProp(options = {}, isPure = false) {
  const opt = {
    id: isPure ? "czml_prop_showEllipsoidSurfaces_pure_" + nanoid(10) : "czml_prop_showEllipsoidSurfaces_" + nanoid(10),
    name: "showEllipsoidSurfaces",
    czmlName: "showEllipsoidSurfaces",
    labelZh: "显示椭球面",
    labelEn: "show ellipsoid surfaces",
    isEnable: true,
    isUsed: true,
    isShowUsed: true,
    description: "Whether or not the object is shown.",
    descriptionZh: "是否显示对象",
    ...options,
  };
  return creatBoolenProp(opt, isPure);
}

export function createShowEllipsoidHorizonSurfacesProp(options = {}, isPure = false) {
  const opt = {
    id: isPure
      ? "czml_prop_showEllipsoidHorizonSurfaces_pure_" + nanoid(10)
      : "czml_prop_showEllipsoidHorizonSurfaces_" + nanoid(10),
    name: "showEllipsoidHorizonSurfaces",
    czmlName: "showEllipsoidHorizonSurfaces",
    labelZh: "显示椭球体地平线",
    labelEn: "show ellipsoid horizon surfaces",
    isEnable: true,
    isUsed: true,
    isShowUsed: true,
    description: "Whether or not the object is shown.",
    descriptionZh: "是否显示对象",
    ...options,
  };
  return creatBoolenProp(opt, isPure);
}

export function createshowDomeSurfacesProp(options = {}, isPure = false) {
  const opt = {
    id: isPure ? "czml_prop_showDomeSurfaces_pure_" + nanoid(10) : "czml_prop_showDomeSurfaces_" + nanoid(10),
    name: "showDomeSurfaces",
    czmlName: "showDomeSurfaces",
    labelZh: "显示演示面",
    labelEn: "show domes surfaces",
    isEnable: true,
    isUsed: true,
    isShowUsed: true,
    description: "Whether or not the object is shown.",
    descriptionZh: "是否显示对象",
    ...options,
  };
  return creatBoolenProp(opt, isPure);
}

export function createEnvironmentConstraintProp(options = {}, isPure = false) {
  const opt = {
    id: isPure ? "czml_prop_environmentConstraint_pure_" + nanoid(10) : "czml_prop_environmentConstraint_" + nanoid(10),
    name: "environmentConstraint",
    czmlName: "environmentConstraint",
    labelZh: "环境限制",
    labelEn: "environment constraint",
    isEnable: true,
    isUsed: true,
    isShowUsed: true,
    description: "",
    descriptionZh: "",
    ...options,
  };
  return creatBoolenProp(opt, isPure);
}

export function createShowEnvironmentOcclusionProp(options = {}, isPure = false) {
  const opt = {
    id: isPure
      ? "czml_prop_showEnvironmentOcclusion_pure_" + nanoid(10)
      : "czml_prop_showEnvironmentOcclusion_" + nanoid(10),
    name: "showEnvironmentOcclusion",
    czmlName: "showEnvironmentOcclusion",
    labelZh: "显示环境遮挡",
    labelEn: "show environment occlusion",
    isEnable: true,
    isUsed: true,
    isShowUsed: true,
    description: "",
    descriptionZh: "",
    ...options,
  };
  return creatBoolenProp(opt, isPure);
}

export function createShowEnvironmentIntersectionProp(options = {}, isPure = false) {
  const opt = {
    id: isPure
      ? "czml_prop_showEnvironmentIntersection_pure_" + nanoid(10)
      : "czml_prop_showEnvironmentIntersection_" + nanoid(10),
    name: "showEnvironmentIntersection",
    czmlName: "showEnvironmentIntersection",
    labelZh: "显示环境交叉",
    labelEn: "show environment intersection",
    isEnable: true,
    isUsed: true,
    isShowUsed: true,
    description: "",
    descriptionZh: "",
    ...options,
  };
  return creatBoolenProp(opt, isPure);
}

export function createShowThroughEllipsoidProp(options = {}, isPure = false) {
  const opt = {
    id: isPure ? "czml_prop_showThroughEllipsoid_pure_" + nanoid(10) : "czml_prop_showThroughEllipsoid_" + nanoid(10),
    name: "showThroughEllipsoid",
    czmlName: "showThroughEllipsoid",
    labelZh: "显示透过椭球体",
    labelEn: "show through ellipsoid",
    isEnable: true,
    isUsed: true,
    isShowUsed: true,
    description: "",
    descriptionZh: "",
    ...options,
  };
  return creatBoolenProp(opt, isPure);
}

export function createShowViewshedProp(options = {}, isPure = false) {
  const opt = {
    id: isPure ? "czml_prop_showViewshed_pure_" + nanoid(10) : "czml_prop_showViewshed_" + nanoid(10),
    name: "showViewshed",
    czmlName: "showViewshed",
    labelZh: "显示视域",
    labelEn: "show viewshed",
    isEnable: true,
    isUsed: true,
    isShowUsed: true,
    description: "",
    descriptionZh: "",
    ...options,
  };
  return creatBoolenProp(opt, isPure);
}

export function createPerDirectionRadiusProp(options = {}, isPure = false) {
  const opt = {
    id: isPure ? "czml_prop_perDirectionRadius_pure_" + nanoid(10) : "czml_prop_perDirectionRadius_" + nanoid(10),
    name: "perDirectionRadius",
    czmlName: "perDirectionRadius",
    labelZh: "每方向半径",
    labelEn: "per direction radius",
    isEnable: true,
    isUsed: true,
    isShowUsed: true,
    description: "",
    descriptionZh: "",
    ...options,
  };
  return creatBoolenProp(opt, isPure);
}

export function createTransparentProp(options = {}, isPure = false) {
  const opt = {
    id: isPure ? "czml_prop_transparent_pure_" + nanoid(10) : "czml_prop_transparent_" + nanoid(10),
    name: "transparent",
    czmlName: "transparent",
    labelZh: "透明度",
    labelEn: "transparent",
    isEnable: true,
    isUsed: true,
    isShowUsed: true,
    description: "",
    descriptionZh: "",
    ...options,
  };
  return creatBoolenProp(opt, isPure);
}

export function createShowBackgroundProp(options = {}, isPure = false) {
  const opt = {
    id: isPure ? "czml_prop_showBackground_pure_" + nanoid(10) : "czml_prop_showBackground_" + nanoid(10),
    name: "showBackground",
    czmlName: "showBackground",
    labelZh: "显示背景",
    labelEn: "show background",
    isEnable: true,
    isUsed: true,
    isShowUsed: true,
    description: "",
    descriptionZh: "",
    ...options,
  };
  return creatBoolenProp(opt, isPure);
}

export function createIncrementallyLoadTexturesProp(options = {}, isPure = false) {
  const opt = {
    id: isPure
      ? "czml_prop_incrementallyLoadTextures_pure_" + nanoid(10)
      : "czml_prop_incrementallyLoadTextures_" + nanoid(10),
    name: "incrementallyLoadTextures",
    czmlName: "incrementallyLoadTextures",
    labelZh: "逐步加载纹理",
    labelEn: "incrementally load textures",
    isEnable: true,
    isUsed: true,
    isShowUsed: true,
    description: "",
    descriptionZh: "",
    ...options,
  };
  return creatBoolenProp(opt, isPure);
}

export function createRunAnimationsProp(options = {}, isPure = false) {
  const opt = {
    id: isPure ? "czml_prop_runAnimations_pure_" + nanoid(10) : "czml_prop_runAnimations_" + nanoid(10),
    name: "runAnimations",
    czmlName: "runAnimations",
    labelZh: "运行动画",
    labelEn: "run animations",
    isEnable: true,
    isUsed: true,
    isShowUsed: true,
    description: "",
    descriptionZh: "",
    ...options,
  };
  return creatBoolenProp(opt, isPure);
}

export function createPerPositionHeightProp(options = {}, isPure = false) {
  const opt = {
    id: isPure ? "czml_prop_perPositionHeight_pure_" + nanoid(10) : "czml_prop_perPositionHeight_" + nanoid(10),
    name: "perPositionHeight",
    czmlName: "perPositionHeight",
    labelZh: "各位置高度",
    labelEn: "per position height",
    isEnable: true,
    isUsed: true,
    isShowUsed: true,
    description: "",
    descriptionZh: "",
    ...options,
  };
  return creatBoolenProp(opt, isPure);
}

export function createCloseTopProp(options = {}, isPure = false) {
  const opt = {
    id: isPure ? "czml_prop_closeTop_pure_" + nanoid(10) : "czml_prop_closeTop_" + nanoid(10),
    name: "closeTop",
    czmlName: "closeTop",
    labelZh: "近顶部",
    labelEn: "close top",
    isEnable: true,
    isUsed: true,
    isShowUsed: true,
    description: "",
    descriptionZh: "",
    ...options,
  };
  return creatBoolenProp(opt, isPure);
}

export function createCloseBottomProp(options = {}, isPure = false) {
  const opt = {
    id: isPure ? "czml_prop_closeBottom_pure_" + nanoid(10) : "czml_prop_closeBottom_" + nanoid(10),
    name: "closeBottom",
    czmlName: "closeBottom",
    labelZh: "近底部",
    labelEn: "close bottom",
    isEnable: true,
    isUsed: true,
    isShowUsed: true,
    description: "",
    descriptionZh: "",
    ...options,
  };
  return creatBoolenProp(opt, isPure);
}

export function createFollowSurfaceProp(options = {}, isPure = false) {
  const opt = {
    id: isPure ? "czml_prop_followSurface_pure_" + nanoid(10) : "czml_prop_followSurface_" + nanoid(10),
    name: "followSurface",
    czmlName: "followSurface",
    labelZh: "跟随表面",
    labelEn: "follow surface",
    isEnable: true,
    isUsed: true,
    isShowUsed: true,
    description: "",
    descriptionZh: "",
    ...options,
  };
  return creatBoolenProp(opt, isPure);
}

export function createclampToGroundProp(options = {}, isPure = false) {
  const opt = {
    id: isPure ? "czml_prop_clampToGround_pure_" + nanoid(10) : "czml_prop_clampToGround_" + nanoid(10),
    name: "clampToGround",
    czmlName: "clampToGround",
    labelZh: "贴地",
    labelEn: "clamp to ground",
    isEnable: true,
    isUsed: true,
    isShowUsed: true,
    description: "",
    descriptionZh: "",
    ...options,
  };
  return creatBoolenProp(opt, isPure);
}
