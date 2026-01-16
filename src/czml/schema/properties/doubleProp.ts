import { nanoid } from "@/utils/common/nanoid";
import czmlDoubleProp from "../values/Double";
import czmlIntegerPureProp from "../values/IntegerPure";
import czmlDoublePureProp from "../values/DoublePure";

export function createNumberDoubleProp(options = {}) {
  return new czmlDoubleProp({
    id: "czml_prop_number_" + nanoid(10),
    name: "number",
    czmlName: "number",
    labelZh: "值",
    labelEn: "number",
    isEnable: true,
    isUsed: false,
    isShowUsed: true,
    description: "",
    descriptionZh: "",
    ...options,
  });
}

export function createNumberIntegerProp(options = {}) {
  return new czmlDoubleProp({
    id: "czml_prop_number_" + nanoid(10),
    name: "number",
    czmlName: "number",
    labelZh: "值",
    labelEn: "number",
    isEnable: true,
    isUsed: false,
    isShowUsed: true,
    step: 1,
    $ref: "Values/IntegerValue.json",
    description: "The integer.",
    descriptionZh: "",
    ...options,
  });
}

export function createWidthDoubleProp(options = {}) {
  return new czmlDoubleProp({
    id: "czml_prop_width_" + nanoid(10),
    name: "width",
    czmlName: "width",
    labelZh: "值",
    labelEn: "width",
    isEnable: true,
    isUsed: true,
    isShowUsed: true,
    value: [20],
    max: 200,
    min: 0,
    $ref: "Double.json",
    description:
      "The width of the billboard, in pixels (or meters, if `sizeInMeters` is true). By default, the native width of the image is used.",
    descriptionZh: "",
    ...options,
  });
}

export function createWidthIntegerPureProp(options = {}) {
  return new czmlIntegerPureProp({
    id: "czml_prop_width_" + nanoid(10),
    name: "width",
    czmlName: "width",
    labelZh: "值",
    labelEn: "width",
    isEnable: true,
    isUsed: true,
    isShowUsed: true,
    tag: "CzmlNumberSliderPurePropInput",
    value: 20,
    max: 200,
    min: 0,
    $ref: "Double.json",
    description:
      "The width of the billboard, in pixels (or meters, if `sizeInMeters` is true). By default, the native width of the image is used.",
    descriptionZh: "",
    ...options,
  });
}

export function createHeightDoubleProp(options = {}) {
  return new czmlDoubleProp({
    id: "czml_prop_height_" + nanoid(10),
    name: "height",
    czmlName: "height",
    labelZh: "高度",
    labelEn: "height",
    isEnable: true,
    isUsed: true,
    isShowUsed: true,
    value: [20],
    max: 200,
    min: 0,
    $ref: "Double.json",
    description:
      "The height of the billboard, in pixels (or meters, if `sizeInMeters` is true). By default, the native height of the image is used.",
    descriptionZh: "",
    ...options,
  });
}

export function createHeightIntegerPureProp(options = {}) {
  return new czmlIntegerPureProp({
    id: "czml_prop_height_" + nanoid(10),
    name: "height",
    czmlName: "height",
    labelZh: "高度",
    labelEn: "height",
    isEnable: true,
    isUsed: true,
    isShowUsed: true,
    tag: "CzmlNumberSliderPurePropInput",
    value: 20,
    max: 200,
    min: 0,
    $ref: "Double.json",
    description:
      "The height of the billboard, in pixels (or meters, if `sizeInMeters` is true). By default, the native height of the image is used.",
    descriptionZh: "",
    ...options,
  });
}

export function createScaleDoubleProp(options = {}) {
  return new czmlDoubleProp({
    id: "czml_prop_scale_" + nanoid(10),
    name: "scale",
    czmlName: "scale",
    labelZh: "比例",
    labelEn: "scale",
    value: [1.0],
    max: 200,
    min: 0,
    setp: 0.1,
    isEnable: true,
    isUsed: true,
    isShowUsed: true,
    $ref: "Double.json",
    description:
      "The scale of the billboard. The scale is multiplied with the pixel size of the billboard's `image`. For example, if the scale is 2.0, the billboard will be rendered with twice the number of pixels, in each direction, of the `image`.",
    descriptionZh: "",
    default: 1.0,

    ...options,
  });
}

export function createDisableDepthTestDistanceDoubleProp(options = {}) {
  return new czmlDoubleProp({
    id: "czml_prop_disableDepthTestDistance_" + nanoid(10),
    name: "disableDepthTestDistance",
    czmlName: "disableDepthTestDistance",
    labelZh: "禁止深度测试距离",
    labelEn: "disable depth test distance",
    value: [0.0],
    max: 999999999999999999999999, // Infinity,
    min: 0,
    setp: 0.05,
    isEnable: true,
    isUsed: false,
    isShowUsed: true,
    $ref: "Double.json",
    description:
      "The distance from the camera at which to disable the depth test. This can be used to prevent clipping against terrain, for example. When set to zero, the depth test is always applied. When set to Infinity, the depth test is never applied.",
    descriptionZh: "",
    default: 0.0,
    ...options,
  });
}

export function createRotationDoubleProp(options = {}) {
  return new czmlDoubleProp({
    id: "czml_prop_rotation_" + nanoid(10),
    name: "rotation",
    czmlName: "rotation",
    labelZh: "旋转角度",
    labelEn: "rotation",
    isEnable: true,
    isUsed: true,
    isShowUsed: true,
    value: [0.0],
    max: Math.PI,
    min: 0,
    setp: 0.05,
    $ref: "Double.json",
    description: "The rotation of the billboard, in radians, counter-clockwise from the alignedAxis.",
    descriptionZh: "",
    ...options,
  });
}

export function createStRotationDoubleProp(options = {}) {
  return new czmlDoubleProp({
    id: "czml_prop_stRotation_" + nanoid(10),
    name: "stRotation",
    czmlName: "stRotation",
    labelZh: "旋转角度",
    labelEn: "stRotation",
    isEnable: true,
    isUsed: true,
    isShowUsed: true,
    value: [0.0],
    max: Math.PI,
    min: 0,
    setp: 0.05,
    $ref: "Double.json",
    description: "The rotation of the billboard, in radians, counter-clockwise from the alignedAxis.",
    descriptionZh: "",
    ...options,
  });
}

export function createRotationIntegerPureProp(options = {}) {
  return new czmlDoublePureProp({
    id: "czml_prop_rotation_" + nanoid(10),
    name: "rotation",
    czmlName: "rotation",
    labelZh: "旋转角度",
    labelEn: "rotation",
    isEnable: true,
    isUsed: true,
    isShowUsed: true,
    tag: "CzmlNumberSliderPurePropInput",
    value: 0.0,
    max: Math.PI,
    min: 0,
    setp: 0.05,
    $ref: "Double.json",
    description: "The rotation of the billboard, in radians, counter-clockwise from the alignedAxis.",
    descriptionZh: "",
    ...options,
  });
}

export function createOutlineWidthDoubleProp(options = {}) {
  return new czmlDoubleProp({
    id: "czml_prop_outlineWidth_" + nanoid(10),
    name: "outlineWidth",
    czmlName: "outlineWidth",
    labelZh: "轮廓线宽",
    labelEn: "outline width",
    isEnable: true,
    isUsed: true,
    isShowUsed: true,
    value: [1.0],
    default: 1.0,
    max: Math.PI,
    min: 0,
    setp: 0.05,
    $ref: "Double.json",
    description: "The rotation of the billboard, in radians, counter-clockwise from the alignedAxis.",
    descriptionZh: "",
    ...options,
  });
}

export function createClockMultiplierDoublePureProp(options = {}) {
  return new czmlDoublePureProp({
    id: "czml_prop_multiplier_" + nanoid(10),
    name: "multiplier",
    czmlName: "multiplier",
    labelZh: "乘数",
    labelEn: "multiplier",
    tag: "CzmlNumberSliderPurePropInput",
    isRequired: true,
    isEnable: true,
    isUsed: true,
    isShowUsed: true,
    value: 1.0,
    max: 200,
    min: 0,
    setp: 0.1,
    $ref: "Double.json",
    description: "",
    descriptionZh: "",
    ...options,
  });
}

export function createInterpolationDegreeDoublePureProp(options = {}) {
  return new czmlDoublePureProp({
    id: "czml_prop_interpolationDegree_" + nanoid(10),
    name: "interpolationDegree",
    czmlName: "interpolationDegree",
    labelZh: "插值角度",
    labelEn: "interpolation degree",
    tag: "CzmlNumberSliderPurePropInput",
    type: "number",
    isEnable: true,
    isUsed: true,
    isShowUsed: true,
    value: 1.0,
    max: 360,
    min: 0,
    setp: 0.1,
    $ref: "Double.json",
    description: "The degree of interpolation to use when interpolating.",
    descriptionZh: "",
    ...options,
  });
}

export function createForwardExtrapolationDurationDoublePureProp(options = {}) {
  return new czmlDoublePureProp({
    id: "czml_prop_forwardExtrapolationDuration_" + nanoid(10),
    name: "forwardExtrapolationDuration",
    czmlName: "forwardExtrapolationDuration",
    labelZh: "前向插值时间",
    labelEn: "forwardExtrapolation duration",
    tag: "CzmlNumberSliderPurePropInput",
    type: "number",
    isEnable: true,
    isUsed: true,
    isShowUsed: true,
    value: 0.0,
    max: 100,
    min: 0,
    setp: 0.1,
    $ref: "Double.json",
    description:
      "The amount of time to extrapolate forward before the property becomes undefined. A value of 0 will extrapolate forever.",
    descriptionZh: "",
    ...options,
  });
}

export function createBackwardExtrapolationDurationDoublePureProp(options = {}) {
  return new czmlDoublePureProp({
    id: "czml_prop_backwardExtrapolationDuration_" + nanoid(10),
    name: "backwardExtrapolationDuration",
    czmlName: "backwardExtrapolationDuration",
    labelZh: "后向插值时间",
    labelEn: "backwardExtrapolation duration",
    tag: "CzmlNumberSliderPurePropInput",
    type: "number",
    isEnable: true,
    isUsed: true,
    isShowUsed: true,
    value: 1.0,
    max: 100,
    min: 0,
    setp: 0.1,
    $ref: "Double.json",
    description:
      "The amount of time to extrapolate backward before the property becomes undefined. A value of 0 will extrapolate forever.",
    descriptionZh: "",
    ...options,
  });
}

export function createCellAlphaDoubleProp(options = {}) {
  return new czmlDoubleProp({
    id: "czml_prop_cellAlpha_" + nanoid(10),
    name: "cellAlpha",
    czmlName: "cellAlpha",
    labelZh: "间隔透明度",
    labelEn: "cell alpha",
    type: "number",
    isEnable: true,
    isUsed: true,
    isShowUsed: true,
    value: [1.0],
    max: 200,
    min: 0,
    setp: 0.1,
    $ref: "Double.json",
    description:
      "The amount of time to extrapolate backward before the property becomes undefined. A value of 0 will extrapolate forever.",
    descriptionZh: "",
    ...options,
  });
}

export function createOffsetDoubleProp(options = {}) {
  return new czmlDoubleProp({
    id: "czml_prop_offset_" + nanoid(10),
    name: "offset",
    czmlName: "offset",
    labelZh: "偏移",
    labelEn: "offset",
    type: "number",
    isEnable: true,
    isUsed: true,
    isShowUsed: true,
    value: [0.0],
    max: 200,
    min: 0,
    setp: 0.1,
    $ref: "Double.json",
    description:
      "The value indicating where in the pattern to begin drawing, with 0.0 being the beginning of the even color, 1.0 the beginning of the odd color, 2.0 being the even color again, and any multiple or fractional values being in between.",
    descriptionZh: "",
    ...options,
  });
}

export function createRepeatDoubleProp(options = {}) {
  return new czmlDoubleProp({
    id: "czml_prop_repeat_" + nanoid(10),
    name: "repeat",
    czmlName: "repeat",
    labelZh: "重复数",
    labelEn: "repeat",
    type: "number",
    isEnable: true,
    isUsed: true,
    isShowUsed: true,
    value: [0.0],
    max: 200,
    min: 0,
    setp: 0.1,
    $ref: "Double.json",
    description: "The number of times the stripes repeat.",
    descriptionZh: "",
    ...options,
  });
}

export function createMiniMumPixelSizeDoubleProp(options = {}) {
  return new czmlDoubleProp({
    id: "czml_prop_minimumPixelSize_" + nanoid(10),
    name: "minimumPixelSize",
    czmlName: "minimumPixelSize",
    labelZh: "最小像素值",
    labelEn: "minimum pixel size",
    type: "number",
    isEnable: true,
    isUsed: true,
    isShowUsed: true,
    value: [0.0],
    max: 200,
    min: 0,
    setp: 0.1,
    $ref: "Double.json",
    description: "",
    descriptionZh: "",
    ...options,
  });
}

export function createMaximumScaleDoubleProp(options = {}) {
  return new czmlDoubleProp({
    id: "czml_prop_maximumScale_" + nanoid(10),
    name: "maximumScale",
    czmlName: "maximumScale",
    labelZh: "最大缩放值",
    labelEn: "maximum scale",
    type: "number",
    isEnable: true,
    isUsed: true,
    isShowUsed: true,
    value: [0.0],
    max: 300,
    min: 0,
    setp: 1,
    $ref: "Double.json",
    description: "",
    descriptionZh: "",
    ...options,
  });
}

export function createSilhouetteSizeDoubleProp(options = {}) {
  return new czmlDoubleProp({
    id: "czml_prop_silhouetteSize_" + nanoid(10),
    name: "silhouetteSize",
    czmlName: "silhouetteSize",
    labelZh: "轮廓大小",
    labelEn: "silhouetteSize",
    type: "number",
    isEnable: true,
    isUsed: true,
    isShowUsed: true,
    value: [0.0],
    max: 300,
    min: 0,
    setp: 1,
    $ref: "Double.json",
    description: "",
    descriptionZh: "",
    ...options,
  });
}

export function createMinimumClockDoubleProp(options = {}) {
  return new czmlDoubleProp({
    id: "czml_prop_minimumClock_" + nanoid(10),
    name: "minimumClock",
    czmlName: "minimumClock",
    labelZh: "最小时钟值",
    labelEn: "minimum clock",
    type: "number",
    isEnable: true,
    isUsed: true,
    isShowUsed: true,
    value: [0.0],
    max: Math.PI * 2,
    min: -Math.PI * 2,
    setp: 0.01,
    $ref: "Double.json",
    description: "",
    descriptionZh: "",
    ...options,
  });
}

export function createMaximumClockDoubleProp(options = {}) {
  return new czmlDoubleProp({
    id: "czml_prop_maximumClock_" + nanoid(10),
    name: "maximumClock",
    czmlName: "maximumClock",
    labelZh: "最大时钟值",
    labelEn: "maximum clock",
    type: "number",
    isEnable: true,
    isUsed: true,
    isShowUsed: true,
    value: [Math.PI * 2],
    max: Math.PI * 2,
    min: -Math.PI * 2,
    setp: 0.01,
    $ref: "Double.json",
    description: "",
    descriptionZh: "",
    ...options,
  });
}

export function createMinimumConeDoubleProp(options = {}) {
  return new czmlDoubleProp({
    id: "czml_prop_minimumCone_" + nanoid(10),
    name: "minimumCone",
    czmlName: "minimumCone",
    labelZh: "最小圆锥值",
    labelEn: "minimum cone",
    type: "number",
    isEnable: true,
    isUsed: true,
    isShowUsed: true,
    value: [0.0],
    max: Math.PI,
    min: -Math.PI,
    setp: 0.01,
    $ref: "Double.json",
    description: "",
    descriptionZh: "",
    ...options,
  });
}

export function createMaximumConeDoubleProp(options = {}) {
  return new czmlDoubleProp({
    id: "czml_prop_maximumCone_" + nanoid(10),
    name: "maximumCone",
    czmlName: "maximumCone",
    labelZh: "最大圆锥值",
    labelEn: "maximum cone",
    type: "number",
    isEnable: true,
    isUsed: true,
    isShowUsed: true,
    value: [Math.PI],
    max: Math.PI,
    min: -Math.PI,
    setp: 0.01,
    $ref: "Double.json",
    description: "",
    descriptionZh: "",
    ...options,
  });
}

export function createColorBlendAmountDoubleProp(options = {}) {
  return new czmlDoubleProp({
    id: "czml_prop_colorBlendAmount_" + nanoid(10),
    name: "colorBlendAmount",
    czmlName: "colorBlendAmount",
    labelZh: "颜色融合值",
    labelEn: "colorBlendAmount",
    type: "number",
    isEnable: true,
    isUsed: true,
    isShowUsed: true,
    value: [0.5],
    max: 300,
    min: 0,
    setp: 1,
    $ref: "Double.json",
    description: "",
    descriptionZh: "",
    ...options,
  });
}

export function createLeadTimeDoubleProp(options = {}) {
  return new czmlDoubleProp({
    id: "czml_prop_leadTime_" + nanoid(10),
    name: "leadTime",
    czmlName: "leadTime",
    labelZh: "头偏移时间",
    labelEn: "lead time",
    type: "number",
    unit: "seconds",
    isEnable: true,
    isUsed: true,
    isShowUsed: true,
    value: [0.5],
    max: 99999999999,
    min: 0,
    setp: 1,
    $ref: "Double.json",
    description: "",
    descriptionZh: "",
    ...options,
  });
}

export function createTrailTimeDoubleProp(options = {}) {
  return new czmlDoubleProp({
    id: "czml_prop_trailTime_" + nanoid(10),
    name: "trailTime",
    czmlName: "trailTime",
    labelZh: "尾偏移时间",
    labelEn: "trail time",
    type: "number",
    unit: "seconds",
    isEnable: true,
    isUsed: true,
    isShowUsed: true,
    value: [0.5],
    max: 99999999999,
    min: 0,
    setp: 1,
    $ref: "Double.json",
    description: "",
    descriptionZh: "",
    ...options,
  });
}

export function createPixelSizeDoubleProp(options = {}) {
  return new czmlDoubleProp({
    id: "czml_prop_pixelSize_" + nanoid(10),
    name: "pixelSize",
    czmlName: "pixelSize",
    labelZh: "像素大小",
    labelEn: "pixel size",
    type: "number",
    unit: "meters",
    isEnable: true,
    isUsed: true,
    isShowUsed: true,
    value: [1.0],
    max: 99999999999,
    min: 0,
    setp: 1,
    $ref: "Double.json",
    description: "",
    descriptionZh: "",
    ...options,
  });
}

export function createResolutionDoubleProp(options = {}) {
  return new czmlDoubleProp({
    id: "czml_prop_resolution_" + nanoid(10),
    name: "resolution",
    czmlName: "resolution",
    labelZh: "解决",
    labelEn: "resolution",
    type: "number",
    unit: "seconds",
    isEnable: true,
    isUsed: true,
    isShowUsed: true,
    value: [0.5],
    max: 99999999999,
    min: 0,
    setp: 1,
    $ref: "Double.json",
    description: "",
    descriptionZh: "",
    ...options,
  });
}

export function createDashLengthDoubleProp(options = {}) {
  return new czmlDoubleProp({
    id: "czml_prop_dashLength_" + nanoid(10),
    name: "dashLength",
    czmlName: "dashLength",
    labelZh: "虚线长度",
    labelEn: "dash length",
    type: "number",
    unit: "meters",
    isEnable: true,
    isUsed: true,
    isShowUsed: true,
    value: [0.5],
    max: 99999999999,
    min: 0,
    setp: 1,
    $ref: "Double.json",
    description: "",
    descriptionZh: "",
    ...options,
  });
}

export function createExtrudedHeightDoubleProp(options = {}) {
  return new czmlDoubleProp({
    id: "czml_prop_extrudedHeight_" + nanoid(10),
    name: "extrudedHeight",
    czmlName: "extrudedHeight",
    labelZh: "挤出高度",
    labelEn: "extrude height",
    type: "number",
    unit: "meters",
    isEnable: true,
    isUsed: true,
    isShowUsed: true,
    value: [0.5],
    max: 99999999999,
    min: 0,
    setp: 1,
    $ref: "Double.json",
    description: "",
    descriptionZh: "",
    ...options,
  });
}

export function createGranularityDoubleProp(options = {}) {
  return new czmlDoubleProp({
    id: "czml_prop_granularity_" + nanoid(10),
    name: "granularity",
    czmlName: "granularity",
    labelZh: "粒度",
    labelEn: "granularity",
    type: "number",
    unit: "meters",
    isEnable: true,
    isUsed: true,
    isShowUsed: true,
    value: [0.5],
    max: 99999999999,
    min: 0,
    setp: 1,
    $ref: "Double.json",
    description: "",
    descriptionZh: "",
    ...options,
  });
}

export function createLengthDoubleProp(options = {}) {
  return new czmlDoubleProp({
    id: "czml_prop_length_" + nanoid(10),
    name: "length",
    czmlName: "length",
    labelZh: "长度",
    labelEn: "length",
    type: "number",
    unit: "meters",
    isEnable: true,
    isUsed: true,
    isShowUsed: true,
    value: [1.0],
    max: 99999999999,
    min: 0,
    setp: 1,
    $ref: "Double.json",
    description: "",
    descriptionZh: "",
    ...options,
  });
}

export function createTopRadiusDoubleProp(options = {}) {
  return new czmlDoubleProp({
    id: "czml_prop_topRadius_" + nanoid(10),
    name: "topRadius",
    czmlName: "topRadius",
    labelZh: "顶半径",
    labelEn: "top radius",
    type: "number",
    unit: "meters",
    isEnable: true,
    isUsed: true,
    isShowUsed: true,
    value: [0.5],
    max: 99999999999,
    min: 0,
    setp: 1,
    $ref: "Double.json",
    description: "",
    descriptionZh: "",
    ...options,
  });
}

export function createBottomRadiusDoubleProp(options = {}) {
  return new czmlDoubleProp({
    id: "czml_prop_bottomRadius_" + nanoid(10),
    name: "bottomRadius",
    czmlName: "bottomRadius",
    labelZh: "底半径",
    labelEn: "bottom radius",
    type: "number",
    unit: "meters",
    isEnable: true,
    isUsed: true,
    isShowUsed: true,
    value: [0.5],
    max: 99999999999,
    min: 0,
    setp: 1,
    $ref: "Double.json",
    description: "",
    descriptionZh: "",
    ...options,
  });
}

export function createGlowPowerDoubleProp(options = {}) {
  return new czmlDoubleProp({
    id: "czml_prop_glowPower_" + nanoid(10),
    name: "glowPower",
    czmlName: "glowPower",
    labelZh: "发光指数",
    labelEn: "glow power",
    type: "number",
    unit: "meters",
    isEnable: true,
    isUsed: true,
    isShowUsed: true,
    value: [0.25],
    max: 99999999999,
    min: 0,
    setp: 1,
    $ref: "Double.json",
    description: "",
    descriptionZh: "",
    ...options,
  });
}

export function createTaperPowerDoubleProp(options = {}) {
  return new czmlDoubleProp({
    id: "czml_prop_taperPower_" + nanoid(10),
    name: "taperPower",
    czmlName: "taperPower",
    labelZh: "衰减指数",
    labelEn: "taper power",
    type: "number",
    unit: "meters",
    isEnable: true,
    isUsed: true,
    isShowUsed: true,
    value: [1.0],
    max: 99999999999,
    min: 0,
    setp: 1,
    $ref: "Double.json",
    description: "",
    descriptionZh: "",
    ...options,
  });
}

export function createSemiMajorAxisDoubleProp(options = {}) {
  return new czmlDoubleProp({
    id: "czml_prop_semiMajorAxis_" + nanoid(10),
    name: "semiMajorAxis",
    czmlName: "semiMajorAxis",
    labelZh: "半长轴",
    labelEn: "semi major axis",
    type: "number",
    unit: "meters",
    isEnable: true,
    isUsed: true,
    isShowUsed: true,
    value: [1.0],
    max: 99999999999,
    min: 0,
    setp: 1,
    $ref: "Double.json",
    description: "",
    descriptionZh: "",
    ...options,
  });
}

export function createSemiMinorAxisDoubleProp(options = {}) {
  return new czmlDoubleProp({
    id: "czml_prop_semiMinorAxis_" + nanoid(10),
    name: "semiMinorAxis",
    czmlName: "semiMinorAxis",
    labelZh: "半短轴",
    labelEn: "semi minor axis",
    type: "number",
    unit: "meters",
    isEnable: true,
    isUsed: true,
    isShowUsed: true,
    value: [1.0],
    max: 99999999999,
    min: 0,
    setp: 1,
    $ref: "Double.json",
    description: "",
    descriptionZh: "",
    ...options,
  });
}

export function createMinimumHeightsDoubleProp(options = {}) {
  return new czmlDoubleProp({
    id: "czml_prop_minimumHeights_" + nanoid(10),
    name: "minimumHeights",
    czmlName: "minimumHeights",
    labelZh: "最小高度",
    labelEn: "minimum heights",
    type: "number",
    unit: "meters",
    isEnable: true,
    isUsed: true,
    isShowUsed: true,
    value: [1.0],
    max: 99999999999,
    min: 0,
    setp: 1,
    $ref: "Double.json",
    description: "",
    descriptionZh: "",
    ...options,
  });
}

export function createMaximumHeightsDoubleProp(options = {}) {
  return new czmlDoubleProp({
    id: "czml_prop_maximumHeights_" + nanoid(10),
    name: "maximumHeights",
    czmlName: "maximumHeights",
    labelZh: "最大高度",
    labelEn: "maximum heights",
    type: "number",
    unit: "meters",
    isEnable: true,
    isUsed: true,
    isShowUsed: true,
    value: [1.0],
    max: 99999999999,
    min: 0,
    setp: 1,
    $ref: "Double.json",
    description: "",
    descriptionZh: "",
    ...options,
  });
}

export function createMaximumScreenSpaceErrorDoubleProp(options = {}) {
  return new czmlDoubleProp({
    id: "czml_prop_maximumScreenSpaceError_" + nanoid(10),
    name: "maximumScreenSpaceError",
    czmlName: "maximumScreenSpaceError",
    labelZh: "最大屏幕空间误差",
    labelEn: "maximum screen space error",
    type: "number",
    unit: "meters",
    isEnable: true,
    isUsed: true,
    isShowUsed: true,
    value: [1.0],
    max: 99999999999,
    min: 0,
    setp: 1,
    $ref: "Double.json",
    description: "",
    descriptionZh: "",
    ...options,
  });
}

export function createInnerHalfAngleDoubleProp(options = {}) {
  return new czmlDoubleProp({
    id: "czml_prop_innerHalfAngle_" + nanoid(10),
    name: "innerHalfAngle",
    czmlName: "innerHalfAngle",
    labelZh: "内半角",
    labelEn: "inner half angle",
    type: "number",
    unit: "radians",
    isEnable: true,
    isUsed: true,
    isShowUsed: true,
    value: [1.0],
    max: 2 * Math.PI,
    min: -2 * Math.PI,
    setp: 0.01,
    $ref: "Double.json",
    description: "",
    descriptionZh: "",
    ...options,
  });
}

export function createOuterHalfAngleDoubleProp(options = {}) {
  return new czmlDoubleProp({
    id: "czml_prop_outerHalfAngle_" + nanoid(10),
    name: "outerHalfAngle",
    czmlName: "outerHalfAngle",
    labelZh: "外半角",
    labelEn: "outer half angle",
    type: "number",
    unit: "radians",
    isEnable: true,
    isUsed: true,
    isShowUsed: true,
    value: [Math.PI],
    max: 2 * Math.PI,
    min: -2 * Math.PI,
    setp: 0.01,
    $ref: "Double.json",
    description: "",
    descriptionZh: "",
    ...options,
  });
}

export function createMinimumClockAngleDoubleProp(options = {}) {
  return new czmlDoubleProp({
    id: "czml_prop_minimumClockAngle_" + nanoid(10),
    name: "minimumClockAngle",
    czmlName: "minimumClockAngle",
    labelZh: "最小时钟角",
    labelEn: "minimum clock angle",
    type: "number",
    unit: "radians",
    isEnable: true,
    isUsed: true,
    isShowUsed: true,
    value: [0],
    max: 2 * Math.PI,
    min: -2 * Math.PI,
    setp: 0.01,
    $ref: "Double.json",
    description: "",
    descriptionZh: "",
    ...options,
  });
}

export function createMaximumClockAngleDoubleProp(options = {}) {
  return new czmlDoubleProp({
    id: "czml_prop_maximumClockAngle_" + nanoid(10),
    name: "maximumClockAngle",
    czmlName: "maximumClockAngle",
    labelZh: "最大时钟角",
    labelEn: "maximum clock angle",
    type: "number",
    unit: "radians",
    isEnable: true,
    isUsed: true,
    isShowUsed: true,
    value: [2 * Math.PI],
    max: 2 * Math.PI,
    min: -2 * Math.PI,
    setp: 0.01,
    $ref: "Double.json",
    description: "",
    descriptionZh: "",
    ...options,
  });
}

export function createRadiusDoubleProp(options = {}) {
  return new czmlDoubleProp({
    id: "czml_prop_radius_" + nanoid(10),
    name: "radius",
    czmlName: "radius",
    labelZh: "半径",
    labelEn: "radius",
    type: "number",
    unit: "meters",
    isEnable: true,
    isUsed: true,
    isShowUsed: true,
    value: [0.5],
    max: 99999999999,
    min: 0,
    setp: 1,
    $ref: "Double.json",
    description: "",
    descriptionZh: "",
    ...options,
  });
}

export function createIntersectionWidthDoubleProp(options = {}) {
  return new czmlDoubleProp({
    id: "czml_prop_intersectionWidth_" + nanoid(10),
    name: "intersectionWidth",
    czmlName: "intersectionWidth",
    labelZh: "交点宽度",
    labelEn: "intersection width",
    type: "number",
    unit: "meters",
    isEnable: true,
    isUsed: true,
    isShowUsed: true,
    value: [1.0],
    max: 99999999999,
    min: 0,
    setp: 1,
    $ref: "Double.json",
    description: "",
    descriptionZh: "",
    ...options,
  });
}

export function createEnvironmentIntersectionWidthDoubleProp(options = {}) {
  return new czmlDoubleProp({
    id: "czml_prop_environmentIntersectionWidth_" + nanoid(10),
    name: "environmentIntersectionWidth",
    czmlName: "environmentIntersectionWidth",
    labelZh: "环境交点宽度",
    labelEn: "environment intersection width",
    type: "number",
    unit: "meters",
    isEnable: true,
    isUsed: true,
    isShowUsed: true,
    value: [5.0],
    max: 99999999999,
    min: 0,
    setp: 1,
    $ref: "Double.json",
    description: "",
    descriptionZh: "",
    ...options,
  });
}

export function createXHalfAngleDoubleProp(options = {}) {
  return new czmlDoubleProp({
    id: "czml_prop_xHalfAngle_" + nanoid(10),
    name: "xHalfAngle",
    czmlName: "xHalfAngle",
    labelZh: "X半角",
    labelEn: "x half angle",
    type: "number",
    unit: "meters",
    isEnable: true,
    isUsed: true,
    isShowUsed: true,
    value: [Math.PI / 2],
    max: Math.PI * 2,
    min: -Math.PI * 2,
    setp: 0.01,
    $ref: "Double.json",
    description: "",
    descriptionZh: "",
    ...options,
  });
}

export function createYHalfAngleDoubleProp(options = {}) {
  return new czmlDoubleProp({
    id: "czml_prop_yHalfAngle_" + nanoid(10),
    name: "yHalfAngle",
    czmlName: "yHalfAngle",
    labelZh: "Y半角",
    labelEn: "y half angle",
    type: "number",
    unit: "meters",
    isEnable: true,
    isUsed: true,
    isShowUsed: true,
    value: [Math.PI / 2],
    max: Math.PI * 2,
    min: -Math.PI * 2,
    setp: 0.01,
    $ref: "Double.json",
    description: "",
    descriptionZh: "",
    ...options,
  });
}

export function createMinimumLengthInPixelsDoubleProp(options = {}) {
  return new czmlDoubleProp({
    id: "czml_prop_minimumLengthInPixels_" + nanoid(10),
    name: "minimumLengthInPixels",
    czmlName: "minimumLengthInPixels",
    labelZh: "最小像素长度",
    labelEn: "minimum length in pixels",
    type: "number",
    unit: "meters",
    isEnable: true,
    isUsed: true,
    isShowUsed: true,
    value: [0.0],
    max: 99999999999,
    min: 0,
    setp: 1,
    $ref: "Double.json",
    description: "",
    descriptionZh: "",
    ...options,
  });
}
