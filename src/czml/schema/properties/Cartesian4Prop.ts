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
import { isArray, isNumber } from "es-toolkit/compat";

// 用于生成 Cartesian4 数值，纯数值，或者是带时间序的多个值。
export class czmlCartesian4Prop {
  public id = "czml_prop_cartesian4_timetagged_" + nanoid(10);
  public name = "cartesian4";
  public _czmlName = "cartesian4";
  public labelZh = "XYZW坐标(C) ";
  public labelEn = "cartesian4(C)";
  public title = "cartesian4";
  public description =
    "A two-dimensional Cartesian value specified as `[X, Y]`. If the array has two elements, the value is constant. If it has three or more elements, they are time-tagged samples arranged as `[Time, X, Y, Time, X, Y, ...]`, where Time is an ISO 8601 date and time string or seconds since epoch.";
  public descriptionZh = "";

  public type = "property";
  public componentType = "czml#packet#property";
  public czmlValue = true; // 这个用于标示是不是 czml value的

  public tag = "CzmlCartesian4PropInput";

  public unit = "meters";
  public _value = [0, 0, 0, 0];
  public _oldPureValue = [0, 0, 0, 0];
  public _oldSecondsValue = [[0, 0, 0, 0, 0]];
  public _oldTimestringValue = [[dayjs().format(defaultTimeFormatStr), 0, 0, 0, 0]];

  public _valueType = "cartesian4 may time-tagged";

  public default = [0, 0, 0, 0];

  public isEnable = true; // for can edit
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

  constructor(options: any) {
    if (!options) {
      return;
    }

    if (options.id) {
      this.id = options.id;
    } else if (options.name) {
      this.id = "czml_prop_cartesian4_timetagged_" + options.name + "_" + nanoid(10);
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
      let temp = [0, 0, 0, 0];
      if (isArray(options.value) && options.value.length >= 4) {
        temp = [options.value[0], options.value[1], options.value[2], options.value[3]];
      } else if (isNumber(options.value)) {
        temp = [options.value, options.value, options.value, options.value];
      }
      this._value = temp;
      this._oldPureValue = temp;
      this.default = temp;

      this._oldSecondsValue = [[0, temp[0], temp[1], temp[2], temp[3]]];
      this._oldTimestringValue = [[dayjs().format(defaultTimeFormatStr), temp[0], temp[1], temp[2], temp[3]]];
    } else if (options.default) {
      let temp = [0, 0, 0, 0];
      if (isArray(options.default) && options.default.length >= 3) {
        temp = [options.default[0], options.default[1], options.default[2], options.default[3]];
      } else if (isNumber(options.default)) {
        temp = [options.default, options.default, options.default, options.default];
      }
      this._value = temp;
      this._oldPureValue = temp;
      this.default = temp;

      this._oldSecondsValue = [[0, temp[0], temp[1], temp[2], temp[3]]];
      this._oldTimestringValue = [[dayjs().format(defaultTimeFormatStr), temp[0], temp[1], temp[2], temp[3]]];
    }

    this.isFixedXyzUnitType = options.isFixedXyzUnitType ?? true;
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
      if (this._timeType == CZMLPUREVALUE) {
        return this._value.map(Number);
      } else if (this._timeType == CZMLTIMESECONDS) {
        const revals = [];
        for (let i = 0; i < this._value.length; i++) {
          const temp = this._value[i];
          revals.push(+temp[0], +temp[1], +temp[2], +temp[3], +temp[4]);
        }
        return revals;
      } else if (this._timeType == CZMLTIMESTRING) {
        const revals = [];
        for (let i = 0; i < this._value.length; i++) {
          const temp = this._value[i];
          revals.push(dayjs(temp[0]).toISOString(), +temp[1], +temp[2], +temp[3], +temp[4]);
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

export default czmlCartesian4Prop;

export const czmlScaleByDistanceOptions = {
  name: "scaleByDistance",
  czmlName: "scaleByDistance",
  labelZh: "缩放距离",
  labelEn: "scale by distance",
  tag: "CzmlCartesian4NFScalerPropInput",
  isEnable: true,
  isUsed: false,
  isShowUsed: true,
};

export const czmlTranslucencyByDistanceOptions = {
  name: "translucencyByDistance",
  czmlName: "translucencyByDistance",
  labelZh: "透明度距离",
  labelEn: "translucency by distance",
  tag: "CzmlCartesian4NFScalerPropInput",
  isEnable: true,
  isUsed: false,
  isShowUsed: true,
};

export const czmlNearFarOptions = {
  name: "nearFarScalar",
  czmlName: "nearFarScalar",
  labelZh: "近远放大比例",
  labelEn: "near far scalar",
  tag: "CzmlCartesian4NFScalerPropInput",
  isEnable: true,
  isUsed: false,
  isShowUsed: true,
};

export const czmlPixelOffsetScaleByDistanceOptions = {
  name: "pixelOffsetScaleByDistance",
  czmlName: "pixelOffsetScaleByDistance",
  labelZh: "像素偏移缩放距离",
  labelEn: "pixel offset scale by distance",
  tag: "CzmlCartesian4NFScalerPropInput",
  isEnable: true,
  isUsed: false,
  isShowUsed: true,
};

export const czmlImageSubRegionOptions = {
  name: "imageSubRegion",
  czmlName: "imageSubRegion",
  labelZh: "图像子域",
  labelEn: "image sub region",
  tag: "CzmlBoundingRectanglePropInput",
  isEnable: true,
  isUsed: false,
  isShowUsed: true,
};

export const czmlBoundingRectangleOptions = {
  name: "BoundingRectangle",
  czmlName: "BoundingRectangle",
  labelZh: "包围矩形",
  labelEn: "bounding rectangle",
  tag: "CzmlBoundingRectanglePropInput",
  isEnable: true,
  isUsed: false,
  isShowUsed: true,
};
