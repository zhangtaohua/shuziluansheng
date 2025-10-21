import { nanoid } from "@/utils/common/nanoid";
import dayjs from "dayjs";

import {
  CZMLPUREVALUE,
  CZMLTIMESECONDS,
  CZMLTIMESTRING,
  CZMLVALUESNOTINTERPOLATE,
  CZMLVALUESWITHINTERPOLATE,
  propValuesInterpolateOptions,
  defaultTimeFormatStr,
  propValuesTimeTypeOptions,
} from "./commondata.ts";
import czmlInterpolatableProp from "./InterpolatablePropertyProp.ts";

export class czmlUnitQuaternionProp {
  public id = "czml_unit_quaternion_prop_" + nanoid(10);
  public name = "unitQuaternion";
  public vueName = "unitQuaternion";
  public labelZh = "单位四元数";
  public labelEn = "unit quaternion";
  public description =
    "A set of 4-dimensional coordinates used to represent rotation in 3-dimensional space, specified as `[X, Y, Z, W]`. If the array has four elements, the value is constant. If it has five or more elements, they are time-tagged samples arranged as `[Time, X, Y, Z, W, Time, X, Y, Z, W, ...]`, where Time is an ISO 8601 date and time string or seconds since epoch.";
  public tag = "CzmlQuaternionPropInput";
  public _value = [0, 0, 0, 0];
  public _oldPureValue = [0, 0, 0, 0];
  public _oldSecondsValue = [[0, 0, 0, 0, 0]];
  public _oldTimestringValue = [[dayjs().format(defaultTimeFormatStr), 0, 0, 0, 0]];
  public default = [0, 0, 0, 0];
  public unit = "meters";
  public isEnable = true;
  public isEntity = false;

  public _interpolationType = CZMLVALUESNOTINTERPOLATE;
  public interpolationOptions = propValuesInterpolateOptions;
  public interpolationproperties = new czmlInterpolatableProp(null);

  public _timeType = CZMLPUREVALUE;
  public timeTypeOptions = propValuesTimeTypeOptions;

  constructor(options: any) {
    if (!options) {
      return;
    }
    this.id = options.id ? options.id : "czml_unit_quaternion_prop_" + options.name + "_" + nanoid(10);
    this.name = options.name;
    this.vueName = options.vueName ? options.vueName : options.name;
    this.labelZh = options.labelZh ? options.labelZh : options.name;
    this.labelEn = options.labelEn ? options.labelEn : options.name;

    if (options.description) {
      this.description = options.description;
    }

    if (options.tag) {
      this.tag = options.tag;
    }

    if (options.default) {
      this.default = options.default;
    }

    this._value = options.value;
    this.isEnable = options.isEnable ?? true;
  }

  get value() {
    return this._value;
  }

  set value(newValue) {
    this._value = newValue;
  }

  get timeType() {
    return this._timeType;
  }

  // TODO
  // 优化点,是不是选择了插值算法就要限制不可以选择纯数据类型了.
  set timeType(newValue) {
    if (newValue != this._timeType) {
      let __oldvalue = [];
      if (newValue == CZMLPUREVALUE) {
        __oldvalue = this._oldPureValue;
      } else if (newValue == CZMLTIMESECONDS) {
        __oldvalue = this._oldSecondsValue;
      } else if (newValue == CZMLTIMESTRING) {
        __oldvalue = this._oldTimestringValue;
      }

      if (this._timeType == CZMLPUREVALUE) {
        this._oldPureValue = this._value;
      } else if (this._timeType == CZMLTIMESECONDS) {
        this._oldSecondsValue = this._value;
      } else if (this._timeType == CZMLTIMESTRING) {
        this._oldTimestringValue = this._value;
      }

      this._value = __oldvalue;

      setTimeout(() => {
        this._timeType = newValue;
      }, 50);
    }
  }

  get interpolationType() {
    return this._interpolationType;
  }

  set interpolationType(newValue) {
    if (newValue != this._interpolationType) {
      const __oldvalue = [];
      if (newValue == CZMLVALUESNOTINTERPOLATE) {
      } else if (newValue == CZMLVALUESWITHINTERPOLATE) {
        if (this.timeType == CZMLPUREVALUE) {
          this.timeType = CZMLTIMESECONDS;
        }
      }

      setTimeout(() => {
        this._interpolationType = newValue;
      }, 50);
    }
  }
}

export default czmlUnitQuaternionProp;
