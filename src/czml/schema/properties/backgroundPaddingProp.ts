import { nanoid } from "@/utils/common/nanoid";
import czmlCombineProp from "../values/CombinePropert";
import { createCartesian2Prop } from "./cartesian2Prop";
import { createReferenceProp } from "./referenceProp";

export function createBackgroundPaddingProp(options = {}) {
  return new czmlCombineProp({
    id: "czml_prop_backgroundPadding_" + nanoid(10),
    name: "backgroundPadding",
    czmlName: "backgroundPadding",
    labelZh: "背景填充",
    labelEn: "background padding",
    isEnable: true,
    isUsed: true,
    isShowUsed: true,
    $ref: "BackgroundPadding.json",
    description: "The amount of padding between the text and the label's background.",
    descriptionZh: "",
    default: [7, 5],
    ...options,
    properties: {
      cartesian2: createCartesian2Prop({
        value: [7, 5],
        $ref: "Values/Cartesian2Value.json",
        description:
          "The background padding specified as a two-dimensional Cartesian value `[X, Y]`, in pixels, where X is the horizontal padding, and Y is the vertical padding.",
        default: [7, 5],
      }),
      reference: createReferenceProp({
        $ref: "Values/ReferenceValue.json",
        description: "The background padding specified as a reference to another property.",
      }),
    },
  });
}
