import { nanoid } from "@/utils/common/nanoid";
import czmlCombineProp from "../values/CombinePropert";
import { createReferenceProp } from "./referenceProp";
import { createCartesian2Prop } from "./cartesian2Prop";

export function createLineThicknessProp(options = {}) {
  return new czmlCombineProp({
    id: "czml_prop_lineThickness_" + nanoid(10),
    name: "lineThickness",
    czmlName: "lineThickness",
    labelZh: "行厚度",
    labelEn: "line thickness",
    tag: "CzmlCombineSmPropInput",
    isEnable: true,
    isUsed: true,
    isShowUsed: true,
    $ref: "LineThickness.json",
    description: "The thickness of grid lines along each axis, in pixels.",
    descriptionZh: "",
    value: [1.0, 1.0],
    default: [1.0, 1.0],
    ...options,
    properties: {
      cartesian2: createCartesian2Prop({
        isUsed: true,
        $ref: "Values/Cartesian2Value.json",
        description: "The thickness specified as a two-dimensional Cartesian value `[X, Y]`, in pixels.",
        value: [1.0, 1.0],
        default: [1.0, 1.0],
      }),
      reference: createReferenceProp({
        isUsed: false,
        $ref: "Values/ReferenceValue.json",
        description: "The thickness specified as a reference to another property.",
      }),
    },
  });
}
