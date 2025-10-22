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
  public title = "Orientation";
  public description =
    'Defines an orientation. An orientation is a rotation that takes a vector expressed in the "body" axes of the object and transforms it to the Earth fixed axes.';
  public type = "property";
  public componentType = "czml#packet#property";
  public tag = "CzmlCombinePropInput";
  public isEnable = true; // for can edit
  public isUsed = true; // for can used
  public isExpand = true; // for UI
  public _isEntity = false;
  public isCombinedProperty = true;
  public isComplexProperty = false;

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
    if (!options) {
      return;
    }

    if (options.id) {
      this.id = options.id;
    } else if (options.name) {
      this.id = "czml_prop_orientation_" + options.name + "_" + nanoid(10);
    }

    if (options.name) {
      this.name = options.name;
    }

    if (options.labelZh) {
      this.labelZh = options.labelZh;
    }

    if (options.labelEn) {
      this.labelEn = options.labelEn;
    }

    if (options.title) {
      this.title = options.title;
    }

    if (options.description) {
      this.description = options.description;
    }

    if (options.tag) {
      this.tag = options.tag;
    }

    this.isEnable = options.isEnable ?? true;
    this.isUsed = options.isUsed ?? true;
    this.isExpand = options.isExpand ?? true;
  }

  get isEntity() {
    return this._isEntity;
  }

  set isEntity(newValue) {
    return;
  }

  public getCzmlName() {
    return this.name;
  }

  public getCzmlValue() {
    const czmlData = {};
    const keys = Object.keys(this.properties);

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const prop = this.properties[key];
      if (prop.getCzmlName) {
        const propKey = prop.getCzmlName();
        const propValue = prop.getCzmlValue();
        czmlData[propKey] = propValue;
      }
    }

    return czmlData;
  }

  public getCzmlData() {
    return {
      [this.name]: this.getCzmlValue(),
    };
  }
}

export default czmlOrientationProp;
