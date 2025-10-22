import { nanoid } from "@/utils/common/nanoid";

export class czmlCartesian3PureProp {
  public id = "czml_prop_cartesian3_pure_" + nanoid(10);
  public name = "cartesian3";
  public labelZh = "XYZ坐标";
  public labelEn = "cartesian3";
  public title = "Cartesian3";

  public description =
    "A three-dimensional Cartesian value specified as `[X, Y, Z]`. If the array has three elements, the value is constant.";

  public type = "property";
  public componentType = "czml#packet#property";
  public tag = "CzmlCartesian3PurePropInput";

  public unit = "meters";
  public _value = [0, 0, 0];
  public _valueType = "Cartesian3";

  public default = [0, 0, 0];
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
      this.id = "czml_prop_cartesian3_pure_" + options.name + "_" + nanoid(10);
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

export default czmlCartesian3PureProp;
