import { nanoid } from "@/utils/common/nanoid";
import czmlCombineProp from "../values/CombinePropert";
import { createReferenceProp } from "./referenceProp";
import { createCartesianProp } from "./cartesian3Prop";

export function createTranslationProp(options = {}) {
  return new czmlCombineProp({
    id: "czml_prop_translation_" + nanoid(10),
    name: "translation",
    czmlName: "translation",
    labelZh: "变换",
    labelEn: "translation",
    tag: "CzmlCombineSmPropInput",
    isEnable: true,
    isUsed: true,
    isShowUsed: true,
    $ref: "Translation.json",
    description: "A translational offset which can optionally vary over time.",
    descriptionZh: "",
    value: [0.0, 0.0, 0.0],
    default: [0.0, 0.0, 0.0],
    ...options,
    properties: {
      cartesian: createCartesianProp({
        isUsed: true,
        $ref: "Values/Cartesian3Value.json",
        description: "The translation specified as a three-dimensional Cartesian value `[X, Y, Z]`, in meters.",
        value: [0.0, 0.0, 0.0],
        default: [0.0, 0.0, 0.0],
      }),
      reference: createReferenceProp({
        isUsed: false,
        $ref: "Values/ReferenceValue.json",
        description: "The translation specified as a reference to another property.",
      }),
    },
  });
}
