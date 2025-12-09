import { nanoid } from "@/utils/common/nanoid";
import dayjs from "dayjs";

import {
  CZMLPUREVALUE,
  CZMLTIMESECONDS,
  CZMLTIMESTRING,
  CZMLVALUESNOTINTERPOLATE,
  CZMLVALUESWITHINTERPOLATE,
  CZMLCARTESIAN3METERTYPE,
  CZMLCARTESIAN3DEGREESTYPE,
  CZMLCARTESIAN3RADIANSTYPE,
  propValuesCartesian3TypeOptions,
  propValuesInterpolateOptions,
  defaultTimeFormatStr,
  propValuesTimeTypeOptions,
} from "./commondata.ts";
import czmlInterpolatableProp from "./InterpolatablePropertyProp.ts";

// 用于生成 Cartesian3 数值，纯数值，或者是带时间序的多个值。
export class czmlCartesian3VelocityProp {
  public id = "czml_prop_cartesianvelocity_timetagged_" + nanoid(10);
  public name = "Cartesian Velocity";
  public _czmlName = "cartesianVelocity";
  public labelZh = "dXdYdZ加速度(C) ";
  public labelEn = "cartesian velocity(C)";
  public title = "Cartesian3";
  public description =
    "A three-dimensional Cartesian value and its derivative specified as `[X, Y, Z, dX, dY, dZ]`. If the array has six elements, the value is constant. If it has seven or more elements, they are time-tagged samples arranged as `[Time, X, Y, Z, dX, dY, dZ, Time, X, Y, Z, dX, dY, dZ, ...]`, where Time is an ISO 8601 date and time string or seconds since epoch.";
  public descriptionZh = "";

  public type = "property";
  public componentType = "czml#packet#property";
  public czmlValue = true; // 这个用于标示是不是 czml value的

  public tag = "CzmlCartesian3VelocityPropInput";

  public unit = "meters";
  public _value = [0, 0, 0, 0, 0, 0];
  public _oldPureValue = [0, 0, 0, 0, 0, 0];
  public _oldSecondsValue = [[0, 0, 0, 0, 0, 0, 0]];
  public _oldTimestringValue = [[dayjs().format(defaultTimeFormatStr), 0, 0, 0, 0, 0, 0]];

  public _valueType = "cartesian3 may time-tagged";

  public default = [0, 0, 0, 0, 0, 0];

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

  public secondsStart = 0;
  public secondsStep = 30;
  public secondsOnceAddCount = 1;

  public _xyzUnitType = CZMLCARTESIAN3METERTYPE;
  public xyzUnitTypeOptions = propValuesCartesian3TypeOptions;

  public isFixedXyzUnitType = false;

  constructor(options: any) {
    if (!options) {
      return;
    }

    if (options.id) {
      this.id = options.id;
    } else if (options.name) {
      this.id = "czml_prop_cartesianvelocity_timetagged_" + options.name + "_" + nanoid(10);
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

    if (options.descriptionZh) {
      this.descriptionZh = options.descriptionZh;
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

    if (options.xyzUnitType) {
      this._xyzUnitType = options.xyzUnitType;
    }

    this.isFixedXyzUnitType = options.isFixedXyzUnitType ?? true;
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

  get czmlName() {
    return this._czmlName;
  }

  set czmlName(newValue) {
    return;
    // this._czmlName = newValue;
  }

  get xyzUnitType() {
    return this._xyzUnitType;
  }

  set xyzUnitType(newValue) {
    this._xyzUnitType = newValue;
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
      if (this._timeType == CZMLPUREVALUE) {
        return this._value.map(Number);
      } else if (this._timeType == CZMLTIMESECONDS) {
        const revals = [];
        for (let i = 0; i < this._value.length; i++) {
          const temp = this._value[i];
          revals.push(+temp[0], +temp[1], +temp[2], +temp[3], +temp[4], +temp[5], +temp[6]);
        }
        return revals;
      } else if (this._timeType == CZMLTIMESTRING) {
        const revals = [];
        for (let i = 0; i < this._value.length; i++) {
          const temp = this._value[i];
          revals.push(dayjs(temp[0]).toISOString(), +temp[1], +temp[2], +temp[3], +temp[4], +temp[5], +temp[6]);
        }
        return revals;
      }
    } else {
      return null;
    }
  }

  public getCzmlData() {
    if (this.isUsed) {
      return {
        [this.czmlName]: this.getCzmlValue(),
      };
    } else {
      return null;
    }
  }
}

export default czmlCartesian3VelocityProp;
