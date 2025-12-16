import { nanoid } from "@/utils/common/nanoid";
import czmlMaterialProp from "../values/Material";

export function createMaterialProp(options = {}) {
  return new czmlMaterialProp({
    id: "czml_prop_material_" + nanoid(10),
    name: "material",
    czmlName: "material",
    labelZh: "材质",
    labelEn: "material",
    tag: "CzmlMaterialPropInput",
    isEnable: true,
    isUsed: true,
    isShowUsed: true,
    $ref: "Material.json",
    description: "The material to display on the surface of the box.",
    descriptionZh: "",
    default: "solid white",
    ...options,
  });
}
