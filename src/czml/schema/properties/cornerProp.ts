import { nanoid } from "@/utils/common/nanoid";
import czmlCombineProp from "../values/CombinePropert";
import { createReferenceProp } from "./referenceProp";
import { createCornerTypeProp } from "./optionsProp";

export function createCornerTypeCombineProp(options = {}) {
  return new czmlCombineProp({
    id: "czml_prop_cornerType_combine_" + nanoid(10),
    name: "cornerType",
    czmlName: "cornerType",
    labelZh: "圆角类型",
    labelEn: "corner type",
    tag: "CzmlCombineSmPropInput",
    isEnable: true,
    isUsed: true,
    isShowUsed: true,
    $ref: "CornerType.json",
    description: "The style of the corners of the corridor.",
    descriptionZh: "",
    default: "ROUNDED",
    ...options,
    properties: {
      cornerType: createCornerTypeProp({
        $ref: "Values/CornerTypeValue.json",
        description: "The corner style.",
        default: "ROUNDED",
      }),
      reference: createReferenceProp({
        isUsed: false,
        $ref: "Values/ReferenceValue.json",
        description: "The corner style specified as a reference to another property.",
      }),
    },
  });
}
