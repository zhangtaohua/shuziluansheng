import { nanoid } from "@/utils/common/nanoid";
import dayjs from "dayjs";

import { defaultTimeFormatStr } from "./commondata";

export class czmlTimeIntervalProp {
  public id = "czml_prop_time_interval_" + nanoid(10);
  public name = "interval";
  public labelZh = "时间间隔";
  public labelEn = "interval";
  public description = "The current time, specified in ISO8601 format.";
  public tag = "CzmlTimeIntervalPropInput";
  public _startTime = dayjs().format(defaultTimeFormatStr);
  public _endTime = dayjs().format(defaultTimeFormatStr);
  public _valueType = "";
  public default = "";
  public isEnable = true;
  public isEntity = false;

  // public availability = "";

  constructor(options: any) {
    this.id = options.id ? options.id : "czml_prop_time_interval_" + options.name + "_" + nanoid(10);
    if (options.name) {
      this.name = options.name;
    }
    this.labelZh = options.labelZh ? options.labelZh : options.name;
    this.labelEn = options.labelEn ? options.labelEn : options.name;
    if (options.description) {
      this.description = options.description;
    }

    this.tag = options.tag ? options.tag : "CzmlTimeIntervalPropInput";
    this.isEnable = options.isEnable ?? true;
  }

  get startTime() {
    return this._startTime;
  }

  set startTime(newValue) {
    this._startTime = newValue;
  }

  get endTime() {
    return this._endTime;
  }

  set endTime(newValue) {
    this._endTime = newValue;
  }

  get valueType() {
    return this._valueType;
  }

  set valueType(newValue) {
    this._valueType = newValue;
  }
}

export default czmlTimeIntervalProp;

export const czmlClockIntervalOptions = {
  name: "interval",
  vueName: "interval",
  labelZh: "时间间隔",
  labelEn: "interval",
  tag: "CzmlTimeIntervalPropInput",
  isEnable: true,
};
