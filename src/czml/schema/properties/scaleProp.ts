import { nanoid } from "@/utils/common/nanoid";
import czmlCombineProp from "../values/CombinePropert";
import { createReferenceProp } from "./referenceProp";
import { createCartesianProp } from "./cartesian3Prop";

export function createScaleProp(options = {}) {
  return new czmlCombineProp({
    id: "czml_prop_scale_" + nanoid(10),
    name: "scale",
    czmlName: "scale",
    labelZh: "缩放",
    labelEn: "scale",
    tag: "CzmlCombineSmPropInput",
    isEnable: true,
    isUsed: true,
    isShowUsed: true,
    $ref: "Scale.json",
    description: "A scaling factor which can optionally vary over time.",
    descriptionZh: "",
    value: [1.0, 1.0, 1.0],
    default: [1.0, 1.0, 1.0],
    ...options,
    properties: {
      cartesian: createCartesianProp({
        isUsed: true,
        $ref: "Values/Cartesian3Value.json",
        description: "The scale specified as a three-dimensional Cartesian value `[X, Y, Z]`.",
        value: [1.0, 1.0, 1.0],
        default: [1.0, 1.0, 1.0],
      }),
      reference: createReferenceProp({
        isUsed: false,
        $ref: "Values/ReferenceValue.json",
        description: "The scale specified as a reference to another property.",
      }),
    },
  });
}
