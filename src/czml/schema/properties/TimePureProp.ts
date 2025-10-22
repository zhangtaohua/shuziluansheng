import { nanoid } from "@/utils/common/nanoid";
import dayjs from "dayjs";

import { defaultTimeFormatStr } from "./commondata";

export class czmlTimePureProp {
  public id = "czml_prop_time_pure_" + nanoid(10);
  public name = "currentTime";
  public labelZh = "当前时间";
  public labelEn = "current time";
  public title = "Current Time";
  public description = "The current time, specified in ISO8601 format.";
  public type = "property";
  public componentType = "czml#packet#property";
  public tag = "CzmlTimePurePropInput";
  public _value = dayjs().format(defaultTimeFormatStr);
  public _valueType = "";
  public default = dayjs().format(defaultTimeFormatStr);
  public isEnable = true; // for can edit
  public isUsed = true; // for can used
  public isExpand = true; // for UI
  public _isEntity = false;
  public isCombinedProperty = false;
  public isComplexProperty = false;

  constructor(options: any) {
    if (!options) {
      return;
    }

    if (options.id) {
      this.id = options.id;
    } else if (options.name) {
      this.id = "czml_prop_time_pure_" + options.name + "_" + nanoid(10);
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

    if (options.value) {
      this._value = options.value;
    }

    if (options.default) {
      this.default = options.default;
    }

    this.isEnable = options.isEnable ?? true;
    this.isUsed = options.isUsed ?? true;
    this.isExpand = options.isExpand ?? true;
  }

  get value() {
    return this._value;
  }

  set value(newValue) {
    this._value = newValue;
  }

  get valueType() {
    return this._valueType;
  }

  set valueType(newValue) {
    this._valueType = newValue;
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
    return dayjs(this.value).toISOString();
  }

  public getCzmlData() {
    return {
      [this.name]: this.getCzmlValue(),
    };
  }
}

export default czmlTimePureProp;

export const czmlClockCurrentTimeOptions = {
  name: "currentTime",
  labelZh: "当前时间",
  labelEn: "current time",
  isEnable: true,
};

export const czmlEpochimeOptions = {
  name: "epoch",
  labelZh: "时期",
  labelEn: "epoch",
  isEnable: true,
  description: "The epoch to use for times specified as seconds since an epoch.",
  type: "string",
  format: "date-time",
};
