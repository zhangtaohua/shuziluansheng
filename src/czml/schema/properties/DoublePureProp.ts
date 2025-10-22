import { nanoid } from "@/utils/common/nanoid";

export class czmlDoublePureProp {
  public id = "czml_prop_double_pure_" + nanoid(10);
  public name = "double";
  public labelZh = "浮点数";
  public labelEn = "double";
  public title = "Double";
  public description = "A floating-point number.";
  public type = "property";
  public componentType = "czml#packet#property";
  public tag = "CzmlNumberSliderPropInput";
  public _value = 1.0;
  public _valueType = "number";
  public default = 1.0;
  private _min = 0;
  private _max = 50;
  private _step = 0.1;
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
      this.id = "czml_prop_double_pure_" + options.name + "_" + nanoid(10);
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

    if (options.max != undefined && options.min != undefined && +options.max > +options.min) {
      this._max = +options.max;
      this._min = +options.min;
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

  public getCzmlName() {
    return this.name;
  }

  public getCzmlValue() {
    return this._value;
  }

  public getCzmlData() {
    return {
      [this.name]: this._value,
    };
  }
}

export default czmlDoublePureProp;

export const czmlClockMultiplierOptions = {
  name: "multiplier",
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
