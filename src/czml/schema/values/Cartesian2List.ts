import { nanoid } from "@/utils/common/nanoid";

export class czmlCartesian2ListProp {
  public id = "czml_prop_cartesian2_list_" + nanoid(10);
  public name = "cartesian2";
  public _czmlName = "cartesian2";
  public labelZh = "XY坐标列表";
  public labelEn = "cartesian2 list";
  public title = "cartesian2";
  public description = "A list of two-dimensional Cartesian values specified as `[X, Y, X, Y, ...]`.";
  public descriptionZh = "";

  public type = "property";
  public componentType = "czml#packet#property";
  public czmlValue = true; // 这个用于标示是不是 czml value的

  public tag = "CzmlCartesian2ListPropInput";

  public unit = "meters";
  public _value = [[0, 0]];
  public _valueType = "cartesian2 list";

  public default = [[0, 0]];

  public isRequired = false;
  public isEnable = true;
  // for can edit
  public isUsed = true; // for can used
  public isShowUsed = true;
  public isExpand = true; // for UI
  public _isEntity = false;
  public isCombinedProperty = false;
  public isComplexProperty = true;

  public secondsOnceAddCount = 1;

  public isFixedXyzUnitType = false;

  constructor(options: any) {
    if (!options) {
      return;
    }

    if (options.id) {
      this.id = options.id;
    } else if (options.name) {
      this.id = "czml_prop_cartesian2_list_" + options.name + "_" + nanoid(10);
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

    this.isFixedXyzUnitType = options.isFixedXyzUnitType ?? true;
    this.isRequired = options.isRequired ?? false;
    this.isEnable = options.isEnable ?? true;
    this.isUsed = options.isUsed ?? true;
    this.isShowUsed = options.isShowUsed ?? true;
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
      return this.czmlName;
    } else {
      return null;
    }
  }

  // public flatten(arr) {
  //   return arr.reduce((acc, val) => Array.isArray(val) ? acc.concat(flatten(val)) : acc.concat(val), []);
  // }

  public getCzmlValue() {
    if (this.isUsed) {
      const flattenArr = this._value.flat(Infinity);
      // return flattenArr.map(item => parseInt(item, 10));
      return flattenArr.map(Number);
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

export default czmlCartesian2ListProp;
