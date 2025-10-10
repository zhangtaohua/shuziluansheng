import { nanoid } from "@/utils/common/nanoid";

import { propPureValueOption, propIntervalsOption } from "./commondata";

export class czmlShowProp {
  public id = "czml_prop_show_" + nanoid(10);
  public name = "show";
  public labelZh = "显示";
  public labelEn = "show";
  public description = "Whether or not the object is shown.";
  public tag = "CzmlShowPropInput";
  public _value = true;
  public _valueType = "PureValue"; // "PureValue" "Intervals" "CompositeValues" "SampledPropertyValues"
  public default = true;
  public isEnable = true;
  // public availability = "";

  public valueTypesOptions = [{ ...propPureValueOption }, { ...propIntervalsOption }];

  constructor(options: any) {
    this.description = options.description ?? options.description;
    this.default = options.default;
    this.isEnable = options.isEnable ? true : false;
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

export default czmlShowProp;
