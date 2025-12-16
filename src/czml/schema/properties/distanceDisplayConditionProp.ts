import { nanoid } from "@/utils/common/nanoid";
import czmlCombineProp from "../values/CombinePropert";
import { createReferenceProp } from "./referenceProp";
import { createCartesian2DistanceDisplayConditionProp } from "./cartesian2Prop";

export function createDistanceDisplayConditionProp(options = {}) {
  return new czmlCombineProp({
    id: "czml_prop_scaleByDistance_" + nanoid(10),
    name: "distanceDisplayCondition",
    czmlName: "distanceDisplayCondition",
    labelZh: "显示距离",
    labelEn: "distance display condition",
    isEnable: true,
    isUsed: false,
    isShowUsed: true,
    tag: "CzmlCombineSmPropInput",
    $ref: "DistanceDisplayCondition.json",
    description:
      "The display condition specifying the distance from the camera at which this billboard will be displayed.",
    descriptionZh: "",
    ...options,
    properties: {
      distanceDisplayCondition: createCartesian2DistanceDisplayConditionProp({
        $ref: "Values/DistanceDisplayConditionValue.json",
        description: "The value specified as two values `[NearDistance, FarDistance]`, with distances in meters.",
      }),
      reference: createReferenceProp({
        $ref: "Values/ReferenceValue.json",
        description: "The value specified as a reference to another property.",
      }),
    },
  });
}
