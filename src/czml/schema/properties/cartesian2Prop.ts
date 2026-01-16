import czmlCartesian2Prop from "../values/Cartesian2";
import czmlCartesian2ListProp from "../values/Cartesian2List";

export function createCartesian2Prop(options = {}) {
  return new czmlCartesian2Prop({
    name: "cartesian2",
    czmlName: "cartesian2",
    isEnable: true,
    isUsed: true,
    isShowUsed: true,
    value: [0.0, 0.0],
    $ref: "Values/Cartesian2Value.json",
    description:
      "The pixel offset specified as a two-dimensional Cartesian value `[X, Y]`, in viewport coordinates in pixels, where X is pixels to the right and Y is pixels up.",
    default: [0.0, 0.0],
    ...options,
  });
}

export function createCartesian2ListProp(options = {}) {
  return new czmlCartesian2ListProp({
    name: "cartesian2",
    czmlName: "cartesian2",
    isEnable: true,
    isUsed: true,
    isShowUsed: true,
    value: [0.0, 0.0],
    $ref: "Values/Cartesian2ListValue.json",
    description: "The list of positions specified as two-dimensional Cartesian values `[X, Y, X, Y, ...]`.",
    default: [0.0, 0.0],
    ...options,
  });
}

export function createUnitSphericalProp(options = {}) {
  return new czmlCartesian2Prop({
    name: "unitSpherical",
    czmlName: "unitSpherical",
    labelZh: "单位球角度",
    labelEn: "unit spherical",
    isEnable: true,
    isUsed: false,
    isShowUsed: true,
    tag: "CzmlUnitSphericalPropInput", // 注意这里
    $ref: "Values/UnitSphericalValue.json",
    description:
      "The axis specified as a unit spherical value `[Clock, Cone]`, in radians. The clock angle is measured in the XY plane from the positive X axis toward the positive Y axis. The cone angle is the angle from the positive Z axis toward the negative Z axis.",
    ...options,
  });
}

export function createUnitSphericalListProp(options = {}) {
  return new czmlCartesian2ListProp({
    name: "unitSpherical",
    czmlName: "unitSpherical",
    labelZh: "单位球角度表",
    labelEn: "unit spherical list",
    isEnable: true,
    isUsed: false,
    isShowUsed: true,
    tag: "CzmlUnitSphericalListPropInput", // 注意这里
    $ref: "Values/UnitSphericalListValue.json",
    description:
      "The list of directions specified as unit spherical values `[Clock, Cone, Clock, Cone, ...]`, in radians. The clock angle is measured in the XY plane from the positive X axis toward the positive Y axis. The cone angle is the angle from the positive Z axis toward the negative Z axis.",
    ...options,
  });
}

export function createCartesian2DistanceDisplayConditionProp(options = {}) {
  return new czmlCartesian2Prop({
    name: "distanceDisplayCondition",
    czmlName: "distanceDisplayCondition",
    labelZh: "显示距离",
    labelEn: "distance display condition",
    tag: "CzmlCartesian2NFPropInput", // 注意这里
    isEnable: true,
    isUsed: false,
    isShowUsed: true,
    $ref: "Values/DistanceDisplayConditionValue.json",
    description: "The value specified as two values `[NearDistance, FarDistance]`, with distances in meters.",
    ...options,
  });
}
