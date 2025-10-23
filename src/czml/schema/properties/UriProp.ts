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
  public id = "czml_prop_uri_" + nanoid(10);
  public name = "uri";
  public _czmlName = "uri";
  public labelZh = "链接";
  public labelEn = "uri";
  public title = "Uri";
  public description = "A URI value. The URI can optionally vary with time.";
  public type = "property";
  public componentType = "czml#packet#property";
  public tag = "CzmlUriPropInput";
  // purevalue -> true false,
  // intervals ->
  public _value = "";
  public _valueType = CZMLPUREVALUE; // "PureValue" "Intervals" "CompositeValues" "SampledPropertyValues"
  public default = "";
  public isEnable = true; // for can edit
  public isUsed = true; // for can used
  public isExpand = true; // for UI
  public _isEntity = false;
  public isCombinedProperty = false;
  public isComplexProperty = false;

  public _oldPureValue = "";
  public _oldIntervalValue = [
    {
      // dayjs().toISOString()
      startTime: dayjs().format(defaultTimeFormatStr),
      endTime: dayjs().format(defaultTimeFormatStr),
      value: "", // -> "uri": "image2.png"
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
      this.id = "czml_prop_uri_" + options.name + "_" + nanoid(10);
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
              uri: prop.value,
            };
          } else {
            const czmlData = [];
            for (let i = 0; i < this.value.length; i++) {
              const prop = this.value[i];

              const startTimeStr = dayjs(prop.startTime).toISOString();
              const endTimeStr = dayjs(prop.endTime).toISOString();

              czmlData.push({
                interval: `${startTimeStr}/${endTimeStr}`,
                uri: prop.value,
              });
            }

            return czmlData;
          }
        }
      }

      return null;
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

export default czmlUriProp;
