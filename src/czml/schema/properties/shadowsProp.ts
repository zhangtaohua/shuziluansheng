import { nanoid } from "@/utils/common/nanoid";
import czmlOptionsPureProp from "../values/OptionsPure";
import czmlCombineProp from "../values/CombinePropert";
import { createReferenceProp } from "./referenceProp";

export const CzmlShadowModeOptions = {
  name: "shadowMode",
  czmlName: "shadowMode",
  labelZh: "阴影类型",
  labelEn: "shadow mode",
  isEnable: true,
  isUsed: false,
  isShowUsed: true,

  $schema: "http://json-schema.org/draft-07/schema#",
  $id: "https://analyticalgraphicsinc.github.io/czml-writer/Schema/Values/ShadowModeValue.json",
  title: "ShadowMode",
  description: "Whether or not an object casts or receives shadows from each light source when shadows are enabled.",
  type: "string",
  czmlValue: true,
  // real default value is static
  value: "DISABLED",
  options: [
    {
      id: "DISABLED",
      value: "DISABLED",
      label: "禁用",
      labelZh: "禁用",
      labelEn: "DISABLED",
      note: "DISABLED",
      default: true,
      description: "The object does not cast or receive shadows.",
    },
    {
      id: "ENABLED",
      value: "ENABLED",
      label: "启用",
      labelZh: "启用",
      labelEn: "ENABLED",
      note: "ENABLED",
      default: false,
      description: "The object casts and receives shadows.",
    },
    {
      id: "CAST_ONLY",
      value: "CAST_ONLY",
      label: "生成阴影",
      labelZh: "生成阴影",
      labelEn: "CAST_ONLY",
      note: "CAST_ONLY",
      default: false,
      description: "The object casts shadows only.",
    },
    {
      id: "RECEIVE_ONLY",
      value: "RECEIVE_ONLY",
      label: "接收阴影",
      labelZh: "接收阴影",
      labelEn: "RECEIVE_ONLY",
      note: "RECEIVE_ONLY",
      default: false,
      description: "The object receives shadows only.",
    },
  ],
};

export function createShadowsProp(options = {}) {
  const shadowsOpt = {
    ...CzmlShadowModeOptions,
    id: "czml_prop_shadowMode_" + nanoid(10),
    $ref: "Values/ShadowModeValue.json",
    description: "The shadow mode.",
  };
  return new czmlCombineProp({
    id: "czml_prop_shadowMode_" + nanoid(10),
    name: "shadows",
    czmlName: "shadows",
    labelZh: "阴影",
    labelEn: "shadow mode",
    isEnable: true,
    isUsed: false,
    isShowUsed: true,
    $ref: "ShadowMode.json",
    description: "Whether or not the box casts or receives shadows.",
    descriptionZh: "",
    default: "DISABLED",
    ...options,
    properties: {
      shadowMode: new czmlOptionsPureProp(shadowsOpt),
      reference: createReferenceProp({
        $ref: "Values/ReferenceValue.json",
        description: "The shadow mode specified as a reference to another property.",
      }),
    },
  });
}
