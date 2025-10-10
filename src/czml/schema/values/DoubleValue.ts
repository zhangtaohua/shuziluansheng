import { nanoid } from "@/utils/common/nanoid";

export class czmlDoubleValue {
  public title = "Double";
  public description =
    "A floating-point number. The value may be a single number, or an array with one element, in which case the value is constant. If it is an array with two or more elements, they are time-tagged samples arranged as `[Time, Value, Time, Value, ...]`, where Time is an ISO 8601 date and time string or seconds since epoch.";
  public type = ["number", "array"];
  public czmlValue = true;

  // 这是属性值自身的property;
  public propertyTitle = "DoubleValueProperty";
  public propertyDescription = "The base schema for a property whose value may be written as a floating-point number.";

  // customs
  public id = "czml_value_double_" + nanoid(10);
  public name = "Double";
  public labelZh = "浮点数";
  public labelEn = "double";
  public tag = "CheckInput";
  public _value = 0.0;
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

export default czmlDoubleValue;
