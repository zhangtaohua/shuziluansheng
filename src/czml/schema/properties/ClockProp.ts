import { nanoid } from "@/utils/common/nanoid";

import { czmlOptionsPureProp, CzmlClockRangeOptions, CzmlClockStepOptions } from "./OptionsPureProp.ts";
import { czmlDoublePureProp, czmlClockMultiplierOptions } from "./DoublePureProp.ts";
import { czmlTimePureProp, czmlClockCurrentTimeOptions } from "./TimePureProp.ts";
import { czmlTimeIntervalProp, czmlClockIntervalOptions } from "./TimeIntervalProp.ts";

export class czmlClockProp {
  public id = "czml_prop_clock_" + nanoid(10);
  public name = "clock";
  public labelZh = "时钟";
  public labelEn = "clock";
  public description =
    "Initial settings for a simulated clock when a document is loaded. The start and stop time are configured using the interval property.";
  public tag = "CzmlClockPropInput";
  public isEnable = true;
  public isEntity = false;
  public type = "object";

  // public availability = "";

  public properties = {
    interval: new czmlTimeIntervalProp(czmlClockIntervalOptions),
    currentTime: new czmlTimePureProp(czmlClockCurrentTimeOptions),
    multiplier: new czmlDoublePureProp(czmlClockMultiplierOptions),
    range: new czmlOptionsPureProp(CzmlClockRangeOptions),
    step: new czmlOptionsPureProp(CzmlClockStepOptions),
  };

  constructor(options: any) {
    if (options.name) {
      this.name = options.name;
    }
    if (options.description) {
      this.description = options.description;
    }
    this.isEnable = options.isEnable ?? true;
  }
}

export default czmlClockProp;
