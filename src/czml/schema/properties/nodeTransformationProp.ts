import { nanoid } from "@/utils/common/nanoid";
import czmlCombineProp from "../values/CombinePropert";
import { createTranslationProp } from "./translationProp";
import { createRotationProp } from "./rotationProp";
import { createScaleProp } from "./ScaleProp";
import { isArray } from "es-toolkit/compat";

export function createNodeTransformationProp(options = {}) {
  return new czmlCombineProp({
    id: "czml_prop_nodeTransformation_" + nanoid(10),
    name: "nodeTransformation",
    czmlName: options.nodeName ? options.nodeName : "nodeTransformation",
    labelZh: "节点变换",
    labelEn: options.nodeName ? options.nodeName : "node transformation",
    title: "nodeTransformation",
    isEnable: true,
    isUsed: false,
    isShowUsed: true,
    $ref: "NodeTransformation.json",
    description: "A set of transformations to apply to a particular node in a 3D model.",
    descriptionZh: "",
    ...options,
    properties: {
      translation: createTranslationProp({
        $ref: "Translation.json",
        description: "The translation to apply to the model node.",
        default: [0.0, 0.0, 0.0],
      }),
      rotation: createRotationProp({
        $ref: "Rotation.json",
        description: "The rotation to apply to the model node.",
        default: [0.0, 0.0, 0.0, 1.0],
      }),
      scale: createScaleProp({
        $ref: "Scale.json",
        description: "The scaling to apply to the model node.",
        default: [1.0, 1.0, 1.0],
      }),
    },
  });
}

export function createNodeTransformationsProp(
  options = {
    nodeArrays: [
      {
        nodeName: "testnode1",
      },
    ],
  },
) {
  const props = {};
  const nodeArrays = options.nodeArrays;
  if (isArray(nodeArrays) && nodeArrays.length) {
    for (let i = 0; i < nodeArrays.length; i++) {
      const node = nodeArrays[i];
      props[node.nodeName] = createNodeTransformationProp({
        nodeName: node.nodeName,
      });
    }
  }

  return new czmlCombineProp({
    id: "czml_prop_nodeTransformations_" + nanoid(10),
    name: "nodeTransformations",
    czmlName: "nodeTransformations",
    labelZh: "节点变换组",
    labelEn: "nodeTransformations",
    title: "nodeTransformations",
    isEnable: true,
    isUsed: false,
    isShowUsed: true,
    $ref: "NodeTransformation.json",
    description: "A set of transformations to apply to a particular node in a 3D model.",
    descriptionZh: "",
    ...options,
    properties: props,
  });
}
