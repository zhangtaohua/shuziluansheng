import { nanoid } from "@/utils/common/nanoid";
import czmlPositionProp from "../values/Position";

export function createPositionProp(options = {}) {
  return new czmlPositionProp({
    id: "czml_prop_position_" + nanoid(10),
    name: "position",
    czmlName: "position",
    labelZh: "位置",
    labelEn: "position",
    isEnable: true,
    isUsed: true,
    isShowUsed: true,
    $ref: "Position.json",
    description:
      "The position of the object in the world. The position has no direct visual representation, but it is used to locate billboards, labels, and other graphical items attached to the object.",

    descriptionZh: "",
    ...options,
  });
}
