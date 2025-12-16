import { nanoid } from "@/utils/common/nanoid";
import czmlCombineProp from "../values/CombinePropert";
import { createReferenceProp } from "./referenceProp";
import { createBoundingRectangleProp } from "./cartesian4Prop";

export function createImageSubRegionProp(options = {}) {
  return new czmlCombineProp({
    id: "czml_prop_imageSubRegion_" + nanoid(10),
    name: "imageSubRegion",
    czmlName: "imageSubRegion",
    labelZh: "图像子域",
    labelEn: "image sub region",
    isEnable: true,
    isUsed: false,
    isShowUsed: true,
    tag: "CzmlCombineSmPropInput",
    $ref: "BoundingRectangle.json",
    description:
      "A sub-region of the image which will be used for the billboard, rather than the entire image, measured in pixels from the bottom-left.",
    descriptionZh: "",
    ...options,
    properties: {
      boundingRectangle: createBoundingRectangleProp({
        $ref: "Values/BoundingRectangleValue.json",
        description: "The bounding rectangle specified as `[X, Y, Width, Height]`.",
      }),
      reference: createReferenceProp({
        $ref: "Values/ReferenceValue.json",
        description: "The bounding rectangle specified as a reference to another property.",
      }),
    },
  });
}
