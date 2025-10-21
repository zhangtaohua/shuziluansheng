import { nanoid } from "@/utils/common/nanoid";

export class czmlStringProp {
  public id = "czml_prop_string_" + nanoid(10);
  public name = "string";
  public labelZh = "字符串";
  public labelEn = "string";
  public description = "The string value.";
  public tag = "CzmlStringPropInput";
  public _value = true;
  public _valueType = "string";
  public default = "";
  public isEnable = true;
  public isEntity = false;
  // public availability = "";

  constructor(options: any) {
    this.id = options.id ? options.id : "czml_prop_" + options.name + "_" + nanoid(10);
    this.name = options.name;
    this.labelZh = options.labelZh ? options.labelZh : options.name;
    this.labelEn = options.labelEn ? options.labelEn : options.name;
    if (options.description) {
      this.description = options.description;
    }

    this.tag = options.tag ? options.tag : "CzmlStringPropInput";

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

export const czmlReferenceValueOptions = {
  name: "reference",
  labelZh: "参考值",
  labelEn: "reference",
  value: "reference_init" + nanoid(10),
  isEnable: true,
  description:
    "Represents a reference to another property. References can be used to specify that two properties on different objects are in fact, the same property.",
};
