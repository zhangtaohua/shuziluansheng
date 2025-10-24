import { nanoid } from "@/utils/common/nanoid";
import dayjs from "dayjs";

import {
  CZMLPUREVALUE,
  CZMLTIMESECONDS,
  CZMLTIMESTRING,
  defaultTimeFormatStr,
  propValuesTimeTypeOptions,
} from "./commondata.ts";
export class czmlUnitQuaternionProp {
  public id = "czml_prop_unit_quaternion_" + nanoid(10);
  public name = "unitQuaternion";
  public _czmlName = "unitQuaternion";
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

  public _timeType = CZMLPUREVALUE;
  public timeTypeOptions = propValuesTimeTypeOptions;

  public secondsStart = 0;
  public secondsStep = 30;
  public secondsOnceAddCount = 1;

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

  public getCzmlName() {
    if (this.isUsed) {
      return this.czmlName;
    } else {
      return null;
    }
  }

  public getCzmlValue() {
    if (this.isUsed) {
      let quaternionValue = [];
      if (this.timeType == CZMLPUREVALUE) {
        const value = this._value;
        quaternionValue = [+value[0], +value[1], +value[2], +value[3]];
      } else if (this.timeType == CZMLTIMESECONDS) {
        quaternionValue = [];
        for (let i = 0; i < this.value.length; i++) {
          const vtemp = this.value[i];
          quaternionValue.push(+vtemp[0]);
          quaternionValue.push(+vtemp[1]);
          quaternionValue.push(+vtemp[2]);
          quaternionValue.push(+vtemp[3]);
          quaternionValue.push(+vtemp[4]);
        }
      } else if (this.timeType == CZMLTIMESTRING) {
        quaternionValue = [];
        for (let i = 0; i < this.value.length; i++) {
          const vtemp = this.value[i];
          quaternionValue.push(dayjs(vtemp[0]).toISOString());
          quaternionValue.push(+vtemp[1]);
          quaternionValue.push(+vtemp[2]);
          quaternionValue.push(+vtemp[3]);
          quaternionValue.push(+vtemp[4]);
        }
      }
      return quaternionValue;
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

export default czmlUnitQuaternionProp;
