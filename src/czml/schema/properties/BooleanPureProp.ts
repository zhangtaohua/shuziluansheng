import { nanoid } from "@/utils/common/nanoid";

export class czmlBooleanPureProp {
  public id = "czml_prop_bool_" + nanoid(10);
  public name = "boolean";
  public labelZh = "布尔值";
  public labelEn = "boolean";
  public title = "Boolean";
  public description = "The boolean value.";
  public type = "property";
  public componentType = "czml#packet#property";
  public tag = "CzmlBooleanPorpInput";
  public _value = true;
  public _valueType = "boolean";
  public default = true;
  public isEnable = true; // for can edit
  public isUsed = true; // for can used
  public isExpand = true; // for UI
  public _isEntity = false;
  public isCombinedProperty = false;
  public isComplexProperty = false;

  // public availability = "";

  constructor(options: any) {
    if (!options) {
      return;
    }

    if (options.id) {
      this.id = options.id;
    } else if (options.name) {
      this.id = "czml_prop_bool_" + options.name + "_" + nanoid(10);
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

    this.default = options.default ?? true;
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

export default czmlBooleanPureProp;
