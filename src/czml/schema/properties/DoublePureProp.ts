import { nanoid } from "@/utils/common/nanoid";

export class czmlDoublePureProp {
  public id = "czml_prop_double_pure_" + nanoid(10);
  public name = "double";
  public labelZh = "浮点数";
  public labelEn = "double";
  public description = "A floating-point number.";
  public tag = "CzmlNumberSliderPropInput";
  public _value = 1.0;
  public _valueType = "number";
  public default = 1.0;
  private _min = 0;
  private _max = 50;
  private _step = 0.1;
  public isEnable = true;
  public isEntity = false;

  // public availability = "";

  constructor(options: any) {
    this.id = options.id ? options.id : "czml_prop_double_pure_" + options.name + "_" + nanoid(10);
    this.name = options.name;
    this.labelZh = options.labelZh ? options.labelZh : options.name;
    this.labelEn = options.labelEn ? options.labelEn : options.name;
    if (options.description) {
      this.description = options.description;
    }

    this.tag = options.tag ? options.tag : "CzmlNumberSliderPropInput";

    if (options.value) {
      this._value = options.value;
    }
    this.default = options.default ? options.default : "";
    this.isEnable = options.isEnable ?? true;

    if (options.max != undefined && options.min != undefined && options.max > options.min) {
      this._max = options.max;
      this._min = options.min;
    }

    if (options.step) {
      this._step = +options.step;
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
    this._valueType = newValue;
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
}

export default czmlDoublePureProp;

export const czmlClockMultiplierOptions = {
  name: "multiplier",
  vueName: "multiplier",
  labelZh: "乘数",
  labelEn: "multiplier",
  tag: "CzmlNumberSliderPropInput",
  value: 1.0,
  max: 200,
  min: 0,
  setp: 0.1,
  isEnable: true,
};

export const czmlInterpolationDegreeOptions = {
  name: "interpolationDegree",
  vueName: "interpolationDegree",
  labelZh: "插值角度",
  labelEn: "interpolation degree",
  tag: "CzmlNumberSliderPropInput",
  value: 1.0,
  max: 360,
  min: 0,
  setp: 0.1,
  isEnable: true,
  description: "The degree of interpolation to use when interpolating.",
  type: "number",
  default: 1,
};

export const czmlForwardExtrapolationDurationOptions = {
  name: "forwardExtrapolationDuration",
  vueName: "forwardExtrapolationDuration",
  labelZh: "前向插值时间",
  labelEn: "forwardExtrapolation duration",
  tag: "CzmlNumberSliderPropInput",
  value: 0.0,
  max: 100,
  min: 0,
  setp: 0.1,
  isEnable: true,
  description:
    "The amount of time to extrapolate forward before the property becomes undefined. A value of 0 will extrapolate forever.",
  type: "number",
  default: 1,
};

export const czmlBackwardExtrapolationDurationOptions = {
  name: "backwardExtrapolationDuration",
  vueName: "backwardExtrapolationDuration",
  labelZh: "后向插值时间",
  labelEn: "backwardExtrapolation duration",
  tag: "CzmlNumberSliderPropInput",
  value: 0.0,
  max: 100,
  min: 0,
  setp: 0.1,
  isEnable: true,
  description:
    "The amount of time to extrapolate backward before the property becomes undefined. A value of 0 will extrapolate forever.",
  type: "number",
  default: 1,
};
