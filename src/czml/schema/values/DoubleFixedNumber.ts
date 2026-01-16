import { nanoid } from "@/utils/common/nanoid";
import { isArray } from "es-toolkit/compat";
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

export class czmlDoubleFixedNumberProp {
  public id = "czml_prop_double_fixed_number" + nanoid(10);
  public name = "double";
  public _czmlName = "double";
  public labelZh = "固定浮点数";
  public labelEn = "double fixed";
  public title = "Double";
  public description = "A floating-point number.";
  public descriptionZh = "";

  public type = "property";
  public componentType = "czml#packet#property";
  public tag = "CzmlNumberFixedCntPropInput";
  public _value = [[1.0]];

  public _oldPureValue = [[1.0]];
  public _oldSecondsValue = [[0, 1.0]];
  public _oldTimestringValue = [[dayjs().format(defaultTimeFormatStr), 1.0]];

  public _valueType = "number";
  public default = [[1.0]];

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
  public fixedCounter = 1;

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
      this.id = "czml_prop_double_fixed_number" + options.name + "_" + nanoid(10);
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

    if (options.fixedCounter) {
      this.fixedCounter = options.fixedCounter;
      const values = [];
      const secondsValues = [];
      const timestrValues = [];
      const initValue = options.fixedInitValue ?? 0.0;
      for (let i = 0; i < this.fixedCounter; i++) {
        values.push([initValue]);
        secondsValues.push([i * this.secondsStep, initValue]);
        timestrValues.push([dayjs().format(defaultTimeFormatStr), initValue]);
      }

      this._value = values;
      this._oldPureValue = values;
      this._oldSecondsValue = secondsValues;
      this._oldTimestringValue = timestrValues;
    }

    // RJTODO
    // 这时的逻辑太简单了，因为人时间系列的，不能这么简单粗暴的处理
    // 故暂不提供用values 来初始化
    // if (options.value) {
    //   if (isArray(options.value)) {
    //     this._value = options.value;
    //     this.fixedCounter = options.value.length;
    //   } else {
    //     this._value = [[options.value]];
    //     this.fixedCounter = 1;
    //   }
    // }

    if (options.default) {
      this.default = options.default;
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
        const flattenArr = this._value.flat(Infinity);
        if (flattenArr.length == 1) {
          return +flattenArr[0];
        } else {
          return flattenArr.map(Number);
        }
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
        [this.czmlName]: this._value,
      };
    } else {
      return null;
    }
  }
}

export default czmlDoubleFixedNumberProp;
