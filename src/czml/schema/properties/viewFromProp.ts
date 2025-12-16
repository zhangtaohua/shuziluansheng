import { nanoid } from "@/utils/common/nanoid";
import czmlCombineProp from "../values/CombinePropert";
import { createReferenceProp } from "./referenceProp";
import { createCartesianPureProp } from "./cartesian3Prop";

export function createViewFromProp(options = {}) {
  return new czmlCombineProp({
    id: "czml_prop_viewFrom_" + nanoid(10),
    name: "viewFrom",
    czmlName: "viewFrom",
    labelZh: "视觉参考",
    labelEn: "view from",
    isEnable: true,
    isUsed: false,
    isShowUsed: true,
    $ref: "ViewFrom.json",
    description:
      "A suggested initial camera position offset when tracking this object, specified as a Cartesian position. Typically defined in the East (x), North (y), Up (z) reference frame relative to the object's position, but may use another frame depending on the object's velocity.",
    descriptionZh: "",
    ...options,
    properties: {
      cartesian: createCartesianPureProp({
        $ref: "Values/Cartesian3Value.json",
        description: "The offset specified as a three-dimensional Cartesian value `[X, Y, Z]`.",
      }),
      reference: createReferenceProp({
        $ref: "Values/ReferenceValue.json",
        description: "The offset specified as a reference to another property.",
      }),
    },
  });
}
