import { nanoid } from "@/utils/common/nanoid";
import czmlCombineProp from "../values/CombinePropert";
import { createReferenceProp } from "./referenceProp";
import { createCartesianPureProp } from "./cartesian3Prop";

export function createEllipsoidRadiiProp(options = {}) {
  return new czmlCombineProp({
    id: "czml_prop_ellipsoidRadii_" + nanoid(10),
    name: "ellipsoidRadii",
    czmlName: "ellipsoidRadii",
    labelZh: "椭球体半径",
    labelEn: "ellipsoid radii",
    isEnable: true,
    isUsed: false,
    isShowUsed: true,
    $ref: "EllipsoidRadii.json",
    description: "The radii of an ellipsoid.",
    descriptionZh: "",
    ...options,
    properties: {
      cartesian: createCartesianPureProp({
        $ref: "Values/Cartesian3Value.json",
        description:
          "The radii specified as a three-dimensional Cartesian value `[X, Y, Z]`, in world coordinates in meters.",
      }),
      reference: createReferenceProp({
        $ref: "Values/ReferenceValue.json",
        description: "The radii specified as a reference to another property.",
      }),
    },
  });
}
