import czmlCartesian4Prop from "../values/Cartesian4";

export function createBoundingRectangleProp(options = {}) {
  return new czmlCartesian4Prop({
    name: "boundingRectangle",
    czmlName: "boundingRectangle",
    labelZh: "包围矩形",
    labelEn: "bounding rectangle",
    tag: "CzmlBoundingRectanglePropInput",
    isEnable: true,
    isUsed: false,
    isShowUsed: true,
    $ref: "Values/BoundingRectangleValue.json",
    description: "The bounding rectangle specified as `[X, Y, Width, Height]`.",
    ...options,
  });
}

export function createNearFarScalarProp(options = {}) {
  return new czmlCartesian4Prop({
    name: "nearFarScalar",
    czmlName: "nearFarScalar",
    labelZh: "近远放大比例",
    labelEn: "near far scalar",
    tag: "CzmlCartesian4NFScalerPropInput",
    isEnable: true,
    isUsed: false,
    isShowUsed: true,
    $ref: "Values/NearFarScalarValue.json",
    description:
      "The value specified as four values `[NearDistance, NearValue, FarDistance, FarValue]`, with distances in eye coordinates in meters.",
    ...options,
  });
}
