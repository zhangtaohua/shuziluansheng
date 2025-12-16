import { nanoid } from "@/utils/common/nanoid";
import czmlOptionsPureProp from "../values/OptionsPure";
import czmlCombineProp from "../values/CombinePropert";
import { createReferenceProp } from "./referenceProp";

export const CzmlHorizontalOriginOptions = {
  name: "horizontalOrigin",
  czmlName: "horizontalOrigin",
  labelZh: "水平原点",
  labelEn: "horizontal origin",
  isEnable: true,
  isUsed: true,
  isShowUsed: true,

  // real default value is static
  value: "CENTER",
  options: [
    {
      id: "LEFT",
      value: "LEFT",
      label: "左",
      labelZh: "左",
      labelEn: "LEFT",
      note: "LEFT",
      default: false,
      description: "The origin is on the left side of the object.",
    },
    {
      id: "CENTER",
      value: "CENTER",
      label: "居中",
      labelZh: "居中",
      labelEn: "CENTER",
      note: "CENTER",
      default: true,
      description: "The origin is at the horizontal center of the object.",
    },
    {
      id: "RIGHT",
      value: "RIGHT",
      label: "右",
      labelZh: "右",
      labelEn: "RIGHT",
      note: "RIGHT",
      default: false,
      description: "The origin is on the right side of the object.",
    },
  ],
};

export function createHorizontalOriginProp(options = {}) {
  const horizonOpt = {
    ...CzmlHorizontalOriginOptions,
    id: "czml_prop_horizontalOrigin_" + nanoid(10),
    $ref: "Values/HorizontalOriginValue.json",
    description: "The horizontal origin.",
    default: "CENTER",
  };

  return new czmlCombineProp({
    id: "czml_prop_horizontalOrigin_" + nanoid(10),
    name: "horizontalOrigin",
    czmlName: "horizontalOrigin",
    labelZh: "水平原点",
    labelEn: "horizontal origin",
    isEnable: true,
    isUsed: true,
    isShowUsed: true,
    $ref: "HorizontalOrigin.json",
    description:
      "The horizontal origin of the label. It controls whether the label is left-, center-, or right-aligned with the `position`.",
    descriptionZh: "",
    default: "CENTER",
    ...options,
    properties: {
      horizontalOrigin: new czmlOptionsPureProp(horizonOpt),
      reference: createReferenceProp({
        $ref: "Values/ReferenceValue.json",
        description: "The horizontal origin specified as a reference to another property.",
      }),
    },
  });
}
