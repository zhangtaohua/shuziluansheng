import { nanoid } from "@/utils/common/nanoid";

export class czmlTextProp {
  public id = "czml_prop_text_" + nanoid(10);
  public name = "text";
  public labelZh = "文本";
  public labelEn = "text";
  public description = "The big string value.";
  public tag = "CzmlTextPropInput";
  public _value = true;
  public _valueType = "string";
  public default = "";
  public isEnable = true;
  // public availability = "";

  constructor(options: any) {
    this.id = options.id ? options.id : "czml_prop_" + options.name + "_" + nanoid(10);
    this.name = options.name;
    this.labelZh = options.labelZh ? options.labelZh : options.name;
    this.labelEn = options.labelEn ? options.labelEn : options.name;
    if (options.description) {
      this.description = options.description;
    }

    this.tag = options.tag ? options.tag : "CzmlTextPropInput";

    this._value = options.value;
    this.default = options.default ? options.default : "";
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

export default czmlTextProp;
