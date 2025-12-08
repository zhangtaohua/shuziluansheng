import { nanoid } from "@/utils/common/nanoid";

import {
  CZMLPUREVALUE,
  CZMLCARTESIAN3METERTYPE,
  CZMLCARTESIAN3DEGREESTYPE,
  CZMLCARTESIAN3RADIANSTYPE,
  propValuesCartesian3TypeOptions,
} from "./commondata";

// 只能用于生成纯粹的三位数值的 Cartensian3，但可以改变单位， 是原始值，还是换算成经纬度，经纬度值可以是度 或者 弧度。
export class czmlCartesian3PureProp {
  public id = "czml_prop_cartesian3_pure_" + nanoid(10);
  public name = "cartesian3";
  public _czmlName = "cartesian3";
  public labelZh = "XYZ坐标";
  public labelEn = "cartesian3";
  public title = "Cartesian3";

  public description =
    "A three-dimensional Cartesian value specified as `[X, Y, Z]`. If the array has three elements, the value is constant.";

  public type = "property";
  public componentType = "czml#packet#property";
  public czmlValue = true;

  public tag = "CzmlCartesian3PurePropInput";

  public unit = "meters";
  public _value = [0, 0, 0];
  public _valueType = "cartesian3";

  public default = [0, 0, 0];
  public isEnable = true; // for can edit
  public isUsed = true; // for can used
  public isExpand = true; // for UI
  public _isEntity = false;
  public isCombinedProperty = false; // Composite Values
  public isComplexProperty = false;

  public _xyzUnitType = CZMLCARTESIAN3METERTYPE;
  public xyzUnitTypeOptions = propValuesCartesian3TypeOptions;

  public isFixedXyzUnitType = false;

  public _allValues = {
    meter: [0, 0, 0],
    cartesian: [0, 0, 0],
    degrees: [0, 0, 0],
    radians: [0, 0, 0],
  };

  constructor(options: any) {
    if (!options) {
      return;
    }

    if (options.id) {
      this.id = options.id;
    } else if (options.name) {
      this.id = "czml_prop_cartesian3_pure_" + options.name + "_" + nanoid(10);
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

    this.isFixedXyzUnitType = options.isFixedXyzUnitType ?? true;
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
    this._valueType = newValue;
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

  get allValues() {
    return this._allValues;
  }

  set allValues(newValue) {
    this._allValues = newValue;
  }

  get xyzUnitType() {
    return this._xyzUnitType;
  }

  set xyzUnitType(newValue) {
    this._xyzUnitType = newValue;
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
      if (this._xyzUnitType == CZMLCARTESIAN3METERTYPE) {
        return this._allValues.cartesian.map(Number);
      } else if (this._xyzUnitType == CZMLCARTESIAN3DEGREESTYPE) {
        return this._allValues.degrees.map(Number);
      } else if (this._xyzUnitType == CZMLCARTESIAN3RADIANSTYPE) {
        return this._allValues.radians.map(Number);
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

export default czmlCartesian3PureProp;
