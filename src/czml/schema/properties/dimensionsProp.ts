import { nanoid } from "@/utils/common/nanoid";
import czmlCombineProp from "../values/CombinePropert";
import { createReferenceProp } from "./referenceProp";
import { createCartesianProp } from "./cartesian3Prop";

export function createBoxDimensionsProp(options = {}) {
  return new czmlCombineProp({
    id: "czml_prop_dimensions_" + nanoid(10),
    name: "dimensions",
    czmlName: "dimensions",
    labelZh: "维度",
    labelEn: "dimensions",
    tag: "CzmlCombineSmPropInput",
    isEnable: true,
    isUsed: true,
    isShowUsed: true,
    $ref: "BoxDimensions.json",
    description: "The dimensions of the box.",
    descriptionZh: "",
    czmlRequiredForDisplay: true,
    ...options,
    properties: {
      cartesian: createCartesianProp({
        $ref: "Values/Cartesian3Value.json",
        description:
          "The dimensions specified as a three-dimensional Cartesian value `[X, Y, Z]`, with X representing width, Y representing depth, and Z representing height, in world coordinates in meters.",
        default: [10000.0, 20000.0, 30000.0],
      }),
      reference: createReferenceProp({
        $ref: "Values/ReferenceValue.json",
        description: "The dimensions specified as a reference to another property.",
      }),
    },
  });
}
