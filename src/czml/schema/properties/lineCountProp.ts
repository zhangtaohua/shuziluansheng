import { nanoid } from "@/utils/common/nanoid";
import czmlCombineProp from "../values/CombinePropert";
import { createReferenceProp } from "./referenceProp";
import { createCartesian2Prop } from "./cartesian2Prop";

export function createLineCountProp(options = {}) {
  return new czmlCombineProp({
    id: "czml_prop_lineCount_" + nanoid(10),
    name: "lineCount",
    czmlName: "lineCount",
    labelZh: "间隔数",
    labelEn: "line count",
    tag: "CzmlCombineSmPropInput",
    isEnable: true,
    isUsed: true,
    isShowUsed: true,
    $ref: "LineCount.json",
    description: "The number of grid lines along each axis.",
    descriptionZh: "",
    default: [8, 8],
    ...options,
    properties: {
      cartesian2: createCartesian2Prop({
        value: [8, 8],
        $ref: "Values/Cartesian2Value.json",
        description: "The number of grid lines along each axis.",
        default: [8, 8],
      }),
      reference: createReferenceProp({
        $ref: "Values/ReferenceValue.json",
        description: "The number of grid lines along each axis specified as a reference to another property.",
      }),
    },
  });
}
