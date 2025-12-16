import { nanoid } from "@/utils/common/nanoid";
import czmlOptionsPureProp from "../values/OptionsPure";
import czmlCombineProp from "../values/CombinePropert";
import { createReferenceProp } from "./referenceProp";

export const CzmlLabelStyleOptions = {
  name: "labelStyle",
  czmlName: "labelStyle",
  labelZh: "标签样式",
  labelEn: "label style",
  isEnable: true,
  isUsed: true,
  isShowUsed: true,

  $schema: "http://json-schema.org/draft-07/schema#",
  $id: "https://analyticalgraphicsinc.github.io/czml-writer/Schema/Values/LabelStyleValue.json",
  title: "LabelStyle",
  description: "The style of a label.",
  type: "string",
  czmlValue: true,

  // real default value is static
  value: "FILL",
  options: [
    {
      id: "FILL",
      value: "FILL",
      label: "填充",
      labelZh: "填充",
      labelEn: "FILL",
      note: "FILL",
      default: true,
      description: "The text of the label is filled, but not outlined.",
    },
    {
      id: "OUTLINE",
      value: "OUTLINE",
      label: "轮廓线",
      labelZh: "轮廓线",
      labelEn: "OUTLINE",
      note: "OUTLINE",
      default: false,
      description: "The text of the label is outlined, but not filled.",
    },
    {
      id: "FILL_AND_OUTLINE",
      value: "FILL_AND_OUTLINE",
      label: "填充+轮廓线",
      labelZh: "填充+轮廓线",
      labelEn: "FILL_AND_OUTLINE",
      note: "FILL_AND_OUTLINE",
      default: false,
      description: "The text of the label is both filled and outlined.",
    },
  ],
};

export function createLabelStyleProp(options = {}) {
  const labelStyleOpt = {
    ...CzmlLabelStyleOptions,
    id: "czml_prop_labelStyle_" + nanoid(10),
  };
  return new czmlCombineProp({
    id: "czml_prop_style_" + nanoid(10),
    name: "style",
    czmlName: "style",
    labelZh: "样式",
    labelEn: "style",
    isEnable: true,
    isUsed: true,
    isShowUsed: true,
    $ref: "LabelStyle.json",
    description: "The style of the label.",
    descriptionZh: "",
    default: "FILL",
    ...options,
    properties: {
      labelStyle: new czmlOptionsPureProp(labelStyleOpt),
      reference: createReferenceProp({
        $ref: "Values/ReferenceValue.json",
        description: "The label style specified as a reference to another property.",
      }),
    },
  });
}
