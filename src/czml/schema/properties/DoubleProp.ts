import { nanoid } from "@/utils/common/nanoid";

export class czmlDoubleProp {
  public id = "czml_prop_double_" + nanoid(10);
  public name = "double";
  public labelZh = "浮点数";
  public labelEn = "double";
  public description = "A floating-point number.";
  public tag = "CzmlDoublePropInput";
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
    this.id = options.id ? options.id : "czml_prop_double_" + options.name + "_" + nanoid(10);
    this.name = options.name;
    this.labelZh = options.labelZh ? options.labelZh : options.name;
    this.labelEn = options.labelEn ? options.labelEn : options.name;
    if (options.description) {
      this.description = options.description;
    }

    this.tag = options.tag ? options.tag : "CzmlDoublePropInput";

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

export default czmlDoubleProp;
