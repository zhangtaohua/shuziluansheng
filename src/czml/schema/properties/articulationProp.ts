import { nanoid } from "@/utils/common/nanoid";
import czmlCombineProp from "../values/CombinePropert";
import { createNumberDoubleProp } from "./doubleProp";
import { createReferenceProp } from "./referenceProp";

export function createArticulationProp(options = {}) {
  return new czmlCombineProp({
    id: "czml_prop_articulation_" + nanoid(10),
    name: "articulation",
    czmlName: "articulation",
    labelZh: "关节",
    labelEn: "articulation",
    isEnable: true,
    isUsed: false,
    isShowUsed: true,
    description: "An articulation value.",
    descriptionZh: "",
    ...options,
    properties: {
      number: createNumberDoubleProp(),
      reference: createReferenceProp({
        $ref: "Values/ReferenceValue.json",
        description: "The articulation value specified as a reference to another property.",
      }),
    },
  });
}

export function createArticulationsProp(options = {}) {
  return new czmlCombineProp({
    id: "czml_prop_articulations_" + nanoid(10),
    name: "articulations",
    czmlName: "articulations",
    labelZh: "关节",
    labelEn: "articulations",
    isEnable: true,
    isUsed: false,
    isShowUsed: true,
    $ref: "Articulation.json",
    description:
      "A mapping of keys to articulation values, where the keys are the name of the articulation, a single space, and the name of the stage. Articulation values to apply to a 3D model.",
    descriptionZh: "",
    ...options,
    properties: {
      number: createNumberDoubleProp(),
      reference: createReferenceProp({
        $ref: "Values/ReferenceValue.json",
        description: "The articulation value specified as a reference to another property.",
      }),
    },
  });
}
