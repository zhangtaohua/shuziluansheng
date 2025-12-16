import { nanoid } from "@/utils/common/nanoid";
import czmlCombineProp from "../values/CombinePropert";
import { createReferenceProp } from "./referenceProp";
import { createStripeOrientationProp } from "./optionsProp";

export function createStripeOrientationCombineProp(options = {}) {
  return new czmlCombineProp({
    id: "czml_prop_sporientation_" + nanoid(10),
    name: "orientation",
    czmlName: "orientation",
    labelZh: "方向",
    labelEn: "orientation",
    tag: "CzmlCombineSmPropInput",
    isEnable: true,
    isUsed: true,
    isShowUsed: true,
    $ref: "StripeOrientation.json",
    description: "The value indicating if the stripes are horizontal or vertical.",
    descriptionZh: "",
    default: "HORIZONTAL",
    ...options,
    properties: {
      stripeOrientation: createStripeOrientationProp({
        $ref: "Values/StripeOrientationValue.json",
        description: "The orientation of stripes in the stripe material.",
        default: "HORIZONTAL",
      }),
      reference: createReferenceProp({
        isUsed: false,
        $ref: "Values/ReferenceValue.json",
        description: "The orientation of stripes specified as a reference to another property.",
      }),
    },
  });
}
