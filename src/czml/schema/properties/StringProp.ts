import { nanoid } from "@/utils/common/nanoid";

export class czmlStringProp {
  public id = "czml_prop_string_" + nanoid(10);
  public name = "string";
  public _czmlName = "string";
  public labelZh = "字符串";
  public labelEn = "string";
  public title = "String";
  public description = "The string value.";
  public descriptionZh = "";

  public type = "property";
  public componentType = "czml#packet#property";
  public tag = "CzmlStringPropInput";
  public _value = "";
  public _valueType = "string";
  public default = "";
  public isEnable = true; // for can edit
  public isUsed = true; // for can used
  public isShowUsed = false;
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
      this.id = "czml_prop_string_" + options.name + "_" + nanoid(10);
    }

    if (options.name) {
      this.name = options.name;
    }

    if (options.czmlName) {
      this._czmlName = options.czmlName;
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

    if (options.descriptionZh) {
      this.descriptionZh = options.descriptionZh;
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
    this.isShowUsed = options.isShowUsed ?? false;
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

  get czmlName() {
    return this._czmlName;
  }

  set czmlName(newValue) {
    return;
    // this._czmlName = newValue;
  }

  public getCzmlName() {
    if (this.isUsed) {
      return this.czmlName;
    } else {
      return null;
    }
  }

  public getCzmlValue() {
    if (this.isUsed) {
      return this._value;
    } else {
      return null;
    }
  }

  public getCzmlData() {
    if (this.isUsed) {
      return {
        [this.czmlName]: this.getCzmlValue(),
      };
    } else {
      return null;
    }
  }
}

export default czmlStringProp;

export const czmlReferenceValueStrOptions = {
  name: "reference",
  czmlName: "reference",
  labelZh: "参考值",
  labelEn: "reference",
  value: "",
  isEnable: true,
  isUsed: false,
  isShowUsed: true,
  description:
    "Represents a reference to another property. References can be used to specify that two properties on different objects are in fact, the same property.",
};

export const czmlFontOptions = {
  name: "font",
  czmlName: "font",
  labelZh: "字体",
  labelEn: "font",
  value: "", // "30px sans-serif"
  isEnable: true,
  isUsed: false,
  isShowUsed: true,
  description: 'A font, specified using the same syntax as the CSS "font" property.',
};

export const czmlVelocityReferenceOptions = {
  name: "velocityReference",
  czmlName: "velocityReference",
  labelZh: "速度参考",
  labelEn: "velocity reference",
  value: "",
  isEnable: true,
  isUsed: false,
  isShowUsed: true,
  $ref: "Values/VelocityReferenceValue.json",
  description:
    "The orientation specified as the normalized velocity vector of a position property. The reference must be to a `position` property.",
};
