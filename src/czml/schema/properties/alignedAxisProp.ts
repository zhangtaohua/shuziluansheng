import { nanoid } from "@/utils/common/nanoid";
import czmlCombineProp from "../values/CombinePropert";
import { createUnitSphericalProp } from "./cartesian2Prop";
import { createUnitCartesianProp } from "./cartesian3Prop";
import { createReferenceProp, createVelocityReferenceProp } from "./referenceProp";

export function createAlignedAxisProp(options = {}) {
  return new czmlCombineProp({
    id: "czml_prop_alignedAxis_" + nanoid(10),
    name: "alignedAxis",
    czmlName: "alignedAxis",
    labelZh: "对齐轴",
    labelEn: "aligned axis",
    isEnable: true,
    isUsed: true,
    isShowUsed: true,
    $ref: "AlignedAxis.json",
    description:
      "The aligned axis is the unit vector, in world coordinates, that the billboard up vector points towards. The default is the zero vector, which means the billboard is aligned to the screen up vector.",
    descriptionZh: "",
    default: [0.0, 0.0, 0.0],
    ...options,
    properties: {
      unitCartesian: createUnitCartesianProp({
        $ref: "Values/UnitCartesian3Value.json",
        description:
          "The axis specified as a three-dimensional unit magnitude Cartesian value `[X, Y, Z]`, in world coordinates.",
      }),
      unitSpherical: createUnitSphericalProp({
        $ref: "Values/UnitSphericalValue.json",
        description:
          "The axis specified as a unit spherical value `[Clock, Cone]`, in radians. The clock angle is measured in the XY plane from the positive X axis toward the positive Y axis. The cone angle is the angle from the positive Z axis toward the negative Z axis.",
      }),
      reference: createReferenceProp({
        $ref: "Values/ReferenceValue.json",
        description: "The pixel offset specified as a reference to another property.",
      }),
      velocityReference: createVelocityReferenceProp({
        $ref: "Values/VelocityReferenceValue.json",
        description:
          "The axis specified as the normalized velocity vector of a position property. The reference must be to a `position` property.",
      }),
    },
  });
}
