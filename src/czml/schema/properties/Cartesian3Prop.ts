import { nanoid } from "@/utils/common/nanoid";

export class czmlCartesian3Prop {
  public id = "czml_cartesian3_prop_" + nanoid(10);
  public name = "cartesian3";
  public vueName = "cartesian3";
  public labelZh = "笛卡尔坐标三值";
  public labelEn = "cartesian3";
  public description =
    "A three-dimensional Cartesian value specified as `[X, Y, Z]`. If the array has three elements, the value is constant. If it has four or more elements, they are time-tagged samples arranged as `[Time, X, Y, Z, Time, X, Y, Z, ...]`, where Time is an ISO 8601 date and time string or seconds since epoch.";
  public tag = "CzmlCartesian3Input";
  public _value = [0, 0, 0];
  public default = [0, 0, 0];
  public unit = "meters";
  public isEnable = true;
  public isWithTime = false;
  public isEntity = false;

  constructor(options: any) {
    this.id = options.id ? options.id : "czml_pure_options_prop_" + options.name + "_" + nanoid(10);
    this.name = options.name;
    this.vueName = options.vueName ? options.vueName : options.name;
    this.labelZh = options.labelZh ? options.labelZh : options.name;
    this.labelEn = options.labelEn ? options.labelEn : options.name;

    if (options.description) {
      this.description = options.description;
    }

    if (options.tag) {
      this.tag = options.tag;
    }

    if (options.default) {
      this.default = options.default;
    }

    this._value = options.value;
    this.isEnable = options.isEnable ?? true;
    this.isWithTime = options.isWithTime ?? false;
  }

  get value() {
    return this._value;
  }

  set value(newValue) {
    this._value = newValue;
  }
}

export default czmlCartesian3Prop;
