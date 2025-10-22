import { nanoid } from "@/utils/common/nanoid";
import dayjs from "dayjs";

import { czmlOptionsPureProp, CzmlReferenceFrameOptions } from "./OptionsPureProp";
import { czmlStringProp, czmlReferenceValueOptions } from "./StringProp";

export class czmlPositionProp {
  public id = "czml_prop_position_" + nanoid(10);
  public name = "position";
  public labelZh = "位置";
  public labelEn = "position";
  public title = "Position";
  public description = "Defines a position. The position can optionally vary over time.";
  public type = "property";
  public componentType = "czml#packet#property";
  public tag = "CzmlPositionPropInput";
  public isEnable = true; // for can edit
  public isUsed = true; // for can used
  public isExpand = true; // for UI
  public _isEntity = false;
  public isCombinedProperty = true;
  public isComplexProperty = false;
  // public availability = "";

  public properties = {
    referenceFrame: new czmlOptionsPureProp(CzmlReferenceFrameOptions),
    // cartesian: new ,
    // cartographicRadians: new ,
    // cartographicDegrees: new ,
    // todo 这里是错的 暂时为了调试用
    references: new czmlStringProp(czmlReferenceValueOptions),
  };

  constructor(options: any) {
    if (!options) {
      return;
    }

    if (options.id) {
      this.id = options.id;
    } else if (options.name) {
      this.id = "czml_prop_position_" + options.name + "_" + nanoid(10);
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

export default czmlPositionProp;
