import { nanoid } from "@/utils/common/nanoid";
import czmlCombineProp from "../values/CombinePropert";
import { createReferenceProp } from "./referenceProp";
import { createNearFarScalarProp } from "./cartesian4Prop";

export function createScaleByDistanceProp(options = {}) {
  return new czmlCombineProp({
    id: "czml_prop_scaleByDistance_" + nanoid(10),
    name: "scaleByDistance",
    czmlName: "scaleByDistance",
    labelZh: "缩放距离",
    labelEn: "scale by distance",
    isEnable: true,
    isUsed: true,
    isShowUsed: true,
    tag: "CzmlCombineSmPropInput",
    $ref: "NearFarScalar.json",
    description:
      "How the label's scale should change based on the label's distance from the camera. This scalar value will be multiplied by `scale`.",
    descriptionZh: "",
    ...options,
    properties: {
      nearFarScalar: createNearFarScalarProp({
        $ref: "NearFarScalar.json",
        description:
          "How the billboard's translucency should change based on the billboard's distance from the camera. This scalar value should range from 0 to 1.",
      }),
      reference: createReferenceProp({
        $ref: "Values/ReferenceValue.json",
        description: "The value specified as a reference to another property.",
      }),
    },
  });
}

export function createTranslucencyByDistanceProp(options = {}) {
  return new czmlCombineProp({
    id: "czml_prop_translucencyByDistance_" + nanoid(10),
    name: "translucencyByDistance",
    czmlName: "translucencyByDistance",
    labelZh: "透明度距离",
    labelEn: "translucency by distance",
    isEnable: true,
    isUsed: true,
    isShowUsed: true,
    tag: "CzmlCombineSmPropInput",
    $ref: "NearFarScalar.json",
    description:
      "How the billboard's translucency should change based on the billboard's distance from the camera. This scalar value should range from 0 to 1.",
    descriptionZh: "",
    ...options,
    properties: {
      nearFarScalar: createNearFarScalarProp({
        $ref: "NearFarScalar.json",
        description:
          "How the billboard's translucency should change based on the billboard's distance from the camera. This scalar value should range from 0 to 1.",
      }),
      reference: createReferenceProp({
        $ref: "Values/ReferenceValue.json",
        description: "The value specified as a reference to another property.",
      }),
    },
  });
}

export function createPixelOffsetScaleByDistanceProp(options = {}) {
  return new czmlCombineProp({
    id: "czml_prop_pixelOffsetScaleByDistance_" + nanoid(10),
    name: "pixelOffsetScaleByDistance",
    czmlName: "pixelOffsetScaleByDistance",
    labelZh: "像素偏移缩放距离",
    labelEn: "pixel offset scale by distance",
    isEnable: true,
    isUsed: true,
    isShowUsed: true,
    tag: "CzmlCombineSmPropInput",
    $ref: "NearFarScalar.json",
    description:
      "How the billboard's pixel offset should change based on the billboard's distance from the camera. This scalar value will be multiplied by `pixelOffset`.",
    descriptionZh: "",
    ...options,
    properties: {
      nearFarScalar: createNearFarScalarProp({
        $ref: "NearFarScalar.json",
        description:
          "How the billboard's translucency should change based on the billboard's distance from the camera. This scalar value should range from 0 to 1.",
      }),
      reference: createReferenceProp({
        $ref: "Values/ReferenceValue.json",
        description: "The value specified as a reference to another property.",
      }),
    },
  });
}
