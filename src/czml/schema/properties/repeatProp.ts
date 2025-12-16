import { nanoid } from "@/utils/common/nanoid";
import czmlCombineProp from "../values/CombinePropert";
import { createReferenceProp } from "./referenceProp";
import { createCartesian2Prop } from "./cartesian2Prop";

export function createRepeatProp(options = {}) {
  return new czmlCombineProp({
    id: "czml_prop_repeat_" + nanoid(10),
    name: "repeat",
    czmlName: "repeat",
    labelZh: "重复数",
    labelEn: "repeat",
    tag: "CzmlCombineSmPropInput",
    isEnable: true,
    isUsed: true,
    isShowUsed: true,
    $ref: "Repeat.json",
    description: "The number of times the image repeats along each axis.",
    descriptionZh: "",
    default: [1, 1],
    ...options,
    properties: {
      cartesian2: createCartesian2Prop({
        value: [1, 1],
        $ref: "Values/Cartesian2Value.json",
        description: "The number of times the image repeats along each axis.",
        default: [1, 1],
      }),
      reference: createReferenceProp({
        $ref: "Values/ReferenceValue.json",
        description: "The number of times the image repeats specified as a reference to another property.",
      }),
    },
  });
}
