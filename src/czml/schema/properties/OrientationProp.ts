import { nanoid } from "@/utils/common/nanoid";

import { czmlDoublePureProp, czmlClockMultiplierOptions } from "./DoublePureProp.ts";
import { czmlTimePureProp, czmlClockCurrentTimeOptions } from "./TimePureProp.ts";
import { czmlTimeIntervalProp, czmlClockIntervalOptions } from "./TimeIntervalProp.ts";
import { czmlUnitQuaternionProp } from "./UnitQuaternionProp.ts";
import czmlStringProp from "../properties/StringProp";

export class czmlOrientationProp {
  public id = "czml_prop_orientation_" + nanoid(10);
  public name = "orientation";
  public labelZh = "方向";
  public labelEn = "orientation";
  public description =
    'Defines an orientation. An orientation is a rotation that takes a vector expressed in the "body" axes of the object and transforms it to the Earth fixed axes.';
  public tag = "CzmlOrientationPropInput";
  public isEnable = true;
  public isEntity = false;
  public type = "object";

  // public availability = "";

  public properties = {
    // unitQuaternion: new czmlUnitQuaternionProp({
    //   $ref: "Values/UnitQuaternionValue.json",
    //   name: "unitQuaternion",
    //   description1:
    //     "The orientation specified as a 4-dimensional unit magnitude quaternion, specified as `[X, Y, Z, W]`.",
    // }),
    unitQuaternion: new czmlUnitQuaternionProp(null),
    reference: new czmlStringProp({
      name: "reference",
      labelZh: "参考",
      labelEn: "reference",
      value: "",
      isEnable: true,
      isUsed: true,
      $ref: "Values/ReferenceValue.json",
      description: "The orientation specified as a reference to another property.",
    }),
    velocityReference: new czmlStringProp({
      name: "velocityReference",
      labelZh: "速度参考",
      labelEn: "velocity reference",
      value: "",
      isEnable: true,
      isUsed: true,
      $ref: "Values/VelocityReferenceValue.json",
      description:
        "The orientation specified as the normalized velocity vector of a position property. The reference must be to a `position` property.",
    }),
  };

  constructor(options: any) {
    if (options.name) {
      this.name = options.name;
    }
    if (options.description) {
      this.description = options.description;
    }
    this.isEnable = options.isEnable ?? true;
  }
}

export default czmlOrientationProp;
