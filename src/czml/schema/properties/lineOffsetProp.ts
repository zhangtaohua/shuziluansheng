import { nanoid } from "@/utils/common/nanoid";
import czmlCombineProp from "../values/CombinePropert";
import { createReferenceProp } from "./referenceProp";
import { createCartesian2Prop } from "./cartesian2Prop";

export function createLineOffsetProp(options = {}) {
  return new czmlCombineProp({
    id: "czml_prop_lineOffset_" + nanoid(10),
    name: "lineOffset",
    czmlName: "lineOffset",
    labelZh: "行厚度",
    labelEn: "line offset",
    tag: "CzmlCombineSmPropInput",
    isEnable: true,
    isUsed: true,
    isShowUsed: true,
    $ref: "LineOffset.json",
    description: "The offset of grid lines along each axis, as a percentage from 0 to 1.",
    descriptionZh: "",
    value: [0.0, 0.0],
    default: [0.0, 0.0],
    ...options,
    properties: {
      cartesian2: createCartesian2Prop({
        isUsed: true,
        $ref: "Values/Cartesian2Value.json",
        description: "The offset of grid lines along each axis, specified as a percentage from 0 to 1.",
        value: [0.0, 0.0],
        default: [0.0, 0.0],
      }),
      reference: createReferenceProp({
        isUsed: false,
        $ref: "Values/ReferenceValue.json",
        description: "The offset of grid lines along each axis specified as a reference to another property.",
      }),
    },
  });
}
