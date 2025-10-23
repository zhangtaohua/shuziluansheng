import { nanoid } from "@/utils/common/nanoid";
import dayjs from "dayjs";

import { defaultTimeFormatStr } from "./commondata";

export class czmlTimeIntervalProp {
  public id = "czml_prop_time_interval_" + nanoid(10);
  public name = "interval";
  public _czmlName = "interval";
  public labelZh = "时间间隔";
  public labelEn = "interval";
  public title = "Time Interval";
  public description = "The current time, specified in ISO8601 format.";
  public type = "property";
  public componentType = "czml#packet#property";
  public tag = "CzmlTimeIntervalPropInput";
  public _startTime = dayjs().format(defaultTimeFormatStr);
  public _endTime = dayjs().format(defaultTimeFormatStr);
  public _valueType = "";
  public default = "";
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
      this.id = "czml_prop_time_interval_" + options.name + "_" + nanoid(10);
    }

    if (options.name) {
      this.name = options.name;
    }

    if (options.czmlName) {
      this._czmlName = options.czmlName;
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

    if (options.default) {
      this.default = options.default;
    }

    this.isEnable = options.isEnable ?? true;
    this.isUsed = options.isUsed ?? true;
    this.isExpand = options.isExpand ?? true;
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

  get isEntity() {
    return this._isEntity;
  }

  set isEntity(newValue) {
    return;
  }

  get czmlName() {
    return this._czmlName;
  }

  set czmlName(newValue) {
    return;
    // this._czmlName = newValue;
  }

  public getCzmlName() {
    if (this.isUsed) {
      return this.czmlName;
    } else {
      return null;
    }
  }

  public getCzmlValue() {
    if (this.isUsed) {
      const startTimeStr = dayjs(this.startTime).toISOString();
      const endTimeStr = dayjs(this.endTime).toISOString();
      return `${startTimeStr}/${endTimeStr}`;
    } else {
      return null;
    }
  }

  public getCzmlData() {
    if (this.isUsed) {
      return {
        [this.name]: this.getCzmlValue(),
      };
    } else {
      return null;
    }
  }
}

export default czmlTimeIntervalProp;

export const czmlClockIntervalOptions = {
  name: "interval",
  czmlName: "interval",
  labelZh: "时间间隔",
  labelEn: "interval",
  isEnable: true,
};
