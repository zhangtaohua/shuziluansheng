import { nanoid } from "@/utils/common/nanoid";

import {
  CZMLPUREVALUE,
  CZMLTIMESECONDS,
  CZMLTIMESTRING,
  CZMLVALUESNOTINTERPOLATE,
  CZMLVALUESWITHINTERPOLATE,
  CZMLCARTESIAN3METERTYPE,
  CZMLCARTESIAN3DEGREESTYPE,
  CZMLCARTESIAN3RADIANSTYPE,
  propValuesCartesian3TypeOptions,
  propValuesInterpolateOptions,
  defaultTimeFormatStr,
  propValuesTimeTypeOptions,
} from "./commondata.ts";

import czmlInterpolatableProp from "./InterpolatableProperty.ts";

import { createReferencesProp } from "../properties/referenceProp.ts";
import { createCartesianListMapProp } from "../properties/cartesian3Prop.ts";

export class czmlPositionListOfListsProp {
  public id = "czml_prop_positions_of_lists_" + nanoid(10);
  public name = "positions";
  public _czmlName = "positions";
  public labelZh = "位置列表";
  public labelEn = "positions of lists";
  public title = "Positions of Lists";
  public description = "A list of positions.";
  public descriptionZh = "";

  public type = "property";
  public componentType = "czml#packet#property";
  public tag = "CzmlPositionPropInput";
  public isRequired = false;
  public isEnable = true;
  // for can edit
  public isUsed = true; // for can used
  public isShowUsed = true;
  public isExpand = true; // for UI
  public _isEntity = false;
  public isCombinedProperty = true;
  public isComplexProperty = false;

  public compUsedOptions = [
    { label: "cartesian 笛卡尔", value: "cartesian" },
    { label: "cartographicDegrees wgs84经纬度", value: "cartographicDegrees" },
    { label: "cartographicRadians wgs84弧度", value: "cartographicRadians" },
    { label: "references 参考值", value: "references" },
  ];

  public currentProperty = "cartesian";

  public properties = {
    cartesian: createCartesianListMapProp({
      czmlName: "cartesian",
      isEnable: true,
      isFixedXyzUnitType: true,
      isUsed: true,
      xyzUnitType: CZMLCARTESIAN3METERTYPE,
      $ref: "Values/Cartesian3ListOfListsValue.json",
      description:
        "The list of lists of positions specified as three-dimensional Cartesian values, `[X, Y, Z, X, Y, Z, ...]`, in meters relative to the `referenceFrame`.",
    }),
    cartographicRadians: createCartesianListMapProp({
      czmlName: "cartographicRadians",
      isEnable: true,
      isFixedXyzUnitType: true,
      isUsed: false,
      xyzUnitType: CZMLCARTESIAN3RADIANSTYPE,
      $ref: "Values/CartographicRadiansListOfListsValue.json",
      description:
        "The list of lists of positions specified in Cartographic WGS84 coordinates, `[Longitude, Latitude, Height, Longitude, Latitude, Height, ...]`, where Longitude and Latitude are in radians and Height is in meters.",
    }),
    cartographicDegrees: createCartesianListMapProp({
      czmlName: "cartographicDegrees",
      isEnable: true,
      isFixedXyzUnitType: true,
      isUsed: false,
      xyzUnitType: CZMLCARTESIAN3DEGREESTYPE,
      $ref: "Values/CartographicDegreesListOfListsValue.json",
      description:
        "The list of lists of positions specified in Cartographic WGS84 coordinates, `[Longitude, Latitude, Height, Longitude, Latitude, Height, ...]`, where Longitude and Latitude are in degrees and Height is in meters.",
    }),
    references: createReferencesProp({
      $ref: "Values/ReferenceListOfListsValue.json",
      description:
        "The list of lists of positions specified as references. Each reference is to a property that defines a single position, which may change with time.",
    }),
  };

  constructor(options: any) {
    if (!options) {
      return;
    }

    if (options.id) {
      this.id = options.id;
    } else if (options.name) {
      this.id = "czml_prop_position_" + options.name + "_" + nanoid(10);
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

    this.isRequired = options.isRequired ?? false;
    this.isEnable = options.isEnable ?? true;
    this.isUsed = options.isUsed ?? true;
    this.isShowUsed = options.isShowUsed ?? true;
    this.isExpand = options.isExpand ?? true;
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
      const czmlData = {};
      const keys = Object.keys(this.properties);

      // const rfProp = this.properties["referenceFrame"];
      const isUseInterpolate = true;
      // "FIXED" 的值 也是可以设置inter 值的
      // if (rfProp) {
      //   const propValue = rfProp.getCzmlValue();
      //   if (propValue && propValue == "INERTIAL") {
      //     isUseInterpolate = true;
      //   }
      // }

      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const prop = this.properties[key];
        if (prop.getCzmlName && prop.isUsed) {
          const propKey = prop.getCzmlName();
          const propValue = prop.getCzmlValue();
          if (prop instanceof czmlInterpolatableProp) {
            if (isUseInterpolate) {
              Object.assign(czmlData, propValue);
            }
          } else {
            if (propKey && propValue) {
              czmlData[propKey] = propValue;
            }
          }
        }
      }

      return czmlData;
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

export default czmlPositionListOfListsProp;
