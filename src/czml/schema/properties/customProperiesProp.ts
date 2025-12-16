import { nanoid } from "@/utils/common/nanoid";
import czmlCustomPropertiesProp from "../values/CustomPropert";

export function createCustomPropertiesProp(options = {}) {
  return new czmlCustomPropertiesProp({
    id: "czml_prop_properties_" + nanoid(10),
    name: "properties",
    czmlName: "properties",
    labelZh: "自定义属性",
    labelEn: "properties",
    isEnable: true,
    isUsed: false,
    isShowUsed: true,
    $ref: "CustomProperties.json",
    description: "A set of custom properties for this object.",
    descriptionZh: "",
    ...options,
  });
}
