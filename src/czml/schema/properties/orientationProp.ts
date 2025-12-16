import { nanoid } from "@/utils/common/nanoid";
import { createReferenceProp, createVelocityReferenceProp } from "./referenceProp";
import czmlCombineProp from "../values/CombinePropert";
import { createUnitQuaternionProp } from "./quaternionProp";
import { createInterpolatableProp } from "./interpolatableProp";

export function createOrientationProp(options = {}) {
  return new czmlCombineProp({
    id: "czml_prop_orientation_" + nanoid(10),
    name: "orientation",
    czmlName: "orientation",
    labelZh: "方向",
    labelEn: "orientation",
    title: "Orientation",
    tag: "CzmlCombinePropInput",
    isEnable: true,
    isUsed: true,
    isShowUsed: true,
    $ref: "Orientation.json",
    description:
      "The orientation of the object in the world. The orientation has no direct visual representation, but it is used to orient models, cones, pyramids, and other graphical items attached to the object.",
    descriptionZh: "",
    ...options,
    properties: {
      interpolate: createInterpolatableProp(),
      unitQuaternion: createUnitQuaternionProp({
        $ref: "Values/UnitQuaternionValue.json",
        description:
          "The orientation specified as a 4-dimensional unit magnitude quaternion, specified as `[X, Y, Z, W]`.",
      }),
      // unitQuaternionWithInterpolate: new czmlUnitQuaternionInterpolationProp(null),
      reference: createReferenceProp({
        isUsed: false,
        $ref: "Values/ReferenceValue.json",
        description: "The orientation specified as a reference to another property.",
      }),
      velocityReference: createVelocityReferenceProp({
        isUsed: false,
        $ref: "Values/VelocityReferenceValue.json",
        description:
          "The orientation specified as the normalized velocity vector of a position property. The reference must be to a `position` property.",
      }),
    },
  });
}
