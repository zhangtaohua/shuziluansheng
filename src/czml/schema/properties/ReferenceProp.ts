import { nanoid } from "@/utils/common/nanoid";
import czmlReferencesProp from "../values/References";

export function createReferenceProp(options = {}) {
  return new czmlReferencesProp({
    id: "czml_prop_reference_" + nanoid(10),
    name: "reference",
    czmlName: "reference",
    labelZh: "参考",
    labelEn: "reference",
    value: "",
    isMultipleSelectMode: false,
    isEnable: true,
    isUsed: false,
    isShowUsed: true,
    $ref: "Values/ReferenceValue.json",
    description: "The background padding specified as a reference to another property.",
    ...options,
  });
}

export function createReferencesProp(options = {}) {
  return new czmlReferencesProp({
    name: "references",
    czmlName: "references",
    labelZh: "参考",
    labelEn: "references",
    value: "",
    isMultipleSelectMode: true,
    isEnable: true,
    isUsed: false,
    isShowUsed: true,
    description:
      "Represents a reference to another property. References can be used to specify that two properties on different objects are in fact, the same property.",
    ...options,
  });
}

export function createVelocityReferenceProp(options = {}) {
  return new czmlReferencesProp({
    name: "velocityReference",
    czmlName: "velocityReference",
    labelZh: "速率参考",
    labelEn: "velocity reference",
    value: "",
    isMultipleSelectMode: false,
    isEnable: true,
    isUsed: false,
    isShowUsed: true,
    $ref: "Values/VelocityReferenceValue.json",
    description:
      "The axis specified as the normalized velocity vector of a position property. The reference must be to a `position` property.",
    ...options,
  });
}
