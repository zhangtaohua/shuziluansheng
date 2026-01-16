import { nanoid } from "@/utils/common/nanoid";
import czmlCustomPropertiesProp from "../values/CustomPropert";
import czmlCombineProp from "../values/CombinePropert";
import { createBooleanProp } from "./booleanProp";
import { createCartesianMapProp, createSphericalProp, createUnitCartesianProp } from "./cartesian3Prop";
import { createBoundingRectangleProp, createNearFarScalarProp } from "./cartesian4Prop";
import { CZMLCARTESIAN3DEGREESTYPE, CZMLCARTESIAN3METERTYPE, CZMLCARTESIAN3RADIANSTYPE } from "../values/commondata";
import { createCartesian2Prop, createUnitSphericalProp } from "./cartesian2Prop";
import { createRgbaColorProp, createRgbafColorProp } from "./colorProp";
import { createColorBlendModeProp, createCornerTypeProp, createStripeOrientationProp } from "./optionsProp";
import { createHeightReferenceProp } from "./heightReferenceProp";
import { createHorizontalOriginProp } from "./horizontalOriginProp";
import { createLabelStyleProp } from "./styleProp";
import { createNumberDoubleProp } from "./doubleProp";
import { createUnitQuaternionProp } from "./quaternionProp";
import { createUriProp } from "./urlProp";
import { createStringProp } from "./stringTextProp";
import { createShadowsProp } from "./shadowsProp";
import { createVerticalOriginProp } from "./verticalOriginProp";
import { createWsenDegreesProp, createWsenProp } from "./CartographicRectangleProp";

export function createCustomPropertiesProp(options = {}) {
  return new czmlCustomPropertiesProp({
    id: "czml_prop_properties_" + nanoid(10),
    name: "customProperties",
    czmlName: "customProperties",
    labelZh: "自定义属性",
    labelEn: "custom properties",
    isEnable: true,
    isUsed: false,
    isShowUsed: true,
    $ref: "CustomProperties.json",
    description: "A set of custom properties for this object.",
    descriptionZh: "",
    ...options,
  });
}

export function createPackketPropertiesProp(options = {}) {
  return new czmlCombineProp({
    id: "czml_prop_properties_" + nanoid(10),
    name: "properties",
    czmlName: "properties",
    labelZh: "属性",
    labelEn: "properties",
    isEnable: true,
    isUsed: false,
    isShowUsed: true,
    $ref: "CustomProperties.json",
    description: "A set of custom properties for this object.",
    descriptionZh: "",
    ...options,
    properties: {
      boolean: createBooleanProp({
        isUsed: false,
        isShowUsed: true,
        $ref: "Values/BooleanValue.json",
        description: "The property specified as a boolean value.",
      }),
      boundingRectangle: createBoundingRectangleProp({
        isUsed: false,
        isShowUsed: true,
        $ref: "Values/BoundingRectangleValue.json",
        description: "The property specified as `[X, Y, Width, Height]`.",
      }),
      cartesian: createCartesianMapProp({
        czmlName: "cartesian",
        labelZh: "XYZ坐标(C)",
        labelEn: "cartesian3(C)",
        isEnable: true,
        isFixedXyzUnitType: true,
        isUsed: false,
        isShowUsed: true,
        xyzUnitType: CZMLCARTESIAN3METERTYPE,
        $ref: "Values/Cartesian3Value.json",
        description: "The property specified as a three-dimensional Cartesian value `[X, Y, Z]`.",
      }),
      cartographicRadians: createCartesianMapProp({
        czmlName: "cartographicRadians",
        labelZh: "经纬度弧度(C)",
        labelEn: "cartographic radians3(C)",
        isEnable: true,
        isFixedXyzUnitType: true,
        isUsed: false,
        isShowUsed: true,
        xyzUnitType: CZMLCARTESIAN3RADIANSTYPE,
        $ref: "Values/CartographicRadiansValue.json",
        description:
          "The property specified in Cartographic WGS84 coordinates, `[Longitude, Latitude, Height]`, where Longitude and Latitude are in radians and Height is in meters.",
      }),
      cartographicDegrees: createCartesianMapProp({
        czmlName: "cartographicDegrees",
        labelZh: "经纬度度(C)",
        labelEn: "cartographic degrees3(C)",
        isEnable: true,
        isFixedXyzUnitType: true,
        isUsed: false,
        isShowUsed: true,
        xyzUnitType: CZMLCARTESIAN3DEGREESTYPE,
        $ref: "Values/CartographicDegreesValue.json",
        description:
          "The property specified in Cartographic WGS84 coordinates, `[Longitude, Latitude, Height]`, where Longitude and Latitude are in degrees and Height is in meters.",
      }),
      cartesian2: createCartesian2Prop({
        isUsed: false,
        isShowUsed: true,
        $ref: "Values/Cartesian2Value.json",
        description: "The property specified as a two-dimensional Cartesian value `[X, Y]`.",
      }),
      unitCartesian: createUnitCartesianProp({
        isUsed: false,
        isShowUsed: true,
        $ref: "Values/UnitCartesian3Value.json",
        description: "The property specified as a three-dimensional unit magnitude Cartesian value `[X, Y, Z]`.",
      }),
      spherical: createSphericalProp({
        isUsed: false,
        isShowUsed: true,
        $ref: "Values/SphericalValue.json",
        description:
          "The property specified as a spherical value `[Clock, Cone, Magnitude]`. The clock angle is measured in the XY plane from the positive X axis toward the positive Y axis. The cone angle is the angle from the positive Z axis toward the negative Z axis.",
      }),
      unitSpherical: createUnitSphericalProp({
        isUsed: false,
        isShowUsed: true,
        $ref: "Values/UnitSphericalValue.json",
        description:
          "The property specified as a unit spherical value `[Clock, Cone]`. The clock angle is measured in the XY plane from the positive X axis toward the positive Y axis. The cone angle is the angle from the positive Z axis toward the negative Z axis.",
      }),
      rgba: createRgbaColorProp({
        isUsed: false,
        isShowUsed: true,
        $ref: "Values/RgbaValue.json",
        description:
          "The property specified as an array of color components `[Red, Green, Blue, Alpha]` where each component is an integer in the range 0-255.",
      }),
      rgbaf: createRgbafColorProp({
        isUsed: false,
        isShowUsed: true,
        $ref: "Values/RgbafValue.json",
        description:
          "The property specified as an array of color components `[Red, Green, Blue, Alpha]` where each component is a double in the range 0.0-1.0.",
      }),
      colorBlendMode: createColorBlendModeProp({
        isUsed: false,
        isShowUsed: true,
        $ref: "Values/ColorBlendModeValue.json",
        description: "The property specified as a color blend mode.",
      }),
      cornerType: createCornerTypeProp({
        isUsed: false,
        isShowUsed: true,
        $ref: "Values/CornerTypeValue.json",
        description: "The property specified as a corner style.",
      }),
      heightReference: createHeightReferenceProp({
        isUsed: false,
        isShowUsed: true,
        $ref: "Values/HeightReferenceValue.json",
        description: "The property specified as a height reference.",
      }),
      horizontalOrigin: createHorizontalOriginProp({
        isUsed: false,
        isShowUsed: true,
        $ref: "Values/HorizontalOriginValue.json",
        description: "The property specified as a horizontal origin.",
      }),
      labelStyle: createLabelStyleProp({
        isUsed: false,
        isShowUsed: true,
        $ref: "Values/LabelStyleValue.json",
        description: "The property specified as a label style.",
      }),
      number: createNumberDoubleProp({
        isUsed: false,
        isShowUsed: true,
        $ref: "Values/DoubleValue.json",
        description: "The property specified as a number.",
      }),
      nearFarScalar: createNearFarScalarProp({
        isUsed: false,
        isShowUsed: true,
        $ref: "Values/NearFarScalarValue.json",
        description: "The property specified as four values `[NearDistance, NearValue, FarDistance, FarValue]`.",
      }),
      unitQuaternion: createUnitQuaternionProp({
        isUsed: false,
        isShowUsed: true,
        $ref: "Values/UnitQuaternionValue.json",
        description:
          "The property specified as a 4-dimensional unit magnitude quaternion, specified as `[X, Y, Z, W]`.",
      }),
      shadowMode: createShadowsProp({
        isUsed: false,
        isShowUsed: true,
        $ref: "Values/ShadowModeValue.json",
        description: "The property specified as a shadow mode.",
      }),
      string: createStringProp({
        isUsed: false,
        isShowUsed: true,
        $ref: "Values/StringValue.json",
        description: "The property specified as a string.",
      }),
      stripeOrientation: createStripeOrientationProp({
        isUsed: false,
        isShowUsed: true,
        $ref: "Values/StripeOrientationValue.json",
        description: "The property specified as an orientation of stripes in the stripe material.",
      }),
      wsen: createWsenProp({
        isUsed: false,
        isShowUsed: true,
        $ref: "Values/CartographicRectangleRadiansValue.json",
        description:
          "The property specified as a Cartographic rectangle `[WestLongitude, SouthLatitude, EastLongitude, NorthLatitude]`, with values in radians.",
      }),
      wsenDegrees: createWsenDegreesProp({
        isUsed: false,
        isShowUsed: true,
        $ref: "Values/CartographicRectangleDegreesValue.json",
        description:
          "The property specified as a Cartographic rectangle `[WestLongitude, SouthLatitude, EastLongitude, NorthLatitude]`, with values in degrees.",
      }),
      uri: createUriProp({
        isUsed: false,
        isShowUsed: true,
        $ref: "Values/UriValue.json",
        description: "The property specified as a URI.",
      }),
      verticalOrigin: createVerticalOriginProp({
        isUsed: false,
        isShowUsed: true,
        $ref: "Values/VerticalOriginValue.json",
        description: "The property specified as a vertical origin.",
      }),
    },
  });
}
