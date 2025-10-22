import { nanoid } from "@/utils/common/nanoid";

export class czmlIntegerPureProp {
  public id = "czml_prop_integer_pure_" + nanoid(10);
  public name = "integer";
  public labelZh = "整数";
  public labelEn = "integer";
  public title = "Integer";
  public description = "An integer number.";
  public type = "property";
  public componentType = "czml#packet#property";
  public tag = "CzmlNumberInputSlider";
  public _value = 1;
  public _valueType = "number";
  public default = 1;
  private _min = 0;
  private _max = 100;
  private _step = 1;
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
      this.id = "czml_prop_integer_pure_" + options.name + "_" + nanoid(10);
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
    this._value = +newValue;
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

  getCzmlName() {
    return this.name;
  }

  getCzmlValue() {
    return this._value;
  }

  getCzmlData() {
    return {
      [this.name]: this._value,
    };
  }
}

export default czmlIntegerPureProp;
