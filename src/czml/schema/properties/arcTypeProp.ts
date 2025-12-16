import { nanoid } from "@/utils/common/nanoid";
import czmlOptionsPureProp from "../values/OptionsPure";
import czmlCombineProp from "../values/CombinePropert";
import { createReferenceProp } from "./referenceProp";

export const CzmlArcTypeOptions = {
  name: "arcType",
  czmlName: "arcType",
  labelZh: "弧类型值",
  labelEn: "arc type value",
  isEnable: true,
  isUsed: true,
  isShowUsed: true,
  description: "",
  descriptionZh: "",

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
      description: "The arc is a straight line that does not conform to the surface of an ellipsoid.",
    },
    {
      id: "GEODESIC",
      value: "GEODESIC",
      label: "测地线",
      labelZh: "测地线",
      labelEn: "GEODESIC",
      note: "GEODESIC",
      default: false,
      description: "The arc is a geodesic, which is the shortest path conforming to the surface of an ellipsoid.",
    },
    {
      id: "RHUMB",
      value: "RHUMB",
      label: "测地线",
      labelZh: "测地线",
      labelEn: "RHUMB",
      note: "RHUMB",
      default: false,
      description:
        "The arc is a rhumb line, or loxodrome, which is the path of constant heading conforming to the surface of an ellipsoid.",
    },
  ],
};

export function createArcTypeProp(options = {}) {
  const arctypeOpt = {
    ...CzmlArcTypeOptions,
    id: "czml_prop_arcType_" + nanoid(10),
  };
  return new czmlCombineProp({
    id: "czml_prop_arcType_" + nanoid(10),
    name: "arcType",
    czmlName: "arcType",
    labelZh: "弧类型",
    labelEn: "arc type",
    isEnable: true,
    isUsed: true,
    isShowUsed: true,
    $ref: "ArcType.json",
    description: "The type of arc that should connect the positions of the polyline.",
    descriptionZh: "",
    default: "GEODESIC",
    ...options,
    properties: {
      arcType: new czmlOptionsPureProp(arctypeOpt),
      reference: createReferenceProp({
        $ref: "Values/ReferenceValue.json",
        description: "The arc type specified as a reference to another property.",
      }),
    },
  });
}
