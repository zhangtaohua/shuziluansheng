import { nanoid } from "@/utils/common/nanoid";
import dayjs from "dayjs";
import chroma from "chroma-js";

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
  CZMLCOLORRGBATYPE,
  CZMLCOLORRGBAFTYPE,
} from "./commondata.ts";

// 用于生成 color 像素 数值，纯数值，或者是带时间序的多个值。
export class czmlColorProp {
  public id = "czml_prop_rgba_timetagged_" + nanoid(10);
  public name = "rgba";
  public _czmlName = "rgba";
  public labelZh = "颜色";
  public labelEn = "rgba";
  public title = "rgba";
  public description =
    "The color specified as an array of color components `[Red, Green, Blue, Alpha]` where each component is an integer in the range 0-255.";
  public descriptionZh = "";

  public type = "property";
  public componentType = "czml#packet#property";
  public czmlValue = true; // 这个用于标示是不是 czml value的

  public tag = "CzmlColorPropInput";

  public unit = "";
  public _value = [null];
  public _oldPureValue = [null];
  public _oldSecondsValue = [[0, null]];
  public _oldTimestringValue = [[dayjs().format(defaultTimeFormatStr), null]];

  public _valueType = "cartesian3 pixel may time-tagged";

  public default = [null];

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

  public isFixedXyzUnitType = false;

  public colorType = CZMLCOLORRGBATYPE;

  constructor(options: any) {
    if (!options) {
      return;
    }

    if (options.id) {
      this.id = options.id;
    } else if (options.name) {
      this.id = "czml_prop_color_timetagged_" + options.name + "_" + nanoid(10);
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
      if (chroma.valid(options.value)) {
        const color = `rgba(${chroma(options.value).rgba().join(",")})`;
        this._value = [color];
        this._oldPureValue = [color];
        this._oldSecondsValue = [[0, color]];
        this._oldTimestringValue = [[dayjs().format(defaultTimeFormatStr), color]];
        this.default = [color];
      }
    } else if (options.default) {
      if (chroma.valid(options.default)) {
        const color = `rgba(${chroma(options.default).rgba().join(",")})`;
        this._value = [color];
        this._oldPureValue = [color];
        this._oldSecondsValue = [[0, color]];
        this._oldTimestringValue = [[dayjs().format(defaultTimeFormatStr), color]];
        this.default = [color];
      }
    }

    if (options.colorType) {
      this.colorType = options.colorType;
    }

    this.isFixedXyzUnitType = options.isFixedXyzUnitType ?? true;
    this.isRequired = options.isRequired ?? false;
    this.isEnable = options.isEnable ?? true;
    this.isUsed = options.isUsed ?? true;
    this.isShowUsed = options.isShowUsed ?? true;
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
      if (this.colorType == CZMLCOLORRGBATYPE) {
        if (this._timeType == CZMLPUREVALUE) {
          if (this._value[0]) {
            const colors = chroma(this._value[0]).rgba();
            colors[3] = Math.floor(colors[3] * 255);
            return colors;
          }
        } else if (this._timeType == CZMLTIMESECONDS) {
          const revals = [];
          for (let i = 0; i < this._value.length; i++) {
            const temp = this._value[i];
            if (temp[1]) {
              const colors = chroma(temp[1]).rgba();
              colors[3] = Math.floor(colors[3] * 255);
              revals.push(+temp[0], colors[0], colors[1], colors[2], colors[3]);
            }
          }
          return revals;
        } else if (this._timeType == CZMLTIMESTRING) {
          const revals = [];
          for (let i = 0; i < this._value.length; i++) {
            const temp = this._value[i];
            if (temp[1]) {
              const colors = chroma(temp[1]).rgba();
              colors[3] = Math.floor(colors[3] * 255);
              revals.push(dayjs(temp[0]).toISOString(), colors[0], colors[1], colors[2], colors[3]);
            }
          }
          return revals;
        }
      } else if (this.colorType == CZMLCOLORRGBAFTYPE) {
        if (this._timeType == CZMLPUREVALUE) {
          if (this._value[0]) {
            const colors = chroma(this._value[0]).rgba();
            colors[0] = colors[0] / 255.0;
            colors[1] = colors[1] / 255.0;
            colors[2] = colors[2] / 255.0;
            return colors;
          }
        } else if (this._timeType == CZMLTIMESECONDS) {
          const revals = [];
          for (let i = 0; i < this._value.length; i++) {
            const temp = this._value[i];
            if (temp[1]) {
              const colors = chroma(temp[1]).rgba();
              colors[0] = colors[0] / 255.0;
              colors[1] = colors[1] / 255.0;
              colors[2] = colors[2] / 255.0;
              revals.push(+temp[0], colors[0], colors[1], colors[2], colors[3]);
            }
          }
          return revals;
        } else if (this._timeType == CZMLTIMESTRING) {
          const revals = [];
          for (let i = 0; i < this._value.length; i++) {
            const temp = this._value[i];
            if (temp[1]) {
              const colors = chroma(temp[1]).rgba();
              colors[0] = colors[0] / 255.0;
              colors[1] = colors[1] / 255.0;
              colors[2] = colors[2] / 255.0;
              revals.push(dayjs(temp[0]).toISOString(), colors[0], colors[1], colors[2], colors[3]);
            }
          }
          return revals;
        }
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

export default czmlColorProp;
