import { nanoid } from "@/utils/common/nanoid";

export class czmlCustomPropertiesProp {
  public id = "czml_prop_custom_properties_" + nanoid(10);
  public name = "customProperties";
  public labelZh = "自定义属性";
  public labelEn = "custom properties";
  public title = "Custom Properties";
  public description = "A set of custom properties.";
  public type = "property";
  public componentType = "czml#packet#property";

  public tag = "CzmlCustomPropertiesPropInput";
  public _value = [
    {
      key: "key",
      value: "value",
      isJson: false,
    },
  ];

  public _valueType = "object";
  public default = [
    {
      key: "key",
      value: "value",
      isJson: false,
    },
  ];
  public isEnable = true; // for can edit
  public isUsed = true; // for can used
  public isExpand = true; // for UI
  public _isEntity = false;
  public isCombinedProperty = false;
  public isComplexProperty = true;

  constructor(options: any) {
    if (!options) {
      return;
    }

    if (options.id) {
      this.id = options.id;
    } else if (options.name) {
      this.id = "czml_prop_custom_properties_" + options.name + "_" + nanoid(10);
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

  public getCzmlName() {
    return this.name;
  }

  public getCzmlValue() {
    const czmlData = {};

    for (let i = 0; i < this.value.length; i++) {
      const prop = this.value[i];
      const propKey = prop.key;
      let propValue = prop.value;
      try {
        if (prop.isJson) {
          propValue = JSON.parse(prop.value);
        }
      } catch (error) {
        console.error(this.name + "Json parse error", error);
      }
      czmlData[propKey] = propValue;
    }

    return czmlData;
  }

  public getCzmlData() {
    return {
      [this.name]: this.getCzmlValue(),
    };
  }
}

export default czmlCustomPropertiesProp;

export const czmlCustomPropertiesOptions = {
  name: "customProperties",
  labelZh: "自定义属性",
  labelEn: "custom Properties",
  tag: "CzmlCustomPropertiesPropInput",
  isEnable: true,
};
