import { nanoid } from "@/utils/common/nanoid";
import czmlUnitQuaternionProp from "../values/UnitQuaternion";

export function createUnitQuaternionProp(options = {}) {
  return new czmlUnitQuaternionProp({
    id: "czml_prop_unitQuaternion_" + nanoid(10),
    name: "unitQuaternion",
    czmlName: "unitQuaternion",
    labelZh: "单位四元数",
    labelEn: "unit quaternion",
    title: "unitQuaternion",
    isEnable: true,
    isUsed: true,
    isShowUsed: true,
    $ref: "Values/UnitQuaternionValue.json",
    description: "",
    descriptionZh: "",
    ...options,
  });
}
