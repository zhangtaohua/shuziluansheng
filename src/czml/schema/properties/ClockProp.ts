import { nanoid } from "@/utils/common/nanoid";

import { czmlOptionsPureProp, CzmlClockRangeOptions, CzmlClockStepOptions } from "./OptionsPureProp.ts";
import { czmlDoublePureProp, czmlClockMultiplierOptions } from "./DoublePureProp.ts";
import { czmlTimePureProp, czmlClockCurrentTimeOptions } from "./TimePureProp.ts";
import { czmlTimeIntervalProp, czmlClockIntervalOptions } from "./TimeIntervalProp.ts";

export class czmlClockProp {
  public id = "czml_prop_clock_" + nanoid(10);
  public name = "clock";
  public _czmlName = "clock";
  public labelZh = "时钟";
  public labelEn = "clock";
  public title = "Clock";
  public description =
    "Initial settings for a simulated clock when a document is loaded. The start and stop time are configured using the interval property.";
  public type = "property";
  public componentType = "czml#packet#property";
  public tag = "CzmlCombinePropInput";
  public isEnable = true; // for can edit
  public isUsed = true; // for can used
  public isExpand = true; // for UI
  public _isEntity = false;
  public isCombinedProperty = true;
  public isComplexProperty = false;

  public properties = {
    interval: new czmlTimeIntervalProp(czmlClockIntervalOptions),
    currentTime: new czmlTimePureProp(czmlClockCurrentTimeOptions),
    multiplier: new czmlDoublePureProp(czmlClockMultiplierOptions),
    range: new czmlOptionsPureProp(CzmlClockRangeOptions),
    step: new czmlOptionsPureProp(CzmlClockStepOptions),
  };

  constructor(options: any) {
    if (!options) {
      return;
    }

    if (options.id) {
      this.id = options.id;
    } else if (options.name) {
      this.id = "czml_prop_bool_" + options.name + "_" + nanoid(10);
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

    this.isEnable = options.isEnable ?? true;
    this.isUsed = options.isUsed ?? true;
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

export default czmlClockProp;
