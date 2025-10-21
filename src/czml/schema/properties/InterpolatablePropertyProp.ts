import { nanoid } from "@/utils/common/nanoid";

import {
  czmlOptionsPureProp,
  CzmlInterpolationAlgorithmOptions,
  CzmlForwardExtrapolationTypeOptions,
  CzmlBackwardExtrapolationTypeOptions,
} from "./OptionsPureProp.ts";
import {
  czmlDoublePureProp,
  czmlInterpolationDegreeOptions,
  czmlForwardExtrapolationDurationOptions,
  czmlBackwardExtrapolationDurationOptions,
} from "./DoublePureProp.ts";
import { czmlTimePureProp, czmlEpochimeOptions } from "./TimePureProp.ts";

export class czmlInterpolatableProp {
  public id = "czml_prop_interpolatable_" + nanoid(10);
  public name = "InterpolatableProperty";
  public labelZh = "插值";
  public labelEn = "Interpolatable property";
  public description =
    "The base schema for a property whose value may be determined by interpolating over provided time-tagged samples.";
  public tag = "CzmlInterpolatablePropInput";
  public isEnable = true;
  public isEntity = false;
  public type = "object";

  // public availability = "";

  public properties = {
    epoch: new czmlTimePureProp(czmlEpochimeOptions),
    interpolationAlgorithm: new czmlOptionsPureProp(CzmlInterpolationAlgorithmOptions),
    interpolationDegree: new czmlDoublePureProp(czmlInterpolationDegreeOptions),
    forwardExtrapolationType: new czmlOptionsPureProp(CzmlForwardExtrapolationTypeOptions),
    forwardExtrapolationDuration: new czmlDoublePureProp(czmlForwardExtrapolationDurationOptions),
    backwardExtrapolationType: new czmlOptionsPureProp(CzmlBackwardExtrapolationTypeOptions),
    backwardExtrapolationDuration: new czmlDoublePureProp(czmlBackwardExtrapolationDurationOptions),
  };

  constructor(options: any) {
    if (!options) {
      return;
    }
    if (options.name) {
      this.name = options.name;
    }
    if (options.description) {
      this.description = options.description;
    }
    this.isEnable = options.isEnable ?? true;
  }
}

export default czmlInterpolatableProp;
