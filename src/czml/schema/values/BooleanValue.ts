// 应该后期可以删除 用 properties下的
import { nanoid } from "@/utils/common/nanoid";

export class czmlBooleanValue {
  public title = "Boolean";
  public description = "A boolean value.";
  public type = "boolean";
  public czmlValue = true;

  // 这是属性值自身的property;
  public propertyTitle = "BooleanValueProperty";
  public propertyDescription = "The base schema for a property whose value may be written as a boolean.";

  // customs
  public id = "czml_value_boolean_" + nanoid(10);
  public name = "Boolean";
  public labelZh = "布尔值";
  public labelEn = "boolean";
  public tag = "CheckInput";
  public _value = true;
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

export default czmlBooleanValue;
