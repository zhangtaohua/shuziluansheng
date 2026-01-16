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
import { isArray } from "es-toolkit/compat";

export class czmlDoubleProp {
  public id = "czml_prop_double_" + nanoid(10);
  public name = "double";
  public _czmlName = "double";
  public labelZh = "浮点数";
  public labelEn = "double";
  public title = "Double";
  public description = "A floating-point number.";
  public descriptionZh = "";

  public type = "property";
  public componentType = "czml#packet#property";
  public tag = "CzmlNumberPropInput";

  public _value = [1.0];
  public _valueType = "number";

  public _oldPureValue = [1.0];
  public _oldSecondsValue = [[0, 1.0]];
  public _oldTimestringValue = [[dayjs().format(defaultTimeFormatStr), 1.0]];

  public default = [1.0];

  private _min = 0;
  private _max = 50;
  private _step = 0.1;
  private _retainDecimalPlaces = 3;
  public isRequired = false;
  public isEnable = true;
  // for can edit
  public isUsed = true; // for can used
  public isShowUsed = true;
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
      this.id = "czml_prop_double_" + options.name + "_" + nanoid(10);
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
      if (isArray(options.value)) {
        options.value = [options.value];
      }
      const _valNumber = +options.value[0];
      this._value = [_valNumber];
    }

    if (options.default) {
      if (isArray(options.default)) {
        options.default = [options.default];
      }
      const _valNumber = +options.default[0];
      this.default = [_valNumber];
    }

    this.isRequired = options.isRequired ?? false;
    this.isEnable = options.isEnable ?? true;
    this.isUsed = options.isUsed ?? true;
    this.isShowUsed = options.isShowUsed ?? true;
    this.isExpand = options.isExpand ?? true;

    if (options.max != undefined && options.min != undefined && +options.max > +options.min) {
      this._max = +options.max;
      this._min = +options.min;
    }

    if (options.step) {
      this._step = +options.step;
    }

    if (options.retainDecimalPlaces) {
      this._retainDecimalPlaces = +options.retainDecimalPlaces;
    }
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

  get min() {
    return this._min;
  }

  set min(newMin) {
    if (newMin < this._max) {
      this._min = newMin;
    } else {
      console.error("min must be less than max.");
    }
  }

  get max() {
    return this._max;
  }

  set max(newMax) {
    if (newMax > this._min) {
      this._max = newMax;
    } else {
      console.error("max must be greater than min.");
    }
  }

  get step() {
    return this._step;
  }

  set step(newStep) {
    this._step = newStep;
  }

  get retainDecimalPlaces() {
    return this._retainDecimalPlaces;
  }

  set retainDecimalPlaces(newPlc) {
    this._retainDecimalPlaces = newPlc;
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
      if (this._timeType == CZMLPUREVALUE) {
        return +this._value[0];
      } else if (this._timeType == CZMLTIMESECONDS) {
        const flattenArr = this._value.flat(Infinity);
        return flattenArr.map(Number);
      } else if (this._timeType == CZMLTIMESTRING) {
        const revals = [];
        for (let i = 0; i < this._value.length; i++) {
          const temp = this._value[i];
          revals.push(dayjs(temp[0]).toISOString(), +temp[1]);
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

export default czmlDoubleProp;
