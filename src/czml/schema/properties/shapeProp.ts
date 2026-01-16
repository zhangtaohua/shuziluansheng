import { nanoid } from "@/utils/common/nanoid";
import czmlCombineProp from "../values/CombinePropert";
import { createCartesian2ListProp } from "./cartesian2Prop";

export function createShapeProp(options = {}) {
  return new czmlCombineProp({
    id: "czml_prop_shape_" + nanoid(10),
    name: "shape",
    czmlName: "shape",
    labelZh: "形状",
    labelEn: "shape",
    tag: "CzmlCombineSmPropInput",
    isEnable: true,
    isUsed: false,
    isShowUsed: true,
    $ref: "Shape.json",
    description: "A list of two-dimensional positions defining a shape.",
    descriptionZh: "",
    ...options,
    properties: {
      cartesian2: createCartesian2ListProp({
        isUsed: true,
        $ref: "Values/Cartesian2ListValue.json",
        description: "The list of positions specified as two-dimensional Cartesian values `[X, Y, X, Y, ...]`.",
      }),
    },
  });
}
