import { nanoid } from "@/utils/common/nanoid";

export class czmlStringProp {
  public id = "czml_prop_string_" + nanoid(10);
  public name = "string";
  public labelZh = "字符串";
  public labelEn = "string";
  public description = "The string value.";
  public tag = "CzmlStringPorpInput";
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
    this.description = options.description ? options.description : "The string value.";

    this.tag = options.tag ? options.tag : "CzmlStringPorpInput";

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

export default czmlStringProp;
