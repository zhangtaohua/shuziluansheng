import { nanoid } from "@/utils/common/nanoid";
import czmlCombineProp from "../values/CombinePropert";
import czmlDoubleProp from "../values/Double";
import { createReferenceProp } from "./referenceProp";

export function createIntegerValueProp(options = {}) {
  return new czmlDoubleProp({
    id: "czml_prop_integernumber_" + nanoid(10),
    name: "number",
    czmlName: "number",
    labelZh: "数值",
    labelEn: "number",
    type: "number",
    isEnable: true,
    isUsed: true,
    isShowUsed: true,
    value: [255],
    max: 99999999999,
    min: 0,
    setp: 1,
    $ref: "Values/IntegerValue.json",
    description: "The integer.",
    descriptionZh: "",
    ...options,
  });
}

export function createIntegerProp(
  options = {
    name: "integer",
    czmlName: "integer",
    labelZh: "整数",
    labelEn: "integer",
  },
) {
  return new czmlCombineProp({
    id: `czml_prop_${options.czmlName}_` + nanoid(10),
    tag: "CzmlCombineSmPropInput",
    isEnable: true,
    isUsed: true,
    isShowUsed: true,
    $ref: "Integer.json",
    title: "Integer",
    description: "An integer number.",
    descriptionZh: "",
    default: "HORIZONTAL",
    ...options,
    properties: {
      number: createIntegerValueProp(),
      reference: createReferenceProp({
        isUsed: false,
        $ref: "Values/ReferenceValue.json",
        description: "The integer specified as a reference to another property.",
      }),
    },
  });
}

export function createDashPatternIntegerProp(options = {}) {
  return createIntegerProp({
    name: "dashPattern",
    czmlName: "dashPattern",
    labelZh: "虚线数",
    labelEn: "dashPattern",
    $ref: "Integer.json",
    description:
      "A 16-bit bitfield representing which portions along a single dashLength are the dash (1) and which are the gap (0). The default value, 255 (0000000011111111), indicates 50% gap followed by 50% dash.",
    default: 255,
    ...options,
  });
}

export function createZIndexIntegerProp(options = {}) {
  return createIntegerProp({
    name: "zIndex",
    czmlName: "zIndex",
    labelZh: "Z层级",
    labelEn: "zIndex",
    $ref: "Integer.json",
    description:
      "The z-index of the corridor, used for ordering ground geometry. Only has an effect if the corridor is constant, and `height` and `extrudedHeight` are not specified.",
    default: 0,
    ...options,
  });
}

export function createNumberOfVerticalLinesIntegerProp(options = {}) {
  return createIntegerProp({
    name: "numberOfVerticalLines",
    czmlName: "numberOfVerticalLines",
    labelZh: "垂直线数",
    labelEn: "number of vertical lines",
    $ref: "Integer.json",
    description: "The number of vertical lines to draw along the perimeter for the outline.",
    default: 16,
    ...options,
  });
}

export function createSlicesIntegerProp(options = {}) {
  return createIntegerProp({
    name: "slices",
    czmlName: "slices",
    labelZh: "切片数",
    labelEn: "slices",
    $ref: "Integer.json",
    description: "The number of edges around the perimeter of the cylinder.",
    default: 128,
    ...options,
  });
}

export function createStackPartitionsIntegerProp(options = {}) {
  return createIntegerProp({
    name: "stackPartitions",
    czmlName: "stackPartitions",
    labelZh: "栈分区数",
    labelEn: "stack partitions",
    $ref: "Integer.json",
    description: "The number of times to partition the ellipsoid into stacks.",
    default: 64,
    ...options,
  });
}

export function createSlicePartitionsIntegerProp(options = {}) {
  return createIntegerProp({
    name: "slicePartitions",
    czmlName: "slicePartitions",
    labelZh: "切片分区数",
    labelEn: "slice partitions",
    $ref: "Integer.json",
    description: "The number of times to partition the ellipsoid into radial slices.",
    default: 64,
    ...options,
  });
}

export function createSubdivisionsIntegerProp(options = {}) {
  return createIntegerProp({
    name: "subdivisions",
    czmlName: "subdivisions",
    labelZh: "子分区数",
    labelEn: "subdivisions",
    $ref: "Integer.json",
    description: "The number of samples per outline ring, determining the granularity of the curvature.",
    default: 128,
    ...options,
  });
}

export function createViewshedResolutionIntegerProp(options = {}) {
  return createIntegerProp({
    name: "viewshedResolution",
    czmlName: "viewshedResolution",
    labelZh: "视图hed分辨率",
    labelEn: "viewshed resolution",
    $ref: "Integer.json",
    description: "The number of samples per outline ring, determining the granularity of the curvature.",
    default: 2048,
    ...options,
  });
}

export function createNumberOfRingsIntegerProp(options = {}) {
  return createIntegerProp({
    name: "numberOfRings",
    czmlName: "numberOfRings",
    labelZh: "轮廓环数",
    labelEn: "number of rings",
    $ref: "Integer.json",
    description:
      "The number of outline rings to draw, starting from the outer edge and equidistantly spaced towards the center.",
    default: 6,
    ...options,
  });
}
