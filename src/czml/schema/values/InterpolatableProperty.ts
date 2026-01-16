import { nanoid } from "@/utils/common/nanoid";

import { createEpochimeProp, createTimeIntervalProp } from "../properties/timeProp.ts";
import {
  createBackwardExtrapolationDurationDoublePureProp,
  createForwardExtrapolationDurationDoublePureProp,
  createInterpolationDegreeDoublePureProp,
} from "../properties/doubleProp.ts";
import {
  createBackwardExtrapolationTypeProp,
  createForwardExtrapolationTypeProp,
  createInterpolationAlgorithmProp,
} from "../properties/optionsProp.ts";

export class czmlInterpolatableProp {
  public id = "czml_prop_interpolatable_" + nanoid(10);
  public name = "InterpolatableProperty";
  public _czmlName = "InterpolatableProperty";
  public labelZh = "插值";
  // public labelEn = "interpolatable property";
  public labelEn = "interpolatable";
  public title = "Interpolatable";
  public description =
    "The base schema for a property whose value may be determined by interpolating over provided time-tagged samples.";
  public descriptionZh = "";

  public type = "property";
  public componentType = "czml#packet#property";
  public tag = "CzmlInterpolationPropInput";
  public isRequired = false;
  public isEnable = true;
  // for can edit
  public isUsed = true; // for can used
  public isShowUsed = true;
  public isExpand = true; // for UI
  public _isEntity = false;
  public isCombinedProperty = true;
  public isComplexProperty = false;

  public properties = {
    epoch: createEpochimeProp(),
    interpolationAlgorithm: createInterpolationAlgorithmProp(),
    interpolationDegree: createInterpolationDegreeDoublePureProp,
    interval: createTimeIntervalProp({ isUsed: false, isShowUsed: false }), // 有些有，有些又没有
    forwardExtrapolationType: createForwardExtrapolationTypeProp({
      isUsed: false,
      isShowUsed: false,
    }),
    forwardExtrapolationDuration: createForwardExtrapolationDurationDoublePureProp({
      isUsed: false,
      isShowUsed: false,
    }),
    backwardExtrapolationType: createBackwardExtrapolationTypeProp({
      isUsed: false,
      isShowUsed: false,
    }),
    backwardExtrapolationDuration: createBackwardExtrapolationDurationDoublePureProp({
      isUsed: false,
      isShowUsed: false,
    }),
  };

  constructor(options: any) {
    if (!options) {
      return;
    }

    if (options.id) {
      this.id = options.id;
    } else if (options.name) {
      this.id = "czml_prop_interpolatable_" + options.name + "_" + nanoid(10);
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

      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const prop = this.properties[key];
        if (prop.getCzmlName) {
          const propKey = prop.getCzmlName();
          const propValue = prop.getCzmlValue();
          if (propKey && propValue) {
            czmlData[propKey] = propValue;
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
        [this.name]: this.getCzmlValue(),
      };
    } else {
      return null;
    }
  }
}

export default czmlInterpolatableProp;
