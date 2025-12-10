import { nanoid } from "@/utils/common/nanoid";

import {
  CZMLCARTESIAN3METERTYPE,
  CZMLCARTESIAN3DEGREESTYPE,
  CZMLCARTESIAN3RADIANSTYPE,
  propValuesCartesian3TypeOptions,
} from "./commondata.ts";

export class czmlReferencesProp {
  public id = "czml_prop_references_" + nanoid(10);
  public name = "reference";
  public _czmlName = "reference";
  public labelZh = "參考";
  public labelEn = "reference";
  public title = "reference";
  public description = "The offset specified as a reference to another property.";
  public descriptionZh = "";

  public type = "property";
  public componentType = "czml#packet#property";
  public czmlValue = true; // 这个用于标示是不是 czml value的

  public tag = "CzmlReferencesPropInput";

  public _value = [[""]];
  public _valueType = "reference";

  public default = [[""]];

  public isEnable = true; // for can edit
  public isUsed = true; // for can used
  public isShowUsed = false;
  public isExpand = true; // for UI
  public _isEntity = false;
  public isCombinedProperty = false;
  public isComplexProperty = true;

  public secondsOnceAddCount = 1;

  constructor(options: any) {
    if (!options) {
      return;
    }

    if (options.id) {
      this.id = options.id;
    } else if (options.name) {
      this.id = "czml_prop_references_" + options.name + "_" + nanoid(10);
    }

    if (options.name) {
      this.name = options.name;
    }

    // if (options.czmlName) {
    //   this._czmlName = options.czmlName;
    // }

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
      if (this._value.length >= 2) {
        return "references";
      } else {
        return this.czmlName;
      }
    } else {
      return null;
    }
  }

  // public flatten(arr) {
  //   return arr.reduce((acc, val) => Array.isArray(val) ? acc.concat(flatten(val)) : acc.concat(val), []);
  // }

  public getCzmlValue() {
    if (this.isUsed) {
      if (this._value.length >= 2) {
        // return this._value.flat(Infinity);
        const revals = [];
        for (let i = 0; i < this._value.length; i++) {
          const temp = this._value[i];
          if (temp[0]) {
            revals.push();
          }
        }
        return revals;
      } else if (this._value.length == 1) {
        if (this._value[0][0]) {
          return this._value[0][0];
        } else {
          return null;
        }
      }
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

export default czmlReferencesProp;

export const czmlReferenceValueOptions = {
  name: "reference",
  czmlName: "reference",
  labelZh: "参考值",
  labelEn: "reference",
  value: "",
  isEnable: true,
  isUsed: true,
  isShowUsed: true,
  description:
    "Represents a reference to another property. References can be used to specify that two properties on different objects are in fact, the same property.",
};
