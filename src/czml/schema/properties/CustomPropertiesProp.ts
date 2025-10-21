import { nanoid } from "@/utils/common/nanoid";

export class czmlCustomPropertiesProp {
  public id = "czml_prop_custom_properties_" + nanoid(10);
  public name = "customProperties";
  public labelZh = "自定义属性";
  public labelEn = "custom Properties";
  public description = "A set of custom properties.";
  public tag = "CzmlCustomPropertiesPropInput";
  public _value = [
    {
      key: "key",
      value: "value",
      isJson: false,
    },
  ];

  public _valueType = "";
  public default = [
    {
      key: "key",
      value: "value",
      isJson: false,
    },
  ];
  public isEnable = true;
  public isEntity = false;

  // public availability = "";

  constructor(options: any) {
    this.id = options.id ? options.id : "czml_prop_custom_properties_" + options.name + "_" + nanoid(10);
    if (options.name) {
      this.name = options.name;
    }
    this.labelZh = options.labelZh ? options.labelZh : options.name;
    this.labelEn = options.labelEn ? options.labelEn : options.name;
    if (options.description) {
      this.description = options.description;
    }

    this.tag = options.tag ? options.tag : "CzmlCustomPropertiesPropInput";

    if (options.value) {
      this._value = options.value;
    }

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

export default czmlCustomPropertiesProp;

export const czmlCustomPropertiesOptions = {
  name: "customProperties",
  vueName: "customProperties",
  labelZh: "自定义属性",
  labelEn: "custom Properties",
  tag: "CzmlCustomPropertiesPropInput",
  isEnable: true,
};
