import { nanoid } from "@/utils/common/nanoid";
import czmlCombineProp from "../values/CombinePropert";
import { createCartesian2Prop } from "./cartesian2Prop";
import { createReferenceProp } from "./referenceProp";

export function createPixelOffsetProp(options = {}) {
  return new czmlCombineProp({
    id: "czml_prop_pixelOffset_" + nanoid(10),
    name: "pixelOffset",
    czmlName: "pixelOffset",
    labelZh: "像素偏移",
    labelEn: "pixel offset",
    isEnable: true,
    isUsed: true,
    isShowUsed: true,
    $ref: "PixelOffset.json",
    description:
      "The offset, in viewport pixels, of the billboard origin from the `position`. A pixel offset is the number of pixels up and to the right to place the billboard, relative to the `position`.",
    descriptionZh: "",
    default: [0.0, 0.0],
    ...options,
    properties: {
      cartesian2: createCartesian2Prop({
        value: [0.0, 0.0],
        $ref: "Values/Cartesian2Value.json",
        description:
          "The pixel offset specified as a two-dimensional Cartesian value `[X, Y]`, in viewport coordinates in pixels, where X is pixels to the right and Y is pixels up.",
        default: [0.0, 0.0],
      }),
      reference: createReferenceProp({
        $ref: "Values/ReferenceValue.json",
        description: "The pixel offset specified as a reference to another property.",
      }),
    },
  });
}
