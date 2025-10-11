import { nanoid } from "@/utils/common/nanoid";
import dayjs from "dayjs";

import {
  CZMLPUREVALUE,
  CZMLINTERVALSVALUE,
  defaultTimeFormatStr,
  propPureValueOption,
  propIntervalsOption,
} from "./commondata";

export class czmlUriProp {
  public id = "czml_prop_show_" + nanoid(10);
  public name = "show";
  public labelZh = "显示";
  public labelEn = "show";
  public description = "Whether or not the object is shown.";
  public tag = "CzmlShowPropInput";
  // purevalue -> true false,
  // intervals ->
  public _value = true;
  public _valueType = CZMLPUREVALUE; // "PureValue" "Intervals" "CompositeValues" "SampledPropertyValues"
  public default = true;
  public isEnable = true;
  // public availability = "";

  public _oldPureValue = true;
  public _oldIntervalValue = [
    {
      // dayjs().toISOString()
      startTime: dayjs().format(defaultTimeFormatStr),
      endTime: dayjs().format(defaultTimeFormatStr),
      boolean: true,
    },
  ];

  public valueTypesOptions = [{ ...propPureValueOption }, { ...propIntervalsOption }];

  constructor(options: any) {
    this.description = options.description ?? options.description;
    this.default = options.default;
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
    if (newValue != this._valueType) {
      if (newValue == CZMLPUREVALUE) {
        this._oldIntervalValue = this._value;
        this.value = this._oldPureValue;
      } else if (newValue == CZMLINTERVALSVALUE) {
        this._oldPureValue = this._value;
        this.value = this._oldIntervalValue;
      }

      setTimeout(() => {
        this._valueType = newValue;
      }, 50);
    }
  }
}

export default czmlUriProp;
