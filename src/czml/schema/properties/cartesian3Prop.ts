import czmlCartesian3Prop from "../values/Cartesian3";
import czmlCartesian3ListProp from "../values/Cartesian3List";
import czmlCartesian3PixelProp from "../values/Cartesian3Pixel";
import czmlCartesian3PixelListProp from "../values/Cartesian3PixelList";
import czmlCartesian3PureProp from "../values/Cartesian3Pure";
import czmlCartesian3VelocityProp from "../values/Cartesian3Velocity";

export function createCartesianPureProp(options = {}) {
  return new czmlCartesian3PureProp({
    name: "cartesian",
    czmlName: "cartesian",
    labelZh: "XYZ坐标",
    labelEn: "cartesian3",
    isEnable: true,
    isUsed: true,
    isShowUsed: true,
    default: [0.0, 0.0, 0.0],
    $ref: "Values/Cartesian3Value.json",
    description: "The offset specified as a three-dimensional Cartesian value `[X, Y, Z]`.",
    ...options,
  });
}

export function createCartesianProp(options = {}) {
  return new czmlCartesian3PixelProp({
    name: "cartesian",
    czmlName: "cartesian",
    labelZh: "XYZ坐标(C)",
    labelEn: "cartesian3(C)",
    isEnable: true,
    isUsed: true,
    isShowUsed: true,
    default: [0.0, 0.0, 0.0],
    $ref: "Values/Cartesian3Value.json",
    description:
      "The dimensions specified as a three-dimensional Cartesian value `[X, Y, Z]`, with X representing width, Y representing depth, and Z representing height, in world coordinates in meters.",
    ...options,
  });
}

export function createCartesianMapProp(options = {}) {
  return new czmlCartesian3Prop({
    name: "cartesian",
    czmlName: "cartesian",
    labelZh: "XYZ坐标(C)",
    labelEn: "cartesian3(C)",
    isEnable: true,
    isUsed: true,
    isShowUsed: true,
    default: [0.0, 0.0, 0.0],
    $ref: "Values/Cartesian3Value.json",
    description:
      "The dimensions specified as a three-dimensional Cartesian value `[X, Y, Z]`, with X representing width, Y representing depth, and Z representing height, in world coordinates in meters.",
    ...options,
  });
}

export function createUnitCartesianProp(options = {}) {
  return new czmlCartesian3PixelProp({
    name: "unitCartesian",
    czmlName: "unitCartesian",
    labelZh: "单位XYZ",
    labelEn: "unit cartesian3",
    isEnable: true,
    isUsed: true,
    isShowUsed: true,
    default: [0.0, 0.0, 0.0],
    $ref: "Values/UnitCartesian3Value.json",
    description:
      "The axis specified as a three-dimensional unit magnitude Cartesian value `[X, Y, Z]`, in world coordinates.",
    ...options,
  });
}

export function createUnitCartesianListProp(options = {}) {
  return new czmlCartesian3PixelListProp({
    name: "unitCartesian",
    czmlName: "unitCartesian",
    labelZh: "单位XYZ表",
    labelEn: "unit cartesian3 list",
    isEnable: true,
    isUsed: true,
    isShowUsed: true,
    default: [0.0, 0.0, 0.0],
    $ref: "Values/UnitCartesian3ListValue.json",
    description:
      "The list of directions specified as three-dimensional unit magnitude Cartesian values, `[X, Y, Z, X, Y, Z, ...]`, in world coordinates in meters.",
    ...options,
  });
}

export function createCartesianVelocityProp(options = {}) {
  return new czmlCartesian3VelocityProp({
    ...options,
  });
}

export function createCartesianListMapProp(options = {}) {
  return new czmlCartesian3ListProp({
    name: "cartesian",
    czmlName: "cartesian",
    labelZh: "XYZ坐标列表",
    labelEn: "cartesian3 list",
    isEnable: true,
    isUsed: true,
    isShowUsed: true,
    $ref: "Values/Cartesian3ListValue.json",
    description:
      "The list of positions specified as three-dimensional Cartesian values, `[X, Y, Z, X, Y, Z, ...]`, in meters relative to the `referenceFrame`.",
    ...options,
  });
}

export function createSphericalProp(options = {}) {
  return new czmlCartesian3PixelProp({
    name: "spherical",
    czmlName: "spherical",
    labelZh: "球面坐标(C)",
    labelEn: "spherical3(C)",
    isEnable: true,
    isUsed: true,
    isShowUsed: true,
    tag: "CzmlSphericalPropInput",
    default: [0.0, 0.0, 0.0],
    $ref: "Values/SphericalValue.json",
    description:
      "The property specified as a spherical value `[Clock, Cone, Magnitude]`. The clock angle is measured in the XY plane from the positive X axis toward the positive Y axis. The cone angle is the angle from the positive Z axis toward the negative Z axis.",
    ...options,
  });
}

export function createSphericalListProp(options = {}) {
  return new czmlCartesian3PixelListProp({
    name: "spherical",
    czmlName: "spherical",
    labelZh: "球面坐标(C)",
    labelEn: "spherical3(C)",
    isEnable: true,
    isUsed: true,
    isShowUsed: true,
    tag: "CzmlSphericalPropInput",
    default: [0.0, 0.0, 0.0],
    $ref: "Values/SphericalListValue.json",
    description:
      "The property specified as a spherical value `[Clock, Cone, Magnitude]`. The clock angle is measured in the XY plane from the positive X axis toward the positive Y axis. The cone angle is the angle from the positive Z axis toward the negative Z axis.",
    ...options,
  });
}
