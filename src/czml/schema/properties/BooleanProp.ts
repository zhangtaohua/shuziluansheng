import { nanoid } from "@/utils/common/nanoid";

export class czmlBooleanProp {
  public id = "czml_prop_bool_" + nanoid(10);
  public name = "boolean";
  public labelZh = "布尔值";
  public labelEn = "boolean";
  public description = "The boolean value.";
  public tag = "CzmlBooleanPorpInput";
  public _value = true;
  public _valueType = "string";
  public default = true;
  public isEnable = true;
  public isEntity = false;

  constructor(options: any) {
    this.id = options.id ? options.id : "czml_prop_" + options.name + "_" + nanoid(10);

    if (options.name) {
      this.name = options.name;
    }
    this.labelZh = options.labelZh ? options.labelZh : options.name;
    this.labelEn = options.labelEn ? options.labelEn : options.name;

    if (options.description) {
      this.description = options.description;
    }

    this.tag = options.tag ? options.tag : "CzmlBooleanPropInput";

    this._value = options.value ?? true;
    this.default = options.default ?? true;
    this.isEnable = options.isEnable ?? true;
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
}

export default czmlBooleanProp;

