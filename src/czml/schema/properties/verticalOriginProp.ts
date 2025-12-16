import { nanoid } from "@/utils/common/nanoid";
import czmlOptionsPureProp from "../values/OptionsPure";
import czmlCombineProp from "../values/CombinePropert";
import { createReferenceProp } from "./referenceProp";

export const CzmlVerticalOriginOptions = {
  name: "verticalOrigin",
  czmlName: "verticalOrigin",
  labelZh: "垂直原点",
  labelEn: "vertical origin",
  isEnable: true,
  isUsed: true,
  isShowUsed: true,

  // real default value is static
  value: "CENTER",
  options: [
    {
      id: "BASELINE",
      value: "BASELINE",
      label: "基线",
      labelZh: "基线",
      labelEn: "BASELINE",
      note: "BASELINE",
      default: false,
      description:
        "If the object contains text, the origin is at the baseline of the text, otherwise the origin is at the bottom of the object.",
    },
    {
      id: "BOTTOM",
      value: "BOTTOM",
      label: "底",
      labelZh: "底",
      labelEn: "BOTTOM",
      note: "BOTTOM",
      default: false,
      description: "The origin is at the bottom of the object.",
    },
    {
      id: "CENTER",
      value: "CENTER",
      label: "居中",
      labelZh: "居中",
      labelEn: "CENTER",
      note: "CENTER",
      default: true,
      description: "The origin is at the vertical center between `BASELINE` and `TOP`.",
    },
    {
      id: "TOP",
      value: "TOP",
      label: "右",
      labelZh: "右",
      labelEn: "TOP",
      note: "TOP",
      default: false,
      description: "The origin is at the top of the object.",
    },
  ],
};

export function createVerticalOriginProp(options = {}) {
  const verticalOpt = {
    ...CzmlVerticalOriginOptions,
    id: "czml_prop_verticalOrigin_" + nanoid(10),
    $ref: "Values/VerticalOriginValue.json",
    description: "The vertical origin.",
    default: "CENTER",
  };

  return new czmlCombineProp({
    id: "czml_prop_verticalOrigin_" + nanoid(10),
    name: "verticalOrigin",
    czmlName: "verticalOrigin",
    labelZh: "垂直原点",
    labelEn: "vertical origin",
    isEnable: true,
    isUsed: true,
    isShowUsed: true,
    $ref: "VerticalOrigin.json",
    description:
      "The vertical origin of the billboard, which determines whether the billboard image is bottom-, center-, or top-aligned with the `position`.",
    descriptionZh: "",
    default: "CENTER",
    ...options,
    properties: {
      verticalOrigin: new czmlOptionsPureProp(verticalOpt),
      reference: createReferenceProp({
        $ref: "Values/ReferenceValue.json",
        description: "The vertical origin specified as a reference to another property.",
      }),
    },
  });
}
