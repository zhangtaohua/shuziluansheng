import { nanoid } from "@/utils/common/nanoid";
import dayjs from "dayjs";

import { czmlPureOptionsProp, CzmlReferenceFrameOptions } from "./PureOptionsProp";
import { czmlStringProp, czmlReferenceValueOptions } from "./StringProp";

export class czmlPositionProp {
  public id = "czml_prop_position_" + nanoid(10);
  public name = "position";
  public labelZh = "位置";
  public labelEn = "position";
  public description = "Defines a position. The position can optionally vary over time.";
  public tag = "CzmlPositionPropInput";
  public isEnable = true;
  // public availability = "";

  public properties = {
    referenceFrame: new czmlPureOptionsProp(CzmlReferenceFrameOptions),
    // cartesian: new ,
    // cartographicRadians: new ,
    // cartographicDegrees: new ,
    // todo 这里是错的 暂时为了调试用
    references: new czmlStringProp(czmlReferenceValueOptions),
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

export default czmlPositionProp;
