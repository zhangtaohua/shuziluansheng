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
  public id = "czml_prop_unit_quaternion_" + nanoid(10);
  public name = "unitQuaternion";
  public labelZh = "单位四元数";
  public labelEn = "unit quaternion";
  public title = "Unit Quaternion";
  public description =
    "A set of 4-dimensional coordinates used to represent rotation in 3-dimensional space, specified as `[X, Y, Z, W]`. If the array has four elements, the value is constant. If it has five or more elements, they are time-tagged samples arranged as `[Time, X, Y, Z, W, Time, X, Y, Z, W, ...]`, where Time is an ISO 8601 date and time string or seconds since epoch.";
  public type = "property";
  public componentType = "czml#packet#property";
  public tag = "CzmlQuaternionPropInput";
  public unit = "meters";
  public _value = [0, 0, 0, 0];
  public _valueType = "";
  public _oldPureValue = [0, 0, 0, 0];
  public _oldSecondsValue = [[0, 0, 0, 0, 0]];
  public _oldTimestringValue = [[dayjs().format(defaultTimeFormatStr), 0, 0, 0, 0]];
  public default = [0, 0, 0, 0];
  public isEnable = true; // for can edit
  public isUsed = true; // for can used
  public isExpand = true; // for UI
  public _isEntity = false;
  public isCombinedProperty = false;
  public isComplexProperty = true;

  public _interpolationType = CZMLVALUESNOTINTERPOLATE;
  public interpolationOptions = propValuesInterpolateOptions;
  public interpolationproperties = new czmlInterpolatableProp(null);

  public _timeType = CZMLPUREVALUE;
  public timeTypeOptions = propValuesTimeTypeOptions;

  constructor(options: any) {
    if (!options) {
      return;
    }

    if (options.id) {
      this.id = options.id;
    } else if (options.name) {
      this.id = "czml_prop_unit_quaternion_" + options.name + "_" + nanoid(10);
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
    return;
  }

  get isEntity() {
    return this._isEntity;
  }

  set isEntity(newValue) {
    return;
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

  public getCzmlName() {
    return this.name;
  }

  public getCzmlValue() {
    return this._value;
  }

  public getCzmlData() {
    return {
      [this.name]: this.getCzmlValue(),
    };
  }
}

export default czmlUnitQuaternionProp;
