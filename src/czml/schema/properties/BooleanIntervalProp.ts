import { nanoid } from "@/utils/common/nanoid";
import dayjs from "dayjs";

import {
  CZMLPUREVALUE,
  CZMLINTERVALSVALUE,
  defaultTimeFormatStr,
  propPureValueOption,
  propIntervalsOption,
} from "./commondata";

export class czmlBooleanIntervalProp {
  public id = "czml_prop_boolean_interval_" + nanoid(10);
  public name = "show";
  public _czmlName = "show";
  public labelZh = "显示";
  public labelEn = "show";
  public title = "Show";

  public description = "Whether or not the object is shown.";
  public type = "property";
  public componentType = "czml#packet#property";
  public tag = "CzmlBooleanIntervalPropInput";
  // purevalue -> true false,
  // intervals ->
  public _value = true;
  public _valueType = CZMLPUREVALUE; // "PureValue" "Intervals" "CompositeValues" "SampledPropertyValues"
  public default = true;
  public isEnable = true; // for can edit
  public isUsed = true; // for can used
  public isExpand = true; // for UI
  public _isEntity = false;
  public isCombinedProperty = false;
  public isComplexProperty = true;

  public _oldPureValue = true;
  public _oldIntervalValue = [
    {
      // dayjs().toISOString()
      startTime: dayjs().format(defaultTimeFormatStr),
      endTime: dayjs().format(defaultTimeFormatStr),
      value: true, // -> "boolean"
    },
  ];

  public valueTypesOptions = [{ ...propPureValueOption }, { ...propIntervalsOption }];

  constructor(options: any) {
    if (!options) {
      return;
    }

    if (options.id) {
      this.id = options.id;
    } else if (options.name) {
      this.id = "czml_prop_boolean_interval_" + options.name + "_" + nanoid(10);
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
      if (this.valueType == CZMLPUREVALUE) {
        return this.value;
      } else if (this.valueType == CZMLINTERVALSVALUE) {
        if (this.value.length) {
          if (this.value.length == 1) {
            const prop = this.value[0];

            const startTimeStr = dayjs(prop.startTime).toISOString();
            const endTimeStr = dayjs(prop.endTime).toISOString();

            return {
              interval: `${startTimeStr}/${endTimeStr}`,
              boolean: prop.value,
            };
          } else {
            const czmlData = [];
            for (let i = 0; i < this.value.length; i++) {
              const prop = this.value[i];

              const startTimeStr = dayjs(prop.startTime).toISOString();
              const endTimeStr = dayjs(prop.endTime).toISOString();

              czmlData.push({
                interval: `${startTimeStr}/${endTimeStr}`,
                boolean: prop.value,
              });
            }

            return czmlData;
          }
        }
      }
    } else {
      return null;
    }
  }

  public getCzmlData() {
    if (this.isUsed) {
      return {
        [this.name]: this.getCzmlValue(),
      };
    } else {
      return null;
    }
  }
}

export default czmlBooleanIntervalProp;

export const czmlShowOptions = {
  id: "czml_prop_show_" + nanoid(10),
  name: "show",
  czmlName: "show",
  labelZh: "显示",
  labelEn: "show",
  isEnable: true,
  description: "Whether or not the object is shown.",
};
