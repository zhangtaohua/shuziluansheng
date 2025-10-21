import { nanoid } from "@/utils/common/nanoid";

export class czmlOptionsPureProp {
  public id = "czml_pure_options_prop_" + nanoid(10);
  public name = "pure_options";
  public vueName = "pureOptions";
  public labelZh = "纯选择式";
  public labelEn = "pure options";
  public description = "The pure options select.";
  public tag = "CzmlOptionsPurePropInput";
  public _value = true;
  public _valueType = "string";
  public default = "";
  public options = [];
  public isEnable = true;
  public isEntity = false;
  // public availability = "";

  constructor(options: any) {
    this.id = options.id ? options.id : "czml_pure_options_prop_" + options.name + "_" + nanoid(10);
    this.name = options.name;
    this.vueName = options.vueName ? options.vueName : options.name;
    this.labelZh = options.labelZh ? options.labelZh : options.name;
    this.labelEn = options.labelEn ? options.labelEn : options.name;
    this.description = options.description ? options.description : "The pure options select.";

    if (options.description) {
      this.description = options.description;
    }

    this._value = options.value;
    this.options = options.options;
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

export default czmlOptionsPureProp;
