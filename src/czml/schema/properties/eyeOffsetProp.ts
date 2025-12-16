import { nanoid } from "@/utils/common/nanoid";
import czmlCombineProp from "../values/CombinePropert";
import { createReferenceProp } from "./referenceProp";
import { createCartesianProp } from "./cartesian3Prop";

export function createEyeOffsetProp(options = {}) {
  return new czmlCombineProp({
    id: "czml_prop_eyeOffset_" + nanoid(10),
    name: "eyeOffset",
    czmlName: "eyeOffset",
    labelZh: "观察偏移",
    labelEn: "eye offset",
    isEnable: true,
    isUsed: true,
    isShowUsed: true,
    $ref: "EyeOffset.json",
    description:
      "The eye offset of the billboard, which is the offset in eye coordinates at which to place the billboard relative to the `position` property. Eye coordinates are a left-handed coordinate system where the X-axis points toward the viewer's right, the Y-axis points up, and the Z-axis points into the screen.",
    default: [0.0, 0.0, 0.0],
    ...options,
    properties: {
      cartesian: createCartesianProp({
        value: [0.0, 0.0, 0.0],
        $ref: "Values/Cartesian3Value.json",
        description:
          "The eye offset specified as a three-dimensional Cartesian value `[X, Y, Z]`, in eye coordinates in meters. If the array has three elements, the eye offset is constant. If it has four or more elements, they are time-tagged samples arranged as `[Time, X, Y, Z, Time, X, Y, Z, ...]`, where Time is an ISO 8601 date and time string or seconds since epoch.",
        default: [0.0, 0.0, 0.0],
      }),
      reference: createReferenceProp({
        $ref: "Values/ReferenceValue.json",
        description: "The eye offset specified as a reference to another property.",
      }),
    },
  });
}
