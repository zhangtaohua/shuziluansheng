import { nanoid } from "@/utils/common/nanoid";
import czmlCombineProp from "../values/CombinePropert";
import { createReferenceProp } from "./referenceProp";
import { createUnitQuaternionProp } from "./quaternionProp";

export function createRotationProp(options = {}) {
  return new czmlCombineProp({
    id: "czml_prop_rotation_" + nanoid(10),
    name: "rotation",
    czmlName: "rotation",
    labelZh: "旋转",
    labelEn: "rotation",
    tag: "CzmlCombineSmPropInput",
    isEnable: true,
    isUsed: true,
    isShowUsed: true,
    $ref: "Rotation.json",
    description: "Defines a rotation that transforms a vector expressed in one axes and transforms it to another.",
    descriptionZh: "",
    value: [0.0, 0.0, 0.0, 1.0],
    default: [0.0, 0.0, 0.0, 1.0],
    ...options,
    properties: {
      unitQuaternion: createUnitQuaternionProp({
        isUsed: true,
        $ref: "Values/UnitQuaternionValue.json",
        description:
          "The rotation specified as a 4-dimensional unit magnitude quaternion, specified as `[X, Y, Z, W]`.",
        value: [0.0, 0.0, 0.0, 1.0],
        default: [0.0, 0.0, 0.0, 1.0],
      }),
      reference: createReferenceProp({
        isUsed: false,
        $ref: "Values/ReferenceValue.json",
        description: "The rotation specified as a reference to another property.",
      }),
    },
  });
}
