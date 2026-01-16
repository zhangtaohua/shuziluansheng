import { nanoid } from "@/utils/common/nanoid";
import czmlCombineProp from "../values/CombinePropert";
import { createReferenceProp } from "./referenceProp";
import {
  createCartesianListMapProp,
  createCartesianProp,
  createSphericalListProp,
  createSphericalProp,
  createUnitCartesianListProp,
  createUnitCartesianProp,
} from "./cartesian3Prop";
import { createUnitSphericalListProp, createUnitSphericalProp } from "./cartesian2Prop";

export function createDirectionProp(options = {}) {
  return new czmlCombineProp({
    id: "czml_prop_direction_" + nanoid(10),
    name: "direction",
    czmlName: "direction",
    labelZh: "方向",
    labelEn: "direction",
    tag: "CzmlCombineSmPropInput",
    isEnable: true,
    isUsed: true,
    isShowUsed: true,
    $ref: "Direction.json",
    description: "A unit vector, in world coordinates, that defines a direction.",
    descriptionZh: "",
    czmlRequiredForDisplay: true,
    ...options,
    properties: {
      spherical: createSphericalProp({
        isUsed: false,
        $ref: "Values/SphericalValue.json",
        description:
          "The direction specified as a spherical value `[Clock, Cone, Magnitude]`, with angles in radians and magnitude in meters. The clock angle is measured in the XY plane from the positive X axis toward the positive Y axis. The cone angle is the angle from the positive Z axis toward the negative Z axis.",
      }),
      unitSpherical: createUnitSphericalProp({
        isUsed: false,
        $ref: "Values/UnitSphericalValue.json",
        description:
          "The direction specified as a unit spherical value `[Clock, Cone]`, in radians. The clock angle is measured in the XY plane from the positive X axis toward the positive Y axis. The cone angle is the angle from the positive Z axis toward the negative Z axis.",
      }),
      cartesian: createCartesianProp({
        isUsed: false,
        $ref: "Values/Cartesian3Value.json",
        description:
          "The direction specified as a three-dimensional Cartesian value `[X, Y, Z]`, in world coordinates in meters.",
      }),
      unitCartesian: createUnitCartesianProp({
        isUsed: false,
        $ref: "Values/UnitCartesian3Value.json",
        description:
          "The direction specified as a three-dimensional unit magnitude Cartesian value `[X, Y, Z]`, in world coordinates in meters.",
      }),
      reference: createReferenceProp({
        isUsed: false,
        $ref: "Values/ReferenceValue.json",
        description: "The direction specified as a reference to another property.",
      }),
    },
  });
}

export function createDirectionsProp(options = {}) {
  return new czmlCombineProp({
    id: "czml_prop_directions_" + nanoid(10),
    name: "directions",
    czmlName: "directions",
    labelZh: "方向",
    labelEn: "direction list",
    tag: "CzmlCombineSmPropInput",
    isEnable: true,
    isUsed: true,
    isShowUsed: true,
    $ref: "DirectionList.json",
    description: "A list of directions.",
    descriptionZh: "",
    czmlRequiredForDisplay: true,
    ...options,
    properties: {
      spherical: createSphericalListProp({
        isUsed: false,
        $ref: "Values/SphericalListValue.json",
        description:
          "The list of directions specified as spherical values `[Clock, Cone, Magnitude, Clock, Cone, Magnitude, ...]`, with angles in radians and magnitude in meters. The clock angle is measured in the XY plane from the positive X axis toward the positive Y axis. The cone angle is the angle from the positive Z axis toward the negative Z axis.",
      }),
      unitSpherical: createUnitSphericalListProp({
        isUsed: false,
        $ref: "Values/UnitSphericalListValue.json",
        description:
          "The list of directions specified as unit spherical values `[Clock, Cone, Clock, Cone, ...]`, in radians. The clock angle is measured in the XY plane from the positive X axis toward the positive Y axis. The cone angle is the angle from the positive Z axis toward the negative Z axis.",
      }),
      cartesian: createCartesianListMapProp({
        isUsed: false,
        $ref: "Values/Cartesian3ListValue.json",
        description:
          "The list of directions specified as three-dimensional Cartesian values `[X, Y, Z, X, Y, Z, ...]`, in world coordinates in meters.",
      }),
      unitCartesian: createUnitCartesianListProp({
        isUsed: false,
        $ref: "Values/UnitCartesian3ListValue.json",
        description:
          "The list of directions specified as three-dimensional unit magnitude Cartesian values, `[X, Y, Z, X, Y, Z, ...]`, in world coordinates in meters.",
      }),
    },
  });
}
