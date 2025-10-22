// 应该后期可以删除 用 properties下的

import { nanoid } from "@/utils/common/nanoid";

export class czmlUriValue {
  public title = "Uri";
  public description = "A URI value.";
  public type = "string";
  public czmlValue = true;

  // 这是属性值自身的property;
  public propertyTitle = "UriValueProperty";
  public propertyDescription = "The base schema for a property whose value may be written as a URI.";

  // customs
  public id = "czml_value_uri_" + nanoid(10);
  public name = "Uri";
  public labelZh = "链接值";
  public labelEn = "uri";
  public tag = "CheckInput";
  public _value = "";
  public isEnable = true;

  constructor(options: any) {
    this._value = options.value;
    this.isEnable = options.isEnable ?? true;
  }

  get value() {
    return this._value;
  }

  set value(newValue) {
    this._value = newValue;
  }
}

export default czmlUriValue;
