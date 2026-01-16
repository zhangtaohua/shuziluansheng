import czmlCartographicRectangleProp from "../values/CartographicRectangle";
import { CZMLCARTESIAN3DEGREESTYPE, CZMLCARTESIAN3RADIANSTYPE } from "../values/commondata";

export function createWsenProp(options = {}) {
  return new czmlCartographicRectangleProp({
    name: "wsen",
    czmlName: "wsen",
    labelZh: "西南东北(弧度)",
    labelEn: "wsen",
    isEnable: true,
    isUsed: false,
    isShowUsed: true,
    xyzUnitType: CZMLCARTESIAN3RADIANSTYPE,
    isFixedXyzUnitType: true,
    $ref: "Values/CartographicRectangleRadiansValue.json",
    description:
      "The property specified as a Cartographic rectangle `[WestLongitude, SouthLatitude, EastLongitude, NorthLatitude]`, with values in radians.",
    ...options,
  });
}

export function createWsenDegreesProp(options = {}) {
  return new czmlCartographicRectangleProp({
    name: "wsenDegrees",
    czmlName: "wsenDegrees",
    labelZh: "西南东北(角度)",
    labelEn: "wsen degrees",
    isEnable: true,
    isUsed: false,
    isShowUsed: true,
    xyzUnitType: CZMLCARTESIAN3DEGREESTYPE,
    isFixedXyzUnitType: true,
    $ref: "Values/CartographicRectangleDegreesValue.json",
    description:
      "The property specified as a Cartographic rectangle `[WestLongitude, SouthLatitude, EastLongitude, NorthLatitude]`, with values in degrees.",
    ...options,
  });
}
