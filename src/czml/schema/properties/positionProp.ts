import { nanoid } from "@/utils/common/nanoid";
import czmlPositionProp from "../values/Position";
import czmlPositionListProp from "../values/PositionList";
import czmlPositionListOfListsProp from "../values/PositionListOfLists";

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

export function createPositionListProp(options = {}) {
  return new czmlPositionListProp({
    id: "czml_prop_positions_" + nanoid(10),
    name: "positions",
    czmlName: "positions",
    labelZh: "位置列表",
    labelEn: "positions",
    isEnable: true,
    isUsed: true,
    isShowUsed: true,
    $ref: "PositionList.json",
    description: "The array of positions defining the centerline of the corridor.",

    descriptionZh: "",
    ...options,
  });
}

export function createPositionListOfListsProp(options = {}) {
  return new czmlPositionListOfListsProp({
    id: "czml_prop_positions_" + nanoid(10),
    name: "positions",
    czmlName: "positions",
    labelZh: "位置列表",
    labelEn: "positions list",
    isEnable: true,
    isUsed: true,
    isShowUsed: true,
    $ref: "PositionListOfLists.json",
    description: "The array of positions defining the centerline of the corridor.",

    descriptionZh: "",
    ...options,
  });
}

export function createHolesProp(options = {}) {
  return new czmlPositionListOfListsProp({
    id: "czml_prop_holes_" + nanoid(10),
    name: "holes",
    czmlName: "holes",
    labelZh: "洞列表",
    labelEn: "holes list",
    isEnable: true,
    isUsed: true,
    isShowUsed: true,
    $ref: "PositionListOfLists.json",
    description: "The array of arrays of positions defining holes in the polygon.",

    descriptionZh: "",
    ...options,
  });
}
