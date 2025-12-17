import { nanoid } from "@/utils/common/nanoid";
import czmlOptionsPureProp from "../values/OptionsPure";
import czmlCombineProp from "../values/CombinePropert";
import { createReferenceProp } from "./referenceProp";

export const CzmlHeightReferenceOptions = {
  name: "heightReference",
  czmlName: "heightReference",
  labelZh: "高度参考",
  labelEn: "height reference",
  isEnable: true,
  isUsed: false,
  isShowUsed: true,

  // real default value is static
  value: "NONE",
  options: [
    {
      id: "NONE",
      value: "NONE",
      label: "无",
      labelZh: "无",
      labelEn: "NONE",
      note: "NONE",
      default: true,
      description: "The position is absolute.",
    },
    {
      id: "CLAMP_TO_GROUND",
      value: "CLAMP_TO_GROUND",
      label: "接地",
      labelZh: "接地钳",
      labelEn: "CLAMP_TO_GROUND",
      note: "CLAMP_TO_GROUND",
      default: false,
      description: "The position is clamped to the terrain.",
    },
    {
      id: "RELATIVE_TO_GROUND",
      value: "RELATIVE_TO_GROUND",
      label: "相对于地",
      labelZh: "相对于地面",
      labelEn: "RELATIVE_TO_GROUND",
      note: "RELATIVE_TO_GROUND",
      default: false,
      description: "The position height is the height above the terrain.",
    },
  ],
};

export function createHeightReferenceProp(options = {}) {
  const heightOpt = {
    ...CzmlHeightReferenceOptions,
    id: "czml_prop_heightReference_" + nanoid(10),
    $ref: "Values/HeightReferenceValue.json",
    description: "The height reference.",
    default: "NONE",
  };

  return new czmlCombineProp({
    id: "czml_prop_heightReference_" + nanoid(10),
    name: "heightReference",
    czmlName: "heightReference",
    labelZh: "高度参考",
    labelEn: "height reference",
    isEnable: true,
    isUsed: true,
    isShowUsed: true,
    $ref: "HeightReference.json",
    description:
      "The height reference of the billboard, which indicates if the position is relative to terrain or not.",
    descriptionZh: "",
    default: "NONE",
    ...options,
    properties: {
      heightReference: new czmlOptionsPureProp(heightOpt),
      reference: createReferenceProp({
        $ref: "Values/ReferenceValue.json",
        description: "The height reference specified as a reference to another property.",
      }),
    },
  });
}

export function createExtrudedHeightReferenceProp(options = {}) {
  const heightOpt = {
    ...CzmlHeightReferenceOptions,
    id: "czml_prop_heightReference_" + nanoid(10),
    $ref: "Values/HeightReferenceValue.json",
    description: "The height reference.",
    default: "NONE",
  };

  return new czmlCombineProp({
    id: "czml_prop_extrudedHeightReference_" + nanoid(10),
    name: "extrudedHeightReference",
    czmlName: "extrudedHeightReference",
    labelZh: "挤出高度参考",
    labelEn: "extruded height reference",
    isEnable: true,
    isUsed: true,
    isShowUsed: true,
    $ref: "HeightReference.json",
    description:
      "The extruded height reference of the corridor, which indicates if `extrudedHeight` is relative to terrain or not.",
    descriptionZh: "",
    default: "NONE",
    ...options,
    properties: {
      heightReference: new czmlOptionsPureProp(heightOpt),
      reference: createReferenceProp({
        $ref: "Values/ReferenceValue.json",
        description: "The height reference specified as a reference to another property.",
      }),
    },
  });
}
