import { nanoid } from "@/utils/common/nanoid";
import dayjs from "dayjs";

import { defaultTimeFormatStr } from "./commondata";

export class czmlTimePureProp {
  public id = "czml_prop_time_pure_" + nanoid(10);
  public name = "currentTime";
  public labelZh = "当前时间";
  public labelEn = "currentTime";
  public description = "The current time, specified in ISO8601 format.";
  public tag = "CzmlTimePurePropInput";
  public _value = dayjs().format(defaultTimeFormatStr);
  public _valueType = "";
  public default = "";
  public isEnable = true;
  public isEntity = false;

  // public availability = "";

  constructor(options: any) {
    this.id = options.id ? options.id : "czml_prop_time_pure_" + options.name + "_" + nanoid(10);
    if (options.name) {
      this.name = options.name;
    }
    this.labelZh = options.labelZh ? options.labelZh : options.name;
    this.labelEn = options.labelEn ? options.labelEn : options.name;
    if (options.description) {
      this.description = options.description;
    }

    this.tag = options.tag ? options.tag : "CzmlTimePurePropInput";

    if (options.value) {
      this._value = options.value;
    }

    this.isEnable = options.isEnable ?? true;
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
}

export default czmlTimePureProp;

export const czmlClockCurrentTimeOptions = {
  name: "currentTime",
  vueName: "currentTime",
  labelZh: "当前时间",
  labelEn: "currentTime",
  tag: "CzmlTimePurePropInput",
  isEnable: true,
};

export const czmlEpochimeOptions = {
  name: "epoch",
  vueName: "epoch",
  labelZh: "时期",
  labelEn: "epoch",
  tag: "CzmlTimePurePropInput",
  isEnable: true,
  description: "The epoch to use for times specified as seconds since an epoch.",
  type: "string",
  format: "date-time",
};
