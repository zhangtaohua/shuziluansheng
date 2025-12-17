import { nanoid } from "@/utils/common/nanoid";
import czmlCombineProp from "../values/CombinePropert";
import { createReferenceProp } from "./referenceProp";
import { createClassificationTypeProp } from "./optionsProp";

export function createClassificationTypeCombineProp(options = {}) {
  return new czmlCombineProp({
    id: "czml_prop_classificationType_combine_" + nanoid(10),
    name: "classificationType",
    czmlName: "classificationType",
    labelZh: "分类类型",
    labelEn: "classification type",
    tag: "CzmlCombineSmPropInput",
    isEnable: true,
    isUsed: true,
    isShowUsed: true,
    $ref: "ClassificationType.json",
    description: "Whether a classification affects terrain, 3D Tiles, or both.",
    descriptionZh: "",
    default: "BOTH",
    ...options,
    properties: {
      classificationType: createClassificationTypeProp({
        $ref: "Values/ClassificationTypeValue.json",
        description:
          "The classification type, which indicates whether a classification affects terrain, 3D Tiles, or both.",
        default: "BOTH",
      }),
      reference: createReferenceProp({
        isUsed: false,
        $ref: "Values/ReferenceValue.json",
        description: "The classification type specified as a reference to another property.",
      }),
    },
  });
}
